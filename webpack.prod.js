const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const uglifyPlugin = new UglifyJsPlugin({
    parallel: true,
    sourceMap: true,
    test: /\.js(\?.*)?$/i,
});

const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({});

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            uglifyPlugin,
            optimizeCssPlugin
        ]
    }
});