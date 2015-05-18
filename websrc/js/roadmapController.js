function swap($el1, $el2) {
    if (!$el1 || !$el2) return;
    $temp = $('<div>');
    $el1.before($temp);
    $el2.after($el1);
    $temp.after($el2);
    $temp.remove();
}

function isMouseOver(event, $self) {
    var top = $self.offset().top;
    var down = top + $self.outerHeight();
    return (top <= event.pageY && event.pageY <= down);
}

function Sortable(el) {
    var that = this;
    this.$el = $(el);
    this.$dummy = null;

    this.sortableList.push(this.$el);
    new Draggable(el, function() {
        that.$dummy = that.$el.clone().css({
            'visibility': 'hidden'
        });
        that.$el.after(that.$dummy);
        $(document).on('mousemove.sort', function(e) {
            for (var i = 0; i < that.sortableList.length; i++) {
                if (!that.$el.is(that.sortableList[i])) {
                    if (isMouseOver(e, that.sortableList[i])) {
                        that.constructor.prototype.exchangeEl = that.sortableList[i];
                    }
                }
            }
        });
    }, function(e, $el) {
        swap(that.exchangeEl, that.$dummy);
        that.constructor.prototype.exchangeEl = null;
    }, function() {
        swap(that.$el, that.$dummy);
        that.$dummy.remove();
        $(document).off('.sort');
    });
}
Sortable.prototype.exchangeEl = null;
Sortable.prototype.sortableList = [];

function Draggable(el, downFunc, moveFunc, upFunc) {
    var that = this;

    downFunc = downFunc || function() {};
    moveFunc = moveFunc || function() {};
    upFunc = upFunc || function() {};
    
    this.$el = $(el);
    this.$el.on('mousedown', function(e) {
        downFunc(e, that.$el);
        var cursorX = e.clientX;
        var cursorY = e.clientY;
        var elY = that.$el.offset().top - $(window).scrollTop();
        var elX = that.$el.offset().left - $(window).scrollLeft();
        var diffX = elX - cursorX;
        var diffY = elY - cursorY;
        var originalStyle = that.$el.attr('style') || "";
        setPos(e);
        $(document).on('mousemove.drag', function(e) {
            moveFunc(e, that.$el);
            setPos(e);
        });

        function setPos(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;
            that.$el.css({
                "position": "fixed",
                "top": cursorY + diffY,
                "left": cursorX + diffX,
            });
        }
        $(document).on('mouseup.drag mouseleave.drag', function(e) {
            that.$el.attr('style', originalStyle);
            $(document).off('.drag');
            upFunc(e, that.$el);
        });
        e.preventDefault();
    });
}
march4.app.registerController('roadmapController', function($http, $scope, $routeParams) {
    $scope.lastOrder = 0;
    $scope.quests = [];
    $scope.path = '/api' + window.location.pathname;
    $scope.initQuests = function() {
        console.log('init', $scope.lastOrder);
        $scope.newQuest = {
            order: ++($scope.lastOrder)
        };
    };
    $scope.addQuest = function() {
        console.log($scope.newQuest);
        $scope.quests.push($scope.newQuest);
        var data = $scope.newQuest;
        $http.post($scope.path, data).success(function(data, status, headers, config) {
            console.log("post good", status, "!");
            console.log(data);
            $scope.showQuests();
        }).error(function(data, status, headers, config) {
            console.log("post bad", status, "!");
            console.log(data);
        });
        $scope.initQuests();
    };
    $scope.showQuests = function() {
        console.log('getting quests');
        $http.get($scope.path).success(function(data, status, headers, config) {
            console.log("get good", status, "!");
            console.log(data);
            $scope.quests = data;
            $scope.lastOrder = data[data.length - 1].order;
            console.log('show', $scope.lastOrder);
            $scope.initQuests();
        }).error(function(data, status, headers, config) {
            console.log("get bad", status, "!");
            console.log(data);
            $scope.initQuests();
        });
    };
    $scope.init = function() {
        $scope.showQuests();
    };
    $scope.makeItDraggable = function(el) {
        new Sortable(el);
    };
    $scope.init();
});