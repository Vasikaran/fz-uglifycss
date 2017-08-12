'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.minify = exports.loader = undefined;

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _minify = require('./minify');

var _minify2 = _interopRequireDefault(_minify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.loader = _loader2.default;
exports.minify = _minify2.default;