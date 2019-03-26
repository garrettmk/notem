const path = require('path');

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /\.less$/,
    loaders: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: { javascriptEnabled: true }
      }
    ],
  });

  return config;
};
