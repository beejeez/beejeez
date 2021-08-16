// Lib
const { formatProtocol, newStream } = require('../../lib/protocols')

// Proto
const { pricing } = require('./proto')
const { AnnouncePaymentThreshold } = pricing

// Protocol
const protocol = formatProtocol({
	name: 'pricing',
	version: '1.0.0',
	stream: 'pricing',
})

const create = async (node) => {
	node.handle(protocol, async ({ stream }) => {
		const { reader, writer } = await newStream(stream)
		const { value, done } = await reader.next()

		// Close write stream
		writer.end()

		if (done) {
			stream.reset()
			return
		}

		try {
			const { PaymentThreshold } = AnnouncePaymentThreshold.decode(value)
			console.log(`Got payment threshold:`, PaymentThreshold)

			// Close both sides
			writer.end()
			await stream.close()
		} catch (err) {
			console.error(err)

			// On failure, reset the stream
			await stream.reset()
			return
		}
	})

	return {
		stop: () => node.unhandle(protocol),
	}
}

module.exports = {
	create,
}
