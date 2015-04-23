<html>
<head>
    <title>Webforms demo - AngularJS</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

    <script src="/js/dummyangularjson.js"></script>
</head>

<body ng-app="MyApp">
    <div ng-controller="PostsCtrl">
        <ul ng-repeat="post in posts">
            <li>{{post}}</li>
        </ul>
    </div>
</body>

</html>