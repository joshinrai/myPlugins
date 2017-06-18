/**
 * 右边主面板大组件
 * [init description]
 * @param  {[type]} ){		this.render();		var self              [description]
 * @param  {[type]} load:                    function(){			} [description]
 * @param  {[type]} render:                  function(){			} [description]
 * @param  {[type]} destroy:                 function(         [description]
 * @return {[type]}                          [description]
 */
var mainPanlPlugin = Container.extends({
	init: function(){
		this.render();
	},
	load: function(){
		
	},
	render: function(){
		this.initDag();
	},
	destroy: function(){
		this.node.html = "";
	},
	initDag: function(){
		this.dag = new HDag({}, this.node);
	},
	createNode: function(e, data){
		if(this.dag.mouseIn()){
	      this.dag.createNode({
	        coordinates: {
	        	x: e.offsetX,
        		y: e.offsetY
	        },
	        data: data
	      }, this.createNodeDom(data));
	    }
	},
	createNodeDom: function(data){
		// 判断是否已经穿在该标签
		if($('#'+data[0].id+'divPoint')[0]){
			return;
		}
		var plugin_a_id = data[0].id+"plugin_a";
		// 创建对应的组件，得到对应的html
		var html = 
			"<div class='form-group' id='"+data[0].id+"divPoint'>"+
				"<div class='tag-node'>"+
		 			  "<label class='tag-header' for='tag'>"+data[0].title+"</label></br>"+
		              "<div class='tag-content' id='"+plugin_a_id+"'></div>"+
	            "</div>"+
	         "</div> ";

		this.loadTagData(data, plugin_a_id);
		return $(html);
    },
	/**
	  * loadTagData 拖拽标签后，获取相应的规则相信信息
	  */
	loadTagData: function(options, tagsPluginId){
		var self = this;

	    var url = '../data/tags/'+options[0].id+'.json';
		// var url = '/api/getRuleInfoById';
	    // var url = '../api/getRuleList';
	    commonMethod.ajaxCall(url, options, "POST", "JSON", function(err, data){
	      self.data = data;
	      // 根据返回数据创建相应的不同组件
	      self.getDetilPlugins(data, tagsPluginId);
	    });
	},
	/**
	  * getDetilPlugins 根据返回数据创建相应的不同组件
	  */
	getDetilPlugins:function(data, tagsPluginId){
		// 创建对应的组件，得到对应的html
		var self = this;
		// 创建 <a id=''>年龄大小</a> coms
        for (var i=0;i<data.coms.length;i++){
        	var point = data.coms[i];
        	// 产生一个随机的id
			var modalOption = {
        		modalName: commonMethod.getMarkId(),// 模态
        		linkTitle:point.name,
        		modalTitle: data.itemName,
        		width:500,
        		modalParentNodeId:tagsPluginId
        	};
        	if(point.dataUrl){
			    commonMethod.ajaxCall("../"+point.dataUrl, {id:data.itemId}, "POST", "JSON", function(err, responeData){
			      // 根据返回数据创建相应的不同组件
			      self.createContent(point, modalOption, responeData);
			    });
        	}else{
        		self.createContent(point, modalOption);
        	}
        }
	},
	createContent:function(pluginData, modalOption, responeData){
		var self = this;
		// 创建模态窗口实例
		self.coms.modalPlugin = self.factory(modalPlugin, {
          text: '弹出模态窗'
        }, $("#"+modalOption.modalParentNodeId));

		switch (pluginData.type) {
	        case ("select"):// 单选
	        	modalOption.width = 500;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);

	            self.coms.selectPlugin = self.factory(selectPlugin, {
		          text: '下拉菜单测试'
		        }, $("#"+modalOption.modalName+"_body")); 
	            self.coms.selectPlugin.load(modalOption.modalTitle, responeData, 400);

	            //监听模态框中提交按钮消息,触发下拉框面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.selectPlugin.emit('mainToSelectPlugin',null) ;
			    }) ;

			    self.coms.selectPlugin.on('selectToMain',function(options){
			    	self.coms.modalPlugin.emit('mainPanlSelectToModal',options) ;
			    }) ;

	        break;
	        case ("multiselect"):// 多选
	        	modalOption.width = 500;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);

	        	self.coms.multiselectPlugin = self.factory(multiselectPlugin, {
		          text: '下拉多选框'
		        }, $("#"+modalOption.modalName+"_body"));
		        self.coms.multiselectPlugin.load(modalOption.modalTitle, responeData, 400);

		        //监听模态框中提交按钮消息,触发下拉多选框面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.multiselectPlugin.emit('mainToMultiSelectPlugin',null) ;
			    }) ;

			    self.coms.multiselectPlugin.on('multiSelectToMain',function(options){
			    	self.coms.modalPlugin.emit('mainPanlMultiSelectToModal',options) ;
			    }) ;
	            
	        break;
	        case ("area"):// 多选
	            // 默认 输入框 text
	        	modalOption.width = 800;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);

	        	// 预警右边模板头部
			    self.coms.areaPlugin = this.factory(areaPlugin, {
			      text: '区域面板'
			    }, $("#"+modalOption.modalName+"_body"));
			    self.coms.areaPlugin.load(responeData);

			    //监听模态框中提交按钮消息,触发下拉多选框面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.areaPlugin.emit('mainToAreaPlugin',null) ;
			    }) ;

			    self.coms.areaPlugin.on('areaPluginToMain',function(options){
			    	self.coms.modalPlugin.emit('mainPanlAreaPluginToModal',options) ;
			    }) ;
	        break;
	        case ("map"):// 地图
	        	modalOption.width = 820;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);
			     // 预警右边模板头部
			    self.coms.mapPlugin = this.factory(mapPlugin, {
			      text: '地图面板'
			    }, $("#"+modalOption.modalName+"_body"));
			    self.coms.mapPlugin.load(responeData);

			    self.coms.modalPlugin.on('modalSubClick', function(option){
			       var mapData = self.coms.mapPlugin.getMapInfo();
			       console.log("获取的当前地图信息为 ======>"+mapData);
			    });

			    //监听模态框中提交按钮消息,触发地图面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.mapPlugin.emit('mainToMapPlugin',null) ;
			    }) ;

			    //获取区域数据并将数据返回给模态框
			    self.coms.mapPlugin.on('mapPluginToModal',function(options){
			    	self.coms.modalPlugin.emit('mainPanlMapToModal',options) ;
			    }) ;
			    break; 
			case ("textarea"):// 文本框 
				// 默认 输入框 text
	        	modalOption.width = 500;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);

	        	self.coms.textAreaPlugin = this.factory(textAreaPlugin, {
			      text: '地图面板'
			    }, $("#"+modalOption.modalName+"_body"));

			    self.coms.textAreaPlugin.load(468, 200, modalOption.modalName, null) ;

			    //监听模态框中提交按钮消息,触发文本域面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.textAreaPlugin.emit('mainToTextAreaPlugin',null) ;
			    }) ;

			    self.coms.textAreaPlugin.on('textAreaToMain',function(options){
			    	self.coms.modalPlugin.emit('mainPanlTextAreaToModal',options) ;
			    }) ;
	        break;
	        default: 
	            // 默认 输入框 text
	        	modalOption.width = 300;
	        	// 创建具体的东西
	        	self.coms.modalPlugin.load(modalOption);

	        	self.coms.textPlugin = this.factory(textPlugin, {
			      text: '地图面板'
			    }, $("#"+modalOption.modalName+"_body"));
			    self.coms.textPlugin.load(250, modalOption.modalTitle, modalOption.modalName);

			    //监听模态框中提交按钮消息,触发文本框面板事件
			    self.coms.modalPlugin.on('modalToMainPanel',function(options){
			    	self.coms.textPlugin.emit('mainToTextPlugin',null) ;
			    }) ;

			    self.coms.textPlugin.on('textToMain',function(options){
			    	self.coms.modalPlugin.emit('mainPanlTextToModal',options) ;
			    }) ;
	        break;     
        }
	}
});