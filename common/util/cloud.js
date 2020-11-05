import config from './../../config.js'
import myConst from './const.js'
const myCloud = uniCloud.init({
	provider: config.PROVIDER,
	spaceId: config.SPACE_ID,
	clientSecret: config.CLIENT_SECRET
});
module.exports = {
	callFunction: (name, _data, callback, showLoading ,checkToken) => {
		console.log(name)
		console.log(_data)
		let check = false
		if(checkToken==undefined){
			check = true;//默认校验token
		}else{
			check = checkToken
		}
		console.log(check)
		if (showLoading) {
			uni.showLoading({
				title: '加载中',
			})
		}
		// 加上token
		const token = uni.getStorageSync('uniIdToken');
		const userId = uni.getStorageSync('userId');
		myCloud.callFunction({
				name: name,
				data: {
					token: token || 0,
					uid: userId || 0,
					check: check,
					data: _data
				}
			})
			.then(e => {
				console.log(e)
				if (showLoading) {
					uni.hideLoading()
				}
				const res = e.result
				if (res.code == myConst.CODE.SUCCESS && e.success) {
					callback(res.data, res, null)
				}
				if (!e.success) {
					uni.showModal({
						content: '服务器异常请稍后再试',
						showCancel: false
					});
					return false
				}
				switch (res.code) {
					case myConst.CODE.TOEKN_INVALID:
						uni.showToast({
							icon:"none",
							title:res.msg
						})
						setTimeout(() => {
							uni.navigateTo({
							    url: '/pages/public/login'
							});
						}, 1000)
						break;
					case myConst.CODE.OTHER_TIP:
						uni.showToast({
							icon:"none",
							title:res.msg
						})
						break;
					default:
						break;
				}
			});
	},
	uploadFile: (filePath, callback, showLoading) => {
		if (showLoading) {
			uni.showLoading({
				title: 'loading',
			})
		}
		let appU = filePath.split('/')
		let cloudPath = appU[appU.length-1]
		myCloud.uploadFile({
			filePath: filePath,
			cloudPath: cloudPath,
			success: (res) => {
				callback(res);
			},
			fail: (err) => {
				console.log(err);
			},
			complete: () => {
				if (showLoading) {
					uni.hideLoading()
				}
			}
		})
	},
	deleteFile: (path, callback, showLoading) => {
		if (showLoading) {
			uni.showLoading({
				title: 'loading',
			})
		}
		myCloud.deleteFile({
			fileList: [path],
			success: (res) => {
				callback(res);
			},
			fail: (err) => {
				console.log(err);
			},
			complete: () => {
				if (showLoading) {
					uni.hideLoading()
				}
			}
		})
	}
}