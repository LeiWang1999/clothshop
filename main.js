import Vue from 'vue'
import App from './App' 
import store from './store'

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const navTo = (url)=>{
	uni.navigateTo({
		url: url
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, navTo ,prePage};
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
