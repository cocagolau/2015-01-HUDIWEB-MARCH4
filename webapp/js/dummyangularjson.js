var app = angular.module("DummyApp", []);

app.controller("DummyCtrl", function ($scope, $http) {
    $http.get('./json').
    success(function (data, status, headers, config) {
        $scope.Dummies = data;
    }).
    error(function (data, status, headers, config) {
        alert('Unexpected server error.');
    });
});