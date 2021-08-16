/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pricing = (function() {

    /**
     * Namespace pricing.
     * @exports pricing
     * @namespace
     */
    var pricing = {};

    pricing.AnnouncePaymentThreshold = (function() {

        /**
         * Properties of an AnnouncePaymentThreshold.
         * @memberof pricing
         * @interface IAnnouncePaymentThreshold
         * @property {Uint8Array|null} [PaymentThreshold] AnnouncePaymentThreshold PaymentThreshold
         */

        /**
         * Constructs a new AnnouncePaymentThreshold.
         * @memberof pricing
         * @classdesc Represents an AnnouncePaymentThreshold.
         * @implements IAnnouncePaymentThreshold
         * @constructor
         * @param {pricing.IAnnouncePaymentThreshold=} [properties] Properties to set
         */
        function AnnouncePaymentThreshold(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AnnouncePaymentThreshold PaymentThreshold.
         * @member {Uint8Array} PaymentThreshold
         * @memberof pricing.AnnouncePaymentThreshold
         * @instance
         */
        AnnouncePaymentThreshold.prototype.PaymentThreshold = $util.newBuffer([]);

        /**
         * Creates a new AnnouncePaymentThreshold instance using the specified properties.
         * @function create
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {pricing.IAnnouncePaymentThreshold=} [properties] Properties to set
         * @returns {pricing.AnnouncePaymentThreshold} AnnouncePaymentThreshold instance
         */
        AnnouncePaymentThreshold.create = function create(properties) {
            return new AnnouncePaymentThreshold(properties);
        };

        /**
         * Encodes the specified AnnouncePaymentThreshold message. Does not implicitly {@link pricing.AnnouncePaymentThreshold.verify|verify} messages.
         * @function encode
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {pricing.IAnnouncePaymentThreshold} message AnnouncePaymentThreshold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnnouncePaymentThreshold.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.PaymentThreshold != null && Object.hasOwnProperty.call(message, "PaymentThreshold"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.PaymentThreshold);
            return writer;
        };

        /**
         * Encodes the specified AnnouncePaymentThreshold message, length delimited. Does not implicitly {@link pricing.AnnouncePaymentThreshold.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {pricing.IAnnouncePaymentThreshold} message AnnouncePaymentThreshold message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnnouncePaymentThreshold.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AnnouncePaymentThreshold message from the specified reader or buffer.
         * @function decode
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pricing.AnnouncePaymentThreshold} AnnouncePaymentThreshold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnnouncePaymentThreshold.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pricing.AnnouncePaymentThreshold();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.PaymentThreshold = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AnnouncePaymentThreshold message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pricing.AnnouncePaymentThreshold} AnnouncePaymentThreshold
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnnouncePaymentThreshold.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AnnouncePaymentThreshold message.
         * @function verify
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AnnouncePaymentThreshold.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.PaymentThreshold != null && message.hasOwnProperty("PaymentThreshold"))
                if (!(message.PaymentThreshold && typeof message.PaymentThreshold.length === "number" || $util.isString(message.PaymentThreshold)))
                    return "PaymentThreshold: buffer expected";
            return null;
        };

        /**
         * Creates an AnnouncePaymentThreshold message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pricing.AnnouncePaymentThreshold} AnnouncePaymentThreshold
         */
        AnnouncePaymentThreshold.fromObject = function fromObject(object) {
            if (object instanceof $root.pricing.AnnouncePaymentThreshold)
                return object;
            var message = new $root.pricing.AnnouncePaymentThreshold();
            if (object.PaymentThreshold != null)
                if (typeof object.PaymentThreshold === "string")
                    $util.base64.decode(object.PaymentThreshold, message.PaymentThreshold = $util.newBuffer($util.base64.length(object.PaymentThreshold)), 0);
                else if (object.PaymentThreshold.length)
                    message.PaymentThreshold = object.PaymentThreshold;
            return message;
        };

        /**
         * Creates a plain object from an AnnouncePaymentThreshold message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pricing.AnnouncePaymentThreshold
         * @static
         * @param {pricing.AnnouncePaymentThreshold} message AnnouncePaymentThreshold
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AnnouncePaymentThreshold.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.PaymentThreshold = "";
                else {
                    object.PaymentThreshold = [];
                    if (options.bytes !== Array)
                        object.PaymentThreshold = $util.newBuffer(object.PaymentThreshold);
                }
            if (message.PaymentThreshold != null && message.hasOwnProperty("PaymentThreshold"))
                object.PaymentThreshold = options.bytes === String ? $util.base64.encode(message.PaymentThreshold, 0, message.PaymentThreshold.length) : options.bytes === Array ? Array.prototype.slice.call(message.PaymentThreshold) : message.PaymentThreshold;
            return object;
        };

        /**
         * Converts this AnnouncePaymentThreshold to JSON.
         * @function toJSON
         * @memberof pricing.AnnouncePaymentThreshold
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AnnouncePaymentThreshold.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AnnouncePaymentThreshold;
    })();

    return pricing;
})();

module.exports = $root;
