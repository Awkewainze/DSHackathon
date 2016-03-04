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
            
            $scope.colorVal = '';
            
            var updateTempr = function() {
                var temprString = 'rgb(';
                if ($scope.weather) {
                    var colorName = $scope.weather.temprColor;
                    $scope.colorVal = colorName + 'Bg';
                }
            };
            
            var updateCycler = function() {
                if (runUpdate) {
                    HackathonDAL.getCurrentWeather().then(function (success) {
                        $scope.weather = success;
                        console.log(success);
                        updateTempr();
                    }, function (error) {
                        console.log(error);
                    });
                    $timeout(updateCycler, 5000);
                } else {
                    $timeout(updateCycler, 10000);
                }
            };
            
            console.log('Starting update cycler');
            updateCycler();
    }]);
    
    app.controller('OptionsController', ['HackathonDAL', function (HackathonDAL) {
            
    }]);
})();