const { multiaddr } = require('multiaddr')
const { dnsaddrResolver } = require('multiaddr/src/resolvers')

const recursiveResolve = async (string) => {
	const addr = multiaddr(string)
	if (addr.protos()[0].name === 'dnsaddr') {
		const promises = (await dnsaddrResolver(addr)).map(recursiveResolve)
		return (await Promise.all(promises)).flat()
	}
	return addr
}

module.exports = { recursiveResolve }
