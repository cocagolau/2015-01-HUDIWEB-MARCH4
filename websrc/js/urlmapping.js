march4.core = angular.module('march4', ['ngRoute']);

march4.core.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/',{
            templateUrl: '/frontpage.div',
            controller: march4.controller.frontController
        })
        .when('/world', {
            templateUrl: '/world.div',
            controller: 'WorldController'
        })
        .when('/world/:worldId', {
            templateUrl: '/world.div',
            controller: 'WorldController'
        })
        .when('/world/:worldId/project/:projectId', {
            templateUrl: '/project.div',
            controller: 'ProjectController'
        })
        .when('/building', {
            templateUrl: '/building.div',
            controller: 'BuildingController'
        })
        .otherwise({
            redirectTo: '/error/404'
        });

    $locationProvider.html5Mode(true).hashPrefix('!');
}]);


march4.core.controller('WorldController', march4.controller.worldController);
march4.core.controller('ProjectController', march4.controller.projectController);
march4.core.controller('BuildingController', march4.controller.buildingController);