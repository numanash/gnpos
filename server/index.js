const express = require('express');
const path = require('path');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
let app = express();



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

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, "dist")));
app.use(helmet());



// app.get('/api', (req, res) => {
//     res.send(mockResponse);
// });
require("./models/index");
require("./startup/globalAccess");
require("./startup/routes")(app);
require("./startup/config")();


const port = process.env.PORT || 3005;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.listen(port, function () {
    console.log('App listening on port: ' + port);
});