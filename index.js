const { readFile } = require("fs/promises");
const { PassThrough } = require("stream");
const { load } = require("protobufjs");

const Libp2p = require("libp2p");
const TCP = require("libp2p-tcp");
const { NOISE } = require("libp2p-noise");
const MPLEX = require("libp2p-mplex");

const PeerId = require("peer-id");
const { multiaddr } = require("multiaddr");

const pipe = require("it-pipe");
const lp = require("it-length-prefixed");
const { map } = require("streaming-iterables");

const { Bee } = require("@ethersphere/bee-js");
const bee = new Bee("http://test");

const { SHA3 } = require("sha3");

const protocols = {
  handshake: {
    protocol: "handshake",
    version: "2.0.0",
    stream: "handshake",
  },
  pricing: {
    protocol: "pricing",
    version: "1.0.0",
    stream: "pricing",
  },
  hivePeers: {
    protocol: "hive",
    version: "1.0.0",
    stream: "peers",
  },
};

function formatProtocol(name) {
  const { protocol, version, stream } = protocols[name];
  return ["/swarm", protocol, version, stream].join("/");
}

function writeStream(stream) {
  const writer = new PassThrough();
  pipe(writer, lp.encode(), stream.sink);
  return writer;
}

function readStream(stream) {
  return pipe(
    stream.source,
    lp.decode(),
    map((msg) => msg.slice())
  );
}

// gateway.swerm.xyz
const targetAddress =
  "/ip4/188.165.225.183/tcp/1634/p2p/16Uiu2HAmLQjvNL17745Wkp25P3ouUWwhb5A8aoYpGHG3BMbMW6F3";

(async () => {
  const peerId = await PeerId.createFromJSON(
    JSON.parse(await readFile("peer-id.json"))
  );
  const listenAddress = multiaddr(
    `/ip4/127.0.0.1/tcp/1634/p2p/${peerId.toB58String()}`
  );
  const config = {
    networkId: 1n,
    light: false,
    welcomeMessage: "This is a test",
  };
  const key = bee.resolveSigner(peerId.privKey.marshal());

  const handshake = await load("handshake.proto");
  const { Syn, SynAck, Ack, BzzAddress } = handshake.nested.handshake;

  async function getOverlay() {
    const buffer = Buffer.concat([key.address, getNetworkIdBufferLE()]);
    return new SHA3(256).update(buffer).digest();
  }

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

  function generateSignData(underlay, overlay) {
    return Buffer.concat([
      Buffer.from("bee-handshake-"),
      underlay,
      overlay,
      getNetworkIdBufferBE(),
    ]);
  }

  function createSyn() {
    const sync = Syn.create({
      ObservedUnderlay: listenAddress.bytes,
    });
    return Syn.encode(sync).finish();
  }

  async function createAck(listenAddress, peerId) {
    const data = generateSignData(listenAddress.bytes, await getOverlay());
    const signature = await key.sign(data);

    const address = BzzAddress.create({
      Underlay: listenAddress.bytes,
      Overlay: await getOverlay(peerId),
      Signature: signature,
    });

    const ack = Ack.create({
      Address: address,
      NetworkID: config.networkId.toString(),
      Light: config.light,
      WelcomeMessage: config.welcomeMessage,
    });

    return Ack.encode(ack).finish();
  }

  const node = await Libp2p.create({
    modules: {
      transport: [TCP],
      connEncryption: [NOISE],
      streamMuxer: [MPLEX],
    },
    peerId,
  });

  const handler = ({ stream, protocol }) => {
    console.log(`Got ${protocol} stream -> handshake worked`);
    stream.close();
  };

  node.handle(formatProtocol("pricing"), handler);
  node.handle(formatProtocol("hivePeers"), handler);

  console.log("Current identity:", node.peerId.toB58String());

  const protocol = formatProtocol("handshake");
  const connection = await node.dialProtocol(targetAddress, protocol);
  const { stream } = connection;

  const writer = await writeStream(stream);
  const reader = await readStream(stream);

  await writer.write(createSyn());

  const { value: rawSynAck } = await reader.next();
  const synAck = SynAck.decode(rawSynAck);

  console.log(synAck);

  const ack = await createAck(listenAddress, peerId);
  writer.write(ack);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // The read stream should already be closed by the peer
  stream.closeWrite();

  console.log(stream.timeline);
})();
