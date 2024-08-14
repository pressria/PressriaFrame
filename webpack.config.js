const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
//const HtmlWebPackPlugin = require("html-webpack-plugin");
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	mode: 'development',
	//mode: 'production',
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + '/output', 
		filename: 'pressriaFrame.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				// Transform our own .css files with PostCSS and CSS-modules
				test: /\.css$/,
				//exclude: /node_modules/,
				use: ['css-loader'] //개발
				//use: [MiniCssExtractPlugin.loader, 'css-loader'] //배포
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader,
					{
					  loader: 'css-loader',
					  options: {
						importLoaders: 1,
						url: true // Enable/disable url() resolving.
					  }
					},
					'postcss-loader',
					'sass-loader'
				] 
			},
			{
				test: /\.(eot|gif|otf|png|svg|ttf|woff|woff2)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
				  {
					loader: "url-loader"
				  },
				]
			},
			{
				test: /\.html$/,
				loader: "es6-template-string"
			},
			{
				test: /\.js$/,
				include: path.join(__dirname),
				exclude: /(node_modules)|(dist)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'pressriaFrame.css'
		})
	],
};
