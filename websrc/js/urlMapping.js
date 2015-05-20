(function() {
	'use strict';

	function addControllerJs() {
		return {
			load : function($q, $route, $rootScope) {
				console.log($route);
				var deferred = $q.defer();
				var controllerPath = '/js/';
				var controllerName = $route.current.$$route.controller;

				march4.util.addScript(controllerPath + controllerName + '.js',
						function() {
							deferred.resolve();
						});

				return deferred.promise;
			}
		};
	}

	 march4.app.factory('HttpInterceptor', function ($q,$location) {
	    return {
	        response: function (response) {
	        	console.log(response.status);
	        	if(response.status === 401){
	        		console.log(1);
	        		$location.path('/');
	        	}
	            return response;
	        },
	        responseError: function (response) {
                console.log("error");
                console.log(response.status);
	            if(response.status === 401){
	        		console.log(1);
	        		$location.path('/');
	        	}
	            return response;
	        }
	    };
	});
	    
    
	march4.app.config([ '$routeProvider', '$locationProvider','$controllerProvider','$httpProvider', 
		function($routeProvider, $locationProvider, $controllerProvider, $httpProvider) {
			$httpProvider.interceptors.push('HttpInterceptor');
			
			$routeProvider.when('/', {
				templateUrl : '/div/frontpage',
				controller : 'frontpageController',
				resolve : addControllerJs()
			}).when('/world/:worldId?', {
				templateUrl : '/div/world',
				controller : 'worldController',
				resolve : addControllerJs()
			}).when('/building/:buildingId?/:panel?/:panelId?', {
				templateUrl : '/div/building',
				controller : 'buildingController',
				resolve : addControllerJs()
			}).when('/projects/:pId/quests', {
				templateUrl : '/div/roadmap',
				controller : 'roadmapController',
				resolve : addControllerJs()
			}).when('/dummy/:dummyId?/:panel?/:panelId?', {
				templateUrl : '/div/dummy',
				controller : 'dummyController',
				resolve : addControllerJs()
			}).otherwise({
				redirectTo : document.location.pathname
			});

			$locationProvider.html5Mode(true).hashPrefix('!');
		}]);

	march4.app.run([ '$route', '$rootScope', '$location',
		function($route, $rootScope, $location) {
			march4.util.setPathNoReloading = function(path) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess',
						function() {
							$route.current = lastRoute;
							un();
						});

				return $location.path(path);
			};
		} ]);
}());