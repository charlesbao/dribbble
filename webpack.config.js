module.exports = function(webpackConfig) {
  // Fix ie8 compatibility
  webpackConfig.module.loaders.unshift({
    test: /\.jsx?$/,
    loader: 'es3ify-loader',
  });

  return webpackConfig;
};
