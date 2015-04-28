march4.core = angular.module('march4',['ngRoute']);
march4.core.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',{
            templateUrl: '/frontpage.div',
            controller: march4.controller.frontController
        })
        .when('/world',{
            templateUrl: '/world.div',
            controller: march4.controller.worldController
        })
        .otherwise({
            redirectTo: '/error/404'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
});
