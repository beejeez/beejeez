/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.hive = (function() {

    /**
     * Namespace hive.
     * @exports hive
     * @namespace
     */
    var hive = {};

    hive.Peers = (function() {

        /**
         * Properties of a Peers.
         * @memberof hive
         * @interface IPeers
         * @property {Array.<hive.IBzzAddress>|null} [peers] Peers peers
         */

        /**
         * Constructs a new Peers.
         * @memberof hive
         * @classdesc Represents a Peers.
         * @implements IPeers
         * @constructor
         * @param {hive.IPeers=} [properties] Properties to set
         */
        function Peers(properties) {
            this.peers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Peers peers.
         * @member {Array.<hive.IBzzAddress>} peers
         * @memberof hive.Peers
         * @instance
         */
        Peers.prototype.peers = $util.emptyArray;

        /**
         * Creates a new Peers instance using the specified properties.
         * @function create
         * @memberof hive.Peers
         * @static
         * @param {hive.IPeers=} [properties] Properties to set
         * @returns {hive.Peers} Peers instance
         */
        Peers.create = function create(properties) {
            return new Peers(properties);
        };

        /**
         * Encodes the specified Peers message. Does not implicitly {@link hive.Peers.verify|verify} messages.
         * @function encode
         * @memberof hive.Peers
         * @static
         * @param {hive.IPeers} message Peers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Peers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.peers != null && message.peers.length)
                for (var i = 0; i < message.peers.length; ++i)
                    $root.hive.BzzAddress.encode(message.peers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Peers message, length delimited. Does not implicitly {@link hive.Peers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hive.Peers
         * @static
         * @param {hive.IPeers} message Peers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Peers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Peers message from the specified reader or buffer.
         * @function decode
         * @memberof hive.Peers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hive.Peers} Peers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Peers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hive.Peers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.peers && message.peers.length))
                        message.peers = [];
                    message.peers.push($root.hive.BzzAddress.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Peers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hive.Peers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hive.Peers} Peers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Peers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Peers message.
         * @function verify
         * @memberof hive.Peers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Peers.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.peers != null && message.hasOwnProperty("peers")) {
                if (!Array.isArray(message.peers))
                    return "peers: array expected";
                for (var i = 0; i < message.peers.length; ++i) {
                    var error = $root.hive.BzzAddress.verify(message.peers[i]);
                    if (error)
                        return "peers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Peers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hive.Peers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hive.Peers} Peers
         */
        Peers.fromObject = function fromObject(object) {
            if (object instanceof $root.hive.Peers)
                return object;
            var message = new $root.hive.Peers();
            if (object.peers) {
                if (!Array.isArray(object.peers))
                    throw TypeError(".hive.Peers.peers: array expected");
                message.peers = [];
                for (var i = 0; i < object.peers.length; ++i) {
                    if (typeof object.peers[i] !== "object")
                        throw TypeError(".hive.Peers.peers: object expected");
                    message.peers[i] = $root.hive.BzzAddress.fromObject(object.peers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Peers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hive.Peers
         * @static
         * @param {hive.Peers} message Peers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Peers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.peers = [];
            if (message.peers && message.peers.length) {
                object.peers = [];
                for (var j = 0; j < message.peers.length; ++j)
                    object.peers[j] = $root.hive.BzzAddress.toObject(message.peers[j], options);
            }
            return object;
        };

        /**
         * Converts this Peers to JSON.
         * @function toJSON
         * @memberof hive.Peers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Peers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Peers;
    })();

    hive.BzzAddress = (function() {

        /**
         * Properties of a BzzAddress.
         * @memberof hive
         * @interface IBzzAddress
         * @property {Uint8Array|null} [Underlay] BzzAddress Underlay
         * @property {Uint8Array|null} [Signature] BzzAddress Signature
         * @property {Uint8Array|null} [Overlay] BzzAddress Overlay
         * @property {Uint8Array|null} [Transaction] BzzAddress Transaction
         */

        /**
         * Constructs a new BzzAddress.
         * @memberof hive
         * @classdesc Represents a BzzAddress.
         * @implements IBzzAddress
         * @constructor
         * @param {hive.IBzzAddress=} [properties] Properties to set
         */
        function BzzAddress(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BzzAddress Underlay.
         * @member {Uint8Array} Underlay
         * @memberof hive.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Underlay = $util.newBuffer([]);

        /**
         * BzzAddress Signature.
         * @member {Uint8Array} Signature
         * @memberof hive.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Signature = $util.newBuffer([]);

        /**
         * BzzAddress Overlay.
         * @member {Uint8Array} Overlay
         * @memberof hive.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Overlay = $util.newBuffer([]);

        /**
         * BzzAddress Transaction.
         * @member {Uint8Array} Transaction
         * @memberof hive.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Transaction = $util.newBuffer([]);

        /**
         * Creates a new BzzAddress instance using the specified properties.
         * @function create
         * @memberof hive.BzzAddress
         * @static
         * @param {hive.IBzzAddress=} [properties] Properties to set
         * @returns {hive.BzzAddress} BzzAddress instance
         */
        BzzAddress.create = function create(properties) {
            return new BzzAddress(properties);
        };

        /**
         * Encodes the specified BzzAddress message. Does not implicitly {@link hive.BzzAddress.verify|verify} messages.
         * @function encode
         * @memberof hive.BzzAddress
         * @static
         * @param {hive.IBzzAddress} message BzzAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BzzAddress.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Underlay != null && Object.hasOwnProperty.call(message, "Underlay"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.Underlay);
            if (message.Signature != null && Object.hasOwnProperty.call(message, "Signature"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.Signature);
            if (message.Overlay != null && Object.hasOwnProperty.call(message, "Overlay"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.Overlay);
            if (message.Transaction != null && Object.hasOwnProperty.call(message, "Transaction"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.Transaction);
            return writer;
        };

        /**
         * Encodes the specified BzzAddress message, length delimited. Does not implicitly {@link hive.BzzAddress.verify|verify} messages.
         * @function encodeDelimited
         * @memberof hive.BzzAddress
         * @static
         * @param {hive.IBzzAddress} message BzzAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BzzAddress.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BzzAddress message from the specified reader or buffer.
         * @function decode
         * @memberof hive.BzzAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hive.BzzAddress} BzzAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BzzAddress.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hive.BzzAddress();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Underlay = reader.bytes();
                    break;
                case 2:
                    message.Signature = reader.bytes();
                    break;
                case 3:
                    message.Overlay = reader.bytes();
                    break;
                case 4:
                    message.Transaction = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BzzAddress message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof hive.BzzAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hive.BzzAddress} BzzAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BzzAddress.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BzzAddress message.
         * @function verify
         * @memberof hive.BzzAddress
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BzzAddress.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Underlay != null && message.hasOwnProperty("Underlay"))
                if (!(message.Underlay && typeof message.Underlay.length === "number" || $util.isString(message.Underlay)))
                    return "Underlay: buffer expected";
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                if (!(message.Signature && typeof message.Signature.length === "number" || $util.isString(message.Signature)))
                    return "Signature: buffer expected";
            if (message.Overlay != null && message.hasOwnProperty("Overlay"))
                if (!(message.Overlay && typeof message.Overlay.length === "number" || $util.isString(message.Overlay)))
                    return "Overlay: buffer expected";
            if (message.Transaction != null && message.hasOwnProperty("Transaction"))
                if (!(message.Transaction && typeof message.Transaction.length === "number" || $util.isString(message.Transaction)))
                    return "Transaction: buffer expected";
            return null;
        };

        /**
         * Creates a BzzAddress message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof hive.BzzAddress
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {hive.BzzAddress} BzzAddress
         */
        BzzAddress.fromObject = function fromObject(object) {
            if (object instanceof $root.hive.BzzAddress)
                return object;
            var message = new $root.hive.BzzAddress();
            if (object.Underlay != null)
                if (typeof object.Underlay === "string")
                    $util.base64.decode(object.Underlay, message.Underlay = $util.newBuffer($util.base64.length(object.Underlay)), 0);
                else if (object.Underlay.length)
                    message.Underlay = object.Underlay;
            if (object.Signature != null)
                if (typeof object.Signature === "string")
                    $util.base64.decode(object.Signature, message.Signature = $util.newBuffer($util.base64.length(object.Signature)), 0);
                else if (object.Signature.length)
                    message.Signature = object.Signature;
            if (object.Overlay != null)
                if (typeof object.Overlay === "string")
                    $util.base64.decode(object.Overlay, message.Overlay = $util.newBuffer($util.base64.length(object.Overlay)), 0);
                else if (object.Overlay.length)
                    message.Overlay = object.Overlay;
            if (object.Transaction != null)
                if (typeof object.Transaction === "string")
                    $util.base64.decode(object.Transaction, message.Transaction = $util.newBuffer($util.base64.length(object.Transaction)), 0);
                else if (object.Transaction.length)
                    message.Transaction = object.Transaction;
            return message;
        };

        /**
         * Creates a plain object from a BzzAddress message. Also converts values to other types if specified.
         * @function toObject
         * @memberof hive.BzzAddress
         * @static
         * @param {hive.BzzAddress} message BzzAddress
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BzzAddress.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.Underlay = "";
                else {
                    object.Underlay = [];
                    if (options.bytes !== Array)
                        object.Underlay = $util.newBuffer(object.Underlay);
                }
                if (options.bytes === String)
                    object.Signature = "";
                else {
                    object.Signature = [];
                    if (options.bytes !== Array)
                        object.Signature = $util.newBuffer(object.Signature);
                }
                if (options.bytes === String)
                    object.Overlay = "";
                else {
                    object.Overlay = [];
                    if (options.bytes !== Array)
                        object.Overlay = $util.newBuffer(object.Overlay);
                }
                if (options.bytes === String)
                    object.Transaction = "";
                else {
                    object.Transaction = [];
                    if (options.bytes !== Array)
                        object.Transaction = $util.newBuffer(object.Transaction);
                }
            }
            if (message.Underlay != null && message.hasOwnProperty("Underlay"))
                object.Underlay = options.bytes === String ? $util.base64.encode(message.Underlay, 0, message.Underlay.length) : options.bytes === Array ? Array.prototype.slice.call(message.Underlay) : message.Underlay;
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                object.Signature = options.bytes === String ? $util.base64.encode(message.Signature, 0, message.Signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.Signature) : message.Signature;
            if (message.Overlay != null && message.hasOwnProperty("Overlay"))
                object.Overlay = options.bytes === String ? $util.base64.encode(message.Overlay, 0, message.Overlay.length) : options.bytes === Array ? Array.prototype.slice.call(message.Overlay) : message.Overlay;
            if (message.Transaction != null && message.hasOwnProperty("Transaction"))
                object.Transaction = options.bytes === String ? $util.base64.encode(message.Transaction, 0, message.Transaction.length) : options.bytes === Array ? Array.prototype.slice.call(message.Transaction) : message.Transaction;
            return object;
        };

        /**
         * Converts this BzzAddress to JSON.
         * @function toJSON
         * @memberof hive.BzzAddress
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BzzAddress.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BzzAddress;
    })();

    return hive;
})();

module.exports = $root;
