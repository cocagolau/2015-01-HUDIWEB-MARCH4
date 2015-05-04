(function () {
    'use strict';

    march4.app = angular.module('march4', ['ngRoute'], function($controllerProvider){
        march4.app.$controllerProvider = $controllerProvider;
    });

    march4.app.controller('mainController',function($scope){
    });

    march4.app.controller('userController',function($scope){
    	$scope.avatarImg = "http://www.placehold.it/32x32";
    	$scope.name = "dummyUser";
    	$scope.email = "dummyUser@gmail.com";
    	$scope.user = {
    		avatarImg	: $scope.avatarImg,
			name 		: $scope.name,
			email 		: $scope.email
    	};
    });
}());
