/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.handshake = (function() {

    /**
     * Namespace handshake.
     * @exports handshake
     * @namespace
     */
    var handshake = {};

    handshake.Syn = (function() {

        /**
         * Properties of a Syn.
         * @memberof handshake
         * @interface ISyn
         * @property {Uint8Array|null} [ObservedUnderlay] Syn ObservedUnderlay
         */

        /**
         * Constructs a new Syn.
         * @memberof handshake
         * @classdesc Represents a Syn.
         * @implements ISyn
         * @constructor
         * @param {handshake.ISyn=} [properties] Properties to set
         */
        function Syn(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Syn ObservedUnderlay.
         * @member {Uint8Array} ObservedUnderlay
         * @memberof handshake.Syn
         * @instance
         */
        Syn.prototype.ObservedUnderlay = $util.newBuffer([]);

        /**
         * Creates a new Syn instance using the specified properties.
         * @function create
         * @memberof handshake.Syn
         * @static
         * @param {handshake.ISyn=} [properties] Properties to set
         * @returns {handshake.Syn} Syn instance
         */
        Syn.create = function create(properties) {
            return new Syn(properties);
        };

        /**
         * Encodes the specified Syn message. Does not implicitly {@link handshake.Syn.verify|verify} messages.
         * @function encode
         * @memberof handshake.Syn
         * @static
         * @param {handshake.ISyn} message Syn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Syn.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ObservedUnderlay != null && Object.hasOwnProperty.call(message, "ObservedUnderlay"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.ObservedUnderlay);
            return writer;
        };

        /**
         * Encodes the specified Syn message, length delimited. Does not implicitly {@link handshake.Syn.verify|verify} messages.
         * @function encodeDelimited
         * @memberof handshake.Syn
         * @static
         * @param {handshake.ISyn} message Syn message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Syn.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Syn message from the specified reader or buffer.
         * @function decode
         * @memberof handshake.Syn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {handshake.Syn} Syn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Syn.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.handshake.Syn();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ObservedUnderlay = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Syn message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof handshake.Syn
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {handshake.Syn} Syn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Syn.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Syn message.
         * @function verify
         * @memberof handshake.Syn
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Syn.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ObservedUnderlay != null && message.hasOwnProperty("ObservedUnderlay"))
                if (!(message.ObservedUnderlay && typeof message.ObservedUnderlay.length === "number" || $util.isString(message.ObservedUnderlay)))
                    return "ObservedUnderlay: buffer expected";
            return null;
        };

        /**
         * Creates a Syn message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof handshake.Syn
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {handshake.Syn} Syn
         */
        Syn.fromObject = function fromObject(object) {
            if (object instanceof $root.handshake.Syn)
                return object;
            var message = new $root.handshake.Syn();
            if (object.ObservedUnderlay != null)
                if (typeof object.ObservedUnderlay === "string")
                    $util.base64.decode(object.ObservedUnderlay, message.ObservedUnderlay = $util.newBuffer($util.base64.length(object.ObservedUnderlay)), 0);
                else if (object.ObservedUnderlay.length)
                    message.ObservedUnderlay = object.ObservedUnderlay;
            return message;
        };

        /**
         * Creates a plain object from a Syn message. Also converts values to other types if specified.
         * @function toObject
         * @memberof handshake.Syn
         * @static
         * @param {handshake.Syn} message Syn
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Syn.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.ObservedUnderlay = "";
                else {
                    object.ObservedUnderlay = [];
                    if (options.bytes !== Array)
                        object.ObservedUnderlay = $util.newBuffer(object.ObservedUnderlay);
                }
            if (message.ObservedUnderlay != null && message.hasOwnProperty("ObservedUnderlay"))
                object.ObservedUnderlay = options.bytes === String ? $util.base64.encode(message.ObservedUnderlay, 0, message.ObservedUnderlay.length) : options.bytes === Array ? Array.prototype.slice.call(message.ObservedUnderlay) : message.ObservedUnderlay;
            return object;
        };

        /**
         * Converts this Syn to JSON.
         * @function toJSON
         * @memberof handshake.Syn
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Syn.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Syn;
    })();

    handshake.Ack = (function() {

        /**
         * Properties of an Ack.
         * @memberof handshake
         * @interface IAck
         * @property {handshake.IBzzAddress|null} [Address] Ack Address
         * @property {number|Long|null} [NetworkID] Ack NetworkID
         * @property {boolean|null} [FullNode] Ack FullNode
         * @property {Uint8Array|null} [Transaction] Ack Transaction
         * @property {string|null} [WelcomeMessage] Ack WelcomeMessage
         */

        /**
         * Constructs a new Ack.
         * @memberof handshake
         * @classdesc Represents an Ack.
         * @implements IAck
         * @constructor
         * @param {handshake.IAck=} [properties] Properties to set
         */
        function Ack(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ack Address.
         * @member {handshake.IBzzAddress|null|undefined} Address
         * @memberof handshake.Ack
         * @instance
         */
        Ack.prototype.Address = null;

        /**
         * Ack NetworkID.
         * @member {number|Long} NetworkID
         * @memberof handshake.Ack
         * @instance
         */
        Ack.prototype.NetworkID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Ack FullNode.
         * @member {boolean} FullNode
         * @memberof handshake.Ack
         * @instance
         */
        Ack.prototype.FullNode = false;

        /**
         * Ack Transaction.
         * @member {Uint8Array} Transaction
         * @memberof handshake.Ack
         * @instance
         */
        Ack.prototype.Transaction = $util.newBuffer([]);

        /**
         * Ack WelcomeMessage.
         * @member {string} WelcomeMessage
         * @memberof handshake.Ack
         * @instance
         */
        Ack.prototype.WelcomeMessage = "";

        /**
         * Creates a new Ack instance using the specified properties.
         * @function create
         * @memberof handshake.Ack
         * @static
         * @param {handshake.IAck=} [properties] Properties to set
         * @returns {handshake.Ack} Ack instance
         */
        Ack.create = function create(properties) {
            return new Ack(properties);
        };

        /**
         * Encodes the specified Ack message. Does not implicitly {@link handshake.Ack.verify|verify} messages.
         * @function encode
         * @memberof handshake.Ack
         * @static
         * @param {handshake.IAck} message Ack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ack.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Address != null && Object.hasOwnProperty.call(message, "Address"))
                $root.handshake.BzzAddress.encode(message.Address, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.NetworkID != null && Object.hasOwnProperty.call(message, "NetworkID"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.NetworkID);
            if (message.FullNode != null && Object.hasOwnProperty.call(message, "FullNode"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.FullNode);
            if (message.Transaction != null && Object.hasOwnProperty.call(message, "Transaction"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.Transaction);
            if (message.WelcomeMessage != null && Object.hasOwnProperty.call(message, "WelcomeMessage"))
                writer.uint32(/* id 99, wireType 2 =*/794).string(message.WelcomeMessage);
            return writer;
        };

        /**
         * Encodes the specified Ack message, length delimited. Does not implicitly {@link handshake.Ack.verify|verify} messages.
         * @function encodeDelimited
         * @memberof handshake.Ack
         * @static
         * @param {handshake.IAck} message Ack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ack.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Ack message from the specified reader or buffer.
         * @function decode
         * @memberof handshake.Ack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {handshake.Ack} Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ack.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.handshake.Ack();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Address = $root.handshake.BzzAddress.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.NetworkID = reader.uint64();
                    break;
                case 3:
                    message.FullNode = reader.bool();
                    break;
                case 4:
                    message.Transaction = reader.bytes();
                    break;
                case 99:
                    message.WelcomeMessage = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Ack message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof handshake.Ack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {handshake.Ack} Ack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ack.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Ack message.
         * @function verify
         * @memberof handshake.Ack
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ack.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Address != null && message.hasOwnProperty("Address")) {
                var error = $root.handshake.BzzAddress.verify(message.Address);
                if (error)
                    return "Address." + error;
            }
            if (message.NetworkID != null && message.hasOwnProperty("NetworkID"))
                if (!$util.isInteger(message.NetworkID) && !(message.NetworkID && $util.isInteger(message.NetworkID.low) && $util.isInteger(message.NetworkID.high)))
                    return "NetworkID: integer|Long expected";
            if (message.FullNode != null && message.hasOwnProperty("FullNode"))
                if (typeof message.FullNode !== "boolean")
                    return "FullNode: boolean expected";
            if (message.Transaction != null && message.hasOwnProperty("Transaction"))
                if (!(message.Transaction && typeof message.Transaction.length === "number" || $util.isString(message.Transaction)))
                    return "Transaction: buffer expected";
            if (message.WelcomeMessage != null && message.hasOwnProperty("WelcomeMessage"))
                if (!$util.isString(message.WelcomeMessage))
                    return "WelcomeMessage: string expected";
            return null;
        };

        /**
         * Creates an Ack message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof handshake.Ack
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {handshake.Ack} Ack
         */
        Ack.fromObject = function fromObject(object) {
            if (object instanceof $root.handshake.Ack)
                return object;
            var message = new $root.handshake.Ack();
            if (object.Address != null) {
                if (typeof object.Address !== "object")
                    throw TypeError(".handshake.Ack.Address: object expected");
                message.Address = $root.handshake.BzzAddress.fromObject(object.Address);
            }
            if (object.NetworkID != null)
                if ($util.Long)
                    (message.NetworkID = $util.Long.fromValue(object.NetworkID)).unsigned = true;
                else if (typeof object.NetworkID === "string")
                    message.NetworkID = parseInt(object.NetworkID, 10);
                else if (typeof object.NetworkID === "number")
                    message.NetworkID = object.NetworkID;
                else if (typeof object.NetworkID === "object")
                    message.NetworkID = new $util.LongBits(object.NetworkID.low >>> 0, object.NetworkID.high >>> 0).toNumber(true);
            if (object.FullNode != null)
                message.FullNode = Boolean(object.FullNode);
            if (object.Transaction != null)
                if (typeof object.Transaction === "string")
                    $util.base64.decode(object.Transaction, message.Transaction = $util.newBuffer($util.base64.length(object.Transaction)), 0);
                else if (object.Transaction.length)
                    message.Transaction = object.Transaction;
            if (object.WelcomeMessage != null)
                message.WelcomeMessage = String(object.WelcomeMessage);
            return message;
        };

        /**
         * Creates a plain object from an Ack message. Also converts values to other types if specified.
         * @function toObject
         * @memberof handshake.Ack
         * @static
         * @param {handshake.Ack} message Ack
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ack.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Address = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.NetworkID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.NetworkID = options.longs === String ? "0" : 0;
                object.FullNode = false;
                if (options.bytes === String)
                    object.Transaction = "";
                else {
                    object.Transaction = [];
                    if (options.bytes !== Array)
                        object.Transaction = $util.newBuffer(object.Transaction);
                }
                object.WelcomeMessage = "";
            }
            if (message.Address != null && message.hasOwnProperty("Address"))
                object.Address = $root.handshake.BzzAddress.toObject(message.Address, options);
            if (message.NetworkID != null && message.hasOwnProperty("NetworkID"))
                if (typeof message.NetworkID === "number")
                    object.NetworkID = options.longs === String ? String(message.NetworkID) : message.NetworkID;
                else
                    object.NetworkID = options.longs === String ? $util.Long.prototype.toString.call(message.NetworkID) : options.longs === Number ? new $util.LongBits(message.NetworkID.low >>> 0, message.NetworkID.high >>> 0).toNumber(true) : message.NetworkID;
            if (message.FullNode != null && message.hasOwnProperty("FullNode"))
                object.FullNode = message.FullNode;
            if (message.Transaction != null && message.hasOwnProperty("Transaction"))
                object.Transaction = options.bytes === String ? $util.base64.encode(message.Transaction, 0, message.Transaction.length) : options.bytes === Array ? Array.prototype.slice.call(message.Transaction) : message.Transaction;
            if (message.WelcomeMessage != null && message.hasOwnProperty("WelcomeMessage"))
                object.WelcomeMessage = message.WelcomeMessage;
            return object;
        };

        /**
         * Converts this Ack to JSON.
         * @function toJSON
         * @memberof handshake.Ack
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ack.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Ack;
    })();

    handshake.SynAck = (function() {

        /**
         * Properties of a SynAck.
         * @memberof handshake
         * @interface ISynAck
         * @property {handshake.ISyn|null} [Syn] SynAck Syn
         * @property {handshake.IAck|null} [Ack] SynAck Ack
         */

        /**
         * Constructs a new SynAck.
         * @memberof handshake
         * @classdesc Represents a SynAck.
         * @implements ISynAck
         * @constructor
         * @param {handshake.ISynAck=} [properties] Properties to set
         */
        function SynAck(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SynAck Syn.
         * @member {handshake.ISyn|null|undefined} Syn
         * @memberof handshake.SynAck
         * @instance
         */
        SynAck.prototype.Syn = null;

        /**
         * SynAck Ack.
         * @member {handshake.IAck|null|undefined} Ack
         * @memberof handshake.SynAck
         * @instance
         */
        SynAck.prototype.Ack = null;

        /**
         * Creates a new SynAck instance using the specified properties.
         * @function create
         * @memberof handshake.SynAck
         * @static
         * @param {handshake.ISynAck=} [properties] Properties to set
         * @returns {handshake.SynAck} SynAck instance
         */
        SynAck.create = function create(properties) {
            return new SynAck(properties);
        };

        /**
         * Encodes the specified SynAck message. Does not implicitly {@link handshake.SynAck.verify|verify} messages.
         * @function encode
         * @memberof handshake.SynAck
         * @static
         * @param {handshake.ISynAck} message SynAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SynAck.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.Syn != null && Object.hasOwnProperty.call(message, "Syn"))
                $root.handshake.Syn.encode(message.Syn, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.Ack != null && Object.hasOwnProperty.call(message, "Ack"))
                $root.handshake.Ack.encode(message.Ack, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SynAck message, length delimited. Does not implicitly {@link handshake.SynAck.verify|verify} messages.
         * @function encodeDelimited
         * @memberof handshake.SynAck
         * @static
         * @param {handshake.ISynAck} message SynAck message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SynAck.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SynAck message from the specified reader or buffer.
         * @function decode
         * @memberof handshake.SynAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {handshake.SynAck} SynAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SynAck.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.handshake.SynAck();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.Syn = $root.handshake.Syn.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.Ack = $root.handshake.Ack.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SynAck message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof handshake.SynAck
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {handshake.SynAck} SynAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SynAck.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SynAck message.
         * @function verify
         * @memberof handshake.SynAck
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SynAck.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.Syn != null && message.hasOwnProperty("Syn")) {
                var error = $root.handshake.Syn.verify(message.Syn);
                if (error)
                    return "Syn." + error;
            }
            if (message.Ack != null && message.hasOwnProperty("Ack")) {
                var error = $root.handshake.Ack.verify(message.Ack);
                if (error)
                    return "Ack." + error;
            }
            return null;
        };

        /**
         * Creates a SynAck message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof handshake.SynAck
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {handshake.SynAck} SynAck
         */
        SynAck.fromObject = function fromObject(object) {
            if (object instanceof $root.handshake.SynAck)
                return object;
            var message = new $root.handshake.SynAck();
            if (object.Syn != null) {
                if (typeof object.Syn !== "object")
                    throw TypeError(".handshake.SynAck.Syn: object expected");
                message.Syn = $root.handshake.Syn.fromObject(object.Syn);
            }
            if (object.Ack != null) {
                if (typeof object.Ack !== "object")
                    throw TypeError(".handshake.SynAck.Ack: object expected");
                message.Ack = $root.handshake.Ack.fromObject(object.Ack);
            }
            return message;
        };

        /**
         * Creates a plain object from a SynAck message. Also converts values to other types if specified.
         * @function toObject
         * @memberof handshake.SynAck
         * @static
         * @param {handshake.SynAck} message SynAck
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SynAck.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.Syn = null;
                object.Ack = null;
            }
            if (message.Syn != null && message.hasOwnProperty("Syn"))
                object.Syn = $root.handshake.Syn.toObject(message.Syn, options);
            if (message.Ack != null && message.hasOwnProperty("Ack"))
                object.Ack = $root.handshake.Ack.toObject(message.Ack, options);
            return object;
        };

        /**
         * Converts this SynAck to JSON.
         * @function toJSON
         * @memberof handshake.SynAck
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SynAck.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SynAck;
    })();

    handshake.BzzAddress = (function() {

        /**
         * Properties of a BzzAddress.
         * @memberof handshake
         * @interface IBzzAddress
         * @property {Uint8Array|null} [Underlay] BzzAddress Underlay
         * @property {Uint8Array|null} [Signature] BzzAddress Signature
         * @property {Uint8Array|null} [Overlay] BzzAddress Overlay
         */

        /**
         * Constructs a new BzzAddress.
         * @memberof handshake
         * @classdesc Represents a BzzAddress.
         * @implements IBzzAddress
         * @constructor
         * @param {handshake.IBzzAddress=} [properties] Properties to set
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
         * @memberof handshake.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Underlay = $util.newBuffer([]);

        /**
         * BzzAddress Signature.
         * @member {Uint8Array} Signature
         * @memberof handshake.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Signature = $util.newBuffer([]);

        /**
         * BzzAddress Overlay.
         * @member {Uint8Array} Overlay
         * @memberof handshake.BzzAddress
         * @instance
         */
        BzzAddress.prototype.Overlay = $util.newBuffer([]);

        /**
         * Creates a new BzzAddress instance using the specified properties.
         * @function create
         * @memberof handshake.BzzAddress
         * @static
         * @param {handshake.IBzzAddress=} [properties] Properties to set
         * @returns {handshake.BzzAddress} BzzAddress instance
         */
        BzzAddress.create = function create(properties) {
            return new BzzAddress(properties);
        };

        /**
         * Encodes the specified BzzAddress message. Does not implicitly {@link handshake.BzzAddress.verify|verify} messages.
         * @function encode
         * @memberof handshake.BzzAddress
         * @static
         * @param {handshake.IBzzAddress} message BzzAddress message or plain object to encode
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
            return writer;
        };

        /**
         * Encodes the specified BzzAddress message, length delimited. Does not implicitly {@link handshake.BzzAddress.verify|verify} messages.
         * @function encodeDelimited
         * @memberof handshake.BzzAddress
         * @static
         * @param {handshake.IBzzAddress} message BzzAddress message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BzzAddress.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BzzAddress message from the specified reader or buffer.
         * @function decode
         * @memberof handshake.BzzAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {handshake.BzzAddress} BzzAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BzzAddress.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.handshake.BzzAddress();
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
         * @memberof handshake.BzzAddress
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {handshake.BzzAddress} BzzAddress
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
         * @memberof handshake.BzzAddress
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
            return null;
        };

        /**
         * Creates a BzzAddress message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof handshake.BzzAddress
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {handshake.BzzAddress} BzzAddress
         */
        BzzAddress.fromObject = function fromObject(object) {
            if (object instanceof $root.handshake.BzzAddress)
                return object;
            var message = new $root.handshake.BzzAddress();
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
            return message;
        };

        /**
         * Creates a plain object from a BzzAddress message. Also converts values to other types if specified.
         * @function toObject
         * @memberof handshake.BzzAddress
         * @static
         * @param {handshake.BzzAddress} message BzzAddress
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
            }
            if (message.Underlay != null && message.hasOwnProperty("Underlay"))
                object.Underlay = options.bytes === String ? $util.base64.encode(message.Underlay, 0, message.Underlay.length) : options.bytes === Array ? Array.prototype.slice.call(message.Underlay) : message.Underlay;
            if (message.Signature != null && message.hasOwnProperty("Signature"))
                object.Signature = options.bytes === String ? $util.base64.encode(message.Signature, 0, message.Signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.Signature) : message.Signature;
            if (message.Overlay != null && message.hasOwnProperty("Overlay"))
                object.Overlay = options.bytes === String ? $util.base64.encode(message.Overlay, 0, message.Overlay.length) : options.bytes === Array ? Array.prototype.slice.call(message.Overlay) : message.Overlay;
            return object;
        };

        /**
         * Converts this BzzAddress to JSON.
         * @function toJSON
         * @memberof handshake.BzzAddress
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BzzAddress.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BzzAddress;
    })();

    return handshake;
})();

module.exports = $root;
