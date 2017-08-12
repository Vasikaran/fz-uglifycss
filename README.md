# Fz Uglify CSS
  Fz Uglify CSS is a CSS parser which is minify your CSS files.
  
## Installation
  ```sh
    npm install --save fz-uglifycss
  ```
 
 ## API Reference
  ```js
    import { minify } from 'fz-uglifycss'; // in es6
    let css = `body{
      background: red;
    }`;
    let minifiedCss = minify(css);
    console.log(minifiedCss);
    // 'body{background:red}'
  ```
  [Example](./example/example.js)
  
  ## Webpack loader Reference
  
  ```js
    // webpack.config.js
    var path = require('path');
    
    module.exports = {
      entry: './index.js',
      output: {
        filename: 'bundle.js',
        output: path.resolve(__dirname, 'bundle')
      },
      module: {
        loaders: [
          {
            test: /\.css$/,
            use: require.resolve('fz-uglifycss').loader
          }
        ]
      }
    }
  ```
  ## CLI Reference
    Will implement
      
  ## Conclusion
  
    Tell your thoughts and face any bug assign that on Issuses.
