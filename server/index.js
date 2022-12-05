import express from 'express'
import path from 'path'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.dev'
import GraphHTTP from 'express-graphql';
var fs = require('fs');
// import postgraphql from 'postgraphql'
import solutionAI from './controllers/solutionAI';

import api from './api/index';
var CronJob = require('cron').CronJob;
let app = express();
let appPath = "/client/";

const compiler = webpack(webpackConfig)


//This is the implementation for vanila GraphQL on the top of sequelizer
// app.use('/graphql', GraphHTTP({
//   schema: Schema,
//   pretty: true,
//   graphiql: true
// }));

app.use(bodyParser({ uploadDir: path.join(__dirname, 'files'), keepExtensions: true }));

app.use('/api', api);

let parent = "";
if(process.platform == 'linux') {
    parent = __dirname.substring(0, __dirname.lastIndexOf('/'))
} else {
    parent = __dirname.substring(0, __dirname.lastIndexOf('\\'))
}

app.use(express.static(parent+'/files'))

process.env.PARENT = parent;

app.use(express.static(parent));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

var port =9000
app.listen(port, () => console.log('Running on port '+port));

//Used for scheduled cronjob to create csv files for recommemded algorithms
//This job will run forever till the application stops with an interval of 15 minut
// new CronJob('00 */30 * * * *', function() {
//     let params = '';
//     solutionAI.createStagingFile(params, function(s, c, m, d) {
//         console.log(s, c, m, d);
//         });
//     console.log('Running job in each 15 minutes');
// }, null, true, 'Asia/Kolkata');

