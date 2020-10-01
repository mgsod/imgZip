const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './index.js',
    output: {
        filename: '../dist/index.min.js',
        libraryTarget: "umd",
        library: "imgZip",
        umdNamedDefine: true,
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
};