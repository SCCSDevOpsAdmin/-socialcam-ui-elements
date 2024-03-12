const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const deps = require('./package.json').dependencies;

const PORT = 3006;
const basePath = __dirname;
const isDevelopment = process.env.NODE_ENV !== 'production';

const Plugins = [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebPackPlugin({
        template: './public/index.html',
    }),
];

module.exports = {
    entry: isDevelopment ? './app/index.ts' : './src/index.ts',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.svg'],
        alias: {
            src: path.resolve('./src/'),
            app: path.resolve('./app/'),
            public: path.resolve('./public/'),
        },
    },
    output: {
        publicPath: `http://localhost:${PORT}/`,
        filename: '[name].[hash].js',
        path: path.resolve(basePath, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        port: PORT,
        historyApiFallback: true,
        hot: true,
    },

    module: {
        rules: [
            {
                test: /\.m?js/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
                //use: {
                //    loader: 'svg-url-loader',
                //    options: {
                //        encoding: 'base64'
                //    }
                //}
            },
            {
                test: /\.(sass|scss|css)$/i,
                //test: /\.s[ac]ss$/i,
                //exclude: /\.module\.s[ac]ss$/,
                use: [
                    isDevelopment
                        ? { loader: MiniCssExtractPlugin.loader }
                        : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            //importLoaders: 1,
                            //modules: {
                            //  mode: 'icss'
                            //},
                            sourceMap: true,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            //additionalData: `@use './assets/scss/abstracts' as *;`
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                //type: 'asset/inline', //creates images and compile them into javascript

                //type: 'asset', //creates images and compile them into javascript or in folder automaticaly based on size
                //parser: { dataUrlCondition: { maxSize: 30 * 1024 } } //combining a parser with a max size will compile images larger than size defined into code
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: isDevelopment
                    ? ['/node_modules/']
                    : ['/node_modules/', '/app/**/*'],
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins: Plugins,
};
