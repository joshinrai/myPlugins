/**
 * 搜索组件
 */
(function(namespace){
	var SearchCom = Com.extends({
		/**
		 * 初始化
		 * @return {[type]} [description]
		 */
		init : function(){
			var self = this;

			//前缀自定义样式
			if(this.options.prefixClass !== null && this.options.prefixClass !== undefined){
				self.prefixClass = this.options.prefixClass;
			} else {
				self.prefixClass = '';
			}

			//前缀图片span自定义样式
			if(this.options.prefixSpanClass !== null && this.options.prefixSpanClass !== undefined){
				self.prefixSpanClass = this.options.prefixSpanClass;
			} else {
				self.prefixSpanClass = '';
			}
			//前缀图片自定义样式
			if(this.options.prifixPicClass !== null && this.options.prifixPicClass !== undefined){
				self.prifixPicClass = this.options.prifixPicClass;
			} else {
				self.prifixPicClass = '';
			}
			//输入框自定义样式
			if(this.options.inputClass !== null && this.options.inputClass !== undefined){
				self.inputClass = this.options.inputClass;
			} else {
				self.inputClass = '';
			}
			//搜索按钮span自定义样式
			if(this.options.searchBtnSpanClass !== null && this.options.searchBtnSpanClass !== undefined){
				self.searchBtnSpanClass = this.options.searchBtnSpanClass;
			} else {
				self.searchBtnSpanClass = '';
			}
			//搜索按钮自定义样式
			if(this.options.searchBtnClass !== null && this.options.searchBtnClass !== undefined){
				self.searchBtnClass = this.options.searchBtnClass;
			} else {
				self.searchBtnClass = '';
			}
			//前缀字符
			if(this.options.prefixStr !== null && this.options.prefixStr !== undefined){
				self.prefixStr = this.options.prefixStr;
			} else {
				self.prefixStr = '';
			}

			//输入框默认显示描述字符
			if(this.options.commentStr !== null && this.options.commentStr !== undefined){
				self.commentStr = this.options.commentStr;
			} else {
				self.commentStr = '';
			}

			//是否包含搜索按钮
			if(typeof this.options.hasSearchBtn === 'boolean'){
				self.hasSearchBtn = this.options.hasSearchBtn;
			} else {
				self.hasSearchBtn = true;
			}

			//按钮显示字符
			if(this.options.btnStr !== null && this.options.btnStr !== undefined){
				self.btnStr = this.options.btnStr;
			} else {
				self.btnStr = '';
			}
		},

		/**
		 * 渲染组件
		 * @return {[type]} [description]
		 */
		render : function(){
			var self = this;
			var div = $('<div class="input-group"></div>');
			div.append(self.createInputCom());
			if(self.hasSearchBtn === true){
				div.append(self.craeteSearchCom());
				self.node.append(div);
				//注册搜索消息
				self.node.find('#searchBtn').on('click',function(){
					self.emit('search',self.node.find('#keyMsg').val());
				});
				self.node.find('#keyMsg').on('input',function(){
					var data = $(this).val();
					if(data !== undefined && data !== null && data.length !== undefined && data.length > 0){
						self.node.find('#searchPic').hide();
					} else {
						self.node.find('#searchPic').show();
					}
				});
			} else {
				self.node.append(div);
				//注册搜索消息
				self.node.find('#keyMsg').on('input',function(){
					var data = $(this).val();
					if(data !== undefined && data !== null && data.length !== undefined && data.length > 0){
						self.node.find('#searchPic').hide();
					} else {
						self.node.find('#searchPic').show();
					}
					self.emit('search',data);
				});
			}
		},
		/**
		 * 
		 */
		createInputCom : function(){
			var self = this;
			var html = '';
			var preFixHtml = '<span class="input-group-addon ' + self.prefixSpanClass +'">' + self.prefixStr + '</span>';
			var preFixPicHtml = '<span class = "input-group-addon ' + self.prefixPicSpanClass 
								+ '"><span id = "searchPic" class = "glyphicon glyphicon-search ' 
								+ self.prifixPicClass + '" aria-hidden="false"></span></span>';
			var inputHtml = '<input type="text" class="form-control ' + self.inputClass + '" id="keyMsg"' + 
							' placeholder="'+ self.commentStr +'">' +'</input>';
			html = preFixHtml + preFixPicHtml + inputHtml;
			return $(html);
		},
		/**
		 * 创建搜索组件
		 * @return {[type]} [description]
		 */
		craeteSearchCom : function(){
			var self = this;
			var html = '<span class="input-group-btn "></span>';
			var btnHtml = '<button class="btn btn-default ' + self.searchBtnClass +'" id="searchBtn" type="button">' 
							+ self.btnStr + '</button>';
			var html = '<span class="input-group-btn ' + self.searchBtnSpanClass +'">' + btnHtml + '</span>';
			return $(html);
		}
	})
	namespace.SearchCom = SearchCom;
})(window);