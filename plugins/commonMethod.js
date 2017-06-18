/**
 * 常用方法
 */
var commonMethod = {};

commonMethod.ip = "http://30.9.166.142/web/";

/**
 * 判断对象是否为空
 */
commonMethod.notNullOrNotUndefined = function(obj){
    if(obj != "" && obj != 'undefined' && obj !=undefined && obj != null && obj!= 'null'){
       return true;
    }
    return false;
 }

/**
 * 获取一个随机数当成id
 */
commonMethod.getMarkId = function(){
	var mytime = Date.parse(new Date())/1000;
	var r = Math.floor(Math.random()*100000+1);
	return mytime+"_"+r;
}


/**
 * url 访问服务的url data 发送给服务的参数 type 分：'POST' 和 'GET' dataType 包括 json xml html等
 * callback 成功后的回调方法 backerr 失败后的回调方法
 */
//  commonMethod.ajaxCall = function(url, data, type, dataType, callback){
// 	var codeValue ;
// 	var errorValue ;
// 	var dataValue ;
// 	$.ajax({
// 	        type: type,
// 	        //url: commonMethod.ip+url,
// 	        url: url,
// 	        dataType: dataType,
// 	        data: data,
// 	        success: function(data){
// 	        	codeValue = data.code ;//code为success或failure
// 	        	errorValue = data.error ;
// 	        	dataValue = data.data ;
// 	        	if("success"==codeValue){
// 	        	 callback(null,dataValue);//当code的value为success时返回(null,data)
// 	        	}else{
// 	        	 callback(errorValue,null);
// 	        	}
// 	        }
// 	});
// };

// commonMethod.load = function(url, data, callback){
// 	commonMethod.ajaxCall(url, data, 'GET', 'JSON', function(err, data){
// 		if(err){
// 			// $.alert({
// 			//     title: '出错啦!',
// 			//     content: err,
// 			//     confirm: function(){
// 			//       callback(err);
// 			//     }
// 			// });
// 		}else{
// 			callback(null, data);
// 		}
// 	})
// };

/**
 * url 访问服务的url data 发送给服务的参数 type 分：'POST' 和 'GET' dataType 包括 json xml html等
 * callback 成功后的回调方法 backerr 失败后的回调方法
 */
 commonMethod.ajaxCall = function(url, data, type, dataType, callback){
	var codeValue ;
	var errorValue ;
	var dataValue ;
	$.ajax({
	        type: type,//type,
	        url: url,//"http://localhost:8088/web/api/getRuleList",
	        dataType: dataType,
	        data: data,
	        success: function(data){
	        	codeValue = data.code ;//code为success或failure
	        	errorValue = data.error ;
	        	dataValue = data.data ;
	        	if("success"==codeValue){
	        			callback(null,dataValue);//当code的value为success时返回(null,data)
	        	}else{
	        			callback(errorValue,null);
	        	}
	        },
	        error: function(data){
	          callback("json 加载出错!!!",JSON.stringify(data)) ;
	        }
	});
};

commonMethod.load = function(url, data, callback){
	commonMethod.ajaxCall(url, data, 'GET', 'JSON', function(err, dataValue){
		if(null==err){
			callback(null,dataValue) ;
		}else{
			$.confirm({
				title: 'code值非success!!!返回error内容!',
				content: err
			});
			callback(err,null)
		}
	})
};