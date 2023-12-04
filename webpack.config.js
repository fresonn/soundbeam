const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.ts'),
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
    // new HtmlWebpackPlugin({
    //   title: 'Development',
    //   template: 'public/index.html'
    // })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    library: '$',
    libraryTarget: 'umd'
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: false,

    port: 4000,
    static: [
      {
        directory: path.resolve(__dirname, 'assets'),
        publicPath: '/assets'
      },
      {
        directory: path.resolve(__dirname, 'public'),
        publicPath: '/'
      }
    ]
  }
}
