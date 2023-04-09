const webpack = require('webpack');
const CracoLessPlugin = require('craco-less');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
  webpack: {
    configure: {
      resolve: {
        fallback: {
          crypto: require.resolve('crypto-browserify'),
          stream: require.resolve('stream-browserify'),
          assert: require.resolve('assert'),
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          os: require.resolve('os-browserify'),
          url: require.resolve('url'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
        new CompressionPlugin(), // gzip压缩插件
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: process.env.NODE_ENV === 'production', // 生产环境下移除控制台所有的内容
              drop_debugger: false, // 移除断点
              pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log'] : '', // 生产环境下移除console
            },
          },
        }),
        // new BundleAnalyzerPlugin(),
      ],
    },
  },
};
