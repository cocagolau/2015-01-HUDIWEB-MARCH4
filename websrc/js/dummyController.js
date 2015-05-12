march4.app.registerController('dummyController',function($scope,$routeParams,$location){
	$scope.dummyId = $routeParams.dummyId;
	$scope.panelOpened = ($routeParams.panel == "panel");
	$scope.panelID = $routeParams.panelId;

	$scope.panels = [
		{ID:0},{ID:1},{ID:2},{ID:3},{ID:4},{ID:5},{ID:6},{ID:7},{ID:8},{ID:9}
	];

	$scope.openPanel = function(index){
		if(index === undefined) return;

		if(!$scope.panelOpened){
			march4.util.setPathNoReloading($location.path().match(/(.*?)\/?$/)[1]+"/panel/"+index);
			$scope.panelOpened = true;
			$scope.panelID = index;
		}
	};

	$scope.closePanel = function(){
		if($scope.panelOpened){
			march4.util.setPathNoReloading($location.path().replace(/\/panel\/.*/g,""));
			$scope.panelOpened = false;
		}
	};
});

march4.app.registerController('panelController',function($scope,$routeParams){

});