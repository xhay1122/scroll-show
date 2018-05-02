/**
 * Created by hai.xiong on 2018/4/28.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

var DEV_MODE = process.env.NODE_ENV !== 'production';

if (!DEV_MODE) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
}

module.exports = {
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },

    entry: {
        app: './examples/app.js',
    },

    watch: DEV_MODE,
    devtool: DEV_MODE ? 'inline-source-map' : 'source-map',

    output: {
        path: path.join(__dirname, 'examples/js/'),
        filename: 'bundle.min.js',
        publicPath: '/js/'
    },

    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};