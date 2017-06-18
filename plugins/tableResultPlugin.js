/**
 * 结果列表组件
 * @type {[type]}
 */
var tableResultPlugin = Container.extends({
	/**
	 * 初始化组件
	 * @return {[type]} [description]
	 */
	init : function(){
		var self = this;
		self.tableOpt = {
			header: [
		    	{
			        title: '时间'
			    }, {
			        title: '内容'
		      	}
		    ],
			columns : [
				{
					key : 'time'
				},{
					key : 'msg'
				}
			],
			isCheckboxShow : true,
			isHeaderShow: true,
    		isSingleSelection: false,
    		url : self.options.url
		};
		self.searchComOpt = {
			prefixStr : '预警消息:',
			commentStr : '输入关键字搜索预警消息...',
			btnStr : '搜索',
			hasSearchBtn : true,
		};
		self.curPosition = self.options.position;
		this.searchCom = new SearchCom(this.searchComOpt,$(self.curPosition));
		this.table = new Table(this.tableOpt,$(self.curPosition));
		
		self.searchCom.on('search',function(data){
			self.search(data);
		});

		this.render();
		this.table.load();
	},
	/**
	 * 查找搜索的关键字
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	search : function(data){
		var self = this;
		var dat = self.table.store.data;
		var opt = {};
		if(data === null || data === undefined || data.length <= 0){
			opt = {localData : searchData};
		} else {
			if(dat !== null && dat !== undefined){
				var searchData = [];
				for (var i = 0; i < dat.length; i++) {
					if(dat[i].msg !== null && dat[i].msg !== undefined){
						if(dat[i].msg.indexOf(data) >= 0){
							searchData.push(dat[i]);
						}
					}
				};
				opt = {localData : searchData};
			} else {
				opt = {localData : dat};
	
			}
		}
		self.table.store.load(opt);
	},
	/**
	 * 加载数据
	 * @param  url 数据获取地址
	 * @return {[type]}     [description]
	 */
	load : function(url){
		var self = this;
		if(url !== null){
			self.table.load(url);
		} else {
			self.table.load(self.tableOpt.url);
		}
		
	},
	/**
	 * render: 绘制，数据绘制到dom容器中
	 */
	render: function(){
		var self = this;
		self.searchCom.render();
		self.table.render();
	},
	/**
	 * destroy: 事件销毁等
	 */
	destroy: function () {
		this.node.html('');
	}
})

$(function(){
	var opt = {
		url : '../data/table.json',
		position : '#result_div'
	}
	new tableResultPlugin(opt);
});