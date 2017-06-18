(function(namespace){
  var TableStore = Com.extends({
    init: function () {
      this.url = this.options.url;
    },
    load: function(opt){
      var self = this;
      if(!opt){
        opt = {};
      }
      if(opt.localData){
        setTimeout(function(){
          self.emit('load', opt.localData);
        });
      }else{
        // ajax
        commonMethod.load(this.url, {}, function(err, data){
          self.data = data;
          self.emit('load', self.data);
        });
      }
    }
  });
  var Table = Com.extends({
    init: function () {
      /*
        cheader: 表格自定义表头内容
        [{title: 'xxx', colspan: 1, render: function}]
      */
      this.cheader = this.options.cheader;
      /*
        header: 表格表头内容
        [{title: 'xxx', colspan: 1, render: function}]
      */
      this.header = this.options.header;
      /*
        columns: 表格列内容
        [{key: 'key', render: function}]
      */
      this.columns = this.options.columns;
      /**
        * columnCount: 表格当前总列数
        */
      this.columnCount = 0;
      /**
        * isHeaderShow: 是否显示表头内容：true:显示, false:不显示
        */
      this.isHeaderShow = this.options.isHeaderShow;
      /**
        * isHeaderShow: 是否显示列表选择框：true:显示, false:不显示
        */
      this.isCheckboxShow = this.options.isCheckboxShow;
      /**
        * isSingleSelection: 是否单选：true:单选, false:多选
        */
      this.isSingleSelection = this.options.isSingleSelection;
      /*
        url: 表格数据请求地址
      */
      this.store = new TableStore({url: this.options.url});
      this.initEvent();
    },
    initEvent: function(){
      var self = this;
      this.store.on('load', function(data){
        self.data = data;
        self.reload();
      })
    },
    /**
     * load 数据动态加载
     */
    load: function(opt) {
      this.store.load(opt);
    },
    reload : function(data){
      var self = this;
      this.node.find('table').children('tbody').remove();
      this.node.find('table').append(this.createLines());
    },
    /**
     * render 绘制，数据绘制到dom容器中
     */
    render: function () {
      var self = this;
      var table = $("<table class='table table-bordered table-striped table-hover'></table>");
      table.append(this.createHeaders());
      table.append(this.createLines());
      this.node.append(table);
    },
    createHeaders: function(){
      var self = this;
      var html = $("<thead></thead>");
      if(this.cheader){
        html.append(this.createHeader(this.cheader, true));
      }
      if(this.header){
        html.append(this.createHeader(this.header));
      }

      if(this.isCheckboxShow){
        self.columnCount = self.columnCount - 1;
      }
      return html;
    },
    createHeader: function(header, cheader){
      var html = "";
      /**
        * 根据是否显示表头内容设置表头是否可见
        * true:可见
        * false: 不可见，添加 display CSS样式
        */
      if(this.isHeaderShow){
        html = $("<tr></tr>");
      }else{
        html = $("<tr style='display: none;'></tr>");
      }
      this.columnCount = 0
      for(var i = 0; i < header.length; i++){
        var colspan = header[i].colspan/1
        if(colspan > 1){
          this.columnCount = this.columnCount + colspan;
        }else{
          this.columnCount++;
        }
        html.append(this.createHeaderColumn(header[i], i, cheader));
      }
      return html;
    },

    createHeaderColumn: function(column, index, cheader){
      var self = this;
      var html;
      if(cheader){
        html = $("<th></th>");
      }else{
        html = $("<th class='table_column_" + index + "'></th>");
      }

      if(column.colspan/1 > 1){
        html.prop('colspan', column.colspan);
      }

      if(column.render){
        html.append(column.render(html, column));
      }else{
        html.html(column.title);
      }
      /**
        * 表头全选框单击功能
        */
      if($(html).children('label').length > 0){
        /**
          * 当设置为单选模式时，设置表头全选框为禁用状态
          */
        if(self.isSingleSelection){
          $(html).children('label').children('input[type=checkbox]').prop('disabled', true);
        }
        /**
          * 为表头全选按钮添加单击全选事件：选中时全选，未选中时取消全选
          */
        html.on('click', function(e){
          var checkBox = $(this).children('label').children('input[type=checkbox]');
          if(checkBox.is(':checked')){
            $("INPUT[type='checkbox']").each( function() {
              $(this).prop('checked', true);
            });
          }else{
            $("INPUT[type='checkbox']").each( function() {
              $(this).prop('checked', false);
            });
          }
        });
      }

      return html;
    },
    createLines: function(){
      var html = $("<tbody></tbody>");
      if(this.data !== undefined && this.data !== null){
        for(var i = 0, len = this.data.length; i < len; i++){
          html.append(this.createLine(this.data[i]));
        }
      }
      return html;
    },
    createLine: function(item){
      var self = this;
      var html = $("<tr></tr>");
      /**
        * 显示单选框:根据当前表格是否设置显示选择框列
        * true:显示
        * false:不显示
        */
      if(this.isCheckboxShow){
          html.append("<td style='width:40px'><input class='row_"+item.id+"' type='checkbox'/></td>");
      }
      for(var i = 0; i < this.columnCount; i++){
        html.append(this.createLineColumn(this.columns[i], item, i));
      }

      /**
        * 添加列表行选择事件：将checkbox选择框选择或取消选择
        */
      // html.on('click', function(e){
      //   var checkBox = $(this).children('td').children('input[type=checkbox]');

      //   if(checkBox.is(':checked')){
      //       checkBox.prop('checked', false);
      //   }else{
      //       if(self.isSingleSelection){
      //         $("INPUT[type='checkbox']").each( function() {
      //           $(this).prop('checked', false);
      //         });
      //       }
      //       checkBox.prop('checked', true);
      //   }

      // });
       
      return html;
    },
    createLineColumn: function(column, item, index){
      var self = this;
      var html = $("<td class='table_column_" + index + "'></td>");
      if(!column){
        return html;
      }
      if(column.render){
        html.append(column.render(html, column, item, index));
      }else{
        html.html(item[column.key]);
      }
      /**
        * 列表单元格单击事件
        */
      html.on('click', function(e){
        var checkBox = $($(this)[0].parentNode).children('td').children('input[type=checkbox]');

        if(checkBox.is(':checked')){
            checkBox.prop('checked', false);
        }else{
            /**
            * 根据是否是单选：单选时先将其它的行取消选中
            */
            if(self.isSingleSelection){
              $("INPUT[type='checkbox']").each( function() {
                $(this).prop('checked', false);
              });
            }
            checkBox.prop('checked', true);
        }
      });
      return html;
    },
    /**
      * 列表新添加行事件：添加第一行
      */
    addTableTr: function(data){
      var columnLength = this.columnCount;
      var trHTML = $("<tr></tr>");
      if(this.isCheckboxShow){
        trHTML.append("<td style='width:40px'><input type='checkbox'/></td>");
      }
      for(var i=0; i<columnLength; i++){
        trHTML.append("<td class='table_column_"+i+"'>"+data[i]+"</td>");
      }

      $(this.node.selector + " tbody tr:eq(0)").before(trHTML);
    },
    /**
     * destroy 事件销毁等
     */
    destroy: function () {
      this.node.html('');
    }
  });
  namespace.Table = Table;
})(window);
