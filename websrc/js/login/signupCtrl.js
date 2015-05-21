(function() {
	'use strict';
	march4.app.registerController('signupCtrl', function($scope, $http) {
		$scope.user ={};
//        $scope.signupMessage = "";
        $scope.signup = signup;
       
        funtion singup(){
        	$scope.loading = true;
        	//
        } 
        
//	    $scope.signup = function () {
//	        $http({
//	            method: 'POST',
//	            url: '/signup',
//	            data: $scope.user
//	        }).
//	        success(function (data, status, headers, config) {
//	            console.log(data);
////                $scope.signupMessage = data[0];
//	        }).
//	        error(function (data, status, headers, config) {
//	            if (status == 400) {
//	                $scope.messages = data;
//	            } else {
//	                console.log(status);
//	            }
//	        });
//	    };
	    
	});
}());