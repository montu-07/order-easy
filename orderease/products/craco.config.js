const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.entry = './src/index.tsx';
      webpackConfig.output.publicPath = 'auto';
      webpackConfig.optimization.runtimeChunk = false;

      if (webpackConfig.optimization.splitChunks) {
        webpackConfig.optimization.splitChunks = {
          ...webpackConfig.optimization.splitChunks,
          cacheGroups: {
            default: false,
          },
        };
      }

      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'products',
          filename: 'remoteEntry.js',
          exposes: {
            './ProductPage': './src/pages/ProductPage',
            './ProductList': './src/components/ProductList',
            './ProductCard': './src/components/ProductCard',
          },
          remotes: {
            host: 'host@http://localhost:3000/remoteEntry.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
            'react-router-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
        })
      );

      return webpackConfig;
    },
  },
};