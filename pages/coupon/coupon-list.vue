<template>
	<view class="content">
		<uni-search-bar @confirm="search" placeholder="请输入优惠券名称" ></uni-search-bar>
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex === index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="show('right')" style="display: none;"></text>
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
							<text class="time">{{item.updatetime}}</text>
							<text class="state" style="color:'#FF6146'" v-if="item.startDateSt>new Date().getTime()">未开始</text>
							<text class="state" style="color:'#FF6146'"  v-else-if="item.endDateSt<(new Date().getTime())">已结束</text>
							<text class="state" style="color:'#FF6146'"  v-else>进行中</text>
						</view>
						
						
						<view 
							class="goods-box-single"
						>
							<view class="right">
								<text class="attr-box">{{item.name}}</text>
								<view class="" v-if="item.type=='折扣券'"><text class="attr-box" >折扣额度</text>{{item.discountLimit}}折</view>
								<view class="" v-if="item.type=='代金券'"><text class="attr-box" >减免金额</text>{{item.reduceMoney}}元</view>
								<view class=""><text class="attr-box" >发送数量</text>{{item.sendNum}}张</view>
								<view class=""><text class="attr-box" >每人限领</text>{{item.limitNum}}张</view>
								<view class=""><text class="attr-box" >使用门槛</text>{{item.useReuire}}元</view>
							</view>
						</view>
						
						<view class="price-box">
							有效日期
							<text class="num">{{item.startDate}}</text>
							~
							<text class="num">{{item.endDate}}</text>
						</view>
						<view class="action-box b-t">
							<button class="action-btn"  @click="toEdit(item._id)">编辑</button>							
							<button class="action-btn recom"  @click="togglePopup('center', 'tip',item,index)">删除</button>
						</view>
					</view>
					 
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 底部菜单栏 -->
		<view class="action-section">
			
			<view class="tag-view">
				<uni-tag text="新建优惠券" type="primary" @click="toAddCoupon" />
			</view>
			
		</view>
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
				<text class="uni-tip-title">提示</text>
				<text class="uni-tip-content">确定删除优惠券？</text>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="toDel">确定</text>
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
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import empty from "@/components/zx-ui/zx-empty/zx-empty.vue";
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { getData,delData } from '@/common/api/coupon.js'
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
			uniPopup,
			uniTag
		},
		data() {
			return {
				name:'',
				type: '',
				offset:0,
				showLeft:false,
				showRight:false,
				tabCurrentIndex: 0,
				orderRemarks:'',
				expressCompany:'',
				expressNumber:'',
				currentItem:{},
				currentIndex:0,
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
		
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			this.tabCurrentIndex = +options.state;		
				
		},
		onShow() {
			this.initData();
			this.loadData();
		},
		methods: {
			initData(){
				this.navList = [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 1,
						text: '未开始',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 2,
						text: '进行中',
						loadingType: 'more',
						orderList: [],
						offset:0,
						page:1
					},
					{
						state: 3,
						text: '已结束',
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
				if(navItem.loadingType === 'loading'||navItem.loadingType == 'noMore'){
					//防止重复加载
					return;
				}
				
				navItem.loadingType = 'loading';
				const data = {
					state:state,
					name:this.name,
					offset:navItem.offset,
					page:navItem.page,
					limit:10
				}
				const result = await getData(data)
				const res = result.records
				if(res.length<6){
					navItem.loadingType = 'noMore';
				}else{
					navItem.loadingType = 'more';
					navItem.page= navItem.page+1;
				}
				navItem.offset = navItem.offset+res.length;
				res.forEach(item=>{
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
				this.name = res.value;
				this.loadData()
			},
			togglePopup(type, open,item,index) {
				this.currentItem = item;
				this.currentIndex = index;
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			toAddCoupon(){
				uni.navigateTo({
				    url: 'coupon-edit'
				});
			},
			async toDel(){
				const data = {
					_id:this.currentItem._id
				}
				const res = await delData(data)
				this.navList[this.tabCurrentIndex].orderList.splice(this.currentIndex, 1);
				this.cancel('tip');
			},
			toEdit(id){
				uni.navigateTo({
				    url: 'coupon-edit?id='+id
				});
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
				padding: 0 0upx 0 20upx;
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
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 0upx 30upx  20upx 30upx;
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
	.action-section{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 90;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
	}
	.tag-view{
		text-align: center;
		margin:0 auto;
	}
</style>