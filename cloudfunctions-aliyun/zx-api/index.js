'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('----------------')
	console.log('unicloud zx-api')
	console.log('event : ', JSON.stringify(event))
	console.log('----------------')
	const { url, action, check, data } = event;
	const {proData} = data;
	if(url == 'goods'){
		const collection = db.collection('opendb-mall-goods');
		if(action == 'add'){
			let res = await collection.add({
				name: proData.productName,
				goods_thumb: proData.imageList[0],
				goods_banner_imgs: proData.imageList,
				goods_price: proData.skuRetailPrice,
				goods_desc: proData.detail,
				goods_desc_imgs: proData.detailImgList,
				remain_count: proData.skuStock,
				is_on_sale: proData.showState=='上架'?true:false,
			})
			console.log('goods add')
		}else if(action == 'query'){
			let res = await collection.limit(6).get();
			console.log('goods query');
			return {
				data:res
			};
		}
	}
	
	//返回数据给客户端
	// return event
};
