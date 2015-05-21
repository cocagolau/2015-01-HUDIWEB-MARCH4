(function() {
	'use strict';
	march4.app.factory('LoginService', function($http) {
        var service = {};

        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;		

        function GetByEmail(email) {
            return $http.get('' + email).then(handleSuccess, handleError('Error getting user by email'));
        }

        function Create(user) {
            return $http.post('', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('' + user.id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }        
	});
}());
