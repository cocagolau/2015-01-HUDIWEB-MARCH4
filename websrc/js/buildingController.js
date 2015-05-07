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

    $scope.setPosition = function () {
        var col = parseInt($(".buildingArea").outerWidth(true) / ($scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin));

        for (var i = 0; i < $(".buildingArea li").size(); i++) {
            var posX = parseInt(i % col) * $scope.pageSet.buildingBox.x + $scope.pageSet.buildingBox.margin * parseInt(i % col);
            var posY = parseInt(i / col) * $scope.pageSet.buildingBox.y + $scope.pageSet.buildingBox.margin * parseInt(i / col);
            $(".buildingArea li").eq(i).css("left", posX);
            $(".buildingArea li").eq(i).css("top", posY);
        };
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
            console.log(data);
            $scope.Buildings = data;
            for (var i = 0; i < $scope.Buildings.length; i++) {
                (function (i) {
                    $scope.Buildings[i].hide = true;
                    $timeout(function () {
                        $scope.Buildings[i].hide = false;
                    }, i * 150);
                })(i);
            };
            $timeout($scope.setPosition, 0);

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
            debugger;
            $scope.Buildings.push(data);
            $timeout($scope.setPosition, 0);
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };

    $scope.del = function (pid, e, i) {
        $scope.delData.pid = pid;
        $http({
            method: 'POST',
            url: '/building/del',
            data: $scope.delData
        }).
        success(function (data, status, headers, config) {
            debugger;
            $(e.target.parentElement).css("margin-top", 100);
            $(e.target.parentElement).css("opacity", 0);
            $timeout(function () {
                $scope.Buildings.splice(i, 1);
                $timeout($scope.setPosition, 0);
            }, 150);
        }).
        error(function (data, status, headers, config) {
            if (status == 400) {
                $scope.messages = data;
            } else {
                alert('Unexpected server error.');
            }
        });
    };

    $scope.resizeId;
    $(window).resize(function () {
        if ($scope.resizeId) $timeout.cancel($scope.resizeId);

        $scope.resizeId = $timeout(function () {
            $timeout($scope.setPosition, 0);
        }, 500)
    });
});