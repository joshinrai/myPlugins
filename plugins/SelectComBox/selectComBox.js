(function(namespace){
	/**
	 * 选择下拉框容器组件
	 */
	var SelectComBox = Container.extends({
		/**
		 * 初始化
		 */
		init : function(){
			var self = this;
			self.curPostion = $('<div class="input-group"></div>');
			self.selectInputCfg = {
				input_defaultVal : self.options.select_input_defaultVal,
				inputClass : self.options.select_input_class
			};
			self.selectBtnCfg = {
				spanClass : self.options.select_btn_spanClass,
				btnClass : self.options.select_btn_class,
				btnPicClass : self.options.select_btn_picClass
			};
			self.selectDropMenuCfg = {
				store:self.store,
				dropMenu_class : self.options.select_dropMenu_class,
				dropMenu_hasSearchCom : self.options.select_dropMenu_hasSearchCom,
				dropMenu_searchCfg : self.options.select_dropMenu_searchCfg,
				dropMenu_hasTableCom : self.options.select_dropMenu_hasTableCom,
				dropMenu_tableCfg : self.options.select_dropMenu_tableCfg
			};
			self.coms.selectInput = self.factory(SelectInput,self.selectInputCfg,this.curPostion);
			self.coms.selectSpanBtn = self.factory(SelectSpanBtn, self.selectBtnCfg, this.curPostion);
			self.coms.selectDropMenu = self.factory(SelectDropMenu,self.selectDropMenuCfg,this.curPostion);
			self.render();
		},
		/**
		 * 渲染组件
		 */
		render : function(){
			var self = this;
			self.node.append(self.curPostion);
			self.coms.selectInput.render();
			self.coms.selectSpanBtn.render();
			self.coms.selectDropMenu.render();
			self.coms.selectInput.on('clickInputText',function(){
				alert(self.selectData.inputData);
				self.coms.selectDropMenu.upMenu();
			});
			self.coms.selectSpanBtn.on('clickSpanBtn',function(){
				self.coms.selectDropMenu.changeState();
			});
			self.coms.selectDropMenu.on('clickDropMenu',function(){
				self.reload();
				self.coms.selectDropMenu.upMenu();
			});
		},
		/**
		 * 销毁组件
		 */
		destory : function(){
			self.coms.selectInput.destory();
			self.coms.selectSpanBtn.destory();
			self.coms.selectDropMenu.destory();
			this.node.html('');
		},
		/**
		 * 刷新组件内部数据
		 */
		reload : function(){
			var self = this;
			self.coms.selectInput.reload();
			self.coms.selectSpanBtn.reload();
			self.coms.selectDropMenu.reload();
		}
	});
	namespace.SelectComBox = SelectComBox;
})(window);

