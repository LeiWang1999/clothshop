<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title">分组名称</view>
					<input class="uni-input" :value="groName" name="nickname" placeholder="请输入分组名称" />
				</view>

				<view class="uni-btn-v">
					<button form-type="submit">保存</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import myUtil from '@/common/util/util.js';
	import { getDataById,addData,editData } from '@/common/api/goods-group.js'
	export default {
		data() {
			return {
				groName: '',
				comType: 0,
				id: ""
			}
		},
		onLoad(option) {
			if (option.id != undefined) {
				this.id = option.id;
				this.action = myConst.ACTION.EDIT;
			} else {
				this.action = myConst.ACTION.ADD;
			}
			if (option.id != undefined) {
				const data = {
					id: option.id
				}
				this.initData(data)
			}
		},
		methods: {
			async initData(req){
				const res = await getDataById(req)
				if(res.length>0){
					this.id = res[0]._id;
					this.comType = res[0].comType;
					this.groName = res[0].groName
				}
			},
			async formSubmit(e) {
				//定义表单规则
				var that = this;
				that.groName = e.detail.value.nickname;
				if (that.groName == '') {
					uni.showToast({
						title: '分组名称不能为空',
						icon: 'none'
					})
					return;
				}
				const data = {
					id: that.id,
					groName: that.$data.groName,
					comType: that.comType,
					updatetime: myUtil.timestamp()
				}
				if(that.action == myConst.ACTION.ADD){
					const res = await addData(data)
				}else{
					const res = await editData(data)
				}
				uni.showToast({
					title: '提交成功',
					success: () => {
						uni.navigateBack()
					}
				});

			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style>
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.uni-form-item .title {
		padding: 20rpx 0;
	}

	.uni-input {
		padding: 5px 12px;
	}
</style>
