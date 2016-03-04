(function () {
    var app = angular.module('hackathon.services', []);
    
    app.factory('HackathonDAL', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
            
            var getCurrentWeather = function() {
                var deferred = $q.defer();
                
                $http.get('/weather').then(function (success) {
                    if (success.status === 200) {
                        deferred.resolve(success.data);
                    } else {
                        deferred.reject(success);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            var getTempSettings = function() {
                var deferred = $q.defer();
                
                $http.get('/tempConfig').then(function (success) {
                    if (success.status === 200) {
                        deferred.resolve(success.data);
                    } else {
                        deferred.reject(success);
                    }
                }, function (error) {
                    deferred.reject(error);
                });
                
                return deferred.promise;
            };
            
            var setTempSettings = function(tempS) {
                $http.put('/tempConfig', tempS).then(function (success) {
                    
                }, function (error) {
                    console.log(error);
                    weatherErrorFlag = true;
                });
            };
            
            return {
                getCurrentWeather: getCurrentWeather,
                getTempSettings: getTempSettings,
                setTempSettings: setTempSettings,
            };
    }]);
})();