'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var minification = function minification(css) {
    var lines = css.split('\n');
    var minifiedCss = '';
    var isComment = false;
    lines.forEach(function (line, lineIndex) {
        line = line.split('\r')[0];
        var cleanLine = line.replace(/\s+/g, "");
        var lineHasComment = false;
        if (cleanLine.indexOf('/*') !== -1) {
            isComment = true;
            line = line.split('/*')[0] ? line.split('/*')[0] : '';
            lineHasComment = true;
        }
        if (cleanLine.indexOf('*/') !== -1) {
            isComment = true;
            line = line.split('*/')[1] ? line.split('*/')[1] : '';
            lineHasComment = true;
        }
        var addRaw = void 0,
            isMedia = false;
        if (cleanLine.indexOf('@media') !== -1 && !isComment) {
            isMedia = true;
        }
        if (!isComment || lineHasComment) {
            var count = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = line[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var char = _step.value;

                    var subStr = line.substr(count + 1, line.length);
                    if (char === ':' && !addRaw) {
                        (function () {
                            var isChar = false;
                            subStr = subStr.split('').reduce(function (str, char) {
                                if (char === ' ' && !isChar) {
                                    return str;
                                } else {
                                    isChar = true;
                                }
                                return str + char;
                            }, '');
                            if (subStr.search(' ') !== -1) {
                                addRaw = true;
                            }
                        })();
                    }
                    var pureLine = subStr.replace(/\s+/g, "");
                    if (pureLine === ';' || pureLine === '}' && addRaw) {
                        addRaw = false;
                    }
                    var isFinish = false;
                    if (lines[lineIndex + 1]) {
                        var nextLine = lines[lineIndex + 1].replace(/\s+/g, "");
                        if (char === ';' && nextLine === '}') {
                            isFinish = true;
                        }
                    }
                    if (addRaw || isMedia && !isFinish) {
                        if (!(line[count - 1] === ',' && line[count] === ' ')) {
                            if (!(line[count] === ' ' && line[count + 1] === '!')) {
                                if (!(line[count] === ' ' && line[count - 1] === ':')) {
                                    if (!(line[count] === ' ' && line[count + 1] === '{')) {
                                        minifiedCss += char;
                                    }
                                }
                            }
                        }
                    } else if (char !== ' ' && char !== '\t' && !isFinish) {
                        minifiedCss += char;
                    }
                    count++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        if (cleanLine.endsWith('*/')) {
            isComment = false;
        }
    });
    return minifiedCss;
};

exports.default = minification;