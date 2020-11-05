<template>
	<view class="content">
		<view class="v-navbar" :style="{position:headerPosition}">
			<view style="width: 750rpx;height: 48px;">
				<uni-search-bar bgColor="#ffffff" @confirm="search"></uni-search-bar>
			</view>

			<view class="navbar" style="margin-top: 48px;">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					进行中
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					未开始
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					已结束
				</view>
				
			</view>
		</view>

		<view class="cart-list">
			<block v-for="(item, index) in goodsList" :key="index">
				<view class="cart-item" :class="{'b-b': index!==goodsList.length-1}">
					<view class="image-wrapper">
						<image :src="item.proData.imageList[0]" mode="aspectFill" lazy-load @click="toEditProData(item._id)"></image>
						<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" :data-index="index" @click="proCheck"></view>
					</view>
					<view class="item-right" @click="toEditProData(item._id)">
						<text class="clamp title">{{item.proData.productName}}</text>
						<text class="attr">{{item.attr_val}}</text>
						<text class="price">¥{{item.proData.skuRetailPrice}}</text>

					</view>
					<text v-if="pageType==0" class="del-btn yticon icon-fork" @click="deleteProItem(index)"></text>
				</view>
			</block>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<!-- 底部菜单栏 -->
		<view class="footer">
			<view class="btn">
				<button v-if="pageType==1" class="submit" type="default" @click="toGetProduct()">下一步</button>
			</view>
		</view>
		<view class="action-section" v-if="pageType==0" style="display: none;">

			<view class="tag-view" v-if="state=='下架'||state=='全部'" @click="updateStateOnclick('上架')">
				<uni-tag text="上架" type="warning" />
			</view>
			<view class="tag-view" v-if="state=='上架'||state=='全部'" @click="updateStateOnclick('下架')">
				<uni-tag text="下架" type="success" />
			</view>
			<view class="tag-view">
				<uni-tag text="删除" type="error" @click="delProArray" />
			</view>
			<view class="tag-view">
				<uni-tag text="添加商品" type="primary" @click="toAddProduct" />
			</view>
		</view>
		<view class="action-section" v-if="pageType==1" style="display: none;">
			<view class="tag-view">
				<uni-tag text="添加选择商品" type="primary" @click="toGetProduct" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/zx-ui/zx-load-more/zx-load-more.vue';
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue';
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js'
	import myUtil from '@/common/util/util.js';
	import { getData,delData,editData } from '@/common/api/goods.js'
	export default {
		components: {
			uniLoadMore,
			uniSearchBar,
			uniTag
		},
		data() {
			return {
				headerPosition: "fixed",
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 12, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				goodsList: [],
				selectedArray: [],
				searchProName: '',
				loadType: 1, //云函数 判断你要干啥
				field: '',
				order: '',
				state: '上架',
				pageType: 0 //页面类型0表示商品列表页  1表示从diy页面跳转过来获取商品信息
			};
		},

		onLoad(options) {
			if (options.v != undefined && options.v == 1) {
				this.pageType = 1
			} else {
				this.pageType = 0
			}

		},
		onShow(options) {
			this.goodsList = [];
			this.loadProData(0, this.loadType, this.searchProName, this.field, this.order, this.state);
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			if (this.loadingType == 'more') {
				this.loadingType = 'loading';
				this.loadProData(this.goodsList.length, this.loadType, this.searchProName, this.field, this.order, this.state);
			}
		},
		methods: {
			proCheck(e) {
				if (this.goodsList[e.currentTarget.dataset.index].checked == true) {
					this.goodsList[e.currentTarget.dataset.index].checked = false;
					for (let i = 0; i < this.selectedArray.length; i++) {
						if (this.selectedArray[i]._id == this.goodsList[e.currentTarget.dataset.index]._id) {
							this.selectedArray.splice(i, 1);
							break;
						}
					}
				} else {
					this.goodsList[e.currentTarget.dataset.index].checked = true;
					this.selectedArray.push(this.goodsList[e.currentTarget.dataset.index]);
				}
			},
			//
			async loadProData(offset, type, productName, field, order, state) {
				const data = {
						type: type,
						offset: offset,
						productName: productName,
						field: field,
						order: order,
						state: state,
						updatetime: myUtil.timestamp()
				}
				const res = await getData(data)
				if (res.length < 5) { //说明已经加载全部
						this.loadingType = 'noMore';
					} else {
						this.loadingType = 'more';
					}
					for (let item in res) {
						res[item].checked = false;
					}
					this.goodsList.push.apply(this.goodsList, res);
				
			},
			deleteProItem(index) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							const data = {
								id: that.goodsList[index]._id
							}
							that.delDataReq(data)
							that.goodsList.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async delDataReq(req){
				await delData(req)
			},
			delProArray() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							let i = 0;
							for (let item in this.selectedArray) {
								const data = {
									id: this.selectedArray[item]._id
								}
								that.delDataReq(data)
								that.goodsList.splice(item, 1)
								i++
								if (this.selectedArray.length == i) {
									this.goodsList = []
									this.selectedArray = []
									this.loadProData(0, this.loadType, this.searchProName, this.field, this.order, this.state);
								}
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			async updateStateOnclick(v) {
				let i = 0;
				for (let item in this.selectedArray) {
					const data = {
						id: this.selectedArray[item]._id,
						state: v,
						updatetime: myUtil.timestamp()
					}
					const res = await editData(data)
					i++;
					if (this.selectedArray.length == i) {
						this.goodsList = []
						this.selectedArray = []
						this.loadProData(0, this.loadType, this.searchProName, this.field, this.order, this.state);
					}
				}
			},
			toEditProData(id) {
				uni.navigateTo({
					url: 'goods-edit?id=' + id
				});
			},

			//筛选点击
			tabClick(index) {
				if (this.filterIndex === index && index !== 2) {
					return;
				}
				this.filterIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})

				if (index == 0) {
					this.field = 'updatetime'
					this.order = 'desc'
				} else if (index == 1) {
					this.field = 'sales'
					this.order = 'desc'
				} else if (index == 2) {
					this.field = 'price'
					if (this.priceOrder == 1) {
						this.order = 'asc'
					} else if (this.priceOrder == 2) {
						this.order = 'desc'
					}
				}
				this.goodsList = [];
				this.loadType = 4;
				this.loadProData(0, this.loadType, this.searchProName, this.field, this.order, this.state);
			},
			//分类点击
			changeCate(item) {
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.goodsList = [];
				this.state = item.name
				console.log(this.state)
				console.log(this.loadType)
				this.loadProData(0, this.loadType, this.searchProName, this.field, this.order, this.state);
				
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/goods/goods-list?id=${id}`
				})
			},
			stopPrevent() {},
			toAddProduct(e) {
				uni.navigateTo({
					url: `/pages/goods/goods-edit`
				})
			},
			toGetProduct(e) {
				uni.$emit('update', {
					msg: this.selectedArray
				})
				uni.navigateBack()
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
				this.goodsList = [];
				this.searchProName = res.value;
				this.loadType = 2;
				this.loadingType = 'more';
				this.loadProData(0, this.loadType, res.value);
			}
		},
	}
</script>

<style lang="scss">
	@import './../../common/style/mall.scss';

	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 96upx;
	}

	.v-navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 86px;
		z-index: 10;
	}

	.navbar {
		position: fixed;
		left: 0;
		// top: var(--window-top);
		display: flex;
		width: 100%;
		height: 45px;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: #8A8A8A;
			position: relative;

			&.current {
				color: #1C1C1C;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #1C1C1C;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}

	.action-section {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 90;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;
	}

	.tag-view {
		text-align: center;
		margin: 0 auto;
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
				opacity: 1;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}
	.footer{
		position: absolute;
		background-color: #ffffff;
		height: 150rpx;
		width: 750rpx;
		bottom:0px;
		.btn{
			padding-top: 30rpx;
			margin-right: 40rpx;
			text-align: right;
			button{
				width: 180rpx;
				height: 76rpx;
				font-size: 30rpx;
			}
			button:after{ 
				border: none; 
			}
			button:active{
				opacity: 0.5;
			}
			.cancel{
				display: inline-block;
				margin-right: 20rpx;
				color: $zx-color-primary;
				background: $zx-color-button;
			}
			.submit{
				display: inline-block;
				margin-left: 20rpx;
				background: $zx-color-primary;
				color: #ffffff;
			}
		}
	}
	/* 底部栏 */
	.cart-list {
		margin-top: 48px;
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
	
	.uni-searchbar{
		background-color: $zx-page-background-color;
	}
	.uni-searchbar__box{
		background-color: #ffffff;
		border-color: #ffffff;
	}
</style>
