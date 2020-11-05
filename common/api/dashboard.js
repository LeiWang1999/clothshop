import request from '@/common/util/request'
import myConst from '@/common/util/const'
const url = myConst.URL.DASHBOARD
export const getShopData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY,
		data
	})
}
export const getTodoData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_ONE,
		data
	})
}
export const getGoodsData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_TWO,
		data
	})
}
export const getOrderData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_THREE,
		data
	})
}
export const getUserData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_FOUR,
		data
	})
}
