march4.building.projectApi = "/api/project";
march4.building.projectListApi = "/api/project/list";
march4.building.myApp = angular.module('buildingManagement', []);

march4.building.myApp.controller('AddBuildingFormController', function($http) {
	this.buildings = [];
	this.newBuilding = {};
	
	this.getBuildings = function(){
		$http.get(march4.building.projectListApi).success(function(data, status, headers, config){
			this.buildings = data;
		}.bind(this))
		.error(function(data, status, headers, config) {
	    	console.log("AJAX failed!");
	    });
	};
	
	this.submit = function() {
		$http.post(march4.building.projectApi,this.newBuilding)
			.success(function(data, status, headers, config) {
				this.getBuildings();
				this.newBuilding = {};
			}.bind(this))
		    .error(function(data, status, headers, config) {
		    	console.log("AJAX failed!");
		    });
	};
	
	this.getBuildings();
});
