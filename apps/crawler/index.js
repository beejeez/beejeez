const { readFile, writeFile } = require('fs/promises')
const { getDefaultProvider, Wallet } = require('ethers')
const path = require('path')

// Lib
const { createNode } = require('../../lib/libp2p')

// Config
const NODES_PATH = path.join(__dirname, 'data/nodes.json')

// Protocols
const protocols = {
	pricing: require('../../protocols/pricing'),
	hivePeers: require('../../protocols/hive-peers'),
	handshake: require('../../protocols/handshake'),
	identify: require('../../protocols/identify'),
}

const loadNodes = async () => {
	try {
		const data = await readFile(NODES_PATH)
		return new Map(JSON.parse(data))
	} catch (_) {
		return new Map()
	}
}

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

;(async () => {
	// Create libp2p node
	const node = await createNode()
	console.log('Current identity:', node.peerId.toB58String())

	// Create ethers wallet
	const provider = getDefaultProvider('https://rpc.xdaichain.com/')
	const wallet = new Wallet(node.peerId.privKey.marshal(), provider)

	// Setup protocols
	const handshake = await protocols.handshake.create(node, wallet)
	const identify = await protocols.identify.create(node, wallet)

	// Create queue
	const { default: PQueue } = await import('p-queue')
	const queue = new PQueue({ concurrency: 25, autoStart: false })
	const queued = new Map()
	const nodes = await loadNodes()

	const getNextTimestamp = (key) =>
		(nodes.get(key)?.timestamp || 0) + 30 * 60 * 1000

	const addToQueue = async (underlay) => {
		const key = underlay.toString()
		if (queued.has(key)) {
			return
		}

		const priority = -getNextTimestamp(key)
		queued.set(key, { priority })
		queue.add(async () => doHandshake(underlay), { priority })
	}

	const getUserAgent = async (underlay) => {
		const { agentVersion } = await identify.execute(underlay)
		return agentVersion
	}

	const updateNode = (underlay, update) => {
		const key = underlay.toString()
		const data = nodes.get(key)
		nodes.set(key, { ...data, ...update })
	}

	const doHandshake = async (underlay) => {
		const key = underlay.toString()
		const update = (object = {}) => {
			updateNode(underlay, { ...object, timestamp: Date.now() })
			queued.delete(key)
			addToQueue(key)
		}

		await sleep(getNextTimestamp(key) - Date.now())

		console.log(`Handshaking with ${underlay}`)

		try {
			await handshake.execute(underlay)
		} catch (err) {
			update({ error: err.code })
			return
		}

		try {
			update({
				userAgent: await getUserAgent(underlay),
				error: undefined,
			})
		} catch (err) {
			// Ignore
		}
	}

	const onNewPeers = async (peers) => {
		for (const peer of peers) {
			updateNode(peer.underlay, peer)
			addToQueue(peer.underlay)
		}
	}

	// Setup remaining protocols
	await protocols.hivePeers.create(node, onNewPeers)
	await protocols.pricing.create(node)

	// Seed crawler
	addToQueue(
		'/ip4/68.202.26.117/tcp/11649/p2p/16Uiu2HAmGcVwgGNEP5hAicfHXLujwj6EovbAFqZaREqMZKfwas1L'
	)

	// Add all previously crawled nodes in order of least recently crawled
	for (const underlay of nodes.keys()) {
		addToQueue(underlay)
	}

	console.log(`Nodes added to queue: ${queue.size}`)
	queue.start()

	// Write nodes to file roughly every second
	while (true) {
		await writeFile(NODES_PATH, JSON.stringify([...nodes], null, '\t'))
		await sleep(1000)
	}
})()
