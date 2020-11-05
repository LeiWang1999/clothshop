<template>
	<view class="container">
		<view class="header">
			<view class="shop-info uni-flex uni-row">
				<view class="shop-info_img">
					<image style="width: 90rpx; height: 90rpx;" src="../../static/img/avatar.png"></image>
				</view>
				<view class="shop-info_txt">
					<view class="shop-info_name">{{ shopName }}</view>
					<view class="shop-info_come">{{ username }}</view>
				</view>
				<view class="shop-info_share">
					<view class="shop-info_qrcode" @click="share"><text>分享店铺</text></view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="title">待处理</view>
			<view class="data uni-flex uni-row">
				<view class="item" @click="navTo('/pages/order/order-list?state=1')">
					<view class="value">{{toPayCount}}</view>
					<view class="key">待付款</view>
				</view>
				<view class="item" @click="navTo('/pages/order/order-list?state=2')">
					<view class="value">{{toSendCount}}</view>
					<view class="key">待发货</view>
				</view>
				<view class="item" @click="navTo('/pages/order/order-list?state=4')">
					<view class="value">{{toGetCount}}</view>
					<view class="key">待提货</view>
				</view>
			</view>
		</view>

		<view class="content space">
			<view class="title">店铺数据</view>
			<view class="data uni-flex uni-row">
				<view class="item">
					<view class="value">{{nowVisitor}}</view>
					<view class="key">今日访客</view>
				</view>
				<view class="item">
					<view class="value">{{nowOrder}}</view>
					<view class="key">今日订单</view>
				</view>
				<view class="item">
					<view class="value">{{nowPrice}}</view>
					<view class="key">今日收入</view>
				</view>
			</view>
		</view>

		<view class="content space">
			<view class="title">我的商品</view>
			<view class="data uni-flex uni-row">
				<view class="item"  @click="navTo('/pages/goods/goods-list')">
					<view class="value">{{showData}}</view>
					<view class="key">销售中</view>
				</view>
				<view class="item"  @click="navTo('/pages/goods/goods-list')">
					<view class="value">{{hideData}}</view>
					<view class="key">待上架</view>
				</view>
				<view class="item" @click="toAddProduct">
					<view class="value add"><text>+</text></view>
					<view class="key">新增商品</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getTodoData,
		getShopData,
		getUserData,
		getGoodsData,
		getOrderData
	} from '@/common/api/dashboard';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {

		},
		data() {
			return {
				shopName: 'Njtech Cloth',
				shopUrl: '',
				username: 'admin',
				toPayCount: 0,
				toSendCount: 0,
				toGetCount: 0,
				showData:0,
				hideData:0,
				nowVisitor:0,
				nowOrder:0,
				nowPrice:0
			}
		},
		computed: {
			...mapState(['hasLogin','userName'])
		},
		onShow(options) {
			this.initData()
			this.username = uni.getStorageSync('userName')
		},
		onPullDownRefresh() {
			this.initData()
		},
		methods: {
			initData() {
				getShopData({}).then(res=>{
					if(res.length>0){
						this.shopName = res[0].data.shopName
						this.shopUrl = res[0].data.shopUrl
					}
					this.getData()
				})
				
			},
			async getData(){
				const todoData = await getTodoData({})
				const goodsData = await getGoodsData({})
				const orderData = await getOrderData({})
				const userData = await getUserData({})
				this.toPayCount = todoData.count1
				this.toSendCount = todoData.count2
				this.toGetCount = todoData.count3,
				this.showData = goodsData.count1
				this.hideData = goodsData.count2
				this.nowVisitor = userData.count1
				this.nowOrder = orderData.count1
				this.nowPrice = orderData.count3
				uni.stopPullDownRefresh();
			},
			share() {
				uni.previewImage({
					urls: [this.shopUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			toAddProduct(e) {
				uni.navigateTo({
					url: `/pages/goods/goods-edit`
				})
			},
			navTo(url) {
				if (!this.hasLogin) {
					this.$api.msg("请先登录系统")
				} else {
					this.$api.navTo(url)
				}
			},
		}
	}
</script>

<style lang="scss">
	.container {
		.header {
			background: linear-gradient(to bottom, rgb(255, 129, 107), rgb(255, 99, 72));
			height: 400rpx;

			.shop-info {
				position: absolute;
				height: 80rpx;
				margin-top: 200rpx;
				z-index: 100;

				.shop-info_img {
					margin-left: 50rpx;
				}

				.shop-info_txt {
					margin-left: 20rpx;

					.shop-info_name {
						font-size: 30rpx;
						color: #FFFFFF;
					}

					.shop-info_come {
						font-size: 25rpx;
						color: #FFCEC2;
					}
				}

				.shop-info_share {
					position: absolute;
					margin-left: 500rpx;
					margin-top: 15rpx;

					.shop-info_qrcode {
						background-color: #FF7963;
						width: 200rpx;
						height: 60rpx;
						border-radius: 12rpx;
						text-align: center;
						padding-top: 10rpx;

						text {
							color: #ffffff;
							font-size: 28rpx;
						}
					}
				}

			}
		}

		.content {
			height: 250rpx;
			width: 700rpx;
			background: #ffffff;
			border-radius: 12rpx;
			margin: 0 auto;
			margin-top: -50rpx;

			.title {
				position: absolute;
				margin-top: 30rpx;
				margin-left: 30rpx;
				font-size: 30rpx;
			}

			.data {
				position: absolute;
				margin-top: 100rpx;
				margin-left: 20rpx;

				.item {
					width: 220rpx;
					text-align: center;

					.value {
						font-size: 40rpx;
					}
					.add{
						color: $zx-color-primary;
					}

					.key {
						font-size: 25rpx;
						color: #7E7E7E;
					}
				}
			}
		}

		.space {
			margin-top: 30rpx;
		}
	}
</style>
