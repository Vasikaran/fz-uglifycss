#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const uglifycss = require('../lib/index.js');

var args = process.argv.splice(2, process.argv.length);

var srcPath, desPath;
if(args[0] === '-s'){
    srcPath = args[1];
}else if (args[0] === '-d'){
    desPath = args[1];
}

if (args[2] === '-d'){
    desPath = args[3];
}else if (args[0] === '-s'){
    srcPath = args[3];
}

if (args[0] === '-h'){
    log('Options:', true);
    log('   -s        - source path       ', false);
    log('for source path', true);
    log('   -d        - designation path  ');
    log('for designation path', true);
    log('   -h, -help - help              ');
    log('for help', true);
    process.exit();
}

var appPath = fs.realpathSync(process.cwd());

function log(info, wantNextLine){
    info += wantNextLine ? '\n' : '';
    process.stdout.write(info);
}

function minifyCss(srcPath, targetPath){
    let minifiedCss = uglifycss(srcPath, {isPath: true});
    fs.writeFileSync(targetPath, minifiedCss);
    log(srcPath + ' -> ' + targetPath, true);
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

if (srcPath){
    srcPath = path.resolve(appPath, srcPath);
}

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
