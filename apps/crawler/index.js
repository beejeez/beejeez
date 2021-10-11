const { readFile, writeFile } = require('fs/promises')
const { getDefaultProvider, Wallet } = require('ethers')
const path = require('path')
const pDefer = require('p-defer')

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
	// Graceful shutdown
	let shutdown = false
	const shutdownPromise = pDefer()

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
	const queue = new PQueue({ concurrency: 500, autoStart: false })
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

		try {
			await Promise.race([
				sleep(getNextTimestamp(key) - Date.now()),
				shutdownPromise.promise,
			])
		} catch (_) {
			// NOTE: Only happens when the shutdown promise rejects
			return
		}

		console.log(`Handshaking with ${underlay}`)

		try {
			await handshake.execute(underlay)
		} catch ({ code, err }) {
			update({ error: err?.code ? `${code}_${err.code}` : code })
			return
		}

		try {
			update({
				userAgent: await getUserAgent(underlay),
				error: undefined,
			})
		} catch (err) {
			update({ error: undefined })
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
		'/ip4/3.122.235.6/tcp/31101/p2p/16Uiu2HAm2JDZfnHHi8aRQCGDWnQxyE2vKTMTFnyGvkLQwnb39Q9x'
	)

	// Add all previously crawled nodes in order of least recently crawled
	for (const underlay of nodes.keys()) {
		addToQueue(underlay)
	}

	console.log(`Nodes added to queue: ${queue.size}`)
	queue.start()

	// Graceful shutdown
	const onQueueDone = async () => {
		if (!queue.pending) {
			return
		}

		return new Promise((resolve) => {
			queue.on('next', () => {
				if (!queue.pending) {
					resolve()
				}
			})
		})
	}

	const gracefulShutdown = async () => {
		queue.pause()
		shutdownPromise.reject()
		await onQueueDone()
		shutdown = true
	}

	process.on('SIGINT', gracefulShutdown)
	process.on('SIGTERM', gracefulShutdown)

	const trySave = async () => {
		try {
			await writeFile(NODES_PATH, JSON.stringify([...nodes]))
		} catch (err) {
			console.error(err)
		}
	}

	// Write nodes to file roughly every 5 seconds
	while (!shutdown) {
		await trySave()

		try {
			await Promise.race([sleep(5000), shutdownPromise.promise])
		} catch (_) {
			break
		}
	}

	// Save data one last time
	await trySave()
	process.exit(0)
})()
