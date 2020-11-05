<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import myCloud from '@/common/util/cloud.js'
	import myConst from '@/common/util/const.js'
	export default {
		onLaunch: function(options) {
			console.log(options)
			if(Object.keys(options.query).length == 0){
				let uniIdToken = uni.getStorageSync('uniIdToken')
				if (uniIdToken) {
					let tmp = {
						username: uni.getStorageSync("userName"),
						uid:uni.getStorageSync("userId"),
						token:uni.getStorageSync("uniIdToken"),
						shopId:uni.getStorageSync("shopId")
					}
					this.login(tmp)
				}
			}else{
				let tmp = {
					username: options.query.userName,
					uid:options.query.userId,
					token:options.query.token,
					shopId:options.query.shopId
				}
				this.login(tmp)
			}
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login','setUserInfo']),
		}
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
	@import './common/style/uni.css';
	@font-face {
	  font-family: 'iconfont';  /* project id 1770871 */
	  src: url('//at.alicdn.com/t/font_1770871_a244r06syoc.eot');
	  src: url('//at.alicdn.com/t/font_1770871_a244r06syoc.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1770871_a244r06syoc.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1770871_a244r06syoc.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1770871_a244r06syoc.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1770871_a244r06syoc.svg#iconfont') format('svg');
	}
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');	
	}
	page{
		background-color: $zx-page-background-color;
	}
	.icon{
		font-size: 24px;
		font-family: iconfont;
		color: rgb(255, 68, 68);
	}
	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	.icon-shouye:before {
		content: "\e626";
	}
	.icon-daifukuan:before {
		content: "\e68f";
	}
	.icon-yishouhuo:before {
		content: "\e71a";
	}
	.icon-shouhoutuikuan:before {
		content: "\e631";
	}
	.icon-lishijilu:before {
		content: "\e6b9";
	}
	.icon-iconfontweixin:before {
		content: "\e611";
	}
	.icon-dizhi:before {
		content: "\e614";
	}
	.icon-share:before {
		content: "\e656";
	}
	.icon-pinglun-copy:before {
		content: "\e612";
	}
	.icon-shoucang_xuanzhongzhuangtai:before {
		content: "\e6a9";
	}
	.icon-shezhi1:before {
		content: "\e61d";
	} 
	.icon-you:before {
		content: "\e606";
	}
	.icon-jia2:before {
		content: "\e60a";
	}
	.icon--jianhao:before {
		content: "\e60b";
	}
	.icon-fork:before {
		content: "\e61b";
	}
	.icon-xuanzhong2:before {
		content: "\e62f";
	}
	.icon-zuojiantou-up:before {
		content: "\e605";
	}
	.icon-weixinzhifu:before {
		content: "\e61a";
	}
	.icon-alipay:before {
		content: "\e636";
	}
	.icon-erjiye-yucunkuan:before {
		content: "\e623";
	}
	.icon-iconfontshanchu1:before {
		content: "\e619";
	}
	.icon-fenlei1:before {
		content: "\e620";
	}
	.icon-shouhuodizhi:before {
		content: "\e712";
	}
	
	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}  
	 
	.b-b:after {
		bottom: 0;
	}
	
	.b-t:after {
		top: 0;
	}
	.uni-input {
		height: 25px;
		line-height:25spx;
	}
	
	.footer {
		position: fixed;
		background-color: #ffffff;
		height: 135rpx;
		width: 750rpx;
		bottom: 0px;
		z-index: 10;
	
		.btn {
			padding-top: 30rpx;
			margin-right: 40rpx;
			text-align: right;
	
			button {
				width: 150rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 25rpx;
			}
	
			button:after {
				border: none;
			}
	
			button:active {
				opacity: 0.5;
			}
	
			.cancel {
				display: inline-block;
				margin-right: 20rpx;
				color: $zx-color-primary;
				background: $zx-color-button;
			}
	
			.submit {
				display: inline-block;
				margin-left: 20rpx;
				background: $zx-color-primary;
				color: #ffffff;
			}
		}
	}
</style>
