<template> 
	<view class="zx-user">
		<!-- 用户登录 -->
		<view class="user-login">
			<view class="user-info">
				<image class="bg-set" :src="backgroundUrl"></image>
				<view class="user-info__avatar">
					<image v-if="Object.keys(userInfo).length>0" :src="userInfo.avatarUrl"></image>
					<image v-else src="../../../static/img/avatar.png"></image>
				</view>
				<view class="user-info__info">
					<button v-if="hasLogin==false" plain="true" type="primary" @click="toLogin">点击登录</button>
					<button v-else plain="true" type="primary">{{ userName || userInfo.nickName }}</button>
				</view>
			</view>
		</view>
		<!-- 订单中心 -->
		<view class="user-order">
			<view class="all-order" @click="navTo('/pagesI/order/order-list?state=0')">
				<view class="title"><text>我的订单</text></view>
				<view class="value"><text>查看全部订单</text></view>
				<text class="more yticon icon-you"></text>
			</view>
			<view class="line"></view>
			<view class="order-tab">
				<view class="item" @click="navTo('/pagesI/order/order-list?state=1')">
					<view class="item__icon">
						<view class="item-icon">
							<view class="item-image">
								<text class="tabbar-icons icon">&#xe63d;</text>
							</view>
							<view class="item__info" v-if="orderOneNum>0">
								{{orderOneNum}}
							</view>
						</view>
					</view>
					<view class="item__text">
						待付款
					</view>
				</view>
				<view class="item" @click="navTo('/pagesI/order/order-list?state=2')">
					<view class="item__icon">
						<view class="item-icon">
							<view class="item-image">
								<text class="tabbar-icons icon">&#xe642;</text>
							</view>
							<view class="item__info" v-if="orderTwoNum>0">
								{{orderTwoNum}}
							</view>
						</view>
					</view>
					<view class="item__text">
						待发货
					</view>
				</view>
				<view class="item" @click="navTo('/pagesI/order/order-list?state=3')">
					<view class="item__icon">
						<view class="item-icon">
							<view class="item-image">
								<text class="tabbar-icons icon">&#xe63f;</text>
							</view>
							<view class="item__info" v-if="orderThreeNum>0">
								{{orderThreeNum}}
							</view>
						</view>
					</view>
					<view class="item__text">
						待收货
					</view>
				</view>
				<view class="item" @click="navTo('/pagesI/order/order-list?state=4')">
					<view class="item__icon">
						<view class="item-icon">
							<view class="item-image">
								<text class="tabbar-icons icon">&#xe63e;</text>
							</view>
							<view class="item__info" v-if="orderFourNum>0">
								{{orderFourNum}}
							</view>
						</view>
					</view>
					<view class="item__text">
						待提货
					</view>
				</view>
			</view>
		</view>
		<!-- 功能列表 -->
		<view class="user-plugin">
			<view class="group">
				<view class="group__item" @click="navTo('/pages/admin/menu')">
					<view class="left-icon">
						<text class="icon">&#xe600;</text>
					</view>
					<view class="title"><text>后台管理</text></view>
					<text class="more yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="user-plugin">
			<view class="group">
				<view class="group__item" @click="navTo('/pagesI/address/address-list')">
					<view class="left-icon">
						<text class="icon">&#xe60f;</text>
					</view>
					<view class="title"><text>收货地址</text></view>
					<text class="more yticon icon-you"></text>
				</view>
				<view class="line"></view>
				<view class="group__item" @click="navTo('/pagesI/user/user-edit')">
					<view class="left-icon">
						<text class="icon">&#xe676;</text>
					</view>
					<view class="title"><text>个人信息</text></view>
					<text class="more yticon icon-you"></text>
				</view>
				<view class="line"></view>
				<view class="group__item" @click="navTo('/pagesI/setting/setting-edit')">
					<view class="left-icon">
						<text class="icon">&#xe612;</text>
					</view>
					<view class="title"><text>设置</text></view>
					<text class="more yticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import myCloud from '@/common/util/cloud.js';
	import util from '@/common/util/util.js';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
		},
		data() {
			return {
				orderOneNum: 0,
				orderTwoNum: 0,
				orderThreeNum: 0,
				orderFourNum: 0,
				backgroundUrl:'/static/img/avatar-back.jpeg',
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName', 'userInfo'])
		},
		methods: {
			navTo(url) {
				if (!this.hasLogin) {
					this.$api.msg("请先登录系统")
				} else {
					this.$api.navTo(url)
				}
			},
			toLogin() {
				uni.navigateTo({
				    url: '/pages/public/login'
				});
				// this.$api.navTo('/pagesI/public/login')		
			},
		}
	}
</script>

<style lang='scss'>
	.zx-user{
		background-color: $zx-page-background-color;
		padding-bottom: 140rpx;
		margin-bottom: 0rpx;
		
		.user-login {
			background: #fff;
			margin-bottom: 20rpx;
			
			.user-info {
				position: relative;
				align-items: center;
				flex-direction: column;
				background-size: 100% 100% !important;
				background-repeat: no-repeat;
				display: flex;
				height: 360rpx;
				
				.bg-set {
					position: absolute;
					width: 100%;
					height: 360rpx;
				}
				.user-info__avatar {
					background-size: 120rpx 120rpx;					
					width: 120rpx;
					height: 120rpx;
					margin-top: 86rpx;
					z-index: 10;
					image{
						width: 120rpx;
						height: 120rpx;
						border: 2rpx solid #fff;
						border-radius: 50%;
					}
				}
				.user-info__info {
					margin-top: 14rpx;
					display: flex;
					flex-direction: column;
					button{
						color: #303133;
						border:0rpx
					}
				}
			}
		}
		.user-order {
			width: 94%;
			margin: 0 auto 20rpx;
			background: #fff;
			border-radius: 16rpx;
			.all-order{
				height: 80rpx;
				padding: 20rpx;
				border-radius: 16rpx;
				position: relative;
				display: flex;
				box-sizing: border-box;
				width: 100%;
				padding: 20rpx 32rpx;
				color: #323233;
				font-size: 28rpx;
				line-height: 48rpx;
				background-color: #fff;
				.title{
					color: #111;
					font-weight: 700;
					font-size: 28rpx;
				}
				.value{
					color: #999;
					font-size: 24rpx;
					position: relative;
					overflow: hidden;
					color: #969799;
					text-align: right;
					vertical-align: middle;
					flex: 1;
				}
				.more{
					align-self: baseline;
					font-size: 30rpx;
					color: #909399;
					margin-left: 10rpx;
					margin-top: -1rpx;
				}
			}
			.order-tab{
				position: relative;
				padding:40rpx 0;
				display: flex;
				box-sizing: initial;
				width: 100%;
				height: 100rpx;
				background-color: #fff;
				.item{
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					color: #7d7e80;
					font-size: 24rpx;
					line-height: 1;
					.item__icon{
						position: relative;
						margin-bottom: -10rpx;
						font-size: 36rpx;
						.item-image{
							.tabbar-icons{
								font-size: 60rpx;
								color: $zx-font-color-base;
							}
						}
						.item__info {
							position: absolute;
							right: 0;
							top: 6rpx;
							left:20rpx;
							color: $zx-color-primary;
							font-size: 36rpx;
							font-weight: 500;
							text-align: center;
							box-sizing: border-box;
							padding: 0 6rpx;
							min-width: 34rpx;
							line-height: 28rpx;
							border: 2rpx solid #fff;
							border-radius: 32rpx;
							margin-left: 20rpx;
						}
					}
				}
			}
		}
		.user-plugin{
			padding-bottom: 20rpx;
			
			.group {
				width: 94%;
				margin: auto;
				border-radius: 16rpx;
				color: #323233;
				font-size: 28rpx;
				line-height: 48rpx;
				background-color: #fff;
				.group__item{
					position: relative;
					display: flex;
					box-sizing: border-box;
					width: 100%;
					padding: 20rpx 32rpx;
					.left-icon{
						margin-right: 20rpx;
						.icon{
							font-size: 36rpx;
							color: $zx-font-color-base;
						}
					}
					.title{
						margin-top: 9rpx;
						color: $zx-font-color-base;
						font-weight: 500;
						font-size: 28rpx;
					}
					.more{
						margin-top: 5rpx;
						position: absolute;
						right:40rpx;
						color: $zx-font-color-base;
					}
				}
			}
		}
		.line{
			border-bottom: 2rpx solid #ebedf0;
			margin-left: 30rpx;
		}
	}
</style>
