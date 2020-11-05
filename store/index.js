import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		userId: '',
		userName: '',
		token: ''
	},
	mutations: {
		login(state,data) {
			state.shopId = data.shopId
			state.userName = data.username
			state.userId = data.uid
			state.token = data.token
			state.hasLogin = true
			uni.setStorageSync('hasLogin', true)
			uni.setStorageSync('shopId', data.shopId)
			uni.setStorageSync('userId', data.uid)
			uni.setStorageSync("userName",data.username);
			uni.setStorageSync('uniIdToken', data.token)
			// uni.setStorageSync('uni_id_token_expired', data.tokenExpired)
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.userId = '';
			state.userName = '';
			state.token = '';
			uni.clearStorageSync();
		},
	},
	actions: {

	}
})

export default store
