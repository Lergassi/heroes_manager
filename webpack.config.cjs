const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: [
        // './client/public/src/index.js',
        // './client/public/src/test.js',
        // './client_lib/index.js',
        './client/index.js',
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'static/js/lib'),
        libraryTarget: 'amd',
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //     filename: 'css/main.css',
        // }),
    ],
    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     use: [
            //         // MiniCssExtractPlugin.loader,
            //         'style-loader',
            //         'css-loader',
            //     ],
            // },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    target: ['web', 'es5']
};