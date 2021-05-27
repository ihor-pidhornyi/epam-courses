const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env) => {
    const babelOptions = () => {
        return {
            presets: [
                '@babel/preset-env'
            ]
        }
    }
    const jsLoaders = () => {
        const loaders = [{
            loader: 'babel-loader',
            options: babelOptions()
        }];

        if (env.development) {
            loaders.push('eslint-loader')
        }

        return loaders;
    }
    const cssLoaders = extra => {
        const config = [{
                loader: MiniCssExtractPlugin.loader,
                options: {},
            },
            'css-loader'
        ]

        if (extra) {
            config.push(extra);
        }

        return config;
    }
    const optimization = () => {
        const config = {}

        if (env.production) {
            config.minimizer = [
                new CssMinimizerPlugin(),
                new TerserPlugin()
            ]
        }

        return config
    }
    return {
        context: path.resolve(__dirname, 'src'),
        mode: env.production ? 'production' : 'development',
        target: 'web',
        entry: {
            main: ['@babel/polyfill', './js/index.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                    test: /\.s[ac]ss/,
                    use: cssLoaders('sass-loader')
                },
                {
                    test: /\.less/,
                    use: cssLoaders('less-loader')
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: jsLoaders()
                },
                {
                    test: /\.(jpg|jpeg|png|ttf)$/,
                    loader: 'file-loader'
                },

            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: {
                    collapseWhitespace: env.production
                }
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    plugins: [
                        ['jpegtran', {
                            progressive: true
                        }],
                        ['optipng', {
                            optimizationLevel: 5
                        }],
                    ],
                },
            })
        ],
        devServer: {
            port: 4200,
            hot: env.development
        },
        optimization: optimization()
    }
}