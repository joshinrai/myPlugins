/**
 * 表格主键
 */
var areaTablePlugin = Container.extends({
   /**
    * init: 初始化表格
    */
   init: function(){
      var self = this;
      this.tableOpt = {
          cheader: [],
          header: [
             {
                title: '全选',
                  render: function(){
                     var html = '<label type="checkbox"><input class="allCheck" type="checkbox"></input></label>';
                    return $(html);
                  }
             },
             {
              title:'区域'
             }
          ],
          columns: [
                {
                  key:'name'
                },
                {
                  key:'lac',
                  hidden:true 
                },
                {
                  key:'ci',
                  hidden:true 
                }
          ],
          isHeaderShow: false,
          isCheckboxShow: true,
          isSingleSelection: false,

          url: '../data/areaTable.json'
      };
      this.load();

      $('#addSingleRow').on('click', function(){
         self.addTableTr();
      });
   },
   /**
    * load: 加载数据
    */
   load: function(){
      var self = this ;
      this.table = new Table(this.tableOpt, $('.areaTable'));
      this.table.load();

      this.table.on('row-click', function(e, tr, item){
          self.emit('row-click-out', e, tr, item);
        });

   },
   /**
    * render: 绘制，数据绘制到dom容器中
    */
   render: function(){

   },
   /**
    * destroy: 事件销毁等
    */
   destroy: function () {
      this.node.html('');
   },
   addTableTr: function(options){
      var area = $('#tableArea').val() ;
      var addData = {} ;
      addData.name = area ;
      addData.code = "" ;
      addData.areaDisplay = options ;
      this.localData.push(addData) ;
      var count = 1 ;
      for(var i=0;i<this.localData.length;i++){
        if(area!=this.localData[i].name){
          count ++ ;
        }
      }
      if(area&&count==this.localData.length){
        var trHTML = "<tr><td class='table_column_0'><input type='checkbox'/></td><td class='table_column_1'>"+area+"</td></tr>";
        $(".areaTable tbody tr:eq(0)").before(trHTML);
      }
   }
});