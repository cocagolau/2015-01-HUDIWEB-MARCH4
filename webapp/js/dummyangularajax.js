var formApp = angular.module('DummyApp', []);
formApp.controller('DummyController', [
  '$scope', '$window', '$http',
  function ($scope, $window, $http) {
        $scope.messages = ["kuku", "dodo"];
        $scope.data = {};
        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/dummy/ajax/data',
                data: $scope.data
            }).
            success(function (data, status, headers, config) {
                $window.location.replace('/dummy/ajax');
            }).
            error(function (data, status, headers, config) {
                if (status == 400) {
                    $scope.messages = data;
                } else {
                    alert('Unexpected server error.');
                }
            });
        };
}]);