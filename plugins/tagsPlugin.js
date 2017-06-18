// 标签组 组件
var tagsPlugin = Com.extends({
  //eventList: ['tagSearchClick'],
  init: function () {
    this.text = 'xxxx';
  },
  /**
   * load 数据动态加载
   */
  load: function (options) {
    this.data = options;
    this.render();
  },
  /**
   * render 绘制，数据绘制到dom容器中
   *
   * 标签组组件加载数据方法
   *
 		groupId:'',
		groupName:'',
		Item:
		[
			{
				itemId:'',
				itemName:''
			},
			{
				itemId:'',
				itemName:''
			},
			{
				itemId:'',
				itemName:''
			}
		]
    */
  render: function () {
    var self = this;
    var html = this.loadingItem(this.data.items, this.data.groupColor);
	  html = "<ul class='ul_title inline'><span id='"+ this.data.groupId + "_span'>" +
				"<strong>"+this.data.groupName+ "</strong>" +
			"</span></ul>" +
			"<ul class='inline' id='"+this.data.groupId+"_ul'>" + 
				html + 
			"</ul>";
	  this.node.append(html);

  },
  /**
   * destroy 事件销毁等
   */
  destroy: function () {
    this.node.html('');
  },
  /**
   * loadingItem 加载节点
   */
  loadingItem: function (items, color) {
      var tempHtml = '';
    	$.each(items, function(i, item) {
    		var showName = item.itemName;
    		if(item.itemName.length > 5){
    			showName = item.itemName.substring(0,5);
    		} 
        tempHtml += 
       		"<li class='label tagt' title='"+item.itemName+"' id='"+item.itemId+"' style='margin-left:10px;margin-top:3px;background-color:"+color+"' draggable='true' >"
       			+showName+
       		"</li>";
    	});
    	return tempHtml;
  },
  /**
   * tagFilter 标签过滤 items为左侧面板中的所有内容，keyword为搜索框中的内容
   */
  tagFilter:function (keyword) {
      var group = this.data;
      var self = this ;
      $("#"+group.groupId+"_span").parent().show() ;
      $("#"+group.groupId+"_ul").show() ;
      console.log("打印self.data:"+JSON.stringify(self.data)) ;
      var itemArray = group.items ;
      for(var i=0;i<itemArray.length;i++){
        $("#"+group.items[i].itemId).show() ;
      }
      var count = 0 ;
      for(var i=0;i<itemArray.length;i++){
        if(-1==group.groupName.indexOf(keyword)){
          if(-1==group.items[i].itemName.indexOf(keyword)){
            $("#"+group.items[i].itemId).hide() ;
            count ++ ;
            if(count==group.items.length){
              $("#"+group.groupId+"_span").parent().hide() ;
            }
          }else if(0==group.items[i].itemName.indexOf(keyword)){
            continue ;
          }
        }
      }  
  }
});