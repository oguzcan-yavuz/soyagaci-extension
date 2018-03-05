const path = require('path');

module.exports = {
    entry: {
        extension: './src/js/background.js',
        display: './lib/connectors.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};
