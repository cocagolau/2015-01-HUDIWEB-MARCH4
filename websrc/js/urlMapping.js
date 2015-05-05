(function () {
    'use strict';

    function addControllerJs(){
        return {
            load: function($q, $route, $rootScope) {
                var deferred = $q.defer();
                var controllerPath = '/js/';
                var controllerName = $route.current.$$route.controller;
                
                march4.util.addScript(controllerPath+controllerName+'.js',function(){
                    deferred.resolve();
                });

                return deferred.promise;
            }
        };
    }

    march4.app.config(['$routeProvider', '$locationProvider', '$controllerProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl: '/div/frontpage',
                controller: 'frontpageController',
                resolve: addControllerJs()
            })
            .when('/world', {
                templateUrl: '/div/world',
                controller: 'worldController',
                resolve: addControllerJs()
            })
            .when('/world/:worldId', {
                templateUrl: '/div/world',
                controller: 'worldController',
                resolve: addControllerJs()
            })
            .when('/building', {
                templateUrl: '/div/building',
                controller: 'buildingController',
                resolve: addControllerJs()
            })
            .when('/dummy/:dummyId', {
                templateUrl: '/div/dummy',
                controller: 'dummyController',
                resolve: addControllerJs()
            })
            .otherwise({
                redirectTo: document.location.pathname
            });


        $locationProvider.html5Mode(true).hashPrefix('!');      
    }]);
}());