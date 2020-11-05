import config from './../../config.js'
import myConst from './const.js'
const myCloud = uniCloud.init({
	provider: config.PROVIDER,
	spaceId: config.SPACE_ID,
	clientSecret: config.CLIENT_SECRET
});
export default function(obj) {
	return new Promise((resolve, reject) => {
		myCloud.callFunction({
			name: 'zx-api',
			data: {
				url: obj.url,
				action: obj.action,
				check: obj.check,
				data: obj.data,
				shopId: uni.getStorageSync('shopId')
			},
			success(e) {
				console.log(e)
				const res = e.result
				if (res.code == myConst.CODE.SUCCESS && e.success) {
					resolve(res.data)
				}
				if (!e.success) {
					uni.showModal({
						content: '服务器异常请稍后再试',
						showCancel: false
					});
					return false
				}
				
				if (res.code !== 200 && res.code !== 0) {
					uni.showToast({
						icon: "none",
						title: res.msg
					})
					if(res.code==401){
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/public/login'
							});
						}, 1000)
					}
				}else{
					if(obj.action===myConst.ACTION.LOGIN){
						resolve(res)	
					}else{
						resolve(res.data)	
					}
				}
				
				// switch (res.code) {
				// 	case myConst.CODE.TOEKN_INVALID:
				// 		uni.navigateTo({
				// 			url: '/pages/public/login'
				// 		});
				// 		break;
				// 	case myConst.CODE.OTHER_TIP:
				// 		uni.showToast({
				// 			icon: "none",
				// 			title: res.msg
				// 		})
				// 		if(obj.action==myConst.ACTION.ADMIN_LOGIN){
				// 			resolve(res.data)
				// 		}
				// 		break;
				// 	default:
				// 		break;
				// }
			},
			fail(error) {
				reject()
			}
		})
	})
}
