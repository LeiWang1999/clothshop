<template>
	<view class="content">
		<uni-search-bar @confirm="search" placeholder="请输入订单号" ></uni-search-bar>
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="show('right')"></text>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view 
						v-for="(item,index) in tabItem.orderList" :key="index"
						class="order-item"
					>
						<view class="i-top b-b">
							<text class="time">{{item.createtime}}</text>
							<text class="state" :style="{color: item.state==9?'#909399':'#FF6146'}">{{item.stateTip}}</text>
							<text 
								v-if="item.state===9" 
								class="del-btn yticon icon-iconfontshanchu1"
								@click="deleteOrder(index,item)"
							></text>
						</view>
						
						<scroll-view v-if="item.goodsData.length > 1" class="goods-box" scroll-x>
							<view
								v-for="(goodsItem, goodsIndex) in item.goodsData" :key="goodsIndex"
								class="goods-item"
							>
								<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							</view>
						</scroll-view>
						<view 
							v-if="item.goodsData.length === 1" 
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.goodsData" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.title}}</text>
								<text class="attr-box">{{goodsItem.attr}}  x {{goodsItem.number}}</text>
								<text class="price">{{goodsItem.price}}</text>
							</view>
						</view>
						
						<view class="price-box">
							共
							<text class="num">{{item.goodsData.length}}</text>
							件商品 实付款
							<text class="price">{{item.totalPrice}}</text>
						</view>
						<view class="action-box b-t" v-if="item.state != 12">
							<button class="action-btn"  v-if="item.state == 2" @click="togglePopup('center', 'tip',item)">发货完成</button>
							<button class="action-btn"  v-if="item.state == 4" @click="toConfirm(item)">提货完成</button>
							
							<button class="action-btn recom"  @click="togglePopup('center', 'tip2',item)">关闭订单</button>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
			<uni-section title="下单时间" type="line"></uni-section>
	
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						开始日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="orderStartDate" :start="startDate" :end="endDate" @change="bindStartDateChange">
							<view class="uni-input">{{orderStartDate}}</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="uni-list" style="margin-top: -1px;">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						结束日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="orderEndDate" :start="startDate" :end="endDate" @change="bindEndDateChange">
							<view class="uni-input">{{orderEndDate}}</view>
						</picker>
					</view>
				</view>
			</view>
		</uni-drawer>
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">发货信息(选填)</text>
				<view style="border: 1px solid #F0F0F0;margin-top: 10px;margin-bottom: 10px;"><input class="uni-input" focus placeholder="请输入物流公司" v-model="expressCompany" style="height: 35px;margin-left: 10px;margin-right: 10px;" /></view>
				<view style="border: 1px solid #F0F0F0;margin-top: 10px;margin-bottom: 10px;"><input class="uni-input" placeholder="请输入物流单号" v-model="expressNumber" style="height: 35px;margin-left: 10px;margin-right: 10px;" /></view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="sendGoods">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showtip2" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">关闭订单</text>
				<view style="border: 1px solid #F0F0F0;margin-top: 10px;margin-bottom: 10px;"><input class="uni-input" focus placeholder="请输入订单备注" v-model="orderRemarks" style="height: 35px;margin-left: 10px;margin-right: 10px;" /></view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip2')">取消</text>
					<text class="uni-tip-button" @click="closeOrder">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template> 

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniLoadMore from '@/components/zx-ui/zx-load-more/zx-load-more.vue';
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue';
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue';
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import empty from "@/components/zx-ui/zx-empty/zx-empty.vue";
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import util from '@/common/util/util.js';
	import { editData,delData,getDataByTime } from '@/common/api/order.js'
	import {
	    mapState,
		mapMutations  
	} from 'vuex'; 
	
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		components: {
			uniLoadMore,
			empty,
			uniSearchBar,
			uniDrawer,
			uniSection,
			uniPopup
		},
		data() {
			return {
				type: '',
				offset:0,
				showLeft:false,
				showRight:false,
				tabCurrentIndex: 0,
				orderRemarks:'',
				expressCompany:'',
				expressNumber:'',
				currentItem:{},
				startDate:getDate('start'),
				endDate:getDate('end'),
				outTradeNo:'',
				orderStartDate:getDate({
					format: true
				}),
				orderEndDate:getDate({
					format: true
				}),
				navList: [],
			};
		},
		
		onLoad(options){
			this.initData();
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if(options.state == 0){
				this.loadData()
			}
			// #endif
			
		},
		 computed: {
		 	...mapState(['hasLogin','userId'])
		 },
		methods: {
			initData(){
				this.navList = [{
						state: '',
						text: '全部',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 2,
						text: '待发货',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 3,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 4,
						text: '待提货',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					}
				];
			},
			//获取订单列表
			async loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingType === 'loading' || navItem.loadingType === 'noMore'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				const req = {
					state:state,
					userId:this.userId,
					offset:navItem.offset,
					page:navItem.page,
					limit:10,
					outTradeNo:this.outTradeNo,
					startDate:this.orderStartDate,
					endDate:this.orderEndDate
				}
				const data = await getDataByTime(req)
				if(data.records.length<10){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more';
					navItem.page= navItem.page+1;
				}
				navItem.offset = navItem.offset+data.records.length;
				data.records.forEach(item=>{
					navItem.orderList.push(item);
				})
				navItem.loaded = true;
				
			}, 

			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.initData();
				this.loadData();
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			//删除订单
			async deleteOrder(index,item){
				const req = {
					id:item._id
				}
				const data = await delData(req)
				this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
			},
			//取消订单
			async cancelOrder(item){
				const req = {
					state:-1,
					id:item._id
				}
				const data = await editData(req)
				let stateTip = '订单已取消'
				Object.assign(item, {
					state: 9,
					stateTip
				})
			},
			show(e) {
				console.log("show", e);
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRight = true
				}
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRight = false
					
					this.initData();
					this.loadData();
				}
			},
			bindStartDateChange: function(e) {
				this.orderStartDate = e.detail.value
			},
			bindEndDateChange: function(e) {
				this.orderEndDate = e.detail.value
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
				this.initData();
				this.outTradeNo = res.value;
				this.loadData()
			},
			togglePopup(type, open,item) {
				this.currentItem = item;
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			async sendGoods(e){
				const req = {
					state:3,
					id:this.currentItem._id
				}
				const data = await editData(req)
				let stateTip = '待收货'
				Object.assign(this.currentItem, {
					state: 3,
					stateTip
				})
				this.cancel('tip');
			},
			async closeOrder(e){
				const req = {
					state:12,
					id:this.currentItem._id
				}
				const data = await eidtData(req)
				let stateTip = '已关闭'
				Object.assign(this.currentItem, {
					state: 12,
					stateTip
				})
				this.cancel('tip2');
			},
			async toConfirm(item){
				const req = {
					state:10,
					id:item._id
				}
				const data = await editData(req)
				let stateTip = '已完成'
				Object.assign(item, {
					state: 10,
					stateTip
				})
			}
		
		}
	}
</script>

<style lang="scss">
	 
	
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}
	
	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;
	
		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;
	
			&.loaded {
				opacity: 1;
			}
		}
	}
	
	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	
	.common-hover {
		background: #f5f5f5;
	}
	.cate-item{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 80upx;
		position: relative;
		font-size: 40upx;
		&:after{
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
	page, .content{
		background: $page-color-base;
		height: 100%;
	}
	
	.swiper-box{
		height: calc(100% - 40px);
	}
	.list-scroll-content{
		height: 100%;
	}
	
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $base-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $base-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
	
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
</style>