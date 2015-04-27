var formApp = angular.module('DummyApp', []);
formApp.controller('DummyController', [
  '$scope', '$window', '$http',
  function ($scope, $window, $http) {
        $scope.data = {};

        //빌딩의 소유자를 보낸다.
        
        $scope.submit = function () {
            $http({
                method: 'POST',
                url: '/building/default',
                data: $scope.data
            }).
            success(function (data, status, headers, config) {
                //$window.location.replace('/dummy/ajax');
                $scope.Dummies = data;
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