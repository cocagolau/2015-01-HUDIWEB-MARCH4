<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/css/building.css" />
<div>
    <div>
        <label>uid : </label>
        <input data-ng-model="data.uid" type="text">
    </div>
    <div>
        <input data-ng-click="default()" type="button" value="빌딩소환!!">
    </div>
</div>

<div>
    <div>
        <label>uid : </label>
        <input data-ng-model="addData.uid" type="text">
    </div>
    <div>
        <label>name : </label>
        <input data-ng-model="addData.name" type="text">
    </div>
    <div>
        <label>shared : </label>
        <input data-ng-model="addData.shared" type="text">
    </div>
    <div>
        <input data-ng-click="add()" type="button" value="빌딩입력!!">
    </div>
</div>


<ul data-ng-repeat="Building in Buildings">
    <li class="ani" data-ng-class="{buildingBox : true, hide : Building.hide}">
        pid : {{Building.pid}}
        <br> uid : {{Building.uid}}
        <br> name : {{Building.name}}
        <br> shared : {{Building.shared}}
        <br>
        <input type="hidden" data-ng-model="delData.pid" value="kuku">
        <input data-ng-click="del(Building.pid)" type="button" value="삭제">
    </li>
</ul>
