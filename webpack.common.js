const dotenv = require('dotenv');
dotenv.config();

const _ = require('lodash');
const path = require('path');
const config = require('config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Remove server specific configurations
let sanitizedConfig = _.pick(config, [
    'sentry',
    'logRocket',
    'sockets',
    'client'
]);

const cleanWebpackPlugin = new CleanWebpackPlugin([
    path.resolve(__dirname, 'dist/client')
]);

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: 'client/index.html'
});

const definePlugin = new webpack.DefinePlugin({
    CONFIG: JSON.stringify(sanitizedConfig)
});

module.exports = {
    entry: [
        '@babel/polyfill',
        './client/index.js'
    ],

    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist/client')
    },

    plugins: [
        cleanWebpackPlugin,
        htmlWebpackPlugin,
        definePlugin
    ],

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'client'),
            use: [
                'babel-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.svg$/,
            use: [
                'babel-loader',
                'react-svg-loader'
            ]
        }]
    }
};