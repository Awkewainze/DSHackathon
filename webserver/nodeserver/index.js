var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

console.log(__dirname);

app.use('/static', express.static(__dirname + '/../www'));
app.use('/index.html', express.static(__dirname + '/../www/index.html'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/../www/index.html"));
});

app.get('/weather', function (req, res) {
    res.send('Good test');
});

app.get('/tempConfig', function (req, res) {
    res.send('Good temp');
});

app.put('/tempConfig', function (req, res) {
    res.send('Yeah, sure thing buddy.');
});

var server = app.listen('8081', function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('New request to http://%s:%s', host, port);
});

console.log("Node server on %s", __dirname);