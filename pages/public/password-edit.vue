<template>
	<view>
		<view class="uni-form-item uni-column" style="margin-top: 40rpx;">
			<view class="title" style="display: inline-block;font-size: 16px;margin-top: 10rpx;">旧密码</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="oldPwd" placeholder="请输入旧密码" style="width: 450rpx;" />
			</view>
		</view>
		<view class="uni-form-item uni-column" style="margin-top: 20rpx;">
			<view class="title" style="display: inline-block;font-size: 16px;margin-top: 10rpx;">新密码</view>
			<view class="uni-input-wrapper v-right" >
			    <input class="uni-input" v-model="newPwd" placeholder="请输入新密码" style="width: 450rpx;" />
			</view>
		</view>
		
		<view class="uni-btn-v" @click="save()" style="margin-top: 20rpx;">
			<button>保存</button>
		</view>
	</view>
</template>

<script>
	import { updatePwd } from '@/common/api/account.js';
	import myCloud from '@/common/util/cloud.js'; 
	import myConst from '@/common/util/const.js'
	export default {
		data() {
			return {
				id: '',
				newPwd:'',
				oldPwd:''
			}
		},
		onLoad() {
		},
		methods: {
			async save() {
				if(this.oldPwd==''){
					this.$api.msg("旧密码不能为空")
					return
				}
				if(this.newPwd==''){
					this.$api.msg("新密码不能为空")
					return
				}
				let data = {
					username: uni.getStorageSync("userName"),
					uid: uni.getStorageSync("userId"),
					oldPwd:this.oldPwd,
					newPwd: this.newPwd,
					updatetime:new Date().getTime()
				}
				await updatePwd(data)
				uni.navigateBack();
			}
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
