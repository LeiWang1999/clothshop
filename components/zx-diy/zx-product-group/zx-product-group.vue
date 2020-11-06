<template>
	<view>
		<view>
			<view>
				<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
					<uni-section title="商品分组列表" type="line"></uni-section>
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="item.id"  @change="swipeChange" >
							<view class="v-item" @click="swipeClick($event,item.content,item.id)"><text class="cont">{{item.content}}</text><view style="background: #F5F5F5;width: 100%;height: 1px;"></view></view>
						</uni-swipe-action-item>
					</uni-swipe-action>
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
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
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
			this.getData();
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
						iconPath: '/static/component.png',
						selectedIconPath: '/static/componentHL.png',
						text: '组件',
						active: false
					},
					{
						iconPath: '/static/api.png',
						selectedIconPath: '/static/apiHL.png',
						text: '上架',
						active: false
					},
					{
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '预览',
						active: false
					}
				],
				mItem:{},
				swipeList: []
			}
		},
		methods: {
			async getData(){
				const data = await getData({})
				let tmp1 = {text: '编辑'}
				let tmp2 = {text: '删除',style: {backgroundColor: 'rgb(255,58,49)'}}
				this.$data.swipeList = [];
				for(let i=0;i<data.length;i++){
					let d = {id:'',options:[],content:''}
					d.id = data[i]._id;
					d.content = data[i].groName;
					d.options.push(tmp1);
					d.options.push(tmp2);
					this.$data.swipeList.push(d);
				}
			},
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
					this.$emit("save",'');
				}else if(e.index==2){
				}
			},
			fabClick() {
	
			},
			addText(e){
				let mText = {
					    id: this.genID(8),
				        name: 'text',
				        text: '我是文本',
				        fontSize:  '14px',
						textColor: '#33333',
						backgroundColor: '#ffffff',
						displayPosition: 'left',
						
				    };
				this.diyData.push(mText);
				this.$emit("send",this.diyData);
				this.closeDrawer("left");
			},
			addImage(e){
				let mImage = {
						id: this.genID(8),
				        name: 'image',
				        context: 'tttt',
				        layoutLeft: 30
				    };
				this.diyData.push(mImage);
				this.$emit("send",this.diyData);
				this.closeDrawer("left");
			},
			genID(length){
				return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			showGroupList(){
				this.getData();
				this.show('right')
			},
			swipeChange(e) {
			},
			swipeClick(e,v,r) {
				this.$emit("send",v,r);
				this.closeDrawer("right");
			}
			

		}
		
	}
</script>

<style>
	
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
</style>