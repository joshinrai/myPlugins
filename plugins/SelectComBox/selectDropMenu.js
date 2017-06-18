(function(namespace){
	/**
	 * 下拉框组件
	 */
	var SelectDropMenu = Com.extends({

		init : function(){
			var self = this;
			self.state = 0;//0- 隐藏,1-显示
			self.coms = {};
			self.opt = {
				store : self.options.store,
				dropMenuClass : self.options.dropMenu_class,
				hasSearchCom : self.options.dropMenu_hasSearchCom,
				hasTableCom : self.options.dropMenu_hasTableCom,
				searchCfg : self.options.dropMenu_searchCfg,
				tableCfg : self.options.dropMenu_tableCfg
			}
		},
		/**
		 * 渲染下拉框组件
		 */
		render: function () {
			var self = this;
			var html = self.createDropMenu();
			//设置下拉菜单的搜索组件
			if(self.opt.hasSearchCom === true){
				self.coms.searchCom = new SearchCom(self.opt.searchCfg,html);
				self.coms.searchCom.render();
				//搜索组件事件监听
				self.coms.searchCom.on('search',function(data){
	    			
	    		});
			}
			//设置下拉菜单的表格组件
			if(self.opt.hasTableCom === true){
				self.coms.tableCom = new Table(self.opt.tableCfg,html);
				self.coms.tableCom.render();
				//表格组件事件监听
				self.coms.tableCom.on('',function(){

				});
			}
	    	self.node.append(html);
	  	},
	  	/**
	  	 * 创建下拉框组件html对象
	  	 */
		createDropMenu : function(){
			var self = this;
			var html;
			//设置下拉菜单的样式
			if(self.opt.dropMenuClass !== undefined && self.opt.dropMenuClass !== null){
				html = $('<div id = "dropMenu" style = "width:100%;min-height:50%" class = "dropdown-menu "' + self.opt.dropMenuClass + '></div>');
			} else {
				html = $('<div id = "dropMenu" style = "width:100%;min-height:50%" class = "dropdown-menu"></div>');
			}
			return $(html);
		},
		destory : function(){
			this.node.html('');
		},
		/**
		 * 改变状态
		 */
		changeState : function(){
			var self = this;
			if(self.state == 0){
				self.dropMenu();
			} else {
				self.upMenu();
			}
		},
		/**
		 * 下拉菜单显示
		 */
		dropMenu : function(){
			var self = this;
			if(self.opt.hasTableCom === true){
				self.coms.tableCom.load();
			}
			self.node.find('#dropMenu').show();
			self.state = 1;
		},
		/**
		 * 下拉菜单隐藏
		 */
		upMenu : function(){
			var self = this;
			self.node.find('#dropMenu').hide();
			self.state = 0;
		},
		/**
		 * 刷新组件内部数据
		 */
		reload : function(){
			var self = this;
			self.coms.tableCom.reload();
			self.coms.searchCom.reload();
		}
	});
	namespace.SelectDropMenu = SelectDropMenu;
})(window);