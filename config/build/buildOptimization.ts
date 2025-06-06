import { BuildOptions } from './types/config';
import { Configuration } from 'webpack';

export function buildOptimization(options: BuildOptions): Configuration['optimization'] {
    const isProd = !options.isDev;

    return {
        splitChunks: {
            cacheGroups: {
                react: {
                    test: "react",
                    name: "react",
                    chunks: "all",
                },
                commons: {
                    minChunks: 2,
                    minSize: 0,
                    chunks: "initial",
                },
            },
        },
    };
}