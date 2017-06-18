/**
 * 地图大组件
 * [init description]
 * @param  {[type]} ){      this.render();      var self              [description]
 * @param  {[type]} load:                    function(){            } [description]
 * @param  {[type]} render:                  function(){            } [description]
 * @param  {[type]} destroy:                 function(         [description]
 * @return {[type]}                          [description]
 */
var mapPlugin = Container.extends({

    init: function(){

    },

    load: function(data){
        this.data = data;
        this.render();
    },
    /**
     * [render 创建整个地图的主面板]
     * @return {[type]} [description]
     */
    render: function(){

        var self = this;

        var html = ["<div class='container-fluid' style='width:635px;height:465px;margin-left:165px;'>",
              "<div class='row'>",
                "<div class='col-sm-3 col-md-3 sidebar' style='margin-top:-50px;position: absolute;' id='mapLeft'>",
                    "<div id='areaTable' class='areaTable' style='width:100%;height:460px;'></div>",
                    <!-- 左边面板-->
                "</div>",

                "<div class='col-sm-9 main'  style='width:98%;height:465;overflow-y: auto; overflow-x: hidden;'>",//id='mapMain'
                    "<div class='form-inline' style='width:500px;padding-left:13px;margin-top:-15px;padding-bottom:15px;'><lable>新增区域：&nbsp</lable>",
                    "<input type='text' class='form-control' id='tableArea' style='width:150px;' name='fname' />&nbsp",
                    "<button type='button' class='btn btn-primary' id='commitClick'>保存</button></div>",
                    "<div id='mapMain' style='width:600px;height:215px;'>",
                        "<iframe src='draw.html' id='mapIframe' style='width:100%; height:100%;'></iframe>",
                    "</div>",
                    "<div class='form-inline' style='width:600px;padding-left:13px;padding-bottom:15px;'><lable>LAC：&nbsp</lable>",
                    "<input type='text' class='form-control' id='lacText' style='width:150px;' name='fname' />&nbsp",
                    "<lable>CI：&nbsp</lable>",
                    "<input type='text' class='form-control' id='ciText' style='width:150px;' name='fname' />&nbsp",
                    "<button id='addAreaClick' class='btn btn-primary' type='button'>添加位置</button></div>",
                    "<div class='tag_table' id='tag_table' style='width:580px;height:135px;overflow-y: auto;'></div>",
                    <!-- 中间主面板-->
                "</div>",
              "</div>",
            "</div>"].join("");

        this.node.html(html);//

        //将map上方的内容添加到map左侧
        this.node.find('#commitClick').on('click', function(){
            var options = self.getMapInfo() ;
            self.coms.areaTablePlugin.addTableTr(options) ;
        });

        //将map下方的内容添加到map下
        this.node.find('#addAreaClick').on('click', function(){
            self.coms.tablePlugin.addTableTr() ;
        });
        this.node.find('#mapLeft_ul').find("a").on('click', function(e){
          self.emit('areaListClick', null);
        });

        //从主面板监听地图消息，并触发主面板事件，附带区域数据
        self.on('mainToMapPlugin',function(options){
            self.emit('mapPluginToModal',self.coms.areaTablePlugin.table.data) ;//self.coms.areaTablePlugin.localData) ;
        });

        // this.initLeafletMap();
        this.initAreaTable() ;
        this.initTable();
        
    },
    destroy: function(){
        this.node.html = "";
    },
    loadMapLeft: function(data){
        return "<li><a href='#' id='"+data.code+"'>"+data.name+"</a></li>";
    },
    getMapInfo: function(){
       return this.node.find("#mapMain").find("#mapIframe")[0].contentWindow.leaflet.getMapInfo();
    },
    // 画图
    reDrawMapLayer: function(options){
       return this.node.find("#mapMain").find("#mapIframe")[0].contentWindow.leaflet.draw(options);
    },
    initLeafletMap: function(){
        // this.coms.leafletMapPlugin = this.factory(leafletMapPlugin, {
        //   text: '地图'
        // }, this.node.find("#mapMain"));
        // this.coms.leafletMapPlugin.load();
    },
    // 画table
    initTable:function(){
        this.coms.tablePlugin = this.factory(tablePlugin, {
            text: 'table组件'
        }, this.node.find('#tag_table'));
    },
    initAreaTable:function(){
        var self = this;
        this.coms.areaTablePlugin = this.factory(areaTablePlugin,{
            text:"地图左侧区域组件"
        },this.node.find('#areaTable'));

        self.emit('mapToMainPanel', self.coms.areaTablePlugin.localData);

        this.coms.areaTablePlugin.on('row-click-out', function(e, tr, item){
            $('#tableArea').val(item.name) ;
            $('#lacText').val(item.lac) ;
            $('#ciText').val(item.ci) ;
            self.reDrawMapLayer(item.areaDisplay) ;
      });
    },
    /**
     * 设置地图区域DOM对象地图回显
     **/
    setInfoMarkerDom: function(dom){                                           
        this.node.find("#mapMain").find("#mapIframe")[0].contentWindow.leaflet.setInfoMarkerDom(dom);
    },
    /**
     * 地图画点
     **/
    drawPoint: function(options){
        // var options = {
      //         x:31.123456,
      //         y:121.4578
      // }
      this.node.find("#mapMain").find("#mapIframe")[0].contentWindow.leaflet.drawPoint(options);
    }
});