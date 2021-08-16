/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.headers = (function() {

    /**
     * Namespace headers.
     * @exports headers
     * @namespace
     */
    var headers = {};

    headers.Headers = (function() {

        /**
         * Properties of a Headers.
         * @memberof headers
         * @interface IHeaders
         * @property {Array.<headers.IHeader>|null} [headers] Headers headers
         */

        /**
         * Constructs a new Headers.
         * @memberof headers
         * @classdesc Represents a Headers.
         * @implements IHeaders
         * @constructor
         * @param {headers.IHeaders=} [properties] Properties to set
         */
        function Headers(properties) {
            this.headers = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Headers headers.
         * @member {Array.<headers.IHeader>} headers
         * @memberof headers.Headers
         * @instance
         */
        Headers.prototype.headers = $util.emptyArray;

        /**
         * Creates a new Headers instance using the specified properties.
         * @function create
         * @memberof headers.Headers
         * @static
         * @param {headers.IHeaders=} [properties] Properties to set
         * @returns {headers.Headers} Headers instance
         */
        Headers.create = function create(properties) {
            return new Headers(properties);
        };

        /**
         * Encodes the specified Headers message. Does not implicitly {@link headers.Headers.verify|verify} messages.
         * @function encode
         * @memberof headers.Headers
         * @static
         * @param {headers.IHeaders} message Headers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Headers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.headers != null && message.headers.length)
                for (var i = 0; i < message.headers.length; ++i)
                    $root.headers.Header.encode(message.headers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Headers message, length delimited. Does not implicitly {@link headers.Headers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof headers.Headers
         * @static
         * @param {headers.IHeaders} message Headers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Headers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Headers message from the specified reader or buffer.
         * @function decode
         * @memberof headers.Headers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {headers.Headers} Headers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Headers.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.headers.Headers();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.headers && message.headers.length))
                        message.headers = [];
                    message.headers.push($root.headers.Header.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Headers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof headers.Headers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {headers.Headers} Headers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Headers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Headers message.
         * @function verify
         * @memberof headers.Headers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Headers.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.headers != null && message.hasOwnProperty("headers")) {
                if (!Array.isArray(message.headers))
                    return "headers: array expected";
                for (var i = 0; i < message.headers.length; ++i) {
                    var error = $root.headers.Header.verify(message.headers[i]);
                    if (error)
                        return "headers." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Headers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof headers.Headers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {headers.Headers} Headers
         */
        Headers.fromObject = function fromObject(object) {
            if (object instanceof $root.headers.Headers)
                return object;
            var message = new $root.headers.Headers();
            if (object.headers) {
                if (!Array.isArray(object.headers))
                    throw TypeError(".headers.Headers.headers: array expected");
                message.headers = [];
                for (var i = 0; i < object.headers.length; ++i) {
                    if (typeof object.headers[i] !== "object")
                        throw TypeError(".headers.Headers.headers: object expected");
                    message.headers[i] = $root.headers.Header.fromObject(object.headers[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Headers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof headers.Headers
         * @static
         * @param {headers.Headers} message Headers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Headers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.headers = [];
            if (message.headers && message.headers.length) {
                object.headers = [];
                for (var j = 0; j < message.headers.length; ++j)
                    object.headers[j] = $root.headers.Header.toObject(message.headers[j], options);
            }
            return object;
        };

        /**
         * Converts this Headers to JSON.
         * @function toJSON
         * @memberof headers.Headers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Headers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Headers;
    })();

    headers.Header = (function() {

        /**
         * Properties of a Header.
         * @memberof headers
         * @interface IHeader
         * @property {string|null} [key] Header key
         * @property {Uint8Array|null} [value] Header value
         */

        /**
         * Constructs a new Header.
         * @memberof headers
         * @classdesc Represents a Header.
         * @implements IHeader
         * @constructor
         * @param {headers.IHeader=} [properties] Properties to set
         */
        function Header(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Header key.
         * @member {string} key
         * @memberof headers.Header
         * @instance
         */
        Header.prototype.key = "";

        /**
         * Header value.
         * @member {Uint8Array} value
         * @memberof headers.Header
         * @instance
         */
        Header.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new Header instance using the specified properties.
         * @function create
         * @memberof headers.Header
         * @static
         * @param {headers.IHeader=} [properties] Properties to set
         * @returns {headers.Header} Header instance
         */
        Header.create = function create(properties) {
            return new Header(properties);
        };

        /**
         * Encodes the specified Header message. Does not implicitly {@link headers.Header.verify|verify} messages.
         * @function encode
         * @memberof headers.Header
         * @static
         * @param {headers.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified Header message, length delimited. Does not implicitly {@link headers.Header.verify|verify} messages.
         * @function encodeDelimited
         * @memberof headers.Header
         * @static
         * @param {headers.IHeader} message Header message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Header.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @function decode
         * @memberof headers.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {headers.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.headers.Header();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.string();
                    break;
                case 2:
                    message.value = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Header message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof headers.Header
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {headers.Header} Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Header.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Header message.
         * @function verify
         * @memberof headers.Header
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Header.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a Header message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof headers.Header
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {headers.Header} Header
         */
        Header.fromObject = function fromObject(object) {
            if (object instanceof $root.headers.Header)
                return object;
            var message = new $root.headers.Header();
            if (object.key != null)
                message.key = String(object.key);
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a Header message. Also converts values to other types if specified.
         * @function toObject
         * @memberof headers.Header
         * @static
         * @param {headers.Header} message Header
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Header.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.key = "";
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = message.key;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this Header to JSON.
         * @function toJSON
         * @memberof headers.Header
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Header.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Header;
    })();

    return headers;
})();

module.exports = $root;
