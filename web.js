var path = require('path');
var express = require('express');
var http = require('http')
var appEx = express();

appEx.use(express.static(path.join(__dirname, 'demo')));
appEx.use(express.static(path.join(__dirname, 'src')));

appEx.get('/', (req, res) => {
    res.sendFile(__dirname + '/demo/index.html');
});

appEx.get('/other', (req, res) => {
    res.sendFile(__dirname + '/demo/other.html');
});

// var app = http.createServer(appEx);

appEx.listen(8080, () => {
    console.log('Web started in : http://localhost:8080');
});