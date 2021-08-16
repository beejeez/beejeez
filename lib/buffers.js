function hexToBuffer(string) {
	if (Buffer.isBuffer(string)) {
		return string
	}

	if (string.startsWith('0x')) {
		return Buffer.from(string.slice(2), 'hex')
	}

	return Buffer.from(string)
}

function bufferToHex(buffer) {
	return Buffer.isBuffer(buffer) ? '0x' + buffer.toString('hex') : buffer
}

module.exports = {
	hexToBuffer,
	bufferToHex,
}
