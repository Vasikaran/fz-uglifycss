
let minification = (css)=>{
    var lines = css.split('\n');
    var minifiedCss = '';
    let isComment = false;
    lines.forEach((line, lineIndex)=>{
        line = line.split('\r')[0];
        let isColon = false;
        let isSemiColon = false;
        let cleanLine = line.replace(/\s+/g, "");
        if (cleanLine.startsWith('/*') || cleanLine.startsWith('*/')){
            isComment = true;
        }else if (cleanLine.endsWith('*/')){
            isComment = false;
        }
        let addRaw, isMedia = false;
        if (cleanLine.startsWith('@media')){
            isMedia = true;
        }
        if (!isComment){
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
