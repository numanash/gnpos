const express = require('express');
const path = require('path');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;



// if (process.env.NODE_ENV !== 'production') {

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const config = require('../webpack.config.js');
// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: config.output.publicPath,
// }));

// } else {
// const DIST_DIR = path.join(__dirname, '../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

// app.use(express.static(DIST_DIR));

// app.get('/*', (req, res) => {
//     res.sendFile(HTML_FILE); // EDIT
// });
// }
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";

app.use(express);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("../dist"));
app.use(helmet());



// app.get('/api', (req, res) => {
//     res.send(mockResponse);
// });
require("./models/index");
require("./startup/globalAccess");
require("./startup/routes")(app);
require("./startup/config")();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


app.listen(port, function () {
    console.log('App listening on port: ' + port);
});