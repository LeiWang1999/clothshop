<template>
	<view class="content">
		<view class="v-navbar">
			<view class="navbar">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					最新
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					最热
				</view>
				<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
			</view>
		</view>

		<view class="cart-list">
			<block v-for="(item, index) in listData" :key="index">
				<view class="cart-item" :class="{'b-b': index!==listData.length-1}" v-if="index%2==0">
					<view class="image-wrapper">
						<image :src="item.imgUrl" mode="scaleToFill" lazy-load :data-index="index" @click="toEditData"></image>
						<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" :data-index="index" @click="proCheck"></view>
						<view class="img-tip">{{item.name}}</view>
					</view>
					<view v-if="index+1<listData.length" class="image-wrapper" style="margin-left: 50rpx;">
						<image :src="listData[index+1].imgUrl" mode="scaleToFill" lazy-load :data-index="index+1" @click="toEditData"></image>
						<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: listData[index+1].checked}" :data-index="index+1"
						 @click="proCheck"></view>
						 <view class="img-tip">{{listData[index+1].name}}</view>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="loadingType" style="margin-bottom: 180rpx;"></uni-load-more>

		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view v-for="tItem in item.child" :key="tItem.id" class="cate-item b-b" :class="{active: tItem.id==cateId}"
						 @click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 底部菜单栏 -->
		<view class="footer">
			<view class="btn">
				<button v-if="pageType==1" class="cancel" type="default" @tap="delProArray()">删除</button>
				<button v-if="pageType==1" class="submit" type="default" @click="toAddTemplate()">创建模板</button>
				
				<button v-if="pageType==0" class="cancel" type="default" @tap="toPreview()">预览</button>
				<button v-if="pageType==0" class="submit" type="default" @click="toSelected()">选择</button>
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
	import {
		getData,
		delData,
		editData
	} from '@/common/api/template.js'
	export default {
		components: {
			uniLoadMore,
			uniSearchBar,
			uniTag
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, 
				cateList: [],
				listData: [],
				selectedArray: [],
				field: '',
				order: '',
				state: 0, //0最新 1最热
				pageType: 0,
				page: 1,
				limit: 6,
				name:'',
				tmpCount:0
			};
		},

		onLoad(options) {
			let tmp = {
				id: 1,
				name: '行业名称',
				child: [{
					id: 11,
					name: '服装'
				}, {
					id: 12,
					name: '水果'
				}]
			}
			this.cateList.push(tmp);

			if (options.v != undefined && options.v == 1) {
				this.pageType = 1
			} else {
				this.pageType = 0
			}

		},
		onShow(options) {
			this.initParams();
			this.getData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.initParams();
			this.getData();
		},
		//加载更多
		onReachBottom() {
			if (this.loadingType == 'more') {
				this.loadingType = 'loading';
				this.page = this.page+1;
				this.getData();
			}
		},
		methods: {
			//初始化数据
			initParams(){
				this.listData = [];
				this.page = 1;
				this.selectedArray = [];
			},
			proCheck(e) {
				if(this.pageType==1){
					if (this.listData[e.currentTarget.dataset.index].checked == true) {
						this.listData[e.currentTarget.dataset.index].checked = false;
						for (let i = 0; i < this.selectedArray.length; i++) {
							if (this.selectedArray[i]._id == this.listData[e.currentTarget.dataset.index]._id) {
								this.selectedArray.splice(i, 1);
								break;
							}
						}
					} else {
						this.listData[e.currentTarget.dataset.index].checked = true;
						this.selectedArray.push(this.listData[e.currentTarget.dataset.index]);
					}
				}else{
					
					if (this.listData[e.currentTarget.dataset.index].checked == true) {
						this.listData[e.currentTarget.dataset.index].checked = false;
						this.selectedArray = []
					} else {
						for (let i = 0; i < this.listData.length; i++) {
							if(this.listData[i].checked==true){
								this.listData[i].checked = false;
								break;
							}
						}
						this.listData[e.currentTarget.dataset.index].checked = true;
						
						this.selectedArray = [];
						this.selectedArray.push(this.listData[e.currentTarget.dataset.index]);
					}
				}
				
			},
			//获取列表数据
			async getData() {
				const data = {
					name: this.name,
					page: this.page,
					limit: this.limit,
					state: this.state
				}
				const res = await getData(data)
				if (res.records.length < this.limit) { //说明已经加载全部
					this.loadingType = 'noMore';
				} else {
					this.loadingType = 'more';
				}
				for(let item in res.records){
					res.records[item].checked = false;
				}
				this.listData.push.apply(this.listData, res.records);
				uni.stopPullDownRefresh();
			},
			async delDataReq(req) {
				
				await delData(req)
				this.tmpCount++
				if (this.selectedArray.length == this.tmpCount) {
					this.tmpCount = 0;
					this.initParams();
					this.getData();
				}
			},
			delProArray() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							for (let item in this.selectedArray) {
								const data = {
									_id: this.selectedArray[item]._id
								}
								that.delDataReq(data)
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			toEditData(e) {
				if(this.pageType==1){
					uni.navigateTo({
						url: 'template-edit?id=' + this.listData[e.currentTarget.dataset.index]._id
					});
				}else{
					this.proCheck(e)
				}
			},

			//筛选点击
			tabClick(index) {
				this.state = index
				this.filterIndex = index
				this.initParams();
				this.getData();
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item) {
				this.cateId = item.id;
				this.name = item.name;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.initParams();
				this.getData();

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
			//创建模板
			toAddTemplate(e) {
				uni.navigateTo({
					url: `/pages/template/template-edit`
				})
			},
			toPreview(){
				if(this.selectedArray.length>0){
					let tmpPage = 'templateDiy';
					let tmpName = '模板设计';
					uni.navigateTo({
						url: '/pages/index/diy?id=' + this.selectedArray[0]._id + '&pageTitle=' + tmpName + '&pageName=' + tmpPage
					});
				}else{
					uni.showToast({
						icon: "none",
						title: '请选择模板再预览'
					})
				}
				
			},
			toSelected(){
				if(this.selectedArray.length>0){
					uni.$emit('getTemplateData',this.selectedArray[0])
				}
				uni.navigateBack()
				console.log(this.selectedArray)
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
		height: 40px;
		z-index: 10;
		background-color: #F8F8F8;
	}

	.navbar {
		position: fixed;
		left: 0;
		display: flex;
		width: 100%;
		height: 45px;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 90%;
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
					border-bottom: 2px solid #1C1C1C;
				}
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 22px;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				// border-left: 1px solid #8A8A8A;
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
			width: 370upx;
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

	.cart-list {
		margin-bottom: 10rpx;
	}

	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;
		padding-left: 50rpx;
		padding-right: 50rpx;

		.image-wrapper {
			width: 300upx;
			height: 530upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 15upx;
				opacity: 1;
			}
			.img-tip{
				position: relative;
				background-color: #ffffff;
				height: 60rpx;
				margin-top: -60rpx;
				color: #8A8A8A;
				padding-left: 20rpx;
				font-size: 30rpx;
				border-bottom-left-radius: 15upx;
				border-bottom-right-radius: 15rpx;
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

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
