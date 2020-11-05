<template>
	<view>
		<view>
			<view class="container">
				<uni-drawer :visible="showLeft" mode="left" @close="closeDrawer('left')">
					<uni-section class="v-uni-section" title="基础组件" type="line"></uni-section>
					<view class="fab-item">
						<view class="tag-view" @click="addText">
							<uni-tag text="文本" />
						</view>
						<view class="tag-view">
							<uni-tag text="图片广告" @click="addImage" />
						</view>
						<view class="tag-view">
							<uni-tag text="商品" @click="addProduct" />
						</view>
						<view class="tag-view">
							<uni-tag text="视频" @click="addVideo" /> 
						</view>	
						<view class="tag-view" @click="addTitle">
							<uni-tag text="标题" />
						</view>
						<view class="tag-view">
							<uni-tag text="图文导航" @click="addNavigation" />
						</view>
						<view class="tag-view">
							<uni-tag text="商品搜索" @click="addSearch" />
						</view>
						<view class="tag-view">
							<uni-tag text="公告" @click="addNoice" />
						</view>
						<view class="tag-view">
							<uni-tag text="辅助空白" @click="addBlank" />
						</view>
						<view class="tag-view">
							<uni-tag text="辅助线" @click="addLine" />
						</view>
						<view class="tag-view" style="display: none;">
							<uni-tag text="悬浮窗" @click="addSusWindow" />
						</view>
						<view class="tag-view">
							<uni-tag text="自由面板" @click="addFreePanel" />
						</view>
					</view>
					
					<uni-section class="v-uni-section" title="系统组件" type="line"></uni-section>
					<view class="fab-item">
						<view class="tag-view" @click="addClassifyTemplate">
							<uni-tag text="分类模板" />
						</view>
						<view class="tag-view">
							<uni-tag text="顶部导航" @click="addTopNavigation" />
						</view>			
					</view>
					
					<uni-section class="v-uni-section" title="营销组件" type="line"></uni-section>
					<view class="fab-item">
						<view class="tag-view" @click="addCoupon">
							<uni-tag text="优惠券" />
						</view>
						<view class="tag-view">
							<uni-tag text="拼团" @click="addPintuan" />
						</view>
						<view class="tag-view" style="display: none;">
							<uni-tag text="限时折扣" @click="addProduct" />
						</view>
						<view class="tag-view" style="display: none;">
							<uni-tag text="秒杀" @click="addProductGroup" />
						</view>		
						<view class="tag-view" style="display: none;">
							<uni-tag text="助力砍价" @click="addMagicCube" /> 
						</view>				
					</view>
				</uni-drawer>
			</view>	
		</view>
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>
<script>
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import uniList from '@/components/uni-ui/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue'
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	import uniFab from '@/components/uni-ui/uni-fab/uni-fab.vue'
	import myCloud from '@/common/util/cloud.js'
	import myConst from '@/common/util/const.js'
	export default {
		components: {
			uniIcons,
			uniDrawer,
			uniList,
			uniListItem,
			uniSection,
			uniTag,
			uniFab,
			uniSwipeAction,
			uniSwipeActionItem
		},
		created() {
		},
		data() {
			return {
				diyData: [],
				id:0,
				showRight: false,
				showLeft: false,
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [{
						iconPath: '/static/img/component.png',
						selectedIconPath: '/static/img/componentHL.png',
						text: '组件',
						active: false
					},
					{
						iconPath: '/static/img/api.png',
						selectedIconPath: '/static/img/apiHL.png',
						text: '预览',
						active: false
					},
					{
						iconPath: '/static/img/template.png',
						selectedIconPath: '/static/img/templateHL.png',
						text: '上架',
						active: false
					}
				]
			}
		},
		methods: {
			show(e) {
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRight = true
				}
			},
			hide() {
				this.showLeft = false
				this.showRight = false
			},
			closeDrawer(e) {
				this.content[0].active = 0
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRight = false
				}
			},
			trigger(e) {
				this.content[e.index].active = !e.item.active
				
				if(e.index==0){
					this.show('left')
				}else if(e.index==1){
					this.$emit("nav",'');	
				}else if(e.index==2){
					this.$emit("save",'');			
				}
			},
			fabClick() {
			},
			genID(length){
				return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			showPageList(){
				this.show('right')
			},
			test(){
				console.log(123213)
			},
			swipeChange(e) {
			},
			swipeClick(e,v) {
			},
			addText(e){
				let mText = {
					    id: this.genID(),
				        name: 'text',
				        text: '我是文本',
						titleStyle: 1,
				        fontSize:  '14px',
						textColor: '#333333',
						backgroundColor: '#ffffff',
						displayPosition: 'left',
						toUrl: '',
						comType: ''
				    };
				this.$emit("send",mText);
				this.closeDrawer("left");
			},
			addImage(e){
				let mImage = {
						id: this.genID(),
				        name: 'image',
						template: 1,
						imgArray: [],
						hxhdHeight: 500,
				        pageMargin: 0,
				        imgMargin: 0,
						borderRadius: 0,
						fillStyle: 0,
						modeIndex:0,
						styleIndex:0,
						mode:'default',
						dotsStyles:{
							backgroundColor: 'rgba(0, 0, 0, .3)',
							border: '1px rgba(0, 0, 0, .3) solid',
							color: '#fff',
							selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
							selectedBorder: '1px rgba(0, 0, 0, .9) solid'
						}
						
				    };
				this.$emit("send",mImage);
				this.closeDrawer("left");
			},
			addProduct(e){
				let mProduct = {
						id: this.genID(),
				        name: 'product',
						template: 1,
						proList: [],
				        pageMargin: 25,
				        imgMargin: 15,
						imgStyle: 0,
						borderRadius: 0,
						ratio:1,
						isFilled:0,
						fontWeight:'normal',
						textAlign:'left',
						buyBtnStyle:1,
						proMarker:'新品',
						showContent:[{
										value: '商品名称',
										name: '商品名称',
										checked: true,
									},{
										value: '商品描述',
										name: '商品描述',
										checked: true,
									},{
										value: '商品价格',
										name: '商品价格',
										checked: true,
									},{
										value: '购买按钮',
										name: '购买按钮',
										checked: true,
									},{
										value: '商品角标',
										name: '商品角标',
										checked: false,
									}]
				    };
				this.$emit("send",mProduct);
				this.closeDrawer("left");
			},
			addTitle(e){
				let mTitle = {
					    id: this.genID(),
				        name: 'title',
				        maintitle: '标题文字',
						titleStyle: 1,
				        subtitle:  '',
						textColor:'#000000',
						backgroundColor: '#f9f9f9',
						signColor: '#3399FF',
						toUrl: '',
						comType: ''
				    };
				this.$emit("send",mTitle);
				this.closeDrawer("left");
			},
			addVideo(e){
				let mVideo = {
						id: this.genID(),
				        name: 'video',
						type: 1,
						url: '',
				        cover: ''
				    };
				this.$emit("send",mVideo);
				this.closeDrawer("left");
			},
			addSearch(e){
				let mSearch = {
						id: this.genID(),
				        name: 'search',
						borderRadius: 0,
						textPosition: 'left',
						backgroundColor: '#F9F9F9',
						frameColor: '#ffffff',
						textColor: '#999999',
						hotKeyArray:[]
				    };
				this.$emit("send",mSearch);
				this.closeDrawer("left");
			},
			addNoice(e){
				let mNotice = {
						id: this.genID(),
				        name: 'notice',
						content: '',
						backgroundColor: '#fffbe8',
						textColor: '#de8c17'
				    };
				this.$emit("send",mNotice);
				this.closeDrawer("left");
			},
			addBlank(e){
				let mBlank = {
						id: this.genID(),
				        name: 'blank',
						height: 30
				    };
				this.$emit("send",mBlank);
				this.closeDrawer("left");
			},
			addNavigation(e){
				let mNav = {
						id: this.genID(),
				        name: 'imageTextNav',
						template: 1,
						imgArray: [{id:1,imgUrl:'https://img.yzcdn.cn//public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png',title:'导航一',toUrl:'',comType:'',imgHeight:0},
									{id:2,imgUrl:'https://img.yzcdn.cn//public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png',title:'导航二',toUrl:'',comType:'',imgHeight:0},
									{id:3,imgUrl:'https://img.yzcdn.cn//public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png',title:'导航三',toUrl:'',comType:'',imgHeight:0},
									{id:4,imgUrl:'https://img.yzcdn.cn//public_files/2018/03/08/837f3d12e14b299778ae5fea5c05a3a3.png',title:'导航四',toUrl:'',comType:'',imgHeight:0}],
				        textColor: '#000000',
				        backgroundColor: '#ffffff'
				    };
				this.$emit("send",mNav);
				this.closeDrawer("left");
			},
			addLine(e){
				let mLine = {
						id: this.genID(),
				        name: 'line',
						lineColor: '#E5E5E5',
						margin: '0',
				        style: 'solid'
				    };
				this.$emit("send",mLine);
				this.closeDrawer("left");
			},
			addFreePanel(e){
				let mFreePanel = {
						id: this.genID(),
				        name: 'freePanel',
						height: 350,
						width:750,
						backgroundColor:'#f5f5f5',
						panelData:[]
				    };
				this.$emit("send",mFreePanel);
				this.closeDrawer("left");
			},
			addClassifyTemplate(e){
				let mNav = {
						id: this.genID(),
				        name: 'classifyTem',
						template: 1,
						proArray:[],
						proGroupArray:[],
						backgroundColor:'#f0f0f0'
				    };
				this.$emit("send",mNav);
				this.closeDrawer("left");				
			},
			addTopNavigation(e){
				let mNav = {
						id: this.genID(),
				        name: 'topNav',
						template: 1,
						scrollState:1,
						textSelectedColor:'#ee4444',
						textColor:'#000000',
						pageArray:[]
				    };
				this.$emit("send",mNav);
				this.closeDrawer("left");
			},
			addSusWindow(e){
				let mNav = {
						id: this.genID(),
				        name: 'susWindow',
						height: 100,
						width:750,
						backgroundColor:'#f0f0f0'
				    };
				this.$emit("send",mNav);
				this.closeDrawer("left");
			},
			addCoupon(e){
				let mCoupon = {
					    id: this.genID(),
				        name: 'coupon',
				        couponArray:[]
				    };
				this.$emit("send",mCoupon);
				this.closeDrawer("left");
			},
			addPintuan(e){
				let mProduct = {
						id: this.genID(),
				        name: 'pintuan',
						template: 1,
						proList: [],
				        pageMargin: 25,
				        imgMargin: 15,
						imgStyle: 0,
						borderRadius: 0,
						ratio:1,
						isFilled:0,
						fontWeight:'normal',
						textAlign:'left',
						buyBtnStyle:1,
						proMarker:'新品',
						showContent:[{
										value: '商品名称',
										name: '商品名称',
										checked: true,
									},{
										value: '商品描述',
										name: '商品描述',
										checked: true,
									},{
										value: '商品价格',
										name: '商品价格',
										checked: true,
									},{
										value: '购买按钮',
										name: '购买按钮',
										checked: true,
									},{
										value: '商品角标',
										name: '商品角标',
										checked: false,
									}]
				    };
				this.$emit("send",mProduct);
				this.closeDrawer("left");
			}
		}
		
	}
</script>

<style>
	
	.fab-item {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		padding: 20rpx;
	}
	
	.tag-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin: 10rpx 15rpx;
		justify-content: center;
	}
	
	.v-uni-section {
		margin-top: 0px;
	}
	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		padding-bottom: 10px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
	}
	.v-item{
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>