<template>
	<view class="zxshop-login">
		<view style="display: none;" class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<text class="icon logo">&#xe64b;</text>
			</view>
			<!-- 主体 -->
			<view class="main">
				<zxInput v-model="username" type="text" maxlength="11" placeholder="手机号"></zxInput>
				<zxInput v-model="password" type="password" maxlength="11" placeholder="密码" isShowPass></zxInput>
			</view>
			<view class="event">
				<zxButton class="btn" text="登 录" :rotate="isRotate" @click.native="startLogin()"></zxButton>
			</view>

			

		</view>
	</view>
</template>

<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { login } from '@/common/api/account.js';
	import { getShopData } from '@/common/api/shop.js';
	import zxInput from '@/components/zx-ui/zx-login/zx-input.vue'
	import zxButton from '@/components/zx-ui/zx-login/zx-button.vue'
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {
			zxInput,
			zxButton
		},
		data() {
			return {
				username: '', // 用户/电话
				password: '', //密码
				isRotate: false, //是否加载旋转
				providerList: [],
				positionTop: 0
			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
		},
		methods: {
			...mapMutations(['login', 'setUserInfo']),
			navBack() {
				uni.navigateBack();
			},
			initProvider() {
				const filters = ['weixin'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i]
									});
								}
							}
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 120;
			},
			async startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.username == "") {
					uni.showToast({
						icon: 'none',
						title: '手机号不能为空'
					});
					return false;
				}
				if (this.password == "" ) {
					uni.showToast({
						icon: 'none',
						title: '密码不能为空'
					});
					return false;
				}
				this.isRotate = true
				var that = this
				const data = {
					username: this.username,
					password: this.password
				}
				let res = await login(data);
				that.isRotate = false
				that.$api.msg(res.msg);
				if (res.code == 0) {
					let re = await getShopData({userId:res.uid})
					res.shopId = re[0]._id
					that.login(res)
					setTimeout(() => {
						uni.navigateBack()
					}, 1000)
				}
			},
			getUserInfo({
				detail
			}) {
				console.log(detail)
				if (detail.userInfo) {
					uni.setStorageSync('userInfo', detail.userInfo)
					this.setUserInfo(detail.userInfo)
				}
			}
		}
	}
</script>

<style lang="scss">
	.zxshop-login {

		.back-btn {
			position: absolute;
			left: 40rpx;
			z-index: 9999;
			padding-top: var(--status-bar-height);
			top: 40rpx;
			font-size: 40rpx;
			color: $font-color-base;
		}

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.header {
				margin-top: 100rpx;
				text-align: center;

				.logo {
					font-size: 200rpx;
					font-family: iconfont;
					color: $zx-color-primary;
				}
			}

			.main {
				display: flex;
				flex-direction: column;
				padding-left: 70rpx;
				padding-right: 70rpx;
			}

			.event {
				margin-top: 50rpx;
			}

			.other_login {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				text-align: center;
				margin-top: 100rpx;

				button {
					line-height: 1.2;
					background-color: #fff;
				}

				button::after {
					border: none;
				}

				.wechat {
					color: #83DC42;
					font-size: 100rpx;
				}
			}

			.footer {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				margin-top: 30rpx;
				color: rgba(0, 0, 0, 0.7);
				height: 40rpx;
				line-height: 40rpx;

				text {
					font-size: 24rpx;
					margin-left: 15rpx;
					margin-right: 15rpx;
				}
			}

			.oauth-row {
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;

				.icon-btn {
					width: 80rpx;
					height: 80rpx;
					background-color: #fff;
				}

				button::after {
					border: none;
				}

				.wechat {
					color: #83DC42;
					font-size: 80rpx;
					position: absolute;
					top: -60rpx;
					left: 0;
					height: 80rpx;
				}
			}
		}
	}
</style>
