const presets = [
    [
        '@babel/preset-env',
        {
            targets: 'defaults',
            useBuiltIns: 'entry',
            corejs: 3
        }
    ],
    '@babel/preset-react'
];

const plugins = [
    '@babel/plugin-proposal-class-properties'
];
module.exports = { presets, plugins };
