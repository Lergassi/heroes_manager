const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    // mode: 'production',
    // entry: [
    //     // './client/public/src/index.js',
    //     // './client/public/src/test.js',
    //     // './client_lib/index.js',
    //     './client/index.js',
    // ],
    // devtool: "eval-source-map",
    // devtool: "source-map",
    // devtool: "eval-cheap-module-source-map",
    // entry: {
    //     client: './client/index.js',
    //     sandbox: './client/sandbox.js',
    // },
    entry: {
        client: './dist/client/index.js',
        // sandbox: './dist/client/sandbox.js',
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].bundle.js',
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