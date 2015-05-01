march4.app.$controllerProvider.register('buildingController', function ($scope, $window, $http, $timeout) {
    $scope.data = {};
    $scope.addData = {};
    $scope.delData = {};

    $scope.pageSet = {
        buildingBox: {
            x: 200,
            y: 200,
            margin: 5
        }
    };

    $scope.myStyle = function (no) {

        var col = parseInt($(".buildingArea").width() / ($scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin)) + 1;

        var posX = parseInt(col % (no + 1)) * $scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin;
        var posY = parseInt(col / (no + 1)) * $scope.pageSet.buildingBox.y + $scope.pageSet.buildingBox.margin;

        return {
            left: posX + "px",
            top: posY + "px"
        }
    };




    //빌딩의 소유자를 보낸다. 
    $scope.default = function () {
        $http({
            method: 'POST',
            url: '/building/default',
            data: $scope.data
        }).
        success(function (data, status, headers, config) {
            //$window.location.replace('/dummy/ajax');
            $scope.Buildings = data;
            for (var i = 0; i < $scope.Buildings.length; i++) {
                (function (i) {
                    $scope.Buildings[i].hide = true;
                    $scope.Buildings[i].no = i;
                    $timeout(function () {
                        $scope.Buildings[i].hide = false;
                    }, i * 100);
                })(i);
            }
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };

    $scope.add = function () {
        $http({
            method: 'POST',
            url: '/building/add',
            data: $scope.addData
        }).
        success(function (data, status, headers, config) {
            //$window.location.replace('/dummy/ajax');
            $scope.default();
            //$scope.Dummies = data;
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };

    $scope.del = function (pid, no) {
        $scope.delData.pid = pid;
        $http({
            method: 'POST',
            url: '/building/del',
            data: $scope.delData
        }).
        success(function (data, status, headers, config) {
            if (data) {
                $scope.Buildings[no].hide = true;
            }
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };

    $scope.del = function (pid) {
        $scope.delData.pid = pid;
        $http({
            method: 'POST',
            url: '/building/del',
            data: $scope.delData
        }).
        success(function (data, status, headers, config) {
            //$window.location.replace('/dummy/ajax');
            $scope.default();
            //$scope.Dummies = data;
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };
});