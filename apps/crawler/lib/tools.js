const isIterable = (obj) => {
	return obj && typeof obj[Symbol.iterator] === 'function'
}

module.exports = {
	isIterable,
}
