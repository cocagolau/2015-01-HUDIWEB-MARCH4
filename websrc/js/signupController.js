(function() {
	'use strict';
	march4.app.registerController('signupController', function($scope, $http, $location, UserService) {
		$scope.user ={};
        $scope.signup = signup;
       
        function signup(){
        	$scope.loading = true;
        	UserService.Create($scope.user)
	        	.then(function(response){
	        		if(response.status == 200){
	        			//error
	        			if(response.data !== ""){
	                    	alert('you failed!');
	                        //FlashService.Error(response.message);
	                        $scope.loading = false;
	                    
	                    //success
	                    } else {
	                    	var errors = response.data;
	        				alert('success!');
	        				//FlashService.Success('Registration successful', true);
	                        $location.path('/signin');
	                    }
	        		}else{
	        			//do something	
	        		}
	        	});
        } 
	});
}());
