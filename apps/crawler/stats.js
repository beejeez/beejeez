const path = require('path')
const { readFile } = require('fs/promises')

// Config
const NODES_PATH = path.join(__dirname, 'data/nodes.json')

// Script
;(async () => {
	let nodes
	do {
		try {
			const data = await readFile(NODES_PATH)
			nodes = new Map(JSON.parse(data))
		} catch (_) {
			// Ignore
		}
	} while (!nodes)

	// Gather some stats
	const errors = {}
	const userAgents = {}
	const stats = { pending: 0, userAgents: 0 }

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
	}

	console.log('Stats:')
	console.log(`- ${[...nodes].length} nodes`)
	console.log(`- ${stats.pending} pending`)
	console.log(`- ${stats.userAgents} user agents found`)
	console.log()

	console.log('Errors:')
	for (const [error, count] of Object.entries(errors)) {
		console.log(`- ${error}: ${count}`)
	}
	console.log()

	console.log('User agents:')
	for (const [userAgent, count] of Object.entries(userAgents)) {
		console.log(`- ${userAgent}: ${count}`)
	}
	console.log()
})()
