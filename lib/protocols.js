const Headers = require('./headers')
const { readStream, writeStream } = require('./streams')

function formatProtocol({ name, version, stream }) {
	return ['/swarm', name, version, stream].join('/')
}

async function newStream(stream, headers = []) {
	const reader = await readStream(stream)
	const writer = await writeStream(stream)
	const { value } = await reader.next()

	// TODO: Implement tracing stuff
	// https://github.com/ethersphere/bee/blob/db09d74b759de443526e2ec806af90f6e688078c/pkg/tracing/tracing.go#L124-L133
	const encode = Headers.encode([
		...headers,
		{ key: 'tracing-span-context', value: Buffer.from([]) },
	])
	writer.write(encode)

	return {
		reader,
		writer,
		headers: await Headers.decode(value),
	}
}

module.exports = {
	formatProtocol,
	newStream,
}
