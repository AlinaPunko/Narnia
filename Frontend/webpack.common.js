const path = require('path');

module.exports = {
    entry: ['./src/index.jsx'],
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.jsx', '.js', '.scss']
    },
    output: {
        filename: 'js/main.js',
        publicPath: '/',
        path: path.resolve('../', 'Backend/wwwroot')
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: [/node_modules/]
        },
        {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            options: {
                extract: false,
                symbolId: '[folder]-[name]'
            }
        }
        ]
    }
};
