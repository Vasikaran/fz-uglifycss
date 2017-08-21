'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var removeComments = function removeComments(content) {
    var lines = content.split('*/');
    var cleanLines = '';
    lines.forEach(function (line) {
        line = line.replace(/(\*.*|\/)/g, '');
        cleanLines += line;
    });
    return cleanLines;
};

var removeWhiteSpaces = function removeWhiteSpaces(content) {
    content = content.replace(/{/g, '{\n');
    content = content.replace(/;/g, ';\n');
    content = content.replace(/}/g, '\n}\n');
    var lines = content.split('\n');
    var cleanLines = '';
    lines.forEach(function (line) {
        var cleanLine = line;
        cleanLine.replace(/(\s+|\t)/g, '');
        if (cleanLine !== '') {
            if (line.indexOf('{') !== -1) {
                var temp = line.split('{');
                line = temp[0].trim() + '{';
            } else if (line.indexOf(':') !== -1) {
                var _temp = line.split(':');
                line = _temp[0].trim() + ':' + _temp[1].trim();
            }
            line = line.trim();
            cleanLines += line;
        }
    });
    cleanLines = cleanLines.replace(/\t/g, '');
    cleanLines = cleanLines.replace(/;}/g, '}');
    cleanLines = cleanLines.replace(/\s!/g, '!');
    cleanLines = cleanLines.replace(/(\s,|,\s)/g, ',');
    cleanLines = cleanLines.replace(/(\s:|:\s)/g, ':');
    return cleanLines;
};

var minification = function minification(css) {
    css = css.replace(/(\r\n|\n\r|\n)/g, '');
    var minifiedCss = removeComments(css);
    minifiedCss = removeWhiteSpaces(minifiedCss);
    return minifiedCss;
};

exports.default = minification;