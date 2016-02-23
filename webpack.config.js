var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({ //压缩代码
        compress: {
            warnings: false
        },
        except: ['$super', '$', 'exports', 'require'] //排除关键字
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    // SASS
    {
      test: /\.scss$/,
      loader: 'style!css!sass'
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  }
};
