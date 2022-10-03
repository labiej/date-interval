import path from 'path';
import { Configuration, node } from 'webpack';

const dist = './dist';

const general: Configuration = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    optimization: {
        usedExports: true,
    },
    entry: './src/index.ts',
}

const nodeConfig: Configuration = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, dist + '/node'),
        filename: 'node.js',
        libraryTarget: 'umd'
    }
};

const browserConfig: Configuration = {
    target: 'web',
    output: {
        path: path.resolve(__dirname, dist + '/web'),
        filename: 'main.js',
        libraryTarget: 'umd',
        library: 'testing',
        globalObject: 'this'
    }
};

export default (env: string, argv: string[]) => {
    return [{...general, ...nodeConfig}, {...general, ...browserConfig}];
};