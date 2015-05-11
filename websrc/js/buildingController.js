march4.app.registerController('buildingController', function ($scope, $window, $http, $timeout, $routeParams) {
    $scope.data = {};
    $scope.addData = {};
    $scope.delData = {};
    $scope.floatingForm = {
        show: false
    };
    $scope.pageSet = {
        buildingBox: {
            x: 200,
            y: 200,
            margin: 20
        }
    };
    
    
    $scope.uid = { "uid" : $routeParams.dummyId };
	$scope.panelOpened = ($routeParams.panel == "panel");
	$scope.panelID = $routeParams.panelId;
    $scope.panels = [
		{ID:0},{ID:1},{ID:2},{ID:3},{ID:4},{ID:5},{ID:6},{ID:7},{ID:8},{ID:9}
	];
    
    $scope.openPanel = function(index){
		if(index === undefined) return;

		if(!$scope.panelOpened){
			march4.util.setPathNoReloading($location.path().match(/(.*?)\/?$/)[1]+"/panel/"+index);
			$scope.panelOpened = true;
			$scope.panelID = index;
		}
	};

	$scope.closePanel = function(){
		if($scope.panelOpened){
			march4.util.setPathNoReloading($location.path().replace(/\/panel\/.*/g,""));
			$scope.panelOpened = false;
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

    $scope.default = function () {
        $http({
            method: 'POST',
            url: '/building/default',
            data: $scope.uid
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
        $scope.addData.uid = $scope.uid.uid;
        $http({
            method: 'POST',
            url: '/building/add',
            data: $scope.addData
        }).
        success(function (data, status, headers, config) {
            $scope.Buildings.push(data);
            
            $timeout(function () {
                $scope.Buildings[$scope.Buildings.length - 1].hide = true;
                $scope.Buildings[$scope.Buildings.length - 1].hide = false;
            }, 0);
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
    
    $scope.openFloatingForm = function (){
        $scope.floatingForm.show = true;
        $(".bd-overlay").css("visibility", "visible");
        $(".bd-overlay").css("opacity", 1);
        $("header").addClass("blur");
        $(".bd-overlay ~ div").addClass("blur");
    }
    
    $scope.closeFloatingForm = function(){
        $scope.floatingForm.show = false;
        $(".bd-overlay").css("visibility", "hidden");
        $(".bd-overlay").css("opacity", 0);
        $("header").removeClass("blur");
        $(".bd-overlay ~ div").removeClass("blur");
    }
    
    $scope.default();
});



march4.app.registerController('panelController',function($scope,$routeParams){

});