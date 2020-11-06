<template>
	<view class="uni-container">
		<view class="uni-header-logo">
		</view>
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
			<view class="uni-panel-h" :class="item.open ? 'uni-panel-h-on' : ''" @click="triggerCollapse(index)">
				<text class="uni-panel-text">{{item.name}}</text>
				<text class="uni-panel-icon uni-icon" :class="item.open ? 'uni-panel-icon-on' : ''">{{item.pages ? '&#xe581;' : '&#xe470;'}}</text>
			</view>
			<view class="uni-panel-c" v-if="item.open">
				<view class="uni-navigate-item" v-for="(item2,key) in item.pages" :key="key" @click="goDetailPage(item2)">
					<text class="uni-navigate-text">{{item2.name ? item2.name : item2}}</text>
					<text class="uni-navigate-icon uni-icon">&#xe470;</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {

		},
		data() {
			return {
				list: [
					// {
					// 	id: 'index',
					// 	url: '/pages/index/index',
					// 	name: '首页',
					// 	open: false
					// },
					{
						id: 'view',
						name: '店铺',
						open: false,
						pages: [{
								name: '店铺页面',
								url: '/pages/shop/page-list'
							},
							{
								name: '店铺导航',
								url: '/pages/shop/tabbar-edit'
							},
							{
								name: '素材中心',
								url: '/pages/shop/source-list'
							}
						]
					}, {
						id: 'content',
						name: '商品',
						open: false,
						pages: [{
								name: '全部商品',
								url: '/pages/goods/goods-list'
							},
						]
					}, {
						id: 'form',
						name: '订单',
						open: false,
						pages: [{
							name: '订单管理',
							url: '/pages/order/order-list?state=0'
						}]
					}, {
						id: 'nav',
						name: '客户',
						open: false,
						pages: [{
							name: '客户管理',
							url: '/pages/user/user-list'
						},{
							name: '积分管理',
							url: '/pages/user/point-edit'
						}]
					}, {
						id: 'market',
						name: '营销',
						open: false,
						pages: [{
							name: '优惠券',
							url: '/pages/coupon/coupon-list?state=0'
						},{
							name: '拼团',
							url: '/pages/pintuan/pintuan-list'
						}]
					},
					{
						id: 'delivery',
						name: '配送',
						open: false,
						pages: [{
							name: '配送模板',
							url: '/pages/delivery/template-list'
						}, {
							name: '上门自提',
							url: '/pages/delivery/selfget-list'
						}]
					},
					{
						id: 'map',
						name: '设置',
						open: false,
						pages: [{
							name: '通用设置',
							url: '/pages/setting/setting-edit'
						}]

					}
				],
				navigateFlag: false
			}
		},
		methods: {
			triggerCollapse(e) {
				// if (e == 0) {
				// 	uni.reLaunch({
				// 		url: this.list[e].url
				// 	})
				// 	return;
				// }
				for (var i = 0; i < this.list.length; ++i) {
					if (e === i) {
						this.list[i].open = !this.list[e].open;
					} else {
						this.list[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				if (typeof e === 'string') {

				} else {
					uni.navigateTo({
						url: e.url
					})
				}
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/style/uni-nvue.css';
	.uni-panel-icon {
		float: right;
		margin-right: 8px;
		margin-top: 4px;
	}

	.uni-navigate-icon {
		float: right;
		margin-right: 8px;
		margin-top: 4px;
	}
</style>