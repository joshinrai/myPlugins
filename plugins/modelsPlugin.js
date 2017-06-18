/**
 * 模型列表组件
 */
 // var namespace = {
 // 	BASE : {},
 // 	Yu: {}
 // }
var modelsPlugin = Com.extends({
	/**
	 * init: 模型列表内容初始化
	 */
	init: function(){
		
	},
	/**
	 * load: 加载模型列表数据
	 */
	load: function(models, options){
		this.data = models;
		this.render(options);
	},
	/**
	 * render: 绘制，数据绘制到dom容器中
	 */
	render: function(options){
		var self = this;
		var html = "<div class='form-group'><ul class='list-group'>";
		$.each(this.data, function(i, model){
			if(model.type == options.type){
				html += "<li id='"+model.id+"' class='list-group-item'>"+model.name+"</li>";
			}
		});
		html += "</ul></div>"; 
		this.node.html(html);
	},
	/**
	 * destroy 事件销毁等
	 */
  	destroy: function () {
    	this.node.html('');
  	}
});