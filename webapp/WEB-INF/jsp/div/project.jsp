<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title>march4</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/world.css">
    <script src="/js/lib/_bower.js"></script>
    <script src="/js/namespaces.js"></script>
    <script src="/js/building.js"></script>	
</head>
<body ng-app="buildingManagement">
	<div>
		<div class="addBuilding" ng-controller="AddBuildingFormController as bldgCtrl">
			<h1>빌딩</h1>
			<form id="register-form" name="registerForm" method="post" ng-submit="registerForm.$valid && bldgCtrl.submit()" novalidate>
				<label for="project-id">ID</label><br />
				<input ng-model="bldgCtrl.newBuilding.projectId" id="project-id" type="number" name="projectId" required /><br />
				<label for="project-name">이름</label><br />
				<input ng-model="bldgCtrl.newBuilding.name" id="project-name" name="name" type="text" required /><br />
				<label for="project-email">소유자</label><br />
				<input ng-model="bldgCtrl.newBuilding.ownerId" id="project-owner" name="ownerId" type="email" required /><br />
				<input type="submit" />
			</form>
			
			<h2>지어진 빌딩</h2>
			<ul>
				<li ng-repeat="building in bldgCtrl.buildings">
					<dl>
						<dt>ID</dt>
						<dd>{{building.projectId}}</dd>
						<dt>이름</dt>
						<dd>{{building.name}}</dd>
						<dt>소유자</dt>
						<dd>{{building.ownerId}}</dd>
					</dl>
				</li>
			</ul>
		</div>
	</div>
	<script src="//localhost:35729/livereload.js"></script>
</body>
</html>

