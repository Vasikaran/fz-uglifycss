# Fz Uglify CSS
  Fz Uglify CSS is a CSS parser which is minify your CSS files.

## Installation
  ```sh
    npm install --save fz-uglifycss // to install locally
    
    npm install -g --save fz-uglifycss // to install globally
  ```
## API Reference
  ```js
  import minify from 'fz-uglifycss'; // in es6
  
  let css = `body{
    background: red;
  }`;

  let minifiedCss = minify(css);

  console.log(minifiedCss);
  // 'body{background:red}'
  ```
|Params|Type|Description|Default|
|:---:|:---:|:--:|:--:|
|`Source or Source path`|`string or array`|`You can pass source content or source path to this method`|`-none-`|
|`options`|`object`|`{isPath: false, isString: true}`|`{isString: true}`|`-none-`|

**Three types you have pass arguments to this method**

* Type1 - `source content only` - `minify('body{ backgroung: red }')`
* Type2 - `a single source path as string and option {isPath: true}` - `minify('./src/path', {isPath: true})`
* Type3 - `source path as array and option {isPath: true}` - `minify(['./src/path1', './src/path2'], {isPath: true})`
  
  `Here is yours examples`
  [Examples](./example/example.js)

## CLI Reference
You can use `fz-uglifycss` in CLI.
  ```sh
  fz-uglifycss -s src -d lib // in command line
  ```

  ```json
  // in package.json

  {
    "scripts": {
      "build:css": "fz-uglifycss -s src -d lib"
    }
  }

  ```
  
|Params|Description|
|:---:|:---:|
|`-s`|`This is means source directory`
|`-d`|`This is means designation directory`
|`-h or -help`|`For help`

## My minification rule

  * Remove commented lines
  * Remove line breaks
  * Remove unwanted spaces and taps
  * Remove last semicolon of a style

## Conclusion

  Tell your thoughts and face any bug assign that on Issuses.
