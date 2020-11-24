const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './dist/index.js',
    output: {
        filename: '../dist/index.min.js',
        libraryTarget: "umd",
        library: "imgZip",
        libraryExport: "default",
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