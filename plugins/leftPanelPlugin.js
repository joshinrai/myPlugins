// 左边面板组件
var leftPanelPlugin = Container.extends({
  
  ewsType: '',
  init: function () {
    var self = this;
    this.text = 'xxxx';
    // 默认类型为 人员 人员为1
    self.ewsType = {type: 1};

     // 加载 tab
    this.loadTab();

    // 信息模型列表组件
    this.coms.modelListPlugin = this.factory(modelListPlugin, {
      text: '左边模型面板'
    }, $('#tag_model'));

    // 点击规则列表
    self.on('tagListClick', function(option){
        $("#tag_div").html("");
        this.load(self.ewsType);
    });

    // 点击模型列表
    self.on('modelListClick', function(option){
        self.coms.modelListPlugin.destroy();
        self.coms.modelListPlugin.load(self.ewsType);
    });


    self.on('tagSearchClick', function(option){
       self.searchOption = option ;
          for (var key in self.coms){
            if(self.coms[key].tagFilter){
              self.coms[key].tagFilter(option);
            }
          }
    });


  },
  /**
   * load 数据动态加载
   */
  load: function (options) {
    var self = this;
    self.ewsType = options;
    var url = '../data/tags.json';
    //var url = '../api/getRuleList';
    //debugger ; 

    commonMethod.load(url, options, function(err, data){
      self.data = data;
      if(typeof(self.node.find('#search')[0])=='undefined'){
        self.render();
        self.initDag();
      }
    });
  },
  /**
   * render 绘制，数据绘制到dom容器中
   */
  render: function () {
    var self = this;
    
    // 标签对象
    var tagObject = $("#tag_div");
    // 加载搜索
    this.loadSearchHtml(tagObject);

    $.each(this.data, function(i, group) {
        self.coms[i] = self.factory(tagsPlugin, {
            text: '标签属性'
          }, tagObject);
        self.coms[i].load(group);
    });
  },
  /**
   * destroy 事件销毁等
   */
  destroy: function () {
    this.node.html('');
  },
  initDag: function(){
    var self = this;
    var draggable = new Draggable({
      container: this.node,
      selector: 'li',
      helper: function(e){
        return $( "<span class='label label-info'>Info</span>" );
      }
    }, this.node);

    draggable.on('began', function(e, position, target){
      self.dragNode = target;
    });
    draggable.on('ended', function(e, position){
        self.emit('createNode', e, self.dragNode);
    });
  },
  /**
   * loadSearchHtml 加载搜索按钮
   */
  loadSearchHtml: function (tagNode) {
    var self = this;
      if(!$('.ul_search')[0]){
         var html =  "<ul class='ul_search inline'> "+
               "<div class='form-inline'> "+
                 "<input type='text' class=' form-control search_input' id='search' placeholder='输入内容' > "+
                 "<button type='button' class='btn btn-sm btn-success'>搜索</button> "+
               "</div> "+
             "</ul>";
          tagNode.html(html);

          self.node.find('button').on('click', function(){
            console.log('标签搜索.....');
            self.emit('tagSearchClick', $('#search').val());
          });
      };
    //触发搜索框事件
    self.node.find('#search').keydown(function(event){
        var searchInput = $("#search").val() ;
        if("13"==event.keyCode ){
            self.emit('tagSearchClick', $('#search').val());
        }
    });
  },
  /**
   * loadTab 加载标签TAB
   */
  loadTab: function(){
    var self = this;
    // tab 已经创建
    if($('#tab4')[0]){
      return;
    }

    var tabHtml = 
      "<div class='tab' id='tab4'>"+
        "<div class='tab-nav j-tab-nav'>"+
          "<a href='javascript:void(0);' class='current' id='tag_list'>标签列表</a>"+
          "<a href='javascript:void(0);' id='model_list'>模板列表</a>"+
        "</div>"+
        "<div class='tab-con'>"+
          "<div class='j-tab-con'>"+
            "<div class='tab-con-item' style='display:block;' id='tag_div'>"+
            "</div>"+
            "<div id='tag_model'>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";

      this.node.html(tabHtml);

      $('#tab4').rTabs({
          bind : 'click',
          animation : 'fadein',
          auto: false
      });

      // 注册点击 标签列表
      self.node.find('#tag_list').on('click', function(){
        console.log('标签列表.....');
        self.emit('tagListClick', "");
      });
      // 注册点击 模型列表
      self.node.find('#model_list').on('click', function(){
        console.log('模板列表.....');
        self.emit('modelListClick', "");
      });

  }
});
