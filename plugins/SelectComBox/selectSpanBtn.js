(function(namespace){
	/**
	 * 下拉组件右边按钮组件
	 */
	var SelectSpanBtn = Com.extends({
		/**
		 * 初始化
		 */
		init : function(){
			var self = this;
			self.opt = {
				store : self.options.store
			};
			self.opt.spanClass = self.options.spanClass;
			self.opt.btnClass = self.options.btnClass;
			self.opt.btnPicClass = self.options.btnPicClass;
		},
		/**
		 * 渲染按钮组件
		 */
		render : function () {
			var self = this;
	    	this.node.append(self.createSpanBtn());
	    	this.node.find('button').on('click',function(){
	    		self.emit('clickSpanBtn');
	    	})
	  	},
		/**
		 * 创建按钮组件html对象
		 */
		createSpanBtn : function(){
			var self = this;
			var html = $('<span class="input-group-btn "' + self.opt.spanClass +' id = "spanBtn" ></span>');
			var btnHtml = '<button class="btn btn-default ' + self.opt.btnClass + '" id="searchBtn" type="button">\
                    		<span class = "glyphicon glyphicon-triangle-bottom ' + self.opt.btnPicClass + '" aria-hidden="false" />\
                		</button>';
			html.append(btnHtml);
			return $(html);
		},
		/**
		 * 销毁组件
		 */
		destory : function(){
			this.node.html('');
		},
		/**
		 * 刷新组件内部数据
		 */
		reload : function(){

		}
	});
	namespace.SelectSpanBtn = SelectSpanBtn;
})(window);