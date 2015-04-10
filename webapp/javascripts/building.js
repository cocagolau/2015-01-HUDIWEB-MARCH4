var projectApi = "/api/project";
var projectListapi = "/api/projectlist";
var myApp = angular.module('buildingManagement', []);

myApp.controller('AddBuildingFormController', function($http) {
	this.buildings = [];
	this.newBuilding = {};
	
	this.getbuildings = function(){
		$http.get(projectListapi).success(function(data, status, headers, config){
			this.buildings = data;
		}.bind(this))
		.error(function(data, status, headers, config) {
	    	alert("AJAX failed!");
	    });
	};
	
	this.submit = function() {
		$http.post(projectApi,this.newbuilding)
			.success(function(data, status, headers, config) {
				this.getbuildings();
				this.newbuilding = {};
			}.bind(this))
		    .error(function(data, status, headers, config) {
		    	alert("AJAX failed!");
		    });
	}
	
	this.getbuildings();
});