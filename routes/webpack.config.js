const path = require('path');

module.exports = {
    entry: './api.js',  // arquivo principal
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
};
