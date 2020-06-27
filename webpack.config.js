const path = require('path');
const fs = require('fs');
const nodeBuiltins = require('builtin-modules');

const lambdaDir = 'src/lambda';
const lambdaNames = fs.readdirSync(path.join(__dirname, lambdaDir));

const entry = lambdaNames.reduce((entryPoints, lambdaName) => {
    const tsPath = path.join(__dirname, lambdaDir, `${lambdaName}/index.ts`);
    const jsPath = path.join(__dirname, lambdaDir, `${lambdaName}/index.js`);

    const isTsFile = fs.existsSync(tsPath);
    const isJsFile = fs.existsSync(jsPath);
    if (isTsFile) {
        entryPoints[lambdaName] = tsPath;
    } else if (isJsFile) {
        entryPoints[lambdaName] = jsPath;
    }

    return entryPoints;
}, {});

const externals = ['aws-sdk'].concat(nodeBuiltins).reduce((externals, moduleName) => {
    externals[moduleName] = moduleName;
    return externals;
}, {});

module.exports = {
    entry,
    externals,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: { onlyCompileBundledFiles: true },
                },
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'dist', lambdaDir),
        libraryTarget: 'commonjs',
        filename: '[name]/index.js',
    },
    target: 'node',
    optimization: {
        minimize: false,
    },
    devtool: 'inline-cheap-module-source-map',
};
