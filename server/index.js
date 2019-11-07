const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.config.js');
const compiler = webpack(config);

const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));
app.use(express.static(DIST_DIR));
app.get('/api', (req, res) => {
    res.send(mockResponse);
});
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE); // EDIT
});
app.listen(port, function () {
    console.log('App listening on port: ' + port);
});