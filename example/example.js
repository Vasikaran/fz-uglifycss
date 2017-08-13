const fs = require('fs')
const path = require('path');
const minify = require('../lib/index');

console.log(minify);

let css = fs.readFileSync('./sample.css').toString();

console.log(minify(css));

let option = {
    isPath: true
}

let sample = path.resolve(__dirname, './sample.css');
let sample2 = path.resolve(__dirname, './sample2.css');

console.log(minify(sample, option));

console.log(minify([sample, sample2], option));
