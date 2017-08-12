import fs from 'fs';
import minification from './minification';

let minify = (css, option = {isString: true})=>{
    let { isPath, isString } = option;
    if (isPath){
        if (Array.isArray(css)){
            let files = css.reduce((content, filePath)=>{
                let file = fs.readFileSync(filePath);
                if (file){
                    file = file.toString();
                }else{
                    throw 'file not found in this path ' + filePath;
                }
                return content += file;
            }, '')
            let minifiedCss = minification(files);
            return minifiedCss;
        }else if (typeof css === 'string'){
            let file = fs.readFileSync(css);
            if (file){
                file = file.toString();
            }
            let minifiedCss = minification(file);
            return minifiedCss;
        }else {
            throw 'only array or string type allow';
        }
    }else if (isString){
        if (typeof css === 'string'){
            let minifiedCss = minification(css);
            return minifiedCss;
        }else{
            throw 'only array or string type allow';
        }
    }
}

export default minify;
