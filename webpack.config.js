const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(filename) {
    return path.resolve(__dirname, filename);
}

module.exports = {
    mode: 'production',
    optimization: {
        // 关闭默认开启的tree-shaking
        usedExports: false,
        minimize: false,
    },
    entry: {
        background: resolve('./src/background.js'),
        popup: resolve('./src/popup.js'),
        contentScript: resolve('./src/contentScript.js'),
        demo: ['react-hot-loader/patch', resolve('src/demo.js')],
    },
    output: {
        path: resolve('build'),
        filename: '[name].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'popup page',
            filename: 'popup.html',
            template: 'public/popup.html',
            chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
            title: 'demo page',
            filename: 'demo.html',
            template: 'public/demo.html',
            chunks: ['demo'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                'manifest.json',
                { from: 'src/icons', to: 'icons' },
                { from: 'src/music', to: 'music' },
            ],
        }),
    ],
    devServer: {
        port: 3000,
        progress: true,
        // compress: true,
        openPage: 'demo.html',
        contentBase: './build',
        open: true,
        hot: true,
    },
};
