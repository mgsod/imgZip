const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './dist/index.js',
    output: {
        filename: '../dist/index.min.js',
        libraryTarget: "umd",
        library: "imgZip",
        umdNamedDefine: true
    },
    optimization: {
        minimizer: [
            new uglify({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
};