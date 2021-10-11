const path = require('path')
const { readFile, stat } = require('fs/promises')
const { multiaddr } = require('multiaddr')

// Lib
const { recursiveResolve } = require('./lib/multiaddr')

// Config
const NODES_PATH = path.join(__dirname, 'data/nodes.json')

// Functions
const sortCount = (object) => {
	return Object.entries(object).sort((a, b) => b[1] - a[1])
}

// Script
;(async () => {
	const start = Date.now()
	const { atime } = await stat(NODES_PATH)
	console.log(`Last update: ${(Date.now() - atime) / 1000}s ago`)

	let nodes
	do {
		try {
			const data = await readFile(NODES_PATH)
			nodes = new Map(JSON.parse(data))
		} catch (_) {
			// Ignore
		}
	} while (!nodes)

	console.log(`Processing time: ${(Date.now() - start) / 1000}s`)
	console.log()

	// Bootnodes
	const mainnet = multiaddr('/dnsaddr/mainnet.ethswarm.org')
	const bootnodeMas = await recursiveResolve(mainnet)
	const bootnodes = new Set(bootnodeMas.map((ma) => ma.toString()))

	// Gather some stats
	const errors = {}
	const userAgents = {}
	const stats = { pending: 0, userAgents: 0 }
	const bnUas = {}

	for (const node of nodes.values()) {
		if (node.error) {
			errors[node.error] = (errors[node.error] || 0) + 1
		}

		if (node.userAgent) {
			userAgents[node.userAgent] = (userAgents[node.userAgent] || 0) + 1
			stats.userAgents++
		}

		if (!node.error && !node.userAgent) {
			stats.pending++
		}

		if (bootnodes.has(node.underlay)) {
			if (node.userAgent) {
				bnUas[node.userAgent] = (bnUas[node.userAgent] || 0) + 1
			}
		}
	}

	console.log('Stats:')
	console.log(`- ${[...nodes].length} nodes`)
	console.log(`- ${stats.pending} pending`)
	console.log(`- ${stats.userAgents} user agents found`)
	console.log()

	console.log('Errors:')
	for (const [error, count] of sortCount(errors)) {
		console.log(`- ${error}: ${count}`)
	}
	console.log()

	console.log('User agents:')
	for (const [userAgent, count] of sortCount(userAgents)) {
		console.log(`- ${userAgent}: ${count}`)
	}
	console.log()

	console.log('Boot node user agents:')
	for (const [userAgent, count] of sortCount(bnUas)) {
		console.log(`- ${userAgent}: ${count}`)
	}
	console.log()
})()
