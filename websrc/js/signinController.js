(function() {
	'use strict';
	march4.app.registerController('signinController', function($scope, $http) {
		$scope.user ={};
		
        $scope.signin = signin;
        
        function signin(){
        	$scope.loading = true;
        	//
        } 		
		
		
	    
//	    $scope.signin = function () {
//	        $http({
//	            method: 'POST',
//	            url: '/sign/signin',
//	            data: $scope.user
//	        }).
//	        success(function (data, status, headers, config) {
//	            console.log(data);
//	        }).
//	        error(function (data, status, headers, config) {
//	            if (status == 400) {
//	                $scope.messages = data;
//	            } else {
//	                alert('Unexpected server error.');
//	            }
//	        });
//	    };
	     
	});
}());