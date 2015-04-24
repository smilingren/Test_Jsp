<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="../css/themes/black/easyui.css">
	<link rel="stylesheet" type="text/css" href="../css/themes/icon.css">
	<script type="text/javascript" src="../jquery/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="../jquery/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../jquery/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
	$(function() {
		//数据
		var userTreeData = [ {
			text : "个人信息",
			state : "closed",
			children : [ {
				text : "我的信息",
				attributes : {
					url : "userInfo.jsp"
				}
			}, {
				text : "修改个人信息",
				attributes : {
					url : "userUpdate.jsp"
				}

			} ]
		} ];
		var deviceTreeData = [ {
			text : "设备",
			state : "closed",
			children : [ {
				text : "开关",
				attributes : {
					url : "switchlist.jsp"
				}
			}, {
				text : "摄像头",
				attributes : {
					url : "cameralist.jsp"
				}

			}, {
				text : "红外遥控",
				attributes : {
					url : "controlerlist.jsp"
				}

			} , {
				text : "感应器",
				attributes : {
					url : "sensorlist.jsp"
				}

			}]
		} ];
		var dataTreeData = [ {
			text : "数据采集",
			state : "closed",
			children : [ {
				text : "历史信息",
				attributes : {
					url : "dataHis.jsp"
				}
			}, {
				text : "添加数据",
				attributes : {
					url : "addData.jsp"
				}

			} ]
		} ];
		var mapTreeData = [ {
			text : "轨迹",
			state : "closed",
			children : [ {
				text : "我的轨迹",
				attributes : {
					url : "guji.jsp"
				}
			}, {
				text : "我的群组",
				attributes : {
					url : "qun.jsp"
				}

			} ]
		} ];
		//实例化树菜单
		$("#userTree").tree({
			data : userTreeData,
			lines : true,
			animate : true,
			onClick : function(node) {
				if (node.attributes) {
					openTab(node.text, node.attributes.url);
				}
			}
		});
		$("#deviceTree").tree({
			data : deviceTreeData,
			lines : true,
			animate : true,
			onClick : function(node) {
				if (node.attributes) {
					openTab(node.text, node.attributes.url);
				}
			}
		});
		$("#dataTree").tree({
			data : dataTreeData,
			lines : true,
			animate : true,
			onClick : function(node) {
				if (node.attributes) {
					openTab(node.text, node.attributes.url);
				}
			}
		});
		$("#mapTree").tree({
			data : mapTreeData,
			lines : true,
			animate : true,
			onClick : function(node) {
				if (node.attributes) {
					openTab(node.text, node.attributes.url);
				}
			}
		});

		//新增tab
		function openTab(text, url) {
			if ($("#tabs").tabs('exists', text)) {
				$("#tabs").tabs('select', text);
			} else {
				var content = "<iframe frameborder='0' scrolling='auto' style='width:100%;height:100%;' src="
						+ url + "></iframe>";
				$("#tabs").tabs('add', {
					title : text,
					closable : true,
					content : content
				});
			}
		}

	});
</script>
<script type="text/javascript">
	function myGetDate() {
		var d = new Date();
		var vYear = d.getFullYear();
		var vMon = d.getMonth() + 1;
		var vDay = d.getDate();
		var h = d.getHours();
		var m = d.getMinutes();
		var se = d.getSeconds();
		s = vYear + "年" + (vMon < 10 ? "0" + vMon : vMon) + "月"
				+ (vDay < 10 ? "0" + vDay : vDay) + "日"
				+ (h < 10 ? "0" + h : h) + "时" + (m < 10 ? "0" + m : m) + "分"
				+ (se < 10 ? "0" + se : se) + "秒";
		$("#jnkc").text(s);
	}
</script>
<script type="text/javascript">
    setInterval("myGetDate();", 1000);
</script>
</head>
<body class="easyui-layout">
	<div data-options="region:'north',href:'top.jsp',split:false,border:'false'" style="height:85px;"></div>
    <div data-options="region:'south',title:'South Title',split:true" style="height:100px;"></div>
    <div data-options="region:'west',title:'导航菜单',split:true" style="width:150px;" >
		<div id="nav_acc" class="easyui-accordion" data-options="fit:true" >
			<div title="用户信息" id="userInfoAccordion" style="overflow: auto; padding: 1px;">
				<ul id="userTree"></ul>
				<div id="user_nav_acc" class="easyui-accordion" data-options="fit:true" >
					<div title="用户1" id="user1" style="overflow: auto; padding: 1px;"></div>
				</div>
			</div>
			<div title="设备信息" id="deviceAccordion" data-options="selected:true" style="padding: 1px;">
				<ul id="deviceTree"></ul>
			</div>
			<div title="数据采集" id="dataAccordion" >
				<ul id="dataTree"></ul>
			</div>
			<div title="轨迹信息" id="mapAccordion">
				<ul id="mapTree"></ul>
			</div>
		</div>
	</div>
    
	<div data-options="region:'center',title:'欢迎使用', border:'false'"
		style="overflow: hidden;">
		<div class="easyui-tabs" data-options="fit:true,border:'false'" id="tabs">
			<div title="首页" data-options="border:'false'">
				<img src="../images/wellcome.jpg">
			</div>
		</div>
	</div>
</body>
</html>
