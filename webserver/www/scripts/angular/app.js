(function () {
    var app = angular.module('hackathon.base', ['hackathon.controllers', 
        'hackathon.services', 'ui.bootstrap', 'ui.router', 'ngAnimate']);
    
    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.when('', '/');
            
            $stateProvider.state('index', {
                url: '/',
                views: {
                    'baseView': {
                        templateUrl: '/static/templates/index-page.html',
                        controller: 'HomeController'
                    }
                }
            });
            
            $stateProvider.state('options', {
                url: '/options',
                views: {
                    'baseView': {
                        templateUrl: '/static/templates/options-page.html',
                        controller: 'OptionsController'
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