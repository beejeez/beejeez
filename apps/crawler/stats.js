const path = require('path')
const { readFile } = require('fs/promises')

// Config
const NODES_PATH = path.join(__dirname, 'data/nodes.json')

// Script
;(async () => {
	const data = await readFile(NODES_PATH)
	const nodes = new Map(JSON.parse(data))

	// Gather some stats
	const errors = {}
	const userAgents = {}
	let pending = 0

	for (const node of nodes.values()) {
		if (node.error) {
			errors[node.error] = (errors[node.error] || 0) + 1
		}

		if (node.userAgent) {
			userAgents[node.userAgent] = (userAgents[node.userAgent] || 0) + 1
		}

		if (!node.error && !node.userAgent) {
			pending++
		}
	}

	console.log('Stats:')
	console.log(`- ${[...nodes].length} nodes`)
	console.log(`- ${pending} pending`)
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
