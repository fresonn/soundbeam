const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: { lib: glob.sync('./src/**/*(*.ts|*.js)') },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ogg|mp3|wav)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'public/index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
    static: [
      {
        directory: path.resolve(__dirname, 'assets'),
        publicPath: '/assets'
      }
    ]
  }
}
