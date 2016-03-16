'use strict';  
var webpack = require('webpack'),  
path = require('path');
// var APP = __dirname + '/app';

module.exports =  {
    // context: APP,
    entry: "./src/js/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
        // filename: "./public/js/bundle.js" // I'm using gulp
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins : [
      new webpack.optimize.UglifyJsPlugin({mangle: {except: ['$super', '$', 'exports', 'require'] } })
    ]
};