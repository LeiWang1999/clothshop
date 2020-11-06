// 请求服务端接口 动作名称
const ACTION = {
	ADD: 'add',
	DEL: 'del',
	EDIT: 'edit',
	QUERY: 'query',
	LOGIN: 'login',
	ADMIN_LOGIN: 'adminLogin',
	LOGOUT: 'logout',
	WX_LOGIN: 'wxLogin',
	REGISTER: 'register',
	QUERY_ONE: 'queryOne',
	QUERY_TWO: 'queryTwo',
	QUERY_THREE: 'queryThree',
	QUERY_FOUR: 'queryFour',
	QUERY_BY_ID: 'queryById',
	CHECK_TOKEN: 'checkToken',
	EDIT_BY_NUM: 'editByNum',
	EDIT_BY_NAME: 'editByName',
	EDIT_BY_DETAIL: 'editByDetail',
	EDIT_ONE: 'editOne',
	QUERY_BY_NAME: 'queryByName',
	QUERY_BY_TIME: 'queryByTime',
}

const URL = {
	DASHBOARD: 'dashboard',
	ACCOUNT: 'account',
	POINT: 'point',
	ADDRESS: 'address',
	PAGE: 'page',
	COUPON_USER: 'coupon-user',
	COUPON: 'coupon',
	GOODS: 'goods',
	ORDER: 'order',
	QRCODE: 'qrcode',
	SELFGET: 'selfget',
	SELFGET_USER: 'selfget-user',
	SETTING: 'setting',
	SHIPPING_TEMPLATE: 'shipping-template',
	SOURCE_GROUP: 'source-group',
	SOURCE: 'source',
	SHOP: 'shop',
	TABBAR: 'tabbar',
	USER: 'user',
	PINTUAN: 'pintuan',
	TEMPLATE: 'template'
}

//请求服务端接口 返回状态码
const CODE = {
	SUCCESS: 200,
	TOEKN_INVALID: 401,
	OTHER_TIP: 402
}

module.exports = {
	ACTION,
	CODE,
	URL
}
