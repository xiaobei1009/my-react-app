// 一个常见的`webpack`配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		index : __dirname + "/src/index.js", //已多次提及的唯一入口文件
		test : __dirname + "/src/test.js"
	},
	output: {
		path: __dirname + "/build",
		filename: "[name]/bundle.js"
	},
	devtool: 'source-map',
	/*
	devServer: {
		contentBase: "./public", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true,
		hot: true
	},
	*/
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['es2015','react']
					}
				}
			}, {
				test: /\.css$/,
				//use: ['style-loader', 'css-loader']
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}, {
				test: /\.less$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings 
				}, {
					loader: "css-loader" // translates CSS into CommonJS 
				}, {
					loader: "less-loader" // compiles Less to CSS 
				}]
			}, {
				test: /\.svg/,
                use: {
                    loader: 'svg-url-loader'
                }
			}, {
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'images/[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
		//new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname + '/public/index.html',
			filename: 'index/index.html',
			hash: true,
			inject: 'body',
			//favicon: __dirname + '/public/favico.ico',
			chunks: ['index']
		}),
		//new webpack.optimize.OccurrenceOrderPlugin(),
		//new webpack.optimize.UglifyJsPlugin(),
		new HtmlWebpackPlugin({
			template: __dirname + '/public/test.html',
			filename: 'test/test.html',
			hash: true,
			inject: 'body',
			//favicon: __dirname + '/public/favico.ico',
			chunks: ['test']
		}),
		new ExtractTextPlugin({
			filename: '[name]/style.css'
		})
	]
};