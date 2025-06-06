import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    const cssLoader = {
            test: /\.(sass|css|scss)$/,
            use: [
                // Creates `style` nodes from JS strings
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                            localIdentName: isDev
                                ? '[path][name]__[local]'
                                : '[hash:base64:8]'
                        },
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer",
                                    {
                                        overrideBrowserslist: [
                                            "last 10 versions",
                                            "> 0.5%",
                                            "ie 11",
                                            "Firefox ESR"
                                        ],
                                    }
                                ],
                            ],
                        },
                    },
                },
                // Compiles Sass to CSS
                {
                    loader: "sass-loader",
                    options: {
                        // Prefer `dart-sass`, even if `sass-embedded` is available
                        implementation: require("sass"),
                    },
                },
            ],
        }
    const imageLoader = {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    return [
        typescriptLoader,
        cssLoader,
        imageLoader,
        svgLoader
    ]
} 