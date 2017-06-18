(function(namespace){

	var SelectTableStore = Com.extends({
		/**
		 * 初始化
		 */
		init : function(){

		},
		/**
		 * 获取值
		 */
		getData : function(){

		},
		/**
		 * 查找key的值
		 */
		find : function(key){

		}
	});

	var SelectTable = Com.extends({
		/**
		 * 初始化
		 */
		init : function(){
			var self = this;

			this.opt = {
				/*
					表格自定义样式
				 */
				tableClass : self.options.tableClass,
				/*
					是否含有头部：true(含有) ／ false(不含有)
				 */
				hasHeader : self.options.hasHeader,
				/*
					表头内容
					{key:'xxx',title:'xxx',colspan: 1}
				 */
				header : self.options.header,
				/*
					表格列内容
					{key:'xxx'}
				 */
				columns : self.options.columns,
				/*
					是否显示列表选择框：true(显示) / false(不显示)
				 */
				hasCheckBox : self.options.hasCheckBox,
				/*
					是否单选：true(单选) / false(多选)
				 */
				isSingleSelection : self.options.isSingleSelection
			};
			this.store = new SelectTableStore();

		},
		/**
		 * 渲染组件
		 */
		render : function(){
			var self = this;
			var table = $('<table class="table table-bordered table-striped table-hover"></table>');
			

		},
		/**
		 * 创建表头
		 */
		createHeads : function(){
			var self = this;
			var html = $('<tr class="" id = "tableHead"></tr>');
			if(self.hasCheckBox){
				html.append('<th id = "tableHead_checkbox" style="width:40px"><input type="checkbox"/>全选</th>');
			}
			for (var i = 0;self.opt.header.length; i >= 0; i++) {
				var columnHead = self.createHead(self.opt.header[i],i);
				html.append(columnHead);
			};
		},
		/**
		 * 创建表头名
		 */
		createHead : function(column,index){
			var self = this;
			var html = $('<th class="table_column_' + index + '"></<th>');
			html.html(column.title);
			return $(html);
		},
		/**
		 * 创建表格体
		 */
		createTbody : function(){
			var self = this;
			var html = $('<tbody></tbody>');
			var data = self.store.getData();
			if(data !== undefined && data !== null){
        	for(var i = 0, len = data.length; i < len; i++){
          		var tr = creteLine
          		self.addTr(data[i]);
        	}
		},
		/**
		 * 增加一行记录
		 */
		addTr : function(data){
			var self = this;
			var html = $('<tr></tr>');
			if(self.opt.hasCheckBox){
				html.append('<td style="width:40px"><input type="checkbox" /></td>');
				html.find('td:last').on(click,function(){

				});
			}
			var columns = self.opt.columns;
			for(int i = 0;i < columns.length;i++){
				var val = self.store.find(data,columns[i].key);
				var column = '<td>' + val + '</td>';
				html.append(column);
				html.find('td:last').on(click,function(){

				});
			}
		}
	});
	namespace.SelectTable = SelectTable;
}(window);


var TableTest = Container.extends({
	init : function(){
		var opt = {
			hasHeader : true,
			header :[
				{
					title : 'col_1',
					colspan : 1
				},{
					title:'col_2',
					colspan : 1
				}
			],
			columns : [
				{
					key:'time'
				},{
					key:'msg'
				}
			]
			hasCheckBox : true,
		}
		self.table = new SelectTable();
	}
})


