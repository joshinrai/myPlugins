var tablePlugin = Container.extends({
  init: function(){
    this.render();
  },
  load: function(){
    
  },
  render: function(){
    var tableOpt = {
      header: [
        {
          title: 'lac名称'
        }, {
          title: 'ci名称'
        }
      ],
      columns: [
        {
          key: 'lac'
        }, {
          key: 'ci'
        }
      ],
      url: '../data/tablePlugin.json'
  };
  var table = new Table(tableOpt, $('.tag_table'));
  table.load();
  table.on('cell-click', function(e, cell, column, data){
    console.log('row-click', data[column.key]);
  });
  },
  destroy: function(){
    this.node.html = "";
  },
  addTableTr: function(){
    var lac = $('#lacText').val() ;
    var ci = $('#ciText').val() ;
    var lacCount = 1 ;
    var ciCount = 1 ;
    for(var i=0;i<this.data.length;i++){
      if(lac!=this.data[i].lac){
        lacCount ++ ;
      }
      if(ci!=this.data[i].ci){
        ciCount ++ ;
      }
    };
    var lacCi = {} ;
    lacCi.lac = lac ;
    lacCi.ci = ci ;
    this.data.push(lacCi) ;
    if(lac&&ci&&(lacCount==this.data.length||ciCount==this.data.length)){
      var trHTML = "<tr><td class='table_column_1'>"+lac+"</td><td class='table_column_2'>"+ci+"</td></tr>";
      $(".tag_table tbody tr:eq(0)").before(trHTML);
    }

  }
});