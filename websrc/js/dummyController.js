march4.app.$controllerProvider.register('dummyController',function($scope,$routeParams){
	$scope.dummyId = $routeParams.dummyId;
});