const webpack = require('webpack');
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const newWebpackConfig = { ...webpackConfig };

      // Add Module Federation plugin
      newWebpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: 'auth',
          filename: 'remoteEntry.js',
          exposes: {
            './Login': './src/bootstrap/LoginApp',
            './Signup': './src/bootstrap/SignupApp',
          },
          remotes: {
            host: "host@http://localhost:3000/remoteEntry.js",
          },
          shared: {
            react: { singleton: true, requiredVersion: false },
            "react-dom": { singleton: true, requiredVersion: false },
            "react-router-dom": { singleton: true, requiredVersion: false },
            "react-redux": { singleton: true, requiredVersion: false },
            "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
          },
        })
      );

      // Fix for Module Federation
      newWebpackConfig.output.publicPath = 'auto';

      return newWebpackConfig;
    },
  },
};
