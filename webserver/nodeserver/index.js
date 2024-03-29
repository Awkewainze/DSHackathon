var http = require('http');
var express = require('express');
var path = require('path');

var app = express();

app.use('/static', express.static(__dirname + '/../www'));
app.use('/index.html', express.static(__dirname + '/../www/index.html'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/../www/index.html"));
});

var recordedTemps = [];

var calculateAverage = function () {
    var sum = 0;
    for (var x in recordedTemps) {
        sum += recordedTemps[x];
    }
    return (sum/recordedTemps.length);
};

app.get('/weather', function (req, res) {
    var temp = Math.floor((Math.random() * 120) + 1);
    recordedTemps.push(temp);
    if (recordedTemps.length > 10) {
        recordedTemps.splice(0, 1);
    }
    
    var temp = calculateAverage();
    if (temp < 30) {
        tempColor='light-blue';
    } else if (temp < 70) {
        tempColor='green';
    } else {
        tempColor='red';
    }
    
    res.send(JSON.stringify({
        currentTemp: String(temp),
        temprColor: tempColor
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