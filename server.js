var webpack = require('webpack');
var path = require('path');
var express = require('express');
var app = new (require('express'))();

var config = require('./webpack.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(config);

var port = process.env.PORT || 3000;

var isDevelopment = (process.env.NODE_ENV !== 'production');

var static_path = path.join(__dirname, 'public');

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


app.use(express.static(static_path))
    .get("/", function(req, res) {
      res.sendFile(__dirname + '/index.html');
});

    app.listen(port, function(error) {
      if (error) {
        console.error(error);
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
        console.log("==> 🌎  Environment is currently: " + (isDevelopment === true ? "Development" : "Production"));
    }
});
