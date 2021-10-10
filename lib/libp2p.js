const PeerId = require('peer-id')
const { readFile } = require('fs/promises')
const { multiaddr } = require('multiaddr')

// Libp2p
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const MPLEX = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')

const createNode = async () => {
	const peerId = await PeerId.createFromJSON(
		JSON.parse(await readFile('peer-id.json'))
	)

	const listen = [
		multiaddr(`/ip4/127.0.0.1/tcp/1634/p2p/${peerId.toB58String()}`),
	]

	return await Libp2p.create({
		addresses: {
			listen,
		},
		dialer: {
			maxParallelDials: 5000,
		},
		modules: {
			transport: [TCP],
			connEncryption: [NOISE],
			streamMuxer: [MPLEX],
		},
		peerId,
	})
}

module.exports = {
	createNode,
}
