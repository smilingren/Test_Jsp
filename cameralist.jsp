<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="../css/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../css/themes/icon.css">
	<script type="text/javascript" src="../jquery/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="../jquery/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../jquery/easyui-lang-zh_CN.js"></script>
</head>
<body><script src="../js/cameralist2.js"></script> 
<div id="addCameraDialog">
<form id="regcamerafrom">
				<table  >
					<tr>
						<th style="width: 80px;"></th>
						<th align="right">摄像头名:</th>
						<td><input name="cameraShowName" style="width: 150px;" /></td>
					</tr>
					<tr>
						<th style="width: 80px;"></th>
						<th align="right">摄像头IP:</th>
						<td><input name="cameraIP" 
							style="width: 150px;" /></td>
					</tr>
					<tr>
						<th style="width: 80px;"></th>
						<th align="right">摄像头登录名:</th>
						<td><input name="cameraName"
							style="width: 150px;" /></td>
					</tr>
					<tr>
						<th style="width: 80px;"></th>
						<th align="right">登录密码:</th>
						<td><input name="cameraPassword" type="password"
							style="width: 150px;" /></td>
					</tr>
					<tr>
						<th style="width: 80px;"></th>
						<th align="right">端口号:</th>
						<td><input name="cameraPort"
							style="width: 150px;" /></td>
					</tr>
				</table>
</form>
</div>
<div id="MyUserAgent" style="display:none" ><%=request.getHeader("User-Agent") %></div>
<div class="easyui-tabs" data-options="fit:true,border:'false',iconCls:'icon-reload'"  id="camerTab">
	<div title="摄像头一览表" data-options="border:'false'">
		<table id="view-center-camera-datagrid">
		</table>
	</div>
	<div id="cameraMenu" class="easyui-menu" title="菜单" style="width:120;display:none;">
		<div onclick="cameraAccess();">访问</div>
		<div onclick="accessCamera();">直接访问</div>
		<div onclick="cameraDelete();">删除</div>
	</div>
</div>
</body></html>
