const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					'react-hot-loader',
					{
						loader: 'babel-loader',
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'resolve-url-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur|mp3)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[path][name].[ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'index.html'),
			inject: 'body',
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
			'__DEV__': process.env.NODE_ENV === 'development',
			'__PROD__': process.env.NODE_ENV === 'production',
		}),
	],
	resolve: {
		alias: {
			api: path.resolve(__dirname, 'src/api'),
			assets: path.resolve(__dirname, 'src/assets'),
			constants: path.resolve(__dirname, 'src/constants'),
			components: path.resolve(__dirname, 'src/components'),
			containers: path.resolve(__dirname, 'src/containers'),
			routes: path.resolve(__dirname, 'src/routes'),
			store: path.resolve(__dirname, 'src/store'),
			utils: path.resolve(__dirname, 'src/utils'),
		},
		extensions: ['.js', '.jsx'],
	},
};