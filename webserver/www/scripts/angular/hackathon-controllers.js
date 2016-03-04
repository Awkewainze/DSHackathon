(function () {
    var app = angular.module('hackathon.controllers', ['ui.router',
        'hackathon.services']);
    
    app.controller('HomeController', ['$timeout', '$scope', 'HackathonDAL', 
        function ($timeout, $scope, HackathonDAL) {
            var runUpdate = true;
            
            $scope.weather = null;
            $scope.tempConfig = null;
            $scope.temprStyle= {
                'background-color': 'rgb(128, 128, 128)'
            };
            
            $scope.colors = {
                'light-blue': [20, 200, 200],
                green: [20, 200, 20],
                red: [200, 20, 20]
            };
            
            var updateTempr = function() {
                var temprString = 'rgb(';
                if ($scope.weather) {
                    var colorName = $scope.weather.temprColor;
                    var configData = $scope.colors[colorName];
                    temprString += String(configData[0]) + ',';
                    temprString += String(configData[1]) + ',';
                    temprString += String(configData[2]) + ')';

                    $scope.temprStyle['background-color'] = temprString;
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
                    $timeout(updateCycler, 5000);
                }
            };
            
            console.log('Starting update cycler');
            updateCycler();
    }]);
    
    app.controller('OptionsController', ['HackathonDAL', function (HackathonDAL) {
            
    }]);
})();