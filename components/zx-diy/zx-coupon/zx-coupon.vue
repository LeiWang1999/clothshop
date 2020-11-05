<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'"  @click="showState==0?togglePopup('bottom', 'popup'):''">
			<view class="v-content">
				<view class="v-coupon-content">
					<view class="v-coupon-track" v-if="blaData.couponArray.length==0">
						<view style="position: relative;text-align: center;top: 27%;">
							<text style="font-size: 20px;color: #fff;">开始添加优惠券</text>
						</view>
					</view>
					<view class="v-coupon-track" v-if="blaData.couponArray.length==1">
						<view class="v-coupon-left">
							<view class="v-coupon-value" v-if="blaData.couponArray[0].type=='代金券'">
								<text>{{blaData.couponArray[0].reduceMoney}}</text>
								<text class="t-coupon-yuan">元</text>
							</view>
							<view class="v-coupon-value" v-if="blaData.couponArray[0].type=='折扣券'">
								<text>{{blaData.couponArray[0].discountLimit}}</text>
								<text class="t-coupon-yuan">折</text>
							</view>
							<view class="v-coupon-desc">
								<text class="t-coupon-yhq">优惠券</text>
								<text class="t-coupon-mky">满{{blaData.couponArray[0].useReuire}}可用</text>
							</view>
						</view>
						<view class="v-coupon-right" @click="showState==0?'':getCoupon(blaData.couponArray[0].id,blaData.couponArray[0].getState)">
							<text class="t-coupon-ljlq">立即领取</text>
						</view>
						<view class="v-coupon-get" v-if="blaData.couponArray[0].getState==1">
							<view class="v-coupon-get-tip">已领</view>
						</view>
					</view>
					<view class="v-coupon-track-two" v-if="blaData.couponArray.length>=2">
						<view class="uni-flex">
							<view :class="'flex-item2 uni-bg-red '+(index==0?' ':'toleft')"  v-for="(item,index) in blaData.couponArray" :key="index" @click="showState==0?'':getCoupon(item.id,item.getState)">
								<view v-if="item.type=='代金券'">
									<text class="t-coupon-value">{{item.reduceMoney}}</text>
									<text class="t-coupon-yuan">元</text>
								</view>
								<view v-if="item.type=='折扣券'">
									<text class="t-coupon-value">{{item.discountLimit}}</text>
									<text class="t-coupon-yuan">折</text>
								</view>
								<text class="t-coupon-mky2">满{{item.useReuire}}可用</text>
								<view class="v-coupon-get-t" v-if="item.getState==1">
									<view class="v-coupon-get-tip-t">已领</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
				<view class="uni-form-item uni-column">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">组件操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="del" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-for="(item,index) in blaData.couponArray" :key="index">
						<view class="v-rc-design">
							<text class="image-del icon" @click="toDel(index)">&#xeb7e;</text>
								<view class="">{{item.name}}</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="blaData.couponArray.length<=4">
						<view class="v-rc-design" @click="toSelectCoupon">
								<view class="v-add-img">+ 添加一个优惠券</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<zx-coupon-list  @send="setSelectCouponValue" ref="zxCouponList"></zx-coupon-list>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import zxCouponList from '@/components/zx-diy/zx-coupon/zx-coupon-list.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime } from '@/common/util/util.js';
	import {
	    mapState,
		mapMutations  
	} from 'vuex'; 
	import { getData,addData } from '@/common/api/coupon-user.js'
	export default {
		props:["toChildData","showState"],
		components: {
			uniPopup,
			uniTag,
			zxCouponList
		},
		created:function(){
			this.initData()
		},
		computed: {
			...mapState(['hasLogin','userId'])
		},
		data() {
			return {
				type: "",
				edit: false,
				blaData:{},
				tmp:1
			}
		},
		methods: {
			async initData(){
				var that = this;
				that.blaData = that.toChildData;
				if(this.hasLogin){
					if(that.blaData.couponArray.length>0){
						for(var i=0;i<that.blaData.couponArray.length;i++){   //判断领取状态和次数
							const req = {
								index:i,
								userId:this.userId,
								couponId:that.blaData.couponArray[i].id,
								updatetime:new Date().getTime()
							}
							const data = await getData(req)
							if(parseInt(that.blaData.couponArray[data.index].limitNum)>parseInt(data.count.total)){  //说明单用户还有未领取的优惠券
								that.blaData.couponArray[data.index].getState=0
							}else{  //说明优惠券领过了
								that.blaData.couponArray[data.index].getState=1
							}
						}	
					}
				}else{
					console.log("未登录")
				}
			},
			togglePopup(type, open) {
				this.$data.edit = true;
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			change(e) {
				if(!e.show){
					this.edit = false
				}
			},
			del(e){
				this.$emit("send",this.blaData.id);
			},
			toUp(e){
				this.$emit("up",this.blaData.id);
			},
			toDown(e){
				this.$emit("down",this.blaData.id);
			},
			setBlankHeightValue(e){
				this.blaData.height = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			toSelectCoupon(e){
				this.$refs.zxCouponList.showCouponList();
			},
			setSelectCouponValue(e){
				let hasData = 0;
				for(var i=0;i<this.blaData.couponArray.length;i++){  //去重
					if(this.blaData.couponArray[i].id==e.id){
						hasData=1;
						break;
					}
				}
				if(hasData==0){
					this.blaData.couponArray.push(e)
					this.$emit("changeData",this.blaData);					
				}
			},
			toDel(i) {
				this.blaData.couponArray.splice(i,1);
				this.$emit("changeData",this.blaData);
			},
			async getCoupon(couponId,getState){
				if(parseInt(getState)==1){
					return;
				}
				if(this.hasLogin){
					const req = {
						userId:this.userId,
						couponId:couponId,
						state:0,
						updatetime:new Date().getTime()
					}
					const data = await addData(req)
				}else{
					this.$api.msg(`请先登录系统再领取优惠券`);
				}
			}
		}
	}
</script>
<style>

	.v-root-preview-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.v-root-preview-controller {
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
	}
	.v-root-preview{
		position: relative;
		min-height: 10px;
	}

	.v-action {
		position: relative;
		float: left;
		display: flex;
	}
	
	.tag-view{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin: 10rpx 10rpx;
		justify-content: center;
		
	}
	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #F4F5F6;
		font-size: 14px;
	}
	.uni-row{
		margin-top: 20rpx;
	}
	.v-content{
		position: relative;
		height: 110px;
		background-color: #fff;
	}
	.v-coupon-content{
		background: #fff;
		padding: 10px 0;
		height: 90px;
	}
	.v-coupon-track{
		position: relative;
		margin: 0 30rpx;
		height: 90px;
		background: #F76260;
	}
	.v-coupon-value{
		display: inline-block;
		margin-left: 120rpx;
		font-size: 30px;
		font-weight: 700;
		color: #fff;
		
	}
	.t-coupon-yuan{
		position: relative;
		/* top: 5px; */
		left: 4px;
		font-size: 12px;
	}
	.v-coupon-desc{
		display: inline-block;
		margin-left: 15px;
		margin-top: 2px;
		color: #fff;
	}
	.t-coupon-yhq{
		font-size: 14px;
		font-weight: 700;
		line-height: 14px;
		display: flex;
	}
	.t-coupon-mky{
		margin-top: 5px;
		opacity: .8;
		font-size: 12px;
		line-height: 12px;
		display: flex;
	}
	.v-coupon-left{
		display: inline-block;
		width: 490rpx;
		height: 90px;
		margin-top: 15px;
	}
	.v-coupon-right{
		display: inline-block;
		color: #fff;
		border-color: hsla(0,0%,100%,.5);
		width: 200rpx;
		/* height: 70px; */
		border-left-width: 1px;
		border-left-style: dashed;
		position: absolute;
		margin-top: 29px;
	}
	.t-coupon-ljlq{
		margin-left: 40rpx;
	}
	.v-coupon-track-two{
		position: relative;
		margin: 0 30rpx;
		height: 90px;
	}
	.flex-item {
		width: 210rpx;
		height:90px;
		text-align: center;
	}
	.flex-item2{
		width: 330rpx;
		height:90px;
		text-align: center;
	}
	.toleft{
		margin-left: 30rpx;
	}
	.t-coupon-value{
		font-size: 30px;
		font-weight: 700;
	}
	.t-coupon-mky2{
		opacity: .8;
		font-size: 12px;
	}
	.v-rc-design{
		position: relative;
		background-color: #fff;
		margin-top:0px;
		padding: 10px;
		border: 1px dashed #e5e5e5;
		width: 100%;
		padding-bottom: 20rpx;
		margin-bottom: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.v-add-img{
		text-align: center;
		margin: 0 auto;
		color: #38f;
	}
	.image-del{
		position: absolute;
		width: 50upx;
		height: 50upx;
		margin-left: 650rpx;
		margin-top: -40rpx;
	}
	.v-coupon-get{
	    -webkit-transform: rotate(-45deg);
	    transform: rotate(-45deg);
	    top: unset;
	    right: 33px;
	    bottom: 20px;
	    left: unset;
	    border-radius: inherit;
		position: absolute;
	    z-index: 2;
	    width: 52px;
	    height: 52px;
	    color: #fff;
	    background: #F76260;
	}
	.v-coupon-get-tip{
	    line-height: 52px;
	    text-align: center;
	    position: absolute;
	    z-index: 2;
	    width: 52px;
	    height: 52px;
		top: 0;
	    left: 0;
	    width: 200%;
	    height: 200%;
	    border: 1px solid #777777;
	    border-radius: 50%;
	    position: absolute;
	    box-sizing: border-box;
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    content: "";
	    pointer-events: none;
		font-size: 30px;
		padding-top: 20px;
		color: #fff;
	}
	.v-coupon-get-t{
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		z-index: 2;
		width: 32px;
		height: 32px;
		color: #fff;
		background: #F76260;
		margin-top: -70px;
		margin-left: 10px;
	}
	.v-coupon-get-tip-t{
	    text-align: center;
	    position: absolute;
	    z-index: 2;
		top: 0;
	    left: 0;
	    width: 220%;
	    height: 220%;
	    border: 1px solid #777777;
	    border-radius: 50%;
	    position: absolute;
	    box-sizing: border-box;
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    content: "";
	    pointer-events: none;
		font-size: 25px;
		padding-top: 10px;
		color: #fff;
	}
</style>