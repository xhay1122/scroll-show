/**
 * Created by hai.xiong on 2018/4/28.
 */
'use strict';
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

var DEV_MODE = process.env.NODE_ENV !== 'production';

var plugins = [
    new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(!DEV_MODE)
    })
];

if (!DEV_MODE) {
    plugins.push(
        new UglifyJsPlugin()
    );
}

module.exports = {
    // 入口
    entry: {
        app: './examples/app.js',
    },
    // 输出目录
    output: {
        path: path.join(__dirname, 'examples/js/'),
        filename: 'bundle.min.js',
        publicPath: '/js/'
    },
    // 模块配置
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'  // .babelrc
            }
        }]
    },
    resolve: {
        // 自动识别的文件
        extensions: ['.js', '.jsx']
    },

    watch: DEV_MODE,
    devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
    // 其他插件列表
    plugins: plugins
};