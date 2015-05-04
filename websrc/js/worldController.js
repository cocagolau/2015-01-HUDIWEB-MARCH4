(function(){
	'use strict';
	march4.app.registerController('worldController', function($scope,$routeParams){
	    $scope.worldId = $routeParams.worldId;
	});
}());