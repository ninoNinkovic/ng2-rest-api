const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: {
    'index': './src/index'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: 'ng2-rest-api',
    libraryTarget: 'commonjs'
  },
  resolve: {
    modules: ['./src', 'node_modules'],
    extensions: ['.ts', '.es6', '.js', '.json']
  },
  module: {
    rules: [
      {test: /\.ts$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015!ts-loader'}
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    ),
  ]
};

if (!(process.env.WEBPACK_ENV === 'production')) {
  config.devtool = 'source-map';
  config.plugins.push(new webpack.DefinePlugin({
      'WEBPACK_ENV': '"dev"'
    })
  );
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'WEBPACK_ENV': '"production"'
    })
  );
}

module.exports = config;
