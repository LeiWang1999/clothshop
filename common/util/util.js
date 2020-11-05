function navToPage(item) {
	console.log(item)
	if (item.toUrl.id != undefined) {
		if (item.toUrl.comType == 'splb') {
			if (item.className == undefined) {
				uni.navigateTo({
					url: `/pages/goods/goods-list?showSearchState=0`
				})
			} else {
				uni.navigateTo({
					url: `/pages/goods/goods-list?searchValue=${item.className}&showSearchState=0`
				})
			}

		} else if (item.toUrl.comType == 'wd') {
			uni.reLaunch({
				url: `/pages/index/index?showPage=wd`
			})
		} else if (item.toUrl.comType == 'gwc') {
			uni.reLaunch({
				url: `/pages/index/index?showPage=gwc`
			})
		} else if (item.toUrl.comType == 'index') {
			let tmp = 'pageDiy'
			uni.navigateTo({
				url: '/pages/index/diy?id=' + item.toUrl.id + '&pageTitle=' + item.toUrl.pageTitle + '&pageName=' + tmp
			});
		}
	}
}

function formatTime(date) {
	var date = new Date(date);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeNow() {
	var date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function timestamp() {
	return new Date().getTime();
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function genID() {
	var length = 8;
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

function isUploadImgTmp(s){
	if(s.indexOf("blob:")==-1&&s.indexOf("http://tmp")==-1&&s.indexOf("https://tmp")==-1&&s.indexOf("wxfile://")==-1){
		return false
	}else{
		return true
	}
}

//省市区截取
function getArea(str) {
	let area = {}
	let index11 = 0
	let index1 = str.indexOf("省")
	if (index1 == -1) {
		index11 = str.indexOf("自治区")
		if (index11 != -1) {
			area.Province = str.substring(0, index11 + 3)
		} else {
			area.Province = str.substring(0, 0)
		}
	} else {
		area.Province = str.substring(0, index1 + 1)
	}

	let index2 = str.indexOf("市")
	if (index11 == -1) {
		area.City = str.substring(index11 + 1, index2 + 1)
	} else {
		if (index11 == 0) {
			area.City = str.substring(index1 + 1, index2 + 1)
		} else {
			area.City = str.substring(index11 + 3, index2 + 1)
		}
	}

	let index3 = str.lastIndexOf("区")
	if (index3 == -1) {
		index3 = str.indexOf("县")
		area.Country = str.substring(index2 + 1, index3 + 1)
	} else {
		area.Country = str.substring(index2 + 1, index3 + 1)
	}
	if (str.split('市').length > 2) {
		let index4 = str.lastIndexOf("市")
		if (index4 == -1) {
			index4 = str.indexOf("县")
			area.Country = str.substring(index2 + 1, index4 + 1)
		} else {
			area.Country = str.substring(index2 + 1, index4 + 1)
		}
	}

	return area;
}

function getAllCity() {
	let testList = [{
			id: 1,
			name: '北京市',
			children: [{
				id: 11,
				name: '北京市',
				children: [{
						id: 111,
						name: '东城区'
					},
					{
						id: 112,
						name: '西城区',
					},
					{
						id: 113,
						name: '朝阳区',
					},
					{
						id: 114,
						name: '丰台区',
					}
				]
			}, ]
		},
		{
			id: 2,
			name: '河北省',
			children: [{
					id: 21,
					name: '石家庄市',
					children: [{
						id: 211,
						name: '长安区'
					}, {
						id: 212,
						name: '桥西区'
					}, {
						id: 213,
						name: '新华区'
					}]
				},
				{
					id: 22,
					name: '唐山市',
					children: [{
						id: 221,
						name: '路南区'
					}, {
						id: 222,
						name: '路北区'
					}, {
						id: 223,
						name: '古冶区'
					}]
				},
				{
					id: 23,
					name: '秦皇岛市',
				},
			]
		},
		{
			id: 3,
			name: '山东省',
			children: [{
					id: 31,
					name: '济南市',
					children: [{
							id: 311,
							name: '历下区',
							children: [{
								id: 3131,
								name: '解放路街道办事处',
							}, ]
						},
						{
							id: 312,
							name: '槐荫区',
						},
						{
							id: 313,
							name: '天桥区',
						},
						{
							id: 314,
							name: '历城区',
						},
						{
							id: 315,
							name: '长清区',
						}
					]
				},
				{
					id: 32,
					name: '青岛市',
				},
				{
					id: 33,
					name: '临沂市',
					children: [{
							id: 331,
							name: '兰山区',
							children: [{
								id: 3331,
								name: '金雀山街道',
							}, ]
						},
						{
							id: 332,
							name: '河东区',
						},
						{
							id: 333,
							name: '罗庄区',
							children: [{
								id: 3331,
								name: '盛庄街道',
							}, ]
						}
					]
				},
				{
					id: 34,
					name: '日照市',
				},
				{
					id: 35,
					name: '淄博市',
				},
				{
					id: 36,
					name: '枣庄市',
				},
				{
					id: 37,
					name: '东营市',
				},
				{
					id: 38,
					name: '潍坊市',
				},
				{
					id: 39,
					name: '烟台市',
				},
				{
					id: 40,
					name: '济宁市',
				},
				{
					id: 41,
					name: '泰安市',
				},
				{
					id: 42,
					name: '威海市',
				},
				{
					id: 43,
					name: '滨州市',
				},
				{
					id: 44,
					name: '菏泽市',
				},
			]
		},
		{
			id: 4,
			name: '河南省',
		},
		{
			id: 5,
			name: '湖北省',
		},
		{
			id: 6,
			name: '湖南省',
		}
	]
	return testList;
}

function base64ToPath(base64) {
	return new Promise(function(resolve, reject) {
		if (typeof window === 'object' && 'document' in window) {
			base64 = base64.split(',')
			var type = base64[0].match(/:(.*?);/)[1]
			var str = atob(base64[1])
			var n = str.length
			var array = new Uint8Array(n)
			while (n--) {
				array[n] = str.charCodeAt(n)
			}
			return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], {
				type: type
			})))
		}
		var extName = base64.match(/data\:\S+\/(\S+);/)
		if (extName) {
			extName = extName[1]
		} else {
			reject(new Error('base64 error'))
		}
		var fileName = Date.now() + '.' + extName
		if (typeof plus === 'object') {
			var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now())
			bitmap.loadBase64Data(base64, function() {
				var filePath = '_doc/uniapp_temp/' + fileName
				bitmap.save(filePath, {}, function() {
					bitmap.clear()
					resolve(filePath)
				}, function(error) {
					bitmap.clear()
					reject(error)
				})
			}, function(error) {
				bitmap.clear()
				reject(error)
			})
			return
		}
		if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
			var filePath = wx.env.USER_DATA_PATH + '/' + fileName
			wx.getFileSystemManager().writeFile({
				filePath: filePath,
				data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
				encoding: 'base64',
				success: function() {
					resolve(filePath)
				},
				fail: function(error) {
					reject(error)
				}
			})
			return
		}
		reject(new Error('not support'))
	})
}
module.exports = {
	formatTime: formatTime,
	formatTimeNow: formatTimeNow,
	timestamp: timestamp,
	genID: genID,
	getAllCity: getAllCity,
	navToPage: navToPage,
	getArea: getArea,
	base64ToPath: base64ToPath,
	isUploadImgTmp:isUploadImgTmp
}