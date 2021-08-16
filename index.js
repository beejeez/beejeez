const { getDefaultProvider } = require("ethers");

// Lib
const { createNode } = require("./lib/libp2p");

// Protocols
const protocols = {
  pricing: require("./protocols/pricing"),
  hivePeers: require("./protocols/hive-peers"),
  handshake: require("./protocols/handshake"),
};

(async () => {
  const provider = getDefaultProvider("http://srv02.apyos.com:8545");
  const node = await createNode();

  // Setup protocols
  await protocols.pricing.create(node);
  await protocols.hivePeers.create(node);
  const handshake = await protocols.handshake.create(node, provider);

  console.log("Current identity:", node.peerId.toB58String());

  await handshake.execute(
    "/ip4/188.165.225.183/tcp/1634/p2p/16Uiu2HAmLQjvNL17745Wkp25P3ouUWwhb5A8aoYpGHG3BMbMW6F3"
  );
})();
