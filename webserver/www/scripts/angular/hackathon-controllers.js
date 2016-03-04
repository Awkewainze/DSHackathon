(function () {
    var app = angular.module('hackathon.controllers', ['ui.router',
        'hackathon.services']);
    
    app.controller('HomeController', ['$timeout', '$scope', 'HackathonDAL', 
        function ($timeout, $scope, HackathonDAL) {
            
            var canvas = document.getElementById('canvas');
            var context = canvas.getContext('2d');
            context.canvas.width = 900;
            context.canvas.height = 400;
            
            var POINT_X_SPACING = 20;
            var POINT_COUNT = context.canvas.width / POINT_X_SPACING + 1;
            
            var colors = {
                red: [200, 50, 50],
                green: [50, 200, 50],
                'light-blue': [50, 200, 200]
            };
            
            var runUpdate = true;
            
            $scope.weather = null;
            $scope.tempConfig = null;
            $scope.temprStyle= {
                'background-color': 'rgb(128, 128, 128)'
            };
            
            $scope.colorVal = '';
            $scope.tempCache = [];
            
            var addWeatherData = function(weatherData) {
                var id = 0;
                if ($scope.tempCache.length > 0) {
                    id = $scope.tempCache[$scope.tempCache.length-1] + 1;
                }
                var p = {
                    id: id,
                    x: $scope.tempCache.length*POINT_X_SPACING,
                    y: weatherData.currentTemp,
                    color: weatherData.temprColor
                };
                $scope.tempCache.push(p);
                if ($scope.tempCache.length > POINT_COUNT) {
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    $scope.tempCache.splice(0, 1);
                }
                draw($scope.tempCache);
            };
            
            var updateTempr = function() {
                if ($scope.weather) {
                    var colorName = $scope.weather.temprColor;
                    $scope.colorVal = colorName + 'Bg';
                    addWeatherData($scope.weather);
                }
            };
            
            var updateCycler = function() {
                if (runUpdate) {
                    HackathonDAL.getCurrentWeather().then(function (success) {
                        $scope.weather = success;
                        updateTempr();
                    }, function (error) {
                        console.log(error);
                    });
                    $timeout(updateCycler, 1000);
                } else {
                    $timeout(updateCycler, 10000);
                }
            };
            
            function draw(data) {
                for (var i=0; i < data.length; i++) {
                    drawPoint(data[i], i*POINT_X_SPACING);
                    if (i > 0) {
                        drawLine(data[i], i*POINT_X_SPACING, data[i-1], (i-1)*POINT_X_SPACING);
                    }
                }
            }
            
            function drawPoint(data, x) {
                context.beginPath();
                context.arc(x, context.canvas.height-data.y*3, 2, 0, 2*Math.PI, false);
                var fillString = "rgb(" + String(colors[data.color][0]);
                fillString += "," + String(colors[data.color][1]);
                fillString += "," + String(colors[data.color][2]);
                fillString += ")";
                context.fillStyle = fillString;
                //context.fillStyle = '#000000';
                context.fill();
            }
            
            function drawLine(data1, x1, data2, x2) {
                context.beginPath();
                var fillString = "rgb(" + String(colors[data1.color][0]);
                fillString += "," + String(colors[data1.color][1]);
                fillString += "," + String(colors[data1.color][2]);
                fillString += ")";
                context.strokeStyle=fillString;
                context.linewidth=1;
                context.moveTo(x1, context.canvas.height-data1.y*3);
                context.lineTo(x2, context.canvas.height-data2.y*3);
                context.stroke();
            }
            
            console.log('Starting update cycler');
            updateCycler();
    }]);
    
    app.controller('OptionsController', ['HackathonDAL', function (HackathonDAL) {
            
    }]);
})();