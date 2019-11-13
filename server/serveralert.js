const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;



const mockResponse = {
    foo: 'bar',
    bar: 'foo'
};

if (process.env.NODE_ENV !== 'production') {

    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }));

} else {
    const DIST_DIR = path.join(__dirname, '../dist');
    const HTML_FILE = path.join(DIST_DIR, 'index.html');

    app.use(express.static(DIST_DIR));

    app.get('*', (req, res) => {
        res.sendFile(HTML_FILE); // EDIT
    });
}

app.get('/api', (req, res) => {
    res.send(mockResponse);
});

app.listen(port, function () {
    console.log('App listening on port: ' + port);
});