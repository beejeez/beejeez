// Proto
const { headers } = require('./proto')
const { Headers } = headers

const decode = async (raw) => {
	return Headers.decode(raw)
}

const encode = (headers) => {
	const data = Headers.create({ headers })
	return Headers.encode(data).finish()
}

module.exports = {
	encode,
	decode,
}
