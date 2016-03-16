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
            { test: /\.css$/,  loader: "style!css" },
            { test: /\.js$/,   loader: "babel-loader" , exclude: /node_modules/},
            { test: /\.html$/, loader: "ng-cache?prefix=[dir]/[dir]"}
        ]
    },
    plugins : [
      new webpack.optimize.UglifyJsPlugin({mangle: {except: ['$super', '$', 'exports', 'require'] } })
    ]
};