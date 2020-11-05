import request from '@/common/util/request'
import myConst from '@/common/util/const'
const url = myConst.URL.TEMPLATE
export const getData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY,
		data
	})
}
export const getDataById = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_BY_ID,
		data
	})
}
export const getTemplateDataById = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY_BY_ID,
		data
	})
}
export const editData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.EDIT,
		data
	})
}
export const editTemplateData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.EDIT_ONE,
		data
	})
}
export const addData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.ADD,
		data
	})
}
export const delData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.DEL,
		data
	})
}