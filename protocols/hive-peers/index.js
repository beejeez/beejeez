const { multiaddr } = require('multiaddr')

// Lib
const { formatProtocol, newStream } = require('../../lib/protocols')

// Proto
const { hive } = require('./proto')
const { Peers } = hive

// Protocol
const protocol = formatProtocol({
	name: 'hive',
	version: '1.0.0',
	stream: 'peers',
})

const create = async (node, onNewPeers) => {
	node.handle(protocol, async ({ stream }) => {
		const { reader, writer } = await newStream(stream)
		const { value, done } = await reader.next()

		// Close write stream
		writer.end()

		if (done) {
			stream.reset()
			return
		}

		try {
			const { peers } = Peers.decode(value)
			console.log(`Got peers:`, peers)

			onNewPeers(
				peers.map((peer) => ({
					underlay: multiaddr(peer.Underlay),
					overlay: peer.Overlay.toString('hex'),
					signature: peer.Signature.toString('hex'),
					transaction: peer.Transaction.toString('hex'),
				}))
			)

			// Close both sides
			writer.end()
			await stream.close()
		} catch (err) {
			console.error(err)

			// On failure, reset the stream
			await stream.reset()
			return
		}
	})

	return {
		stop: () => node.unhandle(protocol),
	}
}

module.exports = {
	create,
}
