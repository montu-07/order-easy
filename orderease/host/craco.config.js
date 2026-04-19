const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const newWebpackConfig = { ...webpackConfig };

      // Add Module Federation plugin
      newWebpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'host',
          filename: 'remoteEntry.js',
          remotes: {
            auth: 'auth@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: '^18.2.0',
              eager: true,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: '^18.2.0',
              eager: true,
            },
            'react-router-dom': {
              singleton: true,
              requiredVersion: '^5.3.4',
              eager: true,
            },
          },
        })
      );

      // Fix for Module Federation
      newWebpackConfig.output.publicPath = 'auto';

      return newWebpackConfig;
    },
  },
};
