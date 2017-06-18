/**
 * 模型列表组件
 */
var modelListPlugin = Container.extends({
	init: function () {
		this.text = 'xxxx';
	},
	/**
	* load 数据动态加载
	*/
	load: function (options) {
		var url = "../data/models1.json";
		var self = this;
		commonMethod.load(url, options, function(err, data){
		  self.data = data;
		  self.render(options);
		});
	},
	/**
	* render 绘制，数据绘制到dom容器中
	*/
	render: function (options) {
		var self = this;
	    self.coms.modelsPlugin = self.factory(modelsPlugin, {
	      text: '模型列表'
	    }, self.node);
	    self.coms.modelsPlugin.load(this.data, options);
	},
	/**
	* destroy 事件销毁等
	*/
	destroy: function () {
		this.node.html('');
	}
});