// Lib
const { readStream } = require('../../lib/streams')

// Proto
const { identify } = require('./proto')
const { Identify } = identify.pb

// Protocol
const protocol = '/ipfs/id/1.0.0'

const create = async (node) => {
	const execute = async (targetAddress) => {
		const { stream } = await node.dialProtocol(targetAddress, protocol)
		const reader = await readStream(stream)

		const { value: rawIdentify } = await reader.next()
		return Identify.decode(rawIdentify)
	}

	return {
		execute,
	}
}

module.exports = {
	create,
}
