<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title" style="margin-top: -5px;">优惠类型</view>
				<radio-group class="right-content" name="gender" @change="setTypeValue">
					<label>
						<radio value="代金券" :checked="(type=='代金券')?true:false" /><text>代金券</text>
					</label>
					<label>
						<radio value="折扣券" :checked="(type=='折扣券')?true:false" /><text>折扣券</text>
					</label>
				</radio-group>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">名称</view>
				<input class="right-content uni-input" name="nickname" v-model="name" placeholder="请输入优惠券名称" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">发放数量</view>
				<input class="right-content uni-input" name="nickname" v-model="sendNum" placeholder="请输入发放数量" />
				<text class="t-tip">张</text>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">每人限领</view>
				<input class="right-content uni-input" name="nickname" v-model="limitNum" placeholder="请输入限领数量" />
				<text class="t-tip">张</text>
			</view>
			<view class="uni-form-item uni-column" v-if="type=='代金券'">
				<view class="title">减免金额</view>
				<input class="right-content uni-input" name="nickname" v-model="reduceMoney" placeholder="请输入折扣金额" />
				<text class="t-tip">元</text>
			</view>
			<view class="uni-form-item uni-column" v-if="type=='折扣券'">
				<view class="title">折扣额度</view>
				<input class="right-content uni-input" name="nickname" v-model="discountLimit" placeholder="请输入折扣金额" />
				<text class="t-tip">折</text>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">使用门槛</view>
				<input class="right-content uni-input" name="nickname" v-model="useReuire" placeholder="请输入使用门槛" />
				<text class="t-tip">元</text>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title" style="margin-top: -5px;">状态</view>
				<radio-group class="right-content" name="gender" @change="setStateValue">
					<label>
						<radio value="开启" :checked="(state=='开启')?true:false" /><text>开启</text>
					</label>
					<label>
						<radio value="关闭" :checked="(state=='关闭')?true:false" /><text>关闭</text>
					</label>
				</radio-group>
			</view>
			<view class="title">使用时间</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						开始时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="startDate" @change="bindStartDateChange">
							<view class="uni-input">{{startDate}}</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						结束时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="endDate" @change="bindEndDateChange">
							<view class="uni-input">{{endDate}}</view>
						</picker>
					</view>
				</view>
			</view>
				
			
			<view class="uni-btn-v">
				<button @click="submit">提交</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime,genID } from '@/common/util/util.js';
	import { getDataById,addData,editData } from '@/common/api/coupon.js'
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
		data() {
			return {
				action:myConst.ACTION.ADD,
				startDate:getDate({
					format: true
				}),
				endDate:getDate({
					format: true
				}),
				type:'代金券',
				name:'',
				sendNum:'',
				limitNum:'',
				discountLimit:'',
				reduceMoney:'',
				useReuire:'',
				state:'开启',
				id:''
			}
			
		},
		onLoad(option) {
			let title = '新增优惠券';
			if(option.id!=undefined){
				title = '编辑优惠券'
				this.id = option.id;
				this.action = myConst.ACTION.EDIT
			}else{
				this.action = myConst.ACTION.ADD
			}
		},
		onShow() {
		    this.getData();
		},
		methods:{
			async getData(){
				const req = {
					_id:this.id
				}
				const data = await getDataById(req)
				if(data.length>0){
					this.name = data[0].name;
					this.startDate = data[0].startDate;
					this.endDate = data[0].endDate;
					this.limitNum = data[0].limitNum;
					this.reduceMoney = data[0].reduceMoney;
					this.type = data[0].type;
					this.discountLimit = data[0].discountLimit;
					this.useReuire = data[0].useReuire;
					this.state = data[0].state;
					this.sendNum = data[0].sendNum;
				}
			},
			bindStartDateChange(e){
				this.startDate = e.detail.value
			},
			bindEndDateChange(e){
				this.endDate = e.detail.value
			},
			setTypeValue(e){
				this.type = e.target.value;
			},
			setStateValue(e){
				this.state = e.target.value;
			},
			async submit(){
				// console.log(new Date(this.endDate).getTime())
				// var date = new Date('2020-05-22'.replace(/-/g,"/"))
				// console.log(Date.parse(date))
				if(this.name==''){
					uni.showToast({
						icon:"none",
						title:"请输入名称"
					})
				}else if(this.sendNum==''){
					uni.showToast({
						icon:"none",
						title:"请输入发送数量"
					})
				}else if(this.limitNum==''){
					uni.showToast({
						icon:"none",
						title:"请输入每人限领"
					})
				}else if(this.discountLimit==''&&this.type=='折扣券'){
					uni.showToast({
						icon:'none',
						title:"请输入折扣额度"
					})
				}else if(this.reduceMoney==''&&this.type=='代金券'){
					uni.showToast({
						icon:'none',
						title:"请输入减免金额"
					})
				}else if(this.useReuire==''){
					uni.showToast({
						icon:'none',
						title:"请输入使用门槛"
					})
				}else if(parseInt(this.limitNum)>parseInt(this.sendNum)){
					uni.showToast({
						icon:'none',
						title:"每人限领不能大于发放数量"
					})
				}else if(this.endDate<this.startDate){
					uni.showToast({
						icon:'none',
						title:"开始时间不能大于结束时间"
					})
				}else{
					const req = {
							_id:this.id,
							type:this.type,
							name:this.name,
							sendNum:this.sendNum,
							limitNum:this.limitNum,
							discountLimit:this.discountLimit,
							reduceMoney:this.reduceMoney,
							useReuire:this.useReuire,
							state:this.state,
							startDate:this.startDate,
							startDateSt:new Date(this.startDate.replace(/-/g,"/")).getTime(),
							endDate:this.endDate,
							endDateSt:new Date(this.endDate.replace(/-/g,"/")).getTime(),
							updatetime:new Date().getTime()
					}
					if(this.action==myConst.ACTION.ADD){
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

<style>
	.title{
		width: 120rpx;
		padding: 10rpx 10rpx;
	}
	.right-content{
		position: absolute;
		margin-left: 180rpx;
	}
	.uni-column{
		margin-top: 10px;
	}
	.t-tip{
		position: absolute;
		margin-left: 550rpx;
		margin-top: 6px;
	}
</style>