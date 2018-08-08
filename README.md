# css-loader
css loader for webpack

## Installation
npm
``` shell
$ npm install @arted/css-loader
```

or yarn
``` shell
$ yarn add @arted/css-loader
```

## Usage
``` javascript
// webpack.config.js
module.exports = {
	...
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "@arted/css-loader" // compiles Sass to CSS
            ]
        }]
    }
};
```
