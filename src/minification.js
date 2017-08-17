
let minification = (css)=>{
    var lines = css.split('\n');
    var minifiedCss = '';
    let isComment = false;
    lines.forEach((line, lineIndex)=>{
        line = line.split('\r')[0];
        let cleanLine = line.replace(/\s+/g, "");
        let lineHasComment = false;
        if (cleanLine.indexOf('/*') !== -1){
            isComment = true;
            line = line.split('/*')[0] ? line.split('/*')[0] : '';
            lineHasComment = true;
        }
        if (cleanLine.indexOf('*/') !== -1){
            isComment = true;
            line = line.split('*/')[1] ? line.split('*/')[1] : '';
            lineHasComment = true;
        }
        let addRaw, isMedia = false;
        if (cleanLine.indexOf('@media') !== -1 && !isComment){
            isMedia = true;
        }
        if (!isComment || lineHasComment){
            let count = 0;
            for (let char of line){
                let subStr = line.substr(count + 1, line.length);
                if (char === ':' && !addRaw){
                    let isChar = false;
                    subStr = subStr.split('').reduce((str, char)=>{
                        if (char === ' ' && !isChar){
                            return str;
                        }else{
                            isChar = true;
                        }
                        return str + char;
                    }, '')
                    if (subStr.search(' ') !== -1){
                        addRaw = true;
                    }
                }
                let pureLine = subStr.replace(/\s+/g, "");
                if (pureLine === ';' || pureLine === '}' && addRaw){
                    addRaw = false;
                }
                let isFinish = false;
                if (lines[lineIndex + 1]){
                    let nextLine = lines[lineIndex + 1].replace(/\s+/g, "");
                    if (char === ';' && nextLine === '}'){
                        isFinish = true;
                    }
                }
                if (addRaw || isMedia && !isFinish){
                    if (!(line[count - 1] === ',' && line[count] === ' ')){
                        if (!(line[count] === ' ' && line[count + 1] === '!')){
                            if (!(line[count] === ' ' && line[count - 1] === ':')){
                                if (!(line[count] === ' ' && line[count + 1] === '{')){
                                    minifiedCss += char;
                                }
                            }
                        }
                    }
                }else if (char !== ' ' && char !== '\t' && !isFinish){
                    minifiedCss += char;
                }
                count++;
            }
        }
        if (cleanLine.endsWith('*/')){
            isComment = false;
        }
    })
    return minifiedCss;
}

export default minification;
