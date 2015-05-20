(function() {
	'use strict';
	march4.app.registerController('frontpageController', function($scope, $http, $location) {
		$scope.user ={};
        $scope.signupMessage = "";
        $scope.signinMessage = "";
        $scope.currentStatus = "";

	    $scope.signup = function () {
	        $http({
	            method: 'POST',
	            url: '/signup',
	            data: $scope.user
	        }).
	        success(function (data, status, headers, config) {
	            console.log(data);
                $scope.signupMessage = data[0];
	        }).
	        error(function (data, status, headers, config) {
	            if (status == 400) {
	                $scope.messages = data;
	            } else {
	                console.log(status);
	            }
	        });
	    };
	     
	    $scope.signin = function () {
	        $http({
	            method: 'POST',
	            url: '/signin',
	            data: $scope.user
	        }).
	        success(function (data, status, headers, config) {
	            console.log(data);
                $scope.signinMessage = data[0];
	        }).
	        error(function (data, status, headers, config) {
	            if (status == 400) {
	                $scope.messages = data;
	            } else {
	                alert('Unexpected server error.');
	            }
	        });
	    };
        
        $scope.signout = function () {
	        $http({
	            method: 'POST',
	            url: '/signout',
	            data: $scope.user
	        }).
	        success(function (data, status, headers, config) {
	            //console.log(data);
                $scope.signinMessage = data[0];
                document.location.href="/";
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