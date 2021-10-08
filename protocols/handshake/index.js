// Lib
const { formatProtocol } = require('../../lib/protocols')
const { bufferToHex, hexToBuffer } = require('../../lib/buffers')
const { getOverlay, getNetworkIdBufferBE } = require('../../lib/swarm')
const { readStream, writeStream } = require('../../lib/streams')
const { getBuggyHash } = require('../../lib/go')

// Proto
const { handshake } = require('./proto')
const { Syn, SynAck, Ack, BzzAddress } = handshake

// Protocol
const protocol = formatProtocol({
	name: 'handshake',
	version: '4.0.0',
	stream: 'handshake',
})

const generateSignData = (underlay, overlay) => {
	return Buffer.concat([
		Buffer.from('bee-handshake-'),
		underlay,
		overlay,
		getNetworkIdBufferBE(),
	])
}

// TODO: Make this configurable
const config = {
	networkId: 1n,
	light: true,
	welcomeMessage: 'Beejeez - Staying Bzzing :bee:',
	transaction:
		//'0xdbf4dc6e0a3a6a733ebcc152f5296aedc174964fbf433bf2154bcd31cdf0a9fa', // goerli
		'0xb4479887140ddeb2f8adde886e269826857f581548643d95e64358f5acdca057', // xdai
}

const create = async (node, wallet) => {
	// NOTE: Can we not use multiple addresses here?
	const listenAddress = node.addresses.listen[0]
	const { provider } = wallet

	const sign = async (data) => {
		return Buffer.from((await wallet.signMessage(data)).slice(2), 'hex')
	}

	const getNextBlockHash = async (transaction) => {
		const stringTx = bufferToHex(transaction)
		const { from, blockNumber, blockHash } = await provider.getTransaction(
			stringTx
		)

		// This is a bit hacky for now because of an issue with bee 1.0.0 - 1.2.0
		// const { hash, parentHash } = await provider.getBlock(blockNumber + 1)
		const hash = await getBuggyHash(blockNumber + 1)
		const parentHash = blockHash

		return { from, blockHash, nextBlockHash: hash, parentHash }
	}

	const createSyn = () => {
		const sync = Syn.create({
			ObservedUnderlay: listenAddress.bytes,
		})
		return Syn.encode(sync).finish()
	}

	const createAck = async (listenAddress) => {
		const { nextBlockHash } = await getNextBlockHash(config.transaction)
		const overlay = await getOverlay(wallet.address, nextBlockHash)
		const data = generateSignData(listenAddress.bytes, overlay)
		const signature = await sign(data)

		const address = BzzAddress.create({
			Underlay: listenAddress.bytes,
			Overlay: overlay,
			Signature: signature,
		})

		const ack = Ack.create({
			Address: address,
			NetworkID: config.networkId.toString(),
			FullNode: !config.light,
			Transaction: hexToBuffer(config.transaction),
			WelcomeMessage: config.welcomeMessage,
		})

		return Ack.encode(ack).finish()
	}

	const verifyOverlay = async (transaction, overlay) => {
		const data = await getNextBlockHash(transaction)
		const { from, blockHash, nextBlockHash, parentHash } = data

		// NOTE: How could this possibly not be the case?
		if (blockHash !== parentHash) {
			throw new Error('Invalid block hash')
		}

		const expected = await getOverlay(from, nextBlockHash)
		if (Buffer.compare(expected, overlay)) {
			throw new Error("Overlay doesn't match")
		}
	}

	const execute = async (targetAddress) => {
		let dial
		try {
			dial = await node.dialProtocol(targetAddress, protocol)
		} catch (err) {
			throw { code: 'DIAL', err }
		}

		const { stream } = dial
		const writer = await writeStream(stream)
		const reader = await readStream(stream)

		await writer.write(createSyn())

		const { value: rawSynAck } = await reader.next()
		const synAck = SynAck.decode(rawSynAck)

		try {
			await verifyOverlay(synAck.Ack.Transaction, synAck.Ack.Address.Overlay)
		} catch (err) {
			stream.abort()
			throw { code: 'OVERLAY_MISMATCH', err }
		}

		const ack = await createAck(listenAddress)
		writer.write(ack)
		writer.end()
	}

	return {
		execute,
	}
}

module.exports = {
	create,
}
