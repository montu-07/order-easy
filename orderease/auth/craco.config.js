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
              requiredVersion: '^7.14.1',
              eager: true,
            },
            '@reduxjs/toolkit': {
              singleton: true,
              requiredVersion: '^1.9.1',
              eager: true,
            },
            'react-redux': {
              singleton: true,
              requiredVersion: '^8.0.5',
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
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
