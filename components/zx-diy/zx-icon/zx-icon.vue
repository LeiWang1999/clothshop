<template>
	<view>
		<view>
			<view class="example-body">
				<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
					<uni-section title="导航图标" type="line"><view class="button" @click="toAddNewPage"></view></uni-section>
					<view class="example-body">
						<view class="icon-item" v-for="(item,index) in iconList" :key="index" :data-index="index"  @click="onSelectIcon">
							<view class="icon-wrapper">
								<view v-if="index==0" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe6b8;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe6bb;</text>
								</view>
								<view v-if="index==1" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe6af;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe6b9;</text>
								</view>
								<view v-if="index==2" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe78b;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe78c;</text>
								</view>
								<view v-if="index==3" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe7c5;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7c4;</text>
								</view>
								<view v-if="index==4" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe7b5;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7b4;</text>
								</view>
								<view v-if="index==5" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe752;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe751;</text>
								</view>
								<view v-if="index==6" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe7c0;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7bf;</text>
								</view>
								<view v-if="index==7" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe708;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe707;</text>
								</view>
								<view v-if="index==8" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe669;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe668;</text>
								</view>
								<view v-if="index==9" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe758;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe757;</text>
								</view>
								<view v-if="index==10" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe7c6;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7c3;</text>
								</view>
								<view v-if="index==11" class="icon-block" style="text-align: center;">
									<text class="i-tabbar-icons icon" >&#xe719;</text>
									<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe718;</text>
								</view>
							</view>
							<view class="v-txt"><text class="icon-item-text">{{item.text}}</text></view>
						</view>
						
					</view>
				</uni-drawer>
			</view>	
		</view>
		
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
		data() {
			return {
				selectedColor:'#ee4444',
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
				iconList:[{
						text: '主页'
					},{
						text: '购物车'
					},{
						text: '个人中心'
					},{
						text: '分类'
					},{
						text: '最佳推荐'
					},{
						text: '特惠专区'
					},{
						text: '新品上市'
					},{
						text: '限时活动'
					},{
						text: '人气特卖'
					},{
						text: '热卖商城'
					},{
						text: '店铺笔记'
					},{
						text: '最新发现'
					}]
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
				// this.content[0].active = 0
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
					this.$emit("save",'');
				}else if(e.index==2){
				}
			},
			fabClick() {
			},
			showIconList(){
				this.show('right')
			},
			swipeChange(e) {
			},
			swipeClick(e,v) {
				this.$emit("send",v);
				this.closeDrawer("right");
			},
			onSelectIcon(e){
				this.$emit("send",e.currentTarget.dataset.index);
				this.closeDrawer("right");
			}		
		}	
	}
</script>

<style>
	.icon{
		font-size: 25px;
		font-family: iconfont;
		color: #666666;
	}
	.example-body {
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
	.i-tabbar-icons{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: 240px 210px;
		background-repeat: no-repeat;
		display: inline-block;
		width: 30px;
		height: 30px;
	}
	.i-tabbar-icons-selected{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-size: 240px 210px;
		background-repeat: no-repeat;
		display: inline-block;
		width: 30px;
		height: 30px;
	}
	.v-txt{
		width: 100%;
		position: relative;
		text-align: center;
	}
	.icon-item{
		margin-left: 40rpx;
		margin-top: 20rpx;
	}
	.icon-item-text{
		text-align: center;
		font-size: 13px;
		color: #666;
	}
</style>