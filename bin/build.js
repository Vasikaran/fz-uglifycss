#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const uglifycss = require('../lib/index.js');

var args = process.argv.splice(2, process.argv.length);

var srcPath, desPath;
if(args[0] === '-s'){
    srcPath = args[1];
}

if (args[2] === '-d'){
    desPath = args[3];
}

var appPath = fs.realpathSync(process.cwd());

function log(info){
    process.stdout.write(info + '\n');
}

function minifyCss(srcPath, targetPath){
    let minifiedCss = uglifycss(srcPath, {isPath: true});
    fs.writeFileSync(targetPath, minifiedCss);
    log(srcPath + ' -> ' + targetPath);
}

function iterateDirectory(srcPath, targetPath){
    fs.readdirSync(srcPath).forEach((fileOrDir)=>{
        let fromPath = path.join(srcPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(toPath)){
                fs.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath);
        }else{
            let { name, ext } = path.parse(fileOrDir);
            if (ext === '.css'){
                minifyCss(fromPath, toPath);
            }
        }
    })
}

srcPath = path.resolve(appPath, srcPath);

if (fs.existsSync(srcPath) && desPath){
    desPath = path.resolve(appPath, desPath);
    if (!fs.existsSync(desPath)){
        fs.mkdirSync(desPath);
    }
    iterateDirectory(srcPath, desPath);
}else{
    if (srcPath){
        throw 'src path invalid';
    }else if(!desPath){
        throw 'designation path of undefind';
    }else{
        throw 'src path of undefind';
    }
}
