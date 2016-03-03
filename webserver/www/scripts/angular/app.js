(function () {
    var app = angular.module('hackathon.base', ['hackathon.controllers', 
        'ui.bootstrap', 'ui.router', 'ngAnimate']);
    
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/');
            
            $stateProvider.state('index', {
                url: '/',
                views: {
                    'baseView': {
                        templateUrl: '/static/templates/index-page.html'
                    }
                }
            });
            
            $stateProvider.state('services', {
                url: '/services',
                views: {
                    'baseView': {
                        templateUrl: '/static/templates/services-page.html'
                    }
                }
            });
        }]);
})();