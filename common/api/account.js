import request from '@/common/util/request'
import myConst from '@/common/util/const'
const url = myConst.URL.ACCOUNT
export const login = (data) => {
	return request({
		check: false,
		url,
		action: myConst.ACTION.LOGIN,
		data
	})
}
export const adminLogin = (data) => {
	return request({
		check: false,
		url,
		action: myConst.ACTION.ADMIN_LOGIN,
		data
	})
}
export const adminLogout = (data) => {
	return request({
		check: false,
		url,
		action: myConst.ACTION.LOGOUT,
		data
	})
}
export const updatePwd = (data) => {
	return request({
		check: true,
		url,
		action: myConst.ACTION.EDIT,
		data
	})
}
