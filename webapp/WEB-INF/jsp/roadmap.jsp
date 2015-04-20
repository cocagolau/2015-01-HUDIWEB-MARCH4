<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html ng-app="roadmap">
<head lang="ko">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="./roadmap.css">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="http://code.jquery.com/jquery-1.10.2.js"></script>
    <script src="roadmap.js"></script>
</head>
<body>
    <div id="roadmapContainer" ng-controller="roadmapCtrl as rc">
        <form ng-submit="rc.addQuest()">
            <label>내용</label>
            <input ng-model="rc.newQuest.content" name="content" type="text">
            <label>마감</label>
            <input ng-model="rc.newQuest.due" name="due" type="datetime-local">
            <!-- <input ng-model="rc.newQuest.pos.x" name="posx" type="hidden" value="0">
            <input ng-model="rc.newQuest.pos.y" name="posy" type="hidden" value="0"> -->
            <input type="submit">
        </form>
        <ul class="sortableContainer">
            <li class="sortable" ng-repeat="quest in rc.quests">
                <span>{{quest.content}}</span>
                <span>{{quest.due}}</span>
            </li>
        </ul>
    </div>
</body>
</html>
