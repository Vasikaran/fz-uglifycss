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

var originPath = srcPath;
var endPath = desPath;

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
    return true;
}

function iterateDirectory(contentPath, targetPath, dirName){
    dirName = dirName ? dirName : '';
    fs.readdirSync(contentPath).forEach((fileOrDir)=>{
        let fromPath = path.join(contentPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(toPath)){
                fs.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, dirName + '/' + fileOrDir);
        }else{
            let { name, ext } = path.parse(fileOrDir);
            if (ext === '.css'){
                if(minifyCss(fromPath, toPath)){
                    log(path.join(originPath, dirName, name + ext) + ' -> ' + path.join(endPath, dirName, name + ext), true);
                }
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
