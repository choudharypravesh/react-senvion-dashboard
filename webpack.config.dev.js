import path from 'path';
import webpack from 'webpack'

export default {
    devtools: "eval-source-map", //So that we dont lose our minds while debugging
    devServer: {
        historyApiFallback: true
    },
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'client/index.js')
    ],
    output: {
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.css$/,
                exclude: /\.useable\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.useable\.css$/,
                loader: "style-loader/useable!css-loader"
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url"
            },
            {
                test: /\.(otf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            },
            {
                test: /\.(ttf)$/,
                loader: "file"
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
}
