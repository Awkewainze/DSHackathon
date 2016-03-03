(function () {
    var app = angular.module('hackathon.base', ['hackathon.controllers', 
        'ui.bootstrap', 'ui.router', 'ngAnimate']);
    
    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.state('index', {
                url: '',
                views: {
                    'baseView': {
                        templateUrl: '/templates/index-page.html'
                    }
                }
            });
            
            $stateProvider.state('services', {
                url: 'services',
                views: {
                    'baseView': {
                        templateUrl: '/templates/services-page.html'
                    }
                }
            });
        }]);
})();