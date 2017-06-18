/**
 * 信息设置页面头部内容组件
 */
var ewsHeaderPlugin = Com.extends({
	/**
	 * init: 信息设置页面头部初始化
	 */
	init: function(){
		this.render();
	},
	/**
	 * load: 加载数据
	 */
	load: function(){
		
	},
	/**
	 * render: 绘制，数据绘制到dom容器中
	 */
	render: function(){
		var self = this;
		var html = "";
		//头部开始
		html += "<form class='form-inline'> ";
		//预警名称HTML
		html += this.ewsNameHmtl();
		//预警类型HTML
		html += this.ewsTypeHmtl();
		//预警等级HMTL
		html += this.ewsLevelHmtl();
		//预警保存相关按钮HTML
		html += this.ewsButtonHmtl();
		//头部结束
		html += "</form> ";
		this.node.html(html);
		
		this.node.find('#staff').on('click', function(){
			self.loadRule("1");
	    });
		
		this.node.find('#crowd').on('click', function(){
			self.loadRule("2");
	    });
		
		this.node.find('#area').on('click', function(){
			self.loadRule("3");
	    });
		
		this.node.find('#goods').on('click', function(){
			self.loadRule("4");
	    });
		
		this.node.find('#content').on('click', function(){
			self.loadRule("5");
	    });
		
		this.node.find('#address').on('click', function(){
			self.loadRule("6");
	    });
		
		this.node.find('#addEwsRule').on('click', function(){
			self.addEwsRule();
	    });
	},
	/**
	 * destroy: 事件销毁等
	 */
	destroy: function () {
		this.node.html('');
	},
	/**
	 * 预警名称HTML
	 */
	ewsNameHmtl: function(){
		var html = "";
		html += "<div class='form-group'>";
		html += " <label for='ewsName'>信息名称:&nbsp&nbsp&nbsp</label>";
		html += " <input type='text' class='form-control' id='ewsName' placeholder='请输入信息名称'>";
		html += " </div> ";
		html += "<div class='form-group'> <div class='col-sm-1'></div> </div>";
		
		return html;
	},
	/**
	 * 预警类型HTML
	 */
	ewsTypeHmtl: function(){
		var html = "";
		html += " <div class='form-group'>";
		html += " <label for='ewsType'>信息类型:&nbsp&nbsp&nbsp</label>";
		html += " <button id='staff' type='button' class='btn btn-default'>类型1</button>";
		html += " <button id='crowd' type='button' class='btn btn-default'>类型2</button>";
		html += " <button id='area' type='button' class='btn btn-default'>类型3</button>";
		html += " <button id='goods' type='button' class='btn btn-default'>类型4</button>";
		html += " <button id='content' type='button' class='btn btn-default'>类型5</button>";
		html += " <button id='address' type='button' class='btn btn-default'>类型6</button>";
		html += " </div>";
		html += " <div class='form-group'> <div class='col-sm-1'></div> </div>";
		
		return html;
	},
	/**
	 * 预警等级HMTL
	 */
	ewsLevelHmtl: function(){
		var html = "";
		html += "<div class='form-group'>";
		html += " <label for='ewsLevel'>信息等级:&nbsp&nbsp&nbsp</label>";
		html += " <select id='ewsLevel' class='form-control'>";
		html += "<option value=''>一级</option>";
		html += "<option value='1'>一级</option>";
		html += "<option value='2'>二级</option>";
		html += "<option value='3'>三级</option>";
		html += "<option value='4'>关注</option>";
		html += "</select>";
		html += "</div>";
		html += " <div class='form-group'> <div class='col-sm-1'></div> </div>";
		
		return html;
	},
	/**
	 * 预警保存相关按钮HTML
	 */
	ewsButtonHmtl: function(){
		var html = "";
		html += "<button id='addEwsRule' type='button' class='btn btn-default'>新建信息规则</button>&nbsp";
		html += "<button id='saveRule' type='button' class='btn btn-default'>保存为规则</button>&nbsp";
		html += "<button id='save' type='button' class='btn btn-default'>保存</button>&nbsp";
		
		return html;
	},
	/**
	 * 新建预警规则
	 */
	addEwsRule: function(){
		var ewsName = $("#ewsName").val();
		if(""==ewsName||null==ewsName){
			document.getElementById("ewsName").style.border = "1px solid red";
			$("#ewsName").val("信息名称为空!!!") ;
			document.getElementById("ewsName").style.color='red'
		}
		var ewsLevel = $("#ewsLevel option:selected").val();
	},
	/**
	 * 保存为规则
	 */
	saveRule: function(){
		alert("保存为规则");
	},
	/**
	 * 保存
	 */
	save: function(){
		alert("保存");
	},
	/**
	 * 为预警各类型按钮添加按钮单击监听
	 */
	loadRule: function(type){
		var self = this;
		var options = {type: type}
		self.emit('loadRuleData', options);
		// self.emit('modelsData', options);
	}
});