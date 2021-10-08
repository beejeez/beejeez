/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.identify = (function() {

    /**
     * Namespace identify.
     * @exports identify
     * @namespace
     */
    var identify = {};

    identify.pb = (function() {

        /**
         * Namespace pb.
         * @memberof identify
         * @namespace
         */
        var pb = {};

        pb.Delta = (function() {

            /**
             * Properties of a Delta.
             * @memberof identify.pb
             * @interface IDelta
             * @property {Array.<string>|null} [addedProtocols] Delta addedProtocols
             * @property {Array.<string>|null} [rmProtocols] Delta rmProtocols
             */

            /**
             * Constructs a new Delta.
             * @memberof identify.pb
             * @classdesc Represents a Delta.
             * @implements IDelta
             * @constructor
             * @param {identify.pb.IDelta=} [properties] Properties to set
             */
            function Delta(properties) {
                this.addedProtocols = [];
                this.rmProtocols = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Delta addedProtocols.
             * @member {Array.<string>} addedProtocols
             * @memberof identify.pb.Delta
             * @instance
             */
            Delta.prototype.addedProtocols = $util.emptyArray;

            /**
             * Delta rmProtocols.
             * @member {Array.<string>} rmProtocols
             * @memberof identify.pb.Delta
             * @instance
             */
            Delta.prototype.rmProtocols = $util.emptyArray;

            /**
             * Creates a new Delta instance using the specified properties.
             * @function create
             * @memberof identify.pb.Delta
             * @static
             * @param {identify.pb.IDelta=} [properties] Properties to set
             * @returns {identify.pb.Delta} Delta instance
             */
            Delta.create = function create(properties) {
                return new Delta(properties);
            };

            /**
             * Encodes the specified Delta message. Does not implicitly {@link identify.pb.Delta.verify|verify} messages.
             * @function encode
             * @memberof identify.pb.Delta
             * @static
             * @param {identify.pb.IDelta} message Delta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Delta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.addedProtocols != null && message.addedProtocols.length)
                    for (var i = 0; i < message.addedProtocols.length; ++i)
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.addedProtocols[i]);
                if (message.rmProtocols != null && message.rmProtocols.length)
                    for (var i = 0; i < message.rmProtocols.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.rmProtocols[i]);
                return writer;
            };

            /**
             * Encodes the specified Delta message, length delimited. Does not implicitly {@link identify.pb.Delta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof identify.pb.Delta
             * @static
             * @param {identify.pb.IDelta} message Delta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Delta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Delta message from the specified reader or buffer.
             * @function decode
             * @memberof identify.pb.Delta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {identify.pb.Delta} Delta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Delta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.identify.pb.Delta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.addedProtocols && message.addedProtocols.length))
                            message.addedProtocols = [];
                        message.addedProtocols.push(reader.string());
                        break;
                    case 2:
                        if (!(message.rmProtocols && message.rmProtocols.length))
                            message.rmProtocols = [];
                        message.rmProtocols.push(reader.string());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Delta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof identify.pb.Delta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {identify.pb.Delta} Delta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Delta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Delta message.
             * @function verify
             * @memberof identify.pb.Delta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Delta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.addedProtocols != null && message.hasOwnProperty("addedProtocols")) {
                    if (!Array.isArray(message.addedProtocols))
                        return "addedProtocols: array expected";
                    for (var i = 0; i < message.addedProtocols.length; ++i)
                        if (!$util.isString(message.addedProtocols[i]))
                            return "addedProtocols: string[] expected";
                }
                if (message.rmProtocols != null && message.hasOwnProperty("rmProtocols")) {
                    if (!Array.isArray(message.rmProtocols))
                        return "rmProtocols: array expected";
                    for (var i = 0; i < message.rmProtocols.length; ++i)
                        if (!$util.isString(message.rmProtocols[i]))
                            return "rmProtocols: string[] expected";
                }
                return null;
            };

            /**
             * Creates a Delta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof identify.pb.Delta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {identify.pb.Delta} Delta
             */
            Delta.fromObject = function fromObject(object) {
                if (object instanceof $root.identify.pb.Delta)
                    return object;
                var message = new $root.identify.pb.Delta();
                if (object.addedProtocols) {
                    if (!Array.isArray(object.addedProtocols))
                        throw TypeError(".identify.pb.Delta.addedProtocols: array expected");
                    message.addedProtocols = [];
                    for (var i = 0; i < object.addedProtocols.length; ++i)
                        message.addedProtocols[i] = String(object.addedProtocols[i]);
                }
                if (object.rmProtocols) {
                    if (!Array.isArray(object.rmProtocols))
                        throw TypeError(".identify.pb.Delta.rmProtocols: array expected");
                    message.rmProtocols = [];
                    for (var i = 0; i < object.rmProtocols.length; ++i)
                        message.rmProtocols[i] = String(object.rmProtocols[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a Delta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof identify.pb.Delta
             * @static
             * @param {identify.pb.Delta} message Delta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Delta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.addedProtocols = [];
                    object.rmProtocols = [];
                }
                if (message.addedProtocols && message.addedProtocols.length) {
                    object.addedProtocols = [];
                    for (var j = 0; j < message.addedProtocols.length; ++j)
                        object.addedProtocols[j] = message.addedProtocols[j];
                }
                if (message.rmProtocols && message.rmProtocols.length) {
                    object.rmProtocols = [];
                    for (var j = 0; j < message.rmProtocols.length; ++j)
                        object.rmProtocols[j] = message.rmProtocols[j];
                }
                return object;
            };

            /**
             * Converts this Delta to JSON.
             * @function toJSON
             * @memberof identify.pb.Delta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Delta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Delta;
        })();

        pb.Identify = (function() {

            /**
             * Properties of an Identify.
             * @memberof identify.pb
             * @interface IIdentify
             * @property {string|null} [protocolVersion] Identify protocolVersion
             * @property {string|null} [agentVersion] Identify agentVersion
             * @property {Uint8Array|null} [publicKey] Identify publicKey
             * @property {Array.<Uint8Array>|null} [listenAddrs] Identify listenAddrs
             * @property {Uint8Array|null} [observedAddr] Identify observedAddr
             * @property {Array.<string>|null} [protocols] Identify protocols
             * @property {identify.pb.IDelta|null} [delta] Identify delta
             * @property {Uint8Array|null} [signedPeerRecord] Identify signedPeerRecord
             */

            /**
             * Constructs a new Identify.
             * @memberof identify.pb
             * @classdesc Represents an Identify.
             * @implements IIdentify
             * @constructor
             * @param {identify.pb.IIdentify=} [properties] Properties to set
             */
            function Identify(properties) {
                this.listenAddrs = [];
                this.protocols = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Identify protocolVersion.
             * @member {string} protocolVersion
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.protocolVersion = "";

            /**
             * Identify agentVersion.
             * @member {string} agentVersion
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.agentVersion = "";

            /**
             * Identify publicKey.
             * @member {Uint8Array} publicKey
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.publicKey = $util.newBuffer([]);

            /**
             * Identify listenAddrs.
             * @member {Array.<Uint8Array>} listenAddrs
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.listenAddrs = $util.emptyArray;

            /**
             * Identify observedAddr.
             * @member {Uint8Array} observedAddr
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.observedAddr = $util.newBuffer([]);

            /**
             * Identify protocols.
             * @member {Array.<string>} protocols
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.protocols = $util.emptyArray;

            /**
             * Identify delta.
             * @member {identify.pb.IDelta|null|undefined} delta
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.delta = null;

            /**
             * Identify signedPeerRecord.
             * @member {Uint8Array} signedPeerRecord
             * @memberof identify.pb.Identify
             * @instance
             */
            Identify.prototype.signedPeerRecord = $util.newBuffer([]);

            /**
             * Creates a new Identify instance using the specified properties.
             * @function create
             * @memberof identify.pb.Identify
             * @static
             * @param {identify.pb.IIdentify=} [properties] Properties to set
             * @returns {identify.pb.Identify} Identify instance
             */
            Identify.create = function create(properties) {
                return new Identify(properties);
            };

            /**
             * Encodes the specified Identify message. Does not implicitly {@link identify.pb.Identify.verify|verify} messages.
             * @function encode
             * @memberof identify.pb.Identify
             * @static
             * @param {identify.pb.IIdentify} message Identify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Identify.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
                if (message.listenAddrs != null && message.listenAddrs.length)
                    for (var i = 0; i < message.listenAddrs.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.listenAddrs[i]);
                if (message.protocols != null && message.protocols.length)
                    for (var i = 0; i < message.protocols.length; ++i)
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.protocols[i]);
                if (message.observedAddr != null && Object.hasOwnProperty.call(message, "observedAddr"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.observedAddr);
                if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.protocolVersion);
                if (message.agentVersion != null && Object.hasOwnProperty.call(message, "agentVersion"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.agentVersion);
                if (message.delta != null && Object.hasOwnProperty.call(message, "delta"))
                    $root.identify.pb.Delta.encode(message.delta, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.signedPeerRecord != null && Object.hasOwnProperty.call(message, "signedPeerRecord"))
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.signedPeerRecord);
                return writer;
            };

            /**
             * Encodes the specified Identify message, length delimited. Does not implicitly {@link identify.pb.Identify.verify|verify} messages.
             * @function encodeDelimited
             * @memberof identify.pb.Identify
             * @static
             * @param {identify.pb.IIdentify} message Identify message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Identify.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Identify message from the specified reader or buffer.
             * @function decode
             * @memberof identify.pb.Identify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {identify.pb.Identify} Identify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Identify.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.identify.pb.Identify();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 5:
                        message.protocolVersion = reader.string();
                        break;
                    case 6:
                        message.agentVersion = reader.string();
                        break;
                    case 1:
                        message.publicKey = reader.bytes();
                        break;
                    case 2:
                        if (!(message.listenAddrs && message.listenAddrs.length))
                            message.listenAddrs = [];
                        message.listenAddrs.push(reader.bytes());
                        break;
                    case 4:
                        message.observedAddr = reader.bytes();
                        break;
                    case 3:
                        if (!(message.protocols && message.protocols.length))
                            message.protocols = [];
                        message.protocols.push(reader.string());
                        break;
                    case 7:
                        message.delta = $root.identify.pb.Delta.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.signedPeerRecord = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Identify message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof identify.pb.Identify
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {identify.pb.Identify} Identify
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Identify.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Identify message.
             * @function verify
             * @memberof identify.pb.Identify
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Identify.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    if (!$util.isString(message.protocolVersion))
                        return "protocolVersion: string expected";
                if (message.agentVersion != null && message.hasOwnProperty("agentVersion"))
                    if (!$util.isString(message.agentVersion))
                        return "agentVersion: string expected";
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                if (message.listenAddrs != null && message.hasOwnProperty("listenAddrs")) {
                    if (!Array.isArray(message.listenAddrs))
                        return "listenAddrs: array expected";
                    for (var i = 0; i < message.listenAddrs.length; ++i)
                        if (!(message.listenAddrs[i] && typeof message.listenAddrs[i].length === "number" || $util.isString(message.listenAddrs[i])))
                            return "listenAddrs: buffer[] expected";
                }
                if (message.observedAddr != null && message.hasOwnProperty("observedAddr"))
                    if (!(message.observedAddr && typeof message.observedAddr.length === "number" || $util.isString(message.observedAddr)))
                        return "observedAddr: buffer expected";
                if (message.protocols != null && message.hasOwnProperty("protocols")) {
                    if (!Array.isArray(message.protocols))
                        return "protocols: array expected";
                    for (var i = 0; i < message.protocols.length; ++i)
                        if (!$util.isString(message.protocols[i]))
                            return "protocols: string[] expected";
                }
                if (message.delta != null && message.hasOwnProperty("delta")) {
                    var error = $root.identify.pb.Delta.verify(message.delta);
                    if (error)
                        return "delta." + error;
                }
                if (message.signedPeerRecord != null && message.hasOwnProperty("signedPeerRecord"))
                    if (!(message.signedPeerRecord && typeof message.signedPeerRecord.length === "number" || $util.isString(message.signedPeerRecord)))
                        return "signedPeerRecord: buffer expected";
                return null;
            };

            /**
             * Creates an Identify message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof identify.pb.Identify
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {identify.pb.Identify} Identify
             */
            Identify.fromObject = function fromObject(object) {
                if (object instanceof $root.identify.pb.Identify)
                    return object;
                var message = new $root.identify.pb.Identify();
                if (object.protocolVersion != null)
                    message.protocolVersion = String(object.protocolVersion);
                if (object.agentVersion != null)
                    message.agentVersion = String(object.agentVersion);
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length)
                        message.publicKey = object.publicKey;
                if (object.listenAddrs) {
                    if (!Array.isArray(object.listenAddrs))
                        throw TypeError(".identify.pb.Identify.listenAddrs: array expected");
                    message.listenAddrs = [];
                    for (var i = 0; i < object.listenAddrs.length; ++i)
                        if (typeof object.listenAddrs[i] === "string")
                            $util.base64.decode(object.listenAddrs[i], message.listenAddrs[i] = $util.newBuffer($util.base64.length(object.listenAddrs[i])), 0);
                        else if (object.listenAddrs[i].length)
                            message.listenAddrs[i] = object.listenAddrs[i];
                }
                if (object.observedAddr != null)
                    if (typeof object.observedAddr === "string")
                        $util.base64.decode(object.observedAddr, message.observedAddr = $util.newBuffer($util.base64.length(object.observedAddr)), 0);
                    else if (object.observedAddr.length)
                        message.observedAddr = object.observedAddr;
                if (object.protocols) {
                    if (!Array.isArray(object.protocols))
                        throw TypeError(".identify.pb.Identify.protocols: array expected");
                    message.protocols = [];
                    for (var i = 0; i < object.protocols.length; ++i)
                        message.protocols[i] = String(object.protocols[i]);
                }
                if (object.delta != null) {
                    if (typeof object.delta !== "object")
                        throw TypeError(".identify.pb.Identify.delta: object expected");
                    message.delta = $root.identify.pb.Delta.fromObject(object.delta);
                }
                if (object.signedPeerRecord != null)
                    if (typeof object.signedPeerRecord === "string")
                        $util.base64.decode(object.signedPeerRecord, message.signedPeerRecord = $util.newBuffer($util.base64.length(object.signedPeerRecord)), 0);
                    else if (object.signedPeerRecord.length)
                        message.signedPeerRecord = object.signedPeerRecord;
                return message;
            };

            /**
             * Creates a plain object from an Identify message. Also converts values to other types if specified.
             * @function toObject
             * @memberof identify.pb.Identify
             * @static
             * @param {identify.pb.Identify} message Identify
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Identify.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.listenAddrs = [];
                    object.protocols = [];
                }
                if (options.defaults) {
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    if (options.bytes === String)
                        object.observedAddr = "";
                    else {
                        object.observedAddr = [];
                        if (options.bytes !== Array)
                            object.observedAddr = $util.newBuffer(object.observedAddr);
                    }
                    object.protocolVersion = "";
                    object.agentVersion = "";
                    object.delta = null;
                    if (options.bytes === String)
                        object.signedPeerRecord = "";
                    else {
                        object.signedPeerRecord = [];
                        if (options.bytes !== Array)
                            object.signedPeerRecord = $util.newBuffer(object.signedPeerRecord);
                    }
                }
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.listenAddrs && message.listenAddrs.length) {
                    object.listenAddrs = [];
                    for (var j = 0; j < message.listenAddrs.length; ++j)
                        object.listenAddrs[j] = options.bytes === String ? $util.base64.encode(message.listenAddrs[j], 0, message.listenAddrs[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.listenAddrs[j]) : message.listenAddrs[j];
                }
                if (message.protocols && message.protocols.length) {
                    object.protocols = [];
                    for (var j = 0; j < message.protocols.length; ++j)
                        object.protocols[j] = message.protocols[j];
                }
                if (message.observedAddr != null && message.hasOwnProperty("observedAddr"))
                    object.observedAddr = options.bytes === String ? $util.base64.encode(message.observedAddr, 0, message.observedAddr.length) : options.bytes === Array ? Array.prototype.slice.call(message.observedAddr) : message.observedAddr;
                if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                    object.protocolVersion = message.protocolVersion;
                if (message.agentVersion != null && message.hasOwnProperty("agentVersion"))
                    object.agentVersion = message.agentVersion;
                if (message.delta != null && message.hasOwnProperty("delta"))
                    object.delta = $root.identify.pb.Delta.toObject(message.delta, options);
                if (message.signedPeerRecord != null && message.hasOwnProperty("signedPeerRecord"))
                    object.signedPeerRecord = options.bytes === String ? $util.base64.encode(message.signedPeerRecord, 0, message.signedPeerRecord.length) : options.bytes === Array ? Array.prototype.slice.call(message.signedPeerRecord) : message.signedPeerRecord;
                return object;
            };

            /**
             * Converts this Identify to JSON.
             * @function toJSON
             * @memberof identify.pb.Identify
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Identify.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Identify;
        })();

        return pb;
    })();

    return identify;
})();

module.exports = $root;
