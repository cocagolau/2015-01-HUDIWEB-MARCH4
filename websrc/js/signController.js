(function() {
	'use strict';
	march4.app.registerController('signController', function($scope, $http) {
		$scope.user ={};
		$scope.kuku = function() {
			console.log("kuku");
			console.log($scope.user.email);
		}

	    $scope.signup = function () {
	        $http({
	            method: 'POST',
	            url: '/sign/signup',
	            data: $scope.user
	        }).
	        success(function (data, status, headers, config) {
	            console.log(data);
	        }).
	        error(function (data, status, headers, config) {
	            if (status == 400) {
	                $scope.messages = data;
	            } else {
	                alert('Unexpected server error.');
	            }
	        });
	    };
	    
	    $scope.signin = function () {
	        $http({
	            method: 'POST',
	            url: '/sign/signin',
	            data: $scope.user
	        }).
	        success(function (data, status, headers, config) {
	            console.log(data);
	        }).
	        error(function (data, status, headers, config) {
	            if (status == 400) {
	                $scope.messages = data;
	            } else {
	                alert('Unexpected server error.');
	            }
	        });
	    };
	    
	    
	});
}());