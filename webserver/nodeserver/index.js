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
    res.send(JSON.stringify({
        currentTemp: '50F',
        temprColor: 'green'
    }));
});

app.get('/tempConfig', function (req, res) {
    res.send(JSON.stringify({
        temperatureColors: {
            cold: 'light-blue',
            warm: 'green',
            hot: 'red'
        },
        temperatureDefs: {
            'light-blue': [20, 200, 200],
            green: [20, 200, 20],
            red: [200, 20, 20]
        }
    }));
});

app.put('/tempConfig', function (req, res) {
    res.send(JSON.stringify({
        temperatureColors: {
            cold: [0, 0, 255],
            warm: [0, 255, 0],
            hot: [255, 0, 0]
        },
        temperatureDefs: {
            
        }
    }));
});

var server = app.listen('80', function() {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('Running server on http://%s:%s', host, port);
    console.log('Server directory: %s', __dirname);
});