<template>
	<view>
		<uni-section title="店铺信息" type="line"></uni-section>
		<view class="uni-form-item uni-column">
			<view class="title" style="display: inline-block;font-size: 16px;">店铺名称</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="settingData.shopName" placeholder="请输入店铺名称" style="width: 450rpx;" />
			</view>
		</view>
		<view class="uni-form-item uni-row" style="display: none;">
			<view class="title" style="display: inline-block;font-size: 16px;">店铺分享</view>
			<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
				<view class="uni-uploader__input-box" style="margin-left: 10px;margin-top: 10px;">
					<view v-if="settingData.shopUrl==''" class="uni-uploader__input" @tap="toSelectShopUrlImage"></view>
					<view v-else class="has-choosed-image">
						<image :src="settingData.shopUrl" class="thumb-image" style="width: 140rpx; height: 140rpx;"></image>
						<view class="modify-image" @click="toSelectShopUrlImage">更换图片</view>
					</view>
				</view>
			</view>
		</view>
		<uni-section title="支付设置" type="line"></uni-section>
		<view class="uni-form-item uni-column">
			<view class="title" style="display: inline-block;font-size: 16px;">配送方式</view>
			<checkbox-group class="v-right" @change="changeDeliveryValue">
				<label>
					<checkbox value="快递发货" :checked="delivery.indexOf('快递发货')==-1?false:true" />快递发货
				</label>
				<label style="margin-left: 15px;">
					<checkbox value="到店自提" :checked="delivery.indexOf('到店自提')==-1?false:true" />到店自提
				</label>
			</checkbox-group>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title" style="display: inline-block;font-size: 16px;">红包支付</view>
			<radio-group name="redPacketPay" class="v-right" @change="setPayValue">
				<label>
					<radio value="微信支付" :checked="(settingData.pay=='微信支付')?true:false" /><text>微信支付</text>
				</label>
				<label style="margin-left: 15px;">
					<radio value="红包支付" :checked="(settingData.pay=='红包支付')?true:false" /><text>红包支付</text>
				</label>
			</radio-group>
		</view>
		<view class="uni-form-item uni-row" v-if="settingData.pay=='红包支付'">
			<view class="title" style="display: inline-block;font-size: 16px;">店主微信</view>
			<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
				<view class="uni-uploader__input-box" style="margin-left: 10px;margin-top: 10px;">
					<view v-if="settingData.adminQrCodeUrl==''" class="uni-uploader__input" @tap="toSelectImage"></view>
					<view v-else class="has-choosed-image">
						<image :src="settingData.adminQrCodeUrl" class="thumb-image" style="width: 140rpx; height: 140rpx;"></image>
						<view class="modify-image" @click="toSelectImage">更换图片</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-btn-v" @click="save()">
			<button>保存</button>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js'
	import { getData,editData } from '@/common/api/setting.js'
	export default {
		components: {
			uniSection
		},
		data() {
			return {
				settingData: {},
				delivery:'',
				id: ''
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			async getData() {
				const res = await getData({})
				if (res.length > 0) {
					this.id = res[0]._id,
					this.settingData = res[0].data
					this.delivery = res[0].data.delivery
				}
			},
			async save() {
				const data = {
					id: this.id,
					data: this.settingData,
					updatetime: new Date().getTime()
				}
				const res = await editData(data)
				this.$api.msg(res);
			},
			toSelectImage() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res)
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0]
							//进行上传操作
							myCloud.uploadFile(filePath,(res) => {
								that.settingData.adminQrCodeUrl = res.fileID;
							})
						}
					}
				});
			},
			toSelectShopUrlImage() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log(res)
						if (res.tempFilePaths.length > 0) {
							let filePath = res.tempFilePaths[0]
							//进行上传操作
							myCloud.uploadFile(filePath,(res) => {
								that.settingData.shopUrl = res.fileID;
							})
						}
					}
				});
			},
			setPayValue(e) {
				this.settingData.pay = e.target.value;
			},
			changeDeliveryValue(e) {
				this.settingData.delivery = e.detail.value;
			},
		}
	}
</script>

<style>
	@import url("./../../common/style/uni.css");

	.uni-form-item .title {}

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
