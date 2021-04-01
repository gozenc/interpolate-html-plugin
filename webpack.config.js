const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("./dist/index");
const path = require("path")

module.exports = {
    mode: "production",
    entry: './test/src/index.ts',
    output: {
        path: __dirname + '/test/dist',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                loader: "ts-loader",
                exclude: [path.resolve("./node_modules")],
                options: {
                    transpileOnly: true,
                },
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlWebpackPlugin({
                template: "./test/src/index.html",
            }),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                }
            })
        ]

    },
    plugins: [
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            SELCUK_URL: "https://www.shopier.com/ShowProductNew/storefront.php?shop=vildanelsanatlari",
        }),
    ],
    resolve: {
        extensions: [".ts"],
    },

}