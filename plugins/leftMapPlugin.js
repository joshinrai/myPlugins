/* 
* @Author: anchen
* @Date:   2016-01-09 14:56:00
* @Last Modified by:   anchen
* @Last Modified time: 2016-01-09 14:57:46
*/

// 列表 组件
var listPlugin = Com.extends({
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
      html = "<ul class='ul_title inline'><span id=' "+ this.data.groupId + "'_span>" +
                "<strong>"+this.data.groupName+ "</strong>" +
            "</span></ul>" +
            "<ul class='inline' id='"+this.data.groupId+"'_ul>" + 
                html + 
            "</ul>";
      this.node.append(html);
  },
  /**
   * destroy 事件销毁等
   */
  destroy: function () {
    this.node.html('');
  }
});