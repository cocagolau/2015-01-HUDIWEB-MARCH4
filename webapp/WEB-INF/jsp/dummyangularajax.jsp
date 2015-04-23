<html data-ng-app="DummyApp">
<head>
    <title>Webforms demo - AngularJS</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="/js/dummyangularajax.js"></script>
</head>

<body data-ng-controller="DummyController">
    <h1>Angular ajax testpage</h1>
    <ul>
        <li data-ng-repeat="message in messages">{{message}}</li>
    </ul>
    <div>
        <label>no:</label>
        <input data-ng-model="data.no" type="text">
    </div>
    <div>
        <label>name:</label>
        <input data-ng-model="data.name" type="text">
    </div>
    <div>
        <input data-ng-click="submit()" type="button" value="Submit the form">
    </div>
</body>

</html>