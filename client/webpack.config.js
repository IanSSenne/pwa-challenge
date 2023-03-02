const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
	/**
	 * @type {import('webpack').Configuration}
	 */
	let conf = {
		mode: "development",
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
		},
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
			publicPath: "",
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new HtmlWebpackPlugin({
				template: "index.html",
			}),
			new WebpackPwaManifest({
				name: "Text Editor",
				short_name: "Text Editor",
				description: "A text editor for your browser",
				background_color: "#01579b",
				theme_color: "#ffffff",
				start_url: "/",
			}),
			new InjectManifest({
				swSrc: "./src-sw.js",
			}),
		],

		module: {
			rules: [
				// css loader
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				// babel loader
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
			],
		},
	};
	return conf;
};
