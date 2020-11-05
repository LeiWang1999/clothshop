import request from '@/common/util/request'
import myConst from '@/common/util/const'
const url = myConst.URL.SHOP
export const getShopData = (data) => {
	return request({
		url,
		check:false,
		action: myConst.ACTION.QUERY_ONE,
		data
	})
}