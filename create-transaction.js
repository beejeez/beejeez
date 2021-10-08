const PeerId = require('peer-id')
const { readFile } = require('fs/promises')
const { getDefaultProvider, Wallet } = require('ethers')

;(async () => {
	const peerId = await PeerId.createFromJSON(
		JSON.parse(await readFile('peer-id.json'))
	)

	const provider = getDefaultProvider('https://rpc.xdaichain.com/')
	const wallet = new Wallet(peerId.privKey.marshal(), provider)

	console.log(`Sending transaction from account ${wallet.address}`)

	const tx = await wallet.sendTransaction({
		to: wallet.address,
		value: 0,
		gasLimit: 21000,
		type: 0, // Bee doesn't support EIP-1559 transactions yet
	})
	console.log(tx)
	console.log(await tx.wait())
})()
