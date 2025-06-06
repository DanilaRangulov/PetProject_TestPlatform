import {BuildOptions} from "./types/config";
import webpack from "webpack";
import path from "path";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";
import {buildOptimization} from "./buildOptimization";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
    const {paths, mode, isDev} = options;
    return {
        mode: mode,

        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            assetModuleFilename: 'assets/images/[name][ext]',
            clean: true,
            publicPath: '/'
        },
        plugins: buildPlugins(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        // devtool: 'inline-source-map',
        module: {
            rules: buildLoaders(options)
        },
        optimization: buildOptimization(options), // Подключение оптимизации
        resolve: buildResolvers(options),
        devServer: buildDevServer(options),
    }
}