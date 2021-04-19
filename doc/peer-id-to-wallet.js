// Using bee-js
const { Bee } = require("@ethersphere/bee-js");
const bee = new Bee("http://test");
const key = bee.resolveSigner(peerId.privKey.marshal());

// Using ethers
const { Wallet } = require("ethers");
const wallet = new Wallet(peerId.privKey.marshal());

// Get Ethereum address
const ethersAddress = await wallet.getAddress();
const beeAddress = "0x" + Buffer.from(key.address).toString("hex");
ethersAddress === beeAddress;

// Sign data
const data = Buffer.from([]);
const beeSignature = await key.sign(data);
const ethersSignature = Buffer.from(
  (await wallet.signMessage(data)).slice(2),
  "hex"
);
beeSignature === ethersSignature;
