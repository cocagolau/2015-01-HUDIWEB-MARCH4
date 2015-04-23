<html>
<head>
    <title>Webforms demo - AngularJS</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>

    <script src="/js/dummyangularjson.js"></script>
</head>

<body ng-app="DummyApp">
    <div ng-controller="DummyCtrl">
        <ul ng-repeat="Dummy in Dummies">
            <li>{{Dummy}}</li>
        </ul>
    </div>
</body>

</html>