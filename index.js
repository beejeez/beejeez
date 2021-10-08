const { getDefaultProvider, Wallet } = require('ethers')

// Lib
const { createNode } = require('./lib/libp2p')

// Protocols
const protocols = {
	pricing: require('./protocols/pricing'),
	hivePeers: require('./protocols/hive-peers'),
	handshake: require('./protocols/handshake'),
	identify: require('./protocols/identify'),
}

;(async () => {
	// Create libp2p node
	const node = await createNode()

	// Create ethers wallet
	const provider = getDefaultProvider('https://rpc.xdaichain.com/')
	const wallet = new Wallet(node.peerId.privKey.marshal(), provider)

	// Setup protocols
	const handshake = await protocols.handshake.create(node, wallet)

	const onNewPeers = async () => {}

	await protocols.pricing.create(node)
	await protocols.hivePeers.create(node, onNewPeers)

	console.log('Current identity:', node.peerId.toB58String())

	await handshake.execute(
		'/ip4/188.165.225.183/tcp/1634/p2p/16Uiu2HAmLQjvNL17745Wkp25P3ouUWwhb5A8aoYpGHG3BMbMW6F3'
	)
})()
