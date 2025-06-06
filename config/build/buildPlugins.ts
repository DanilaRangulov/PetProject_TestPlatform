import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";
import CompressionPlugin from "compression-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

// const dotenvConfig = dotenv.config().parsed as Record<string, string | undefined> || {};

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:4].css',
            chunkFilename: 'css/[name].[contenthash:4].css',
        }),
        new CompressionPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env': Object.keys(dotenvConfig).reduce((acc: Record<string, string>, key) => {
        //         if (dotenvConfig[key]) {
        //             acc[key] = JSON.stringify(dotenvConfig[key]);
        //         }
        //         return acc;
        //     }, {}),
        // }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: `${paths.src}/shared/assets/images/favicons`, to: "./" },
        //     ],
        // }),
        new Dotenv()
    ]
}