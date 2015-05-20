(function () {
    'use strict';
    march4.app = angular.module('march4', ['ngRoute'], function($controllerProvider){
        march4.app.registerController = function(sName,fController){
            $controllerProvider.register(sName,fController);
        };
    });
    
    march4.app.controller('mainController',function($scope){
    	$scope.user = {};
    });

    march4.app.controller('userController',function($scope,$rootScope){
    	$scope.$parent.user = {
            avatarImg	: "http://www.placehold.it/32x32",
            name 		: "dummyUser",
            email 		: "dummyUser@gmail.com"
        };
    });
}());
