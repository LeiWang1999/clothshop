'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('----------------')
	console.log('unicloud zx-api')
	console.log('event : ', JSON.stringify(event))
	console.log('----------------')
	
	//返回数据给客户端
	return event
};
