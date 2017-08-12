import minification from './minification';

let minifyLoader = (source)=>{
    return minification(source);
}

export default minifyLoader;
