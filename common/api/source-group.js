import request from '@/common/util/request'
import myConst from '@/common/util/const'
const url = myConst.URL.SOURCE_GROUP
export const getData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.QUERY,
		data
	})
}
export const getGroupData = (data) => {
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
export const editGroupData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.EDIT,
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
export const addGroupData = (data) => {
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
export const delGroupData = (data) => {
	return request({
		url,
		check:true,
		action: myConst.ACTION.DEL,
		data
	})
}