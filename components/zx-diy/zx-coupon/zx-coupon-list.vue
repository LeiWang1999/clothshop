<template>
	<view>
		<view>
			<view>
				<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
					<uni-section title="跳转页面" type="line"><view class="button" @click="toAddNewPage"></view></uni-section>
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="item.id"  @change="swipeChange" >
							<view class="v-item" @click="swipeClick($event,item)"><text class="cont">{{item.name}}</text><view style="background: #F5F5F5;width: 100%;height: 1px;"></view></view>
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
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { getDataByTime } from '@/common/api/coupon.js'
	export default {
		components: {
			uniDrawer,
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		created() {
			this.getData();
		},
		data() {
			return {
				showRight: false,
				showLeft: false,
				mItem:{},
				swipeList: []
			}
		},
		methods: {
			async getData(){
				const req = {
					action: myConst.ACTION.QUERY_BY_TIME,
					params: {}
				}
				const data = await getDataByTime({})
				let tmp1 = {text: '编辑'}
				let tmp2 = {text: '删除',style: {backgroundColor: 'rgb(255,58,49)'}}
				this.$data.swipeList = [];
				for(let i=0;i<data.length;i++){
					let d = {id:'',options:[],name:'',reduceMoney:'',discountLimit:'',useReuire:'',type:'',limitNum:''}
					d.id = data[i]._id;
					d.name = data[i].name;
					d.reduceMoney = data[i].reduceMoney;
					d.discountLimit = data[i].discountLimit;
					d.useReuire = data[i].useReuire;
					d.limitNum = data[i].limitNum;
					d.type = data[i].type;
					d.options.push(tmp1);
					d.options.push(tmp2);
					this.$data.swipeList.push(d);
				}
			},
			show(e) {
				console.log("show", e);
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRight = true
				}
			},
			hide() {
				console.log("hide");
				this.showLeft = false
				this.showRight = false
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRight = false
				}
			},
			trigger(e) {	
				if(e.index==0){
					this.show('left')
				}else if(e.index==1){
					this.$emit("save",'');
				}else if(e.index==2){
				}
			},
			
			showCouponList(){
				this.show('right')
			},
			swipeChange(e) {
				console.log('返回：', e);
			},
			swipeClick(e,item) {
				let tmp = {id:item.id,name:item.name,type:item.type,limitNum:item.limitNum,getState:0,reduceMoney:item.reduceMoney,discountLimit:item.discountLimit,useReuire:item.useReuire};
				this.$emit("send",tmp);
				this.closeDrawer("right");
			}
		}
	}
</script>

<style>

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