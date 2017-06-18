(function(namespace){
	/**
	 * 下拉组件数据对象
	 */
	var SelectStore = Com.extends({
		/**
		 * 初始化：输入框组件数据、下拉框组件数据
		 */
		init:function(){
			var self = this;
			if(self.options.input_defaultVal !== undefined && self.options.input_defaultVal !== null){
				self.inputVal = self.options.input_defaultVal;
			} else {
				self.inputVal = '';
			}
		},
		getInputVal : function(){
			var self = this;
			return self.inputVal;
		},
		setInputVal : function(data){
			self.inputVal = data;
		}
	});

	/**
	 * 编辑框组件
	 */
	var SelectInput = Com.extends({
		/**
		 * 初始化输入框组件
		 */
		init : function(){
			var self = this;
			self.opt = {};
			var storeCfg = {
				input_defaultVal : self.options.input_defaultVal
			}
			self.store = new SelectStore(storeCfg);
			
			if(self.options.inputClass !== undefined && self.options.inputClass !== null){
				self.opt.inputClass = self.options.inputClass;
			} else {
				self.opt.inputClass = '';
			}
				
		},
		/**
		 * 渲染输入框组件
		 */
		render: function () {
			var self = this;
	    	this.node.append(self.createInputText());
	    	this.node.find('input').on('click',function(){
	    		self.emit('clickInputText');
	    	});
	    	this.node.find('input').on('input',function(){
	    		var data = $(this).val();
	    		self.store.setInputVal(data);
	    	});
	  	},
		/**
		 * 创建输入框组件html对象
		 */
		createInputText : function(){
			var self = this;
			var html = '';
			var data = self.store.getInputVal();
			if(self.opt.inputClass !== undefined && self.opt.inputClass !== null ){
				html = '<input id = "inputText" type="text" class="form-control ' + self.opt.inputClass +'" value="' + data +'"></input>';		
			} else {
				html = '<input id = "inputText" type="text" class="form-control ' +'" value="' + data +'"></input>';
			}
			return $(html);
		},
		destory : function(){
			this.node.html('');
		},
		/**
		 * 刷新组件内部数据
		 */
		reload : function(){
			var self = this;
			this.node.find('input').val(self.opt.store.inputData);
		}
	});
	namespace.SelectInput = SelectInput;
})(window);