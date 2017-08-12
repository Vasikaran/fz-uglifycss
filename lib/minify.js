'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _minification = require('./minification');

var _minification2 = _interopRequireDefault(_minification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minify = function minify(css) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { isString: true };
    var isPath = option.isPath,
        isString = option.isString;

    if (isPath) {
        if (Array.isArray(css)) {
            var files = css.reduce(function (content, filePath) {
                var file = _fs2.default.readFileSync(filePath);
                if (file) {
                    file = file.toString();
                } else {
                    throw 'file not found in this path ' + filePath;
                }
                return content += file;
            }, '');
            var minifiedCss = (0, _minification2.default)(files);
            return minifiedCss;
        } else if (typeof css === 'string') {
            var file = _fs2.default.readFileSync(css);
            if (file) {
                file = file.toString();
            }
            var _minifiedCss = (0, _minification2.default)(file);
            return _minifiedCss;
        } else {
            throw 'only array or string type allow';
        }
    } else if (isString) {
        if (typeof css === 'string') {
            var _minifiedCss2 = (0, _minification2.default)(css);
            return _minifiedCss2;
        } else {
            throw 'only array or string type allow';
        }
    }
};

exports.default = minify;