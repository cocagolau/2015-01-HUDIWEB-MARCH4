march4.app.registerController('buildingController', function ($scope, $window, $http, $timeout) {
    $scope.data = {};
    $scope.addData = {};
    $scope.delData = {};

    $scope.pageSet = {
        buildingBox: {
            x: 200,
            y: 200,
            margin: 20
        }
    };

    $scope.myStyle = function (no) {
        var col = parseInt($(".buildingArea").outerWidth(true) / ($scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin));

        var posX = parseInt(no % col) * $scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin * parseInt(no % col);
        var posY = parseInt(no / col) * $scope.pageSet.buildingBox.y + $scope.pageSet.buildingBox.margin * parseInt(no / col);

        return {
            left: posX + "px",
            top: posY + "px"
        }
    };

    $scope.recalc = function (no) {
        for (var i = no; i < $scope.Buildings.length; i++) {
            $scope.Buildings[i].no = i;
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
                    }, i * 150);
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
            $scope.default();
            //$scope.Buildings.push($scope.data);
            //$scope.Buildings[$scope.Buildings.length - 1].hide = true;
            //$scope.Buildings[$scope.Buildings.length - 1].no = $scope.Buildings.length - 1;
            //$scope.Buildings[$scope.Buildings.length - 1].hide = false;
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
                //debugger;
                $scope.Buildings[no].delete = true;
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
});
