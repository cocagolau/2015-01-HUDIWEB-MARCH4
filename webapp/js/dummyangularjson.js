var app = angular.module("MyApp", []);

app.controller("PostsCtrl", function ($scope, $http) {
    $http.get('./json').
    success(function (data, status, headers, config) {
        $scope.posts = data;
    }).
    error(function (data, status, headers, config) {
        alert('Unexpected server error.');
    });
});