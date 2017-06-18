
var ewssetIndex = Container.extends({
	  ewsType: '',
  	init: function () {
    var self = this;
    // 信息设置头部
    this.coms.ewsHeaderPlugin = this.factory(ewsHeaderPlugin, {
      text: '信息设置头部内容'
    }, $('#tag-header'));

	  // 按照当前选中信息类型加载规则信息
    this.coms.ewsHeaderPlugin.on('loadRuleData', function(options){
    	self.ewsType = options;
    	console.log('当前信息类型为：' + options.type);
    	//清空左侧规则菜单内容
    	  self.coms.leftPanelPlugin.destroy();
        self.load(options);
    });

    // 预警右边模板头部
    this.coms.leftPanelPlugin = this.factory(leftPanelPlugin, {
      text: '左边规则面板'
    }, $('#leftPanelDiv'));

    // 信息设置主体部分
    this.coms.mainPanlPlugin = this.factory(mainPanlPlugin, {
      text: '信息设置主体面板'
    }, $('#tag_main'));

    this.coms.leftPanelPlugin.on('createNode', function(e, data){
      self.coms.mainPanlPlugin.createNode(e, data);
    });

    // 测试方法
    this.coms.mainPanlPlugin.on('btnTriggerClick', function(option){
        console.log("搜索时输入的内容："+option);
        self.coms.mainPanlPlugin.loadTagData(option);
    });

    // 初始化默认类型是 人员，为1
     this.load({type: "1"});
  },
  /**
   * load 数据动态加载
   */
  load: function (options) {
    var self = this;
    self.coms.leftPanelPlugin.init() ;
    self.coms.leftPanelPlugin.load(options);
  }
});

/**
 * 当前页面的
 */
$(function(){
	
  // 监听 标签内容变化时，修改整个网页的高度
  $('#tag_div').bind('DOMNodeInserted', function(e) {  
      var jTabConHeight = $('.j-tab-con').height();
      var leftPanelDivHeight =$('#leftPanelDiv').height();

      if(jTabConHeight > leftPanelDivHeight){
          // 修改当前leftPanelDiv的高度
          $('#leftPanelDiv').height(jTabConHeight);
      }else{
          $('.j-tab-con').height(leftPanelDivHeight);
      }
  });

  // new 组件
	new ewssetIndex();
});


