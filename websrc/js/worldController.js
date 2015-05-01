(function(){
	'use strict';
	march4.app.$controllerProvider.register('worldController', function($scope,$routeParams){
	    $scope.worldId = $routeParams.worldId;
	});
}());
