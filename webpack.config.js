var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            },
            // --- The following lines will break out our compiled css file into a separte file, which could be nice for prod, breaks --
            // --- hot reloading stlyes however --
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap") },
            // { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap") },
            { test: /\.css$/, loaders: ["style-loader", "css-loader?sourceMap"] },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader?sourceMap!sass-loader?sourceMap"] },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.(jpg|jpeg|gif|png|ico)$/, exclude: /node_modules/, loader: 'url-loader?limit=8192' },
            { test: /\.(ico)$/, loader: "static-loader" }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // -- breaks out css
        // new ExtractTextPlugin('layout.css')
    ],
}