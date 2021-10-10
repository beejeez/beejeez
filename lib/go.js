const path = require('path')
const { execFile } = require('child_process')
const { collect } = require('streaming-iterables')

const getBuggyHash = async (blockNumber) => {
	const { stdout } = execFile('./buggy-hash', [blockNumber], {
		cwd: path.resolve(__dirname, '../go'),
	})
	const [hash] = await collect(stdout)
	return '0x' + hash
}

module.exports = {
	getBuggyHash,
}
