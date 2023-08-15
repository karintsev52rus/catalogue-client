const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack');

const production = process.env.NODE_ENV === 'production';

const babelOptions = preset => {
  const opts = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }]

  return loaders
}

module.exports = {
  entry: './src/index.tsx',
  output : {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
    clean: true
  },
  devServer:{
    hot: true,
    port: 3000,
    historyApiFallback: true,
    static: "./dist"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
},

  module:{
    rules: [
      {
        test: /\.js?$/, // определяем тип файлов
        exclude: /node_modules/,  // исключаем из обработки папку node_modules
        use: jsLoaders()
      },
      {
        test: /\.(ts)?$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.(tsx)?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.jsx?$/, // определяем тип файлов
        exclude: /node_modules/,  // исключаем из обработки папку node_modules
        use:{
          loader: "babel-loader",   // определяем загрузчик
          options: babelOptions("@babel/preset-react")
        }
      },
      {
        test: /\.(css|sass|scss)$/i,
        use:  [
          (production?
          MiniCssExtractPlugin.loader
          :
          'style-loader'),
          "css-loader", 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator:{
            filename: "img/[hash][ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator:{
          filename: "fonts/[name][ext]"
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  plugins:[
    new Dotenv(),
    
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: {
        collapseWhitespace: (production? true : false)
      },
      favicon: "./src/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    })
  ],

  mode: production? "production" : "development"

}
