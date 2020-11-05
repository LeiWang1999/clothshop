<template>
	<view class="container">
		<view>
			<view style="height: 30rpx;">
				
			</view>
			<view class="panel panel-one">
				<view class="uni-form-item uni-row">
					<view class="title">活动名称</view>
					<input v-model="name" class="right-content uni-input" name="name" placeholder="请输入活动名称" />
				</view>
				<view class="line"></view>
				<view class="uni-form-item uni-row">
					<view class="title">参团人数</view>
					<input v-model="peopleNum" class="right-content uni-input" type="number" name="peopleNum" placeholder="请输入2-100" />
					<view class="item" style="font-size: 28rpx;">人</view>
				</view>
				<view class="line"></view>
				<view class="uni-form-item uni-row">
					<view class="title">拼团有效期</view>
					<input v-model="effectiveTime" class="right-content uni-input" type="number" name="effectiveTime" placeholder="请输入2-100" />
					<view class="item" style="font-size: 28rpx;">时</view>
				</view>
			</view>
			<view class="panel panel-two">
				<view class="uni-form-item uni-row">
					<view class="title">开始时间</view>
					<zx-date-picker class="item item-date-picker" fields="second"
					start="2010-00-00 00:00:00"
					end="2030-12-30 23:59:59"
					:value="startDate"></zx-date-picker>
					<text class="icon item-icon">&#xe62d;</text>
				</view>
				<view class="line"></view>
				<view class="uni-form-item uni-row">
					<view class="title">结束时间</view>
					<zx-date-picker class="item item-date-picker" fields="second"
					start="2010-00-00 00:00:00"
					end="2030-12-30 23:59:59"
					:value="endDate"></zx-date-picker>
					<text class="icon item-icon">&#xe62d;</text>
				</view>
				
			</view>
			<view class="panel panel-three">
				<view class="uni-form-item uni-row" @click="toSelectProduct">
					<view class="title">拼团商品</view>
					<view class="item" style="position: absolute; right: 20rpx;color: #3388FF;">{{Object.keys(goodsData).length > 0?'更换':'添加'}}</view>
				</view>
				<view class="sku-info"  v-if="Object.keys(goodsData).length > 0">
					<view v-if="goodsData.proData.skuDetailArray.length>0" v-for="(item,index) in goodsData.proData.skuDetailArray" :key="index">
						<view class="line"></view>
						<view class="item-goods">
							<view class="goods-info">
								<view style="float:left">
									<image src="../../static/img/all-fill.png" class="goods-img"></image>
								</view>
								<view class="goods-txt" style="float:left;margin-top: 30rpx;">
									<view class="txt-a">
										<text class="a-name">{{goodsData.proName}}</text>
										<text class="a-sku">（{{item.name}})</text>
									</view>
									<view class="txt-b">
										<text class="b-price">¥{{item.retailPrice}}</text>
										<text class="b-store">库存{{item.stock}}</text>
									</view>
								</view>
							</view>
							<view class="uni-form-item uni-row">
								<view class="title">拼团价</view>
								<input v-model="item.pintuanPrice" class="right-content uni-input" name="nickname" placeholder="请输入拼团价" />
								<view class="item" style="font-size: 28rpx;">元</view>
							</view>
						</view>
					</view>
					<view v-if="goodsData.proData.skuDetailArray.length==0">
						<view class="line"></view>
						<view class="item-goods">
							<view class="goods-info">
								<view style="float:left">
									<image src="../../static/img/all-fill.png" class="goods-img"></image>
								</view>
								<view class="goods-txt" style="float:left;margin-top: 30rpx;">
									<view class="txt-a">
										<text class="a-name">{{goodsData.proName}}</text>
									</view>
									<view class="txt-b">
										<text class="b-price">¥{{goodsData.price}}</text>
										<text class="b-store">库存{{goodsData.proData.skuStock}}</text>
									</view>
								</view>
							</view>
							<view class="uni-form-item uni-row">
								<view class="title">拼团价</view>
								<input v-model="goodsData.proData.pintuanPrice" class="right-content uni-input" name="nickname" placeholder="请输入拼团价" />
								<view class="item" style="font-size: 28rpx;">元</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button class="submit" type="default" @click="submit()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import myUtil from '@/common/util/util.js';
	import zxDatePicker from '@/components/zx-ui/zx-date-picker/zx-date-picker.vue';
	import { addData,editData,getDataById } from '@/common/api/pintuan.js';
	import { getDataOne } from '@/common/api/goods.js';
	export default {
		components:{
			zxDatePicker
		},
		data() {
			return {
				action:myConst.ACTION.ADD,
				startDate:'2010-01-01 00:00:00',
				endDate:'2020-01-01 00:00:00',
				name:'',
				peopleNum:'',
				effectiveTime:'',
				id:'',
				goodsData:{}
			}
		},
		onLoad(option) {
			if(option.id!=undefined){
				this.id = option.id;
				this.action = myConst.ACTION.EDIT
			}else{
				this.action = myConst.ACTION.ADD
				this.startDate = myUtil.formatTimeNow()
				this.endDate = myUtil.formatTime(new Date().getTime()+3600*24*7*1000)
			}
		},
		onShow() {
		    this.getData();
		},
		methods: {
			async getData(){
				const req = {
					_id:this.id
				}
				const data = await getDataById(req)
				if(data.length>0){
					this.name = data[0].name;
					this.startDate = data[0].startDate;
					this.endDate = data[0].endDate;
					this.peopleNum = data[0].peopleNum;
					this.effectiveTime = data[0].effectiveTime;
					const res = await getDataOne({id:data[0].goodsId})
					this.goodsData = res[0];
				}
			},
			toSelectProduct(e){
				var that = this;
				uni.$once('update',function(data){
					if(data.msg.length>0){
						that.goodsData = data.msg[0]
					}
					console.log(that.goodsData)
				})
				uni.navigateTo({
					url: '/pages/goods/goods-list?v=1'				,
				});
			},
			async submit(){
				console.log(this.goodsData)
				if(Object.keys(this.goodsData).length > 0){
					if(this.goodsData.proData.skuDetailArray.length>0){
						console.log(123)
						for(var item of this.goodsData.proData.skuDetailArray){
							console.log(item)
							if(item.pintuanPrice==''){
								uni.showToast({
									icon:"none",
									title:"请输入拼团商品价格"
								})
								return;
							}
						}
					}else{
						if(this.goodsData.proData.pintuanPrice==''){
							uni.showToast({
								icon:"none",
								title:"请输入拼团商品价格"
							})
							return;
						}
					}
				}else{
					uni.showToast({
						icon:"none",
						title:"请添加拼团商品"
					})
					return;
				}
				if(this.name==''){
					uni.showToast({
						icon:"none",
						title:"请输入活动名称"
					})
				}else if(this.peopleNum==''){
					uni.showToast({
						icon:"none",
						title:"请输入参团人数"
					})
				}else if(this.effectiveTime==''){
					uni.showToast({
						icon:"none",
						title:"请输入拼团有效期"
					})
				}else{
					const req = {
							_id:this.id,
							name:this.name,
							peopleNum:this.peopleNum,
							effectiveTime:this.effectiveTime,
							goodsId: this.goodsData._id,
							goodsData: this.goodsData,
							startDate:this.startDate,
							startDateSt:new Date(this.startDate.replace(/-/g,"/")).getTime(),
							endDate:this.endDate,
							endDateSt:new Date(this.endDate.replace(/-/g,"/")).getTime(),
							updatetime:new Date().getTime()
					}
					if(this.action==myConst.ACTION.ADD){
						console.log(req)
						const data = await addData(req)
					}else{
						const data = await editData(req)
					}
					uni.showToast({
						title: '提交成功',
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				}
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.panel{
			background-color: #ffffff;
			border-radius: 20rpx;
			margin: 0 30rpx;
			margin-bottom: 30rpx;
			padding: 10rpx;
			position: relative;
			.title{
				width: 150rpx;
			}
			.item{
				// position:absolute;
				right:40rpx;
				padding: 13rpx 26rpx;
				color: #7E7E7E;
				font-size: 28rpx;
				border: 0px;
			}
			.item-icon{
				position:absolute;
				right:20rpx;
				margin-top: 0rpx;
				color: #7E7E7E;
				font-size: 39rpx;
			}
			.item-date-picker{
				margin-top: -4rpx;
			}
			.value{
				position: relative;
				float: right;
				padding: 10rpx 26rpx;
			}
			.line{
				height: 1px;
				background-color: #f8f8f8;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
			.item-goods{
				.goods-info{
					.goods-img{
						width: 150rpx;
						height: 150rpx;
					}
					.goods-txt{
						display: inline-block;
						position: relative;
						.txt-a{
							margin-top: 0rpx;
							.a-name{
								color: #6E6E6E;
							}
							.a-sku{
								color: #606060
							}
						}
						.txt-b{
							margin-top: 0rpx;
							.b-price{
								color: #323232
							}
							.b-store{
								margin-left: 10rpx;
								color: #A0A0A0;
							}
						}
					}
				}
			}
			.sku-info{
				height: auto;
				max-height: 360rpx;
				overflow-y:auto;
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
	}
</style>
