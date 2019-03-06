module.exports = {
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['last 2 versions', 'not ie 10', 'not < 1%'],
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
  ],
};
