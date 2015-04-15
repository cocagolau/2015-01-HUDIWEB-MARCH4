<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Request!</title>
</head>
<body>
	<form action="/dummy/request" method="POST">
		<div>
			<label>No : </label>
			<input name="no" type="text" value="1">
		</div>
		<div>
			<label>name : </label>
			<input name="name" type="text" value="dummy">
		</div>
		<div>
			<input type="submit" value="Submit the form">
		</div>
	</form>
</body>
</html>