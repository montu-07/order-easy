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
            auth: "auth@http://localhost:3002/remoteEntry.js",
            products: "products@http://localhost:3003/remoteEntry.js",
          },
          exposes: {
            "./authSlice": "./src/redux/authSlice",
            "./hooks": "./src/redux/hooks",
            "./store": "./src/redux/store",
          },
          shared: {
            react: { singleton: true, requiredVersion: "^18.2.0" },
            "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
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
