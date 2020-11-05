<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="title" style="display: inline-block;font-size: 16px;">1积分=</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="pointData.onePoint" placeholder="" style="width: 350rpx;display: inline-block;" />
				<view style="display: inline-block;position: relative;top: -15px;margin-left: 10px;"><text style="font-size: 15px;">元</text></view>
			</view>
		</view>
		<view class="uni-form-item uni-column" style="margin-top: 15px;">
			<view class="title" style="display: inline-block;font-size: 16px;">七天送</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="pointData.sevenDaySend" placeholder="" style="width: 350rpx;display: inline-block;" />
				<view style="display: inline-block;position: relative;top: -15px;margin-left: 10px;"><text style="font-size: 15px;">积分</text></view>
			</view>
		</view>
		<view class="uni-form-item uni-column" style="margin-top: 15px;">
			<view class="title" style="display: inline-block;font-size: 16px;">签到送</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="pointData.signInSend" placeholder="" style="width: 350rpx;display: inline-block;" />
				<view style="display: inline-block;position: relative;top: -15px;margin-left: 10px;"><text style="font-size: 15px;">积分</text></view>
			</view>
		</view>
		
		<view class="uni-form-item uni-column" style="margin-top: 15px;">
			<view class="title" style="display: inline-block;font-size: 16px;margin-top: 0px;">积分抵现</view>
			<radio-group name="wechatPay" class="v-right" @change="setToMoneyValue">
				<label>
					<radio value="开启" :checked="(pointData.toMoney=='开启')?true:false" /><text>开启</text>
				</label>
				<label style="margin-left: 15px;">
					<radio value="关闭" :checked="(pointData.toMoney=='关闭')?true:false" /><text>关闭</text>
				</label>
			</radio-group>
		</view>
		
		<view class="uni-btn-v" @click="save()">
			<button>保存</button>
		</view>
	</view>
</template>

<script>
	import {
		getData,
		editData
	} from '@/common/api/point';
	export default {
		components: {
		},
		data() {
			return {
				pointData: {},
				id: ''
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				const data = await getData({})
				if(data.length>0){
					this.pointData = data[0].data
					this.id = data[0]._id
				}
			},
			async save() {
				const params={
					id : this.id,
					data : this.pointData,
					updatetime: new Date().getTime()
				}
				const data = await editData(params)
				this.$api.msg(data.msg)
			},
			setToMoneyValue(e) {
				this.pointData.toMoney = e.target.value;
			}
		}
	}
</script>

<style>
	@import url("./../../common/style/uni.css");

	.uni-form-item .title {
		margin-top: 8px;
	}

	.uni-btn-v {
		margin-left: 10px;
		margin-right: 10px;
	}

	.modify-image {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 140rpx;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		color: #fff;
		background: rgba(0, 0, 0, .5);
		cursor: pointer;
	}

	.has-choosed-image {
		position: relative;
		width: 140rpx;
		height: 140rpx;
		text-align: center;
	}

	.uni-uploader__input-box {
		width: 140rpx;
		height: 140rpx;
		border: 1rpx solid #D9D9D9;
		background-color: #ffffff;
		margin-left: 0px;
	}

	.v-right {
		display: inline-block;
		position: absolute;
		margin-left: 100px;
		margin-top: 5px;
	}
</style>
