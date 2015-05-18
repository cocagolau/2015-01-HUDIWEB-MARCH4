


function jquerythings() {

jQuery('main').ready(function($) {

      function swap($el1, $el2) {
        $temp = $('<div>');
        $el1.before($temp);
        $el2.after($el1);
        $temp.after($el2);
        $temp.remove();
      }

        function isMouseOver (e, self) {
          var top = self.offset().top;
          var down = top + self.outerHeight();
          return (top <= e.pageY && e.pageY <= down);
        }


      $('.sortableContainer').on('mousedown', '.sortable', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var $origin = $(this);
        var $dummy = $origin.clone().css({'visibility':'hidden'});
        

        $origin.after($dummy);
        dragStart(e,$origin);
        $('body').append($origin);
        

        $('body').on('mousemove.sort', function(e) {
          $('.sortable').each(function() {
            if(isMouseOver(e, $(this))) {
              swap($(this), $dummy);
            }
          });
        });

        $('body').on('mouseup.sort', function () {
            swap($origin, $dummy);
            $dummy.remove();
            $('body').off('.sort');
        });
      });

    function dragStart (e,$el) {
        var cursorX = e.clientX;
        var cursorY = e.clientY;

        var elY = $el.offset().top - $(window).scrollTop();
        var elX = $el.offset().left - $(window).scrollLeft();

        var diffX = elX - cursorX;
        var diffY = elY - cursorY;

        var originalStyle = $el.attr('style') || "";
        setPos(e);

        $('body').on('mousemove.drag', function(e){
            setPos(e);
        });

        function setPos(e){
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            $el.css({
                "position" : "fixed",
                "top" : cursorY + diffY,
                "left" : cursorX + diffX,
            });
        }

        $('body').on('mouseup.drag', function (e) {
            $el.attr('style', originalStyle);
            $('body').off('.drag');
        });
    }

});

}

march4.app.registerController('roadmapController', function($http, $scope, $routeParams) {
	$scope.lastOrder = 0;
    $scope.quests = [];
    $scope.path = '/api'+window.location.pathname;

    $scope.initQuests = function() {
    	console.log('init', $scope.lastOrder);
    	$scope.newQuest = {order:++($scope.lastOrder)};
    };

    $scope.addQuest = function() {
        console.log($scope.newQuest);
        $scope.quests.push($scope.newQuest);

        var data = $scope.newQuest;

        $http.post($scope.path, data)
        .success(function (data, status, headers, config) {
        	console.log("post good", status,"!");
            console.log(data);
            $scope.showQuests();
        })
        .error(function (data, status, headers, config) {
        	console.log("post bad", status,"!");
            console.log(data);
        });

        $scope.initQuests();
    };

    $scope.showQuests = function() {
    	console.log('getting quests');
    	$http.get($scope.path)
    	.success(function (data, status, headers, config) {
            console.log("get good", status,"!");
            console.log(data);
            $scope.quests = data;
            $scope.lastOrder = data[data.length-1].order;
            console.log('show', $scope.lastOrder);

            $scope.initQuests();
        })
        .error(function (data, status, headers, config) {
        	console.log("get bad", status,"!");
            console.log(data);

            $scope.initQuests();
        });
    };

    $scope.init = function() {
    	$scope.showQuests();
    };

    $scope.init();
    $scope.$on('$viewContentLoaded', jquerythings);
});

