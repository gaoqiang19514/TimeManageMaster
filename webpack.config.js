const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(filename) {
    return path.resolve(__dirname, filename);
}

module.exports = {
    mode: 'development',
    optimization: {
        // 关闭默认开启的tree-shaking
        usedExports: false,
        minimize: false,
    },
    entry: {
        index: resolve('src/index.js'),
        background: resolve('src/background.js'),
        popup: resolve('src/popup.js'),
        content_script: resolve('src/content_script.js'),
    },
    output: {
        path: resolve('build'),
        filename: '[name].js',
        clean: true,
    },
    resolve: {
        alias: {
            '@': resolve('src'),
        },
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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index page',
            filename: 'index.html',
            template: 'public/index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            title: 'popup page',
            filename: 'popup.html',
            template: 'public/index.html',
            chunks: ['popup'],
        }),
        new HtmlWebpackPlugin({
            title: 'demo page',
            filename: 'demo.html',
            template: 'public/index.html',
            chunks: ['demo'],
        }),
        new CopyWebpackPlugin({
            patterns: ['manifest.json', { from: 'src/icons', to: 'icons' }],
        }),
    ],
    devServer: {
        port: 3000,
        progress: true,
        compress: true,
        openPage: 'index.html',
        contentBase: './build',
        open: true,
        hot: true,
    },
};
