var projectApi = "/api/project";
var projectListapi = "/api/project/list";
var myApp = angular.module('buildingManagement', []);

myApp.controller('AddBuildingFormController', function($http) {
	this.buildings = [];
	this.newBuilding = {};
	
	this.getBuildings = function(){
		$http.get(projectListapi).success(function(data, status, headers, config){
			this.buildings = data;
		}.bind(this))
		.error(function(data, status, headers, config) {
	    	alert("AJAX failed!");
	    });
	};
	
	this.submit = function() {
		$http.post(projectApi,this.newBuilding)
			.success(function(data, status, headers, config) {
				this.getBuildings();
				this.newBuilding = {};
			}.bind(this))
		    .error(function(data, status, headers, config) {
		    	alert("AJAX failed!");
		    });
	}
	
	this.getBuildings();
});