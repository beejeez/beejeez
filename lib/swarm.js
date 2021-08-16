const { SHA3 } = require("sha3");

// Lib
const { hexToBuffer } = require("./buffers");

// TODO: Make this configurable
const config = {
  networkId: 10n,
};

function getNetworkIdBufferBE() {
  const networkId = Buffer.allocUnsafe(8);
  networkId.writeBigUInt64BE(config.networkId, 0);
  return networkId;
}

function getNetworkIdBufferLE() {
  const networkId = Buffer.allocUnsafe(8);
  networkId.writeBigUInt64LE(config.networkId, 0);
  return networkId;
}

async function getOverlay(address, nextBlockHash) {
  const blockHash = hexToBuffer(nextBlockHash);
  const buffer = Buffer.concat([address, getNetworkIdBufferLE(), blockHash]);
  return new SHA3(256).update(buffer).digest();
}

module.exports = {
  getNetworkIdBufferBE,
  getNetworkIdBufferLE,
  getOverlay,
};
