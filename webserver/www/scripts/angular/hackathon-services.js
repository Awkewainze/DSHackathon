(function () {
    var app = angular.module('hackathon.services', []);
    
    app.factory('HackathonDAL', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
            var tempSettings = null;
            var weatherInfo = null;
            
            var runUpdate = true;
            
            var weatherErrorFlag = false;
            var tempErrorFlag = false;
            
            var getCurrentWeather = function() {
                return weatherInfo;
            };
            
            var getTempSettings = function() {
                return tempSettings;
            };
            
            var setTempSettings = function(tempS) {
                $http.put('/tempConfig', tempS).then(function (success) {
                    
                }, function (error) {
                    weatherErrorFlag = true;
                });
            };
            
            var setAutoUpdate = function(isUpdate) {
                runUpdate = isUpdate;
            };
            
            var updateInfo = function() {
                    $http.get('/weather').then(function (success) {
                        if (success.status === 200) {
                            weatherInfo = success.data;
                        }
                    }, function (error) {
                        weatherErrorFlag = true;
                    });
                    $http.get('/tempconfig').then(function (success) {
                        
                    }, function (error) {
                        tempErrorFlag = true;
                    });
            };
            
            var updateCycler = function() {
                if (runUpdate) {
                    updateInfo();
                    $timeout(updateCycler, 1000);
                } else {
                    $timeout(updateCycler, 5000);
                }
            };
            
            
            return {
                getCurrentWeather: getCurrentWeather,
                getTempSettings: getTempSettings,
                setTempSettings: setTempSettings,
                setAutoUpdate: setAutoUpdate
            };
    }]);
})();