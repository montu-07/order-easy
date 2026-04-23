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
          name: 'cart',
          filename: 'remoteEntry.js',
          exposes: {
            './CartPage': './src/pages/CartPage',
            './CartList': './src/components/CartList',
            './CartItem': './src/components/CartItem',
          },
          remotes: {
            host: 'host@http://localhost:3000/remoteEntry.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: "^18.2.0",
            },
            'react-dom': {
              singleton: true,
              requiredVersion: "^18.2.0",
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
