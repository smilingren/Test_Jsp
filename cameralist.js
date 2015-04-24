var cameraDatagrid;
var cameraRowData;
var addCameraForm;
var cameraEditRow = undefined;
$(function(){
	addCameraForm = $('#regcamerafrom').form({
			url: '/NSW_WebServer/jsp/registCamera.json', //提交地址
			onSubmit: function(){
			/*	var isValid = $(this).form('validate'); //validate表单验证字段
				if (!isValid){
					return isValid;	// 如果表单是无效的则隐藏进度条
				}*/
			},
			success : function(r) {
				r = $.parseJSON(r);
				var p = r.resultJson;
				if (r && (p.result == 0)) {
					$.messager.show({
						title : '提示',
						msg : p.errmsg
					});
					vaddCameraDialog.dialog('close');
					cameraDatagrid.datagrid('reload');    
				} else {
					$.messager.alert('提示', p.errmsg);
					vaddCameraDialog.dialog('close');
				}
			}
		});
	vaddCameraDialog = $('#addCameraDialog').dialog({    
	    title: '添加摄像头',
	    width: 400,    
	    height: 300,
	    modal : true,
	    resizable:true,
	    closed: true,    
	    cache: false,    
	    modal: true,
		buttons : [ {
			text : '取消',
			handler : function() {
			}
		}, {
			text : '添加',
			handler : function() {
				addCameraForm.submit();
			}
		} ]
	});
	cameraEditRow = undefined;
	cameraDatagrid = $('#view-center-camera-datagrid').datagrid({
			url : '/NSW_WebServer/jsp/getAllCamera.json',
			method : 'post',
			loadFilter : function(r){
				if (r.resultJson.data){
					return r.resultJson.data;
				}
			},
			// title : '',
			
			pagination : true, //分页工具条
			pageSize : 10,
			pageList : [10,20,30], // x*pageSize
			fit : true, //宽高自适应
			fitColumns : true, //不显示表格下方的滚动条
			nowrap : true, //不自动折行 false自动折行
			border : false, //边框不显示
			idField : 'cameraID', //标识
			sortName : 'cameraID', //按字段排序
			sortOrder : 'desc', //升降序
			columns : [ [ {
				title : '摄像头ID',
				field : 'cameraID',
				//width : '100',
				sortable : true,
				checkbox : true
				},{
				title : '摄像头名',
				field : 'cameraShowName',
				//width : '100',
				sortable : true,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
				},{
				title : 'IP地址',
				field : 'cameraIP',
				sortable : true,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
				//	width : '100'
				},{
				title : '摄像头登录名',
				field : 'cameraName',
				sortable : true,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
				//	width : '100'
				},{
				title : '摄像头登录密码',
				field : 'cameraPassword',
				sortable : true,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
				//	width : '100'
				
				},{
				title : '端口号',
				field : 'cameraPort',
				sortable : true,
				editor : {
					type : 'validatebox',
					options : {
						required : true
						}
					}
				}
				] ],//多级表头
				toolbar : [{
					text : '增加',
					iconCls : 'icon-add',
					method : 'post',
					handler : function(){
						vaddCameraDialog.dialog('open');
					} 
				},'-',{
						text : '删除',
						iconCls : 'icon-remove',
						handler : function(){
							cameraDelete();
						} 
				},'-',{
						text : '修改',
						iconCls : 'icon-edit',
						handler : function(){
							var rows = cameraDatagrid.datagrid('getSelections');
							if(rows.length==1){
								if(cameraEditRow != undefined ){
									cameraDatagrid.datagrid('endEdit',cameraEditRow);
								}
								if(cameraEditRow == undefined ){
									var index = cameraDatagrid.datagrid('getRowIndex',rows[0]);
									cameraDatagrid.datagrid('beginEdit',index);
									cameraEditRow = index;
								}
							}else {
								$.messager.show({
									title : '提示',
									msg : "只能选中一行进行修改！"
								});
							}
						} 
				},'-',{
					text : '保存',
					iconCls : 'icon-save',
					handler : function(){
						cameraDatagrid.datagrid('endEdit',cameraEditRow);
						cameraEditRow = undefined;
					} 
				},'-',{
					text : '取消编辑',
					iconCls : 'icon-undo',
					handler : function(){
						cameraDatagrid.datagrid('unselectAll');
						cameraEditRow = undefined;
						cameraDatagrid.datagrid('rejectChanges');
					} 
				}
				// {text : 'search',iconCls : 'icon-search',handler : function()},
				],
				onAfterEdit : function(rowIndex,rowData,changes){
					$.ajax({
						url : '/NSW_WebServer/jsp/updateCamera.json',
						data : {
							cameraID : rowData.cameraID,
							cameraIP : rowData.cameraIP,
							cameraShowName : rowData.cameraShowName,
							cameraName : rowData.cameraName,
							cameraPassword : rowData.cameraPassword,
							cameraPort : rowData.cameraPort
						},
						cache : false,
						dataType : 'json',
						success : function(r) {
							var p = r.resultJson;
							if (r && (p.result == 0)) {
								$.messager.show({
									title : '提示',
									msg : p.errmsg
								});
								vaddCameraDialog.dialog('close');
								cameraDatagrid.datagrid('reload');    
							} else {
								$.messager.alert('提示', p.errmsg);
								vaddCameraDialog.dialog('close');
							}
						},
						error : function(r){
							$.messager.alert('提示',"unknow error");
						}
					});
					cameraEditRow = undefined;
				},
				onDblClickRow : function(rowIndex,rowData){
					if(cameraEditRow != undefined ){
						cameraDatagrid.datagrid('endEdit',cameraEditRow);
					}
					if(cameraEditRow == undefined ){
						cameraDatagrid.datagrid('beginEdit',rowIndex);
						cameraEditRow = rowIndex;
					}
				},
				onRowContextMenu : function(e, rowIndex, rowData){
					e.preventDefault(); //阻止浏览器默认的右键响应
					$(this).datagrid('unselectAll');
					$(this).datagrid('selectRow', rowIndex);
					$('#cameraMenu').menu('show',{
						left : e.pageX, // 确定菜单的位置
						top : e.pageY 
					});
					//console.info(rowData);
				}
		});

});
function cameraAction(cameraDirection,cameraID,cameraShowName,cameraIP,cameraName,cameraPassword,cameraPort) {
	// document.getElementById(id).parentElement.id;
	// console.info("2233"+actionButton.id);
	$.ajax({
		url : '/NSW_WebServer/jsp/controlCamera.json',
		data : {
			cameraID : cameraID,
			cameraIP : cameraIP,
			cameraShowName : cameraShowName,
			cameraName : cameraName,
			cameraPassword : cameraPassword,
			cameraPort : cameraPort
		},
		cache : false,
		dataType : 'json',
		success : function(r) {
			if (r && r.resultJson.result == 0) {

			} else {
				$.messager.alert('提示', r.resultJson.errmsg + " 错误码："
						+ r.resultJson.errno, 'error');
			}
		}
	});
}
//新增tab
function openTab(text, url) {
	if ($("#camerTab").tabs('exists', text)) {
		$("#camerTab").tabs('select', text);
	} else {
		var content = "<div><img  src='http://192.168.1.103:81/videostream.cgi?user=admin&pwd=888888' /><br/>" +
		"<input id='left' type='button' name='LEFT' value='左' onclick='cameraAction('left','0','cameraShowName','192.168.1.103','admin','888888','81')'>" +
			"<input id='leftup' type='button' name='LEFT-UP' value='左上' onclick='cameraAction('leftup')'>" +
			"<input id='up' type='button' name='UP' value='上' onclick='cameraAction(this)'>" +
			"<input id='rightup' type='button' name='RIGHT-UP' value='右上' onclick='cameraAction(this)'>" +
			"<input id='right' type='button' name='RIGHT' value='右' onclick='cameraAction(this)'><br/>" +
			"<input id='leftdown' type='button' name='LEFT-DOWN' value='左下' onclick='cameraAction(this)'>" +
			"<input id='down' type='button' name='DOWN' value='下' onclick='cameraAction(this)'>" +
			"<input id='rightdown' type='button' name='RIGHT-DOWN' value='右下' onclick='cameraAction(this)'>" +
						"</div>";
		$("#camerTab").tabs('add', {
			title : text,
			closable : true,
			content : content
		});
	}
}
function openTab1(text, url) {
	if ($("#camerTab").tabs('exists', text)) {
		$("#camerTab").tabs('select', text);
	} else {
		var content = "<iframe frameborder='0' scrolling='auto' style='width:100%;height:100%;' src="
				+ url + "></iframe>";
		$("#camerTab").tabs('add', {
			title : text,
			closable : true,
			content : content
		});
	}
}
function cameraAccess(){
	cameraRowData = cameraDatagrid.datagrid('getSelections');
	var browserType = $("#MyUserAgent").text();
	if(browserType.indexOf("Firefox")!=-1){
		browserType = "Firefox";
//		openTab(cameraRowData[0].cameraShowName,"http://"+cameraRowData[0].cameraIP+":"+cameraRowData[0].cameraPort+"/monitor2.htm?user="+cameraRowData[0].cameraName+"&pwd="+cameraRowData[0].cameraPassword);
	}else if(browserType.indexOf("MSIE")!=-1){
		browserType = "IE";
//		openTab1(cameraRowData[0].cameraShowName,"cameraIe.jsp");
	}else if(browserType.indexOf("Chrome")!=-1){
		browserType = "Chrome";
//		openTab(cameraRowData[0].cameraShowName,"http://192.168.1.103:81/monitor2.htm");
	}
	$.ajax({
		url : '/NSW_WebServer/jsp/accessCamera.json',
		data : {
			cameraID : cameraRowData[0].cameraID,
			cameraIP : cameraRowData[0].cameraIP,
			cameraShowName : cameraRowData[0].cameraShowName,
			cameraName : cameraRowData[0].cameraName,
			cameraPassword : cameraRowData[0].cameraPassword,
			cameraPort : cameraRowData[0].cameraPort,
			browserType : browserType
		},
		cache : false,
		dataType : 'json',
		success : function(r){
			if (r && r.resultJson.result == 0) {
				openTab1(cameraRowData[0].cameraShowName,"showCameraIE.jsp");
			} else if (r && r.resultJson.result == 1) {
				openTab1(cameraRowData[0].cameraShowName,"cameracontrol.jsp");
			} else{
				$.messager.alert('提示', r.resultJson.errmsg + " 错误码："
						+ r.resultJson.errno, 'error');
			}
		},
		error : function(r){
			$.messager.alert('提示',"unknow error");
		}
	});
	// window.location.href="cameracontrol.jsp";
}


function cameraDelete(){
	cameraRowData = null;
	cameraIDs = "";
	cameraRowData = cameraDatagrid.datagrid('getSelections');
	for(var i=0;i<cameraRowData.length-1;i++){
		cameraIDs=cameraIDs+cameraRowData[i].cameraID+",";
    };
    cameraIDs=cameraIDs+cameraRowData[i].cameraID;
	$.ajax({
		url : '/NSW_WebServer/jsp/deleteCameraByID.json',
		data : {
			IDs : cameraIDs
		},
		cache : false,
		dataType : 'json',
		success : function(r){
			$.messager.alert('提示!!',"删除成功");
			cameraDatagrid.datagrid('unselectAll');
			cameraDatagrid.datagrid('reload');  
		},
		error : function(r){
			$.messager.alert('提示',"删除失败");
		}
	});
	// window.location.href="cameracontrol.jsp";
} 

function accessCamera(){
	cameraRowData = cameraDatagrid.datagrid('getSelections');
	var browserType = $("#MyUserAgent").text();
	if(browserType.indexOf("Firefox")!=-1){
		browserType = "Firefox";
		openTab1(cameraRowData[0].cameraShowName,"http://"+cameraRowData[0].cameraIP+":"+cameraRowData[0].cameraPort+"/monitor2.htm?user="+cameraRowData[0].cameraName+"&pwd="+cameraRowData[0].cameraPassword);
	}else if(browserType.indexOf("MSIE")!=-1){
		browserType = "IE";
		openTab1(cameraRowData[0].cameraShowName,"http://"+cameraRowData[0].cameraIP+":"+cameraRowData[0].cameraPort+"/monitor.htm?user="+cameraRowData[0].cameraName+"&pwd="+cameraRowData[0].cameraPassword);
	}else if(browserType.indexOf("Chrome")!=-1){
		browserType = "Chrome";
		openTab1(cameraRowData[0].cameraShowName,"http://"+cameraRowData[0].cameraIP+":"+cameraRowData[0].cameraPort+"/monitor2.htm?user="+cameraRowData[0].cameraName+"&pwd="+cameraRowData[0].cameraPassword);
	}
	// window.location.href="cameracontrol.jsp";
}
