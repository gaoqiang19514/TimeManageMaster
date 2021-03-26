const path = require('path');
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
        new HtmlWebpackPlugin({
            title: 'popup page',
            filename: 'popup.html',
            template: 'public/popup.html',
            chunks: ['popup'],
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
        contentBase: './build',
        open: true,
    },
};
