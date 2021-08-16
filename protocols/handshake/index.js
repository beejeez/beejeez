// Lib
const { formatProtocol } = require('../../lib/protocols')
const { bufferToHex, hexToBuffer } = require('../../lib/buffers')
const { getOverlay, getNetworkIdBufferBE } = require('../../lib/swarm')
const { readStream, writeStream } = require('../../lib/streams')

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
	networkId: 10n,
	light: true,
	welcomeMessage: 'This is a test',
	transaction:
		'0xaa918381eeb662d6a2735de929d6fd7d96db3f97a377d2e63c45509ae099f999',
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
		const { hash, parentHash } = await provider.getBlock(blockNumber + 1)
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
		const overlay = await getOverlay(hexToBuffer(wallet.address), nextBlockHash)
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

		const expected = await getOverlay(hexToBuffer(from), nextBlockHash)
		if (Buffer.compare(expected, overlay)) {
			console.log({ expected, overlay })
			throw new Error("Overlay doesn't match")
		}
	}

	const execute = async (targetAddress) => {
		const { stream } = await node.dialProtocol(targetAddress, protocol)

		const writer = await writeStream(stream)
		const reader = await readStream(stream)

		await writer.write(createSyn())

		const { value: rawSynAck } = await reader.next()
		const synAck = SynAck.decode(rawSynAck)

		console.log(synAck)

		await verifyOverlay(synAck.Ack.Transaction, synAck.Ack.Address.Overlay)

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
