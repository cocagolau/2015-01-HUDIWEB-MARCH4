/* todo
* 무조건 insertBefore여서 맨 밑으로 안 들어가짐
*/

jQuery(document).ready(function($) {
    $('.sortableContainer').on('mousedown', '.sortable', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var initEl = $(this);
        var initElPos = getPosition(this);
        var initClickPos = {pageX:e.pageX, pageY:e.pageY};
        var overEl;

        $(document).on('mousemove.drag', function(e) {
            var deltaClickPos = {pageX:e.pageX-initClickPos.pageX,
                pageY:e.pageY-initClickPos.pageY};


            var result = getMouseoveredIndex(e, $('.sortable'), initEl[0]);
            if(result >= 0) {
                var currentOverEl = $('.sortable').eq(result);
                if(!currentOverEl.is(overEl)) {
                    overEl = currentOverEl;
                    // init
                    $(".sortable")
                        .filter(":lt("+result+")").not(initEl).css({"position":"relative", "top":"0"});
                    // push down
                    $(".sortable").filter(":eq("+result+"), :gt("+result+")")
                        .css({"position":"relative", "top":initEl.outerHeight()});
                }
            }


            initEl.css({"position": "relative",
            "top" : initElPos.top + deltaClickPos.pageY,
            "left": initElPos.left + deltaClickPos.pageX});
        });

        $(this).on('mouseup', function(e) {
            $(document).off('mousemove.drag');
            console.log(overEl);
            
            $(".sortable").css({"position":"relative", "top":"0"});
            $(this).insertBefore(overEl);
            $(this).css({"position": "relative",
            "top" : 0,
            "left": 0});
        });
    });

    var getMouseoveredIndex = function(e, jList, self) {
        // 일단 세로만.
        for(var i=0; i<jList.length; i++) {
            // console.log(self);
            if(jList[i] === self) continue;
            var elY1, elY2;
            elY1 = $(jList[i]).offset().top;
            var nextOffset = $(jList[i]).next().offset();
            elY2 = elY1 + jList.eq(i).outerHeight();
            var eY = e.pageY;
            // console.log(elY1, elY2, eY);
            if(elY1 <= eY && elY2 >= eY) {
                return i;
            }
        }
        return -1;
    };

    var getPosition = function(el) {
        var position = {
            top : parseInt($(el).css('top')) || 0,
            left : parseInt($(el).css('left')) || 0
        };
        return position;
    };
});

angular.module('roadmap', [])
.controller('roadmapCtrl', function() {
    // {content(string),order(number),due(datetime),pos(x,y)}
    this.quests = [];
    this.newQuest = {};

    this.addQuest = function() {
        console.log(this.newQuest);
        this.quests.push(this.newQuest);
        this.newQuest = {}; // 이 줄이 없으면, 계속 참조하고 있는다(?).
    };

    // this.getLastOrder = function() {
    //     // for()
    // };
});
