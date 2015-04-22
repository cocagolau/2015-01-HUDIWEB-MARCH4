<html data-ng-app="FormApp">
  <head>
    <title>Webforms demo - AngularJS</title>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.12/angular.min.js"></script>
    <script src="js/form.js"></script>
  </head>
  <body data-ng-controller="FormController">
    <h1>Please enter your personal information:</h1>
    <ul>
      <li data-ng-repeat="message in messages">{{message}}</li>
    </ul>
    <div>
      <label>First name:</label>
      <input data-ng-model="data.firstName" type="text">
    </div>
    <div>
      <label>Age:</label>
      <input data-ng-model="data.age" type="text">
    </div>
    <div>
      <input data-ng-click="submit()" type="button" 
             value="Submit the form">
    </div>
  </body>
</html>