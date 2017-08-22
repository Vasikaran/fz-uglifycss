let removeComments = (content)=>{
    return content.replace(/\/\*([\s\S]*?)\*\//g, '');
}

let removeWhiteSpaces = (content)=>{
    content = content.replace(/{/g, '{\n');
    content = content.replace(/;/g, ';\n');
    content = content.replace(/}/g, '\n}\n');
    let lines = content.split('\n');
    let cleanLines = '';
    lines.forEach((line)=>{
        let cleanLine = line;
        cleanLine.replace(/(\s+|\t)/g, '');
        if (cleanLine !== '') {
            if (line.indexOf('{') !== -1) {
                let temp = line.split('{');
                line = temp[0].trim() + '{'
            }else if (line.indexOf(':') !== -1){
                let temp = line.split(':');
                line = temp[0].trim() + ':' + temp[1].trim();
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

let minification = (css)=>{
    css = css.replace(/(\r\n|\n\r|\n)/g, '');
    let minifiedCss = removeComments(css);
    minifiedCss = removeWhiteSpaces(minifiedCss);
    return minifiedCss;
}

export default minification;
