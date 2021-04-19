const { writeFile } = require("fs/promises");
const PeerId = require("peer-id");

(async () => {
  const peerId = await PeerId.create({ keyType: "secp256k1" });
  await writeFile("peer-id.json", JSON.stringify(peerId.toJSON()));
})();
