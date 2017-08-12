'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _minification = require('./minification');

var _minification2 = _interopRequireDefault(_minification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minifyLoader = function minifyLoader(source) {
    source = (0, _minification2.default)(source);
    return source;
};

exports.default = minifyLoader;