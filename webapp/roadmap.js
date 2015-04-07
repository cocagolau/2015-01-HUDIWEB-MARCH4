jQuery(document).ready(function($) {
    $('.sortableContainer').on('mousedown', '.sortable', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var initEl = $(this);
        var initElPos = getPosition(this);
        var initClickPos = {pageX:e.pageX, pageY:e.pageY};
        console.log(initClickPos.pageX, initClickPos.pageY);

        $(document).on('mousemove', function(e) {
            var deltaClickPos = {pageX:e.pageX-initClickPos.pageX,
                pageY:e.pageY-initClickPos.pageY};
            initEl.css({"position": "relative",
            "top" : initElPos.top + deltaClickPos.pageY,
            "left": initElPos.left + deltaClickPos.pageX});
        });
    });

    $(document).on('mouseup', function(e) {
        $(document).off('mousemove');
    });

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
