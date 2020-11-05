<template>
	<view class="uni-common-mt">
		<form @submit="formSubmit">
			<view class="uni-flex uni-row">
				<view class="text" style="width: 180rpx;"><text class="uni-form-item__title" style="margin-left: 30rpx;">模板名称</text></view>
				<view class="text" style="-webkit-flex: 1;flex: 1;margin-right: 40rpx;"><input class="uni-input" maxlength="100"
					 :value="temData.temName" placeholder="请输入模板名称" @blur="changeTemName" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-flex uni-row" style="margin-top: 20rpx;">
					<view class="title" style="width: 140rpx;padding-left:0rpx;margin-left: 30rpx;">邮费设置</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;margin-top: 3px;">
						<radio-group name="gender" @change="setFeeSettingValue">
							<label>
								<radio value="统一邮费" :checked="(temData.feeSetting=='统一邮费')?true:false" /><text>统一邮费</text>
							</label>
							<label>
								<radio value="自定义邮费" :checked="(temData.feeSetting=='自定义邮费')?true:false" /><text>自定义邮费</text>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row" style="margin-top: 20rpx;" v-if="temData.feeSetting=='统一邮费'">
				<view class="text" style="width: 180rpx;"><text class="uni-form-item__title" style="margin-left: 30rpx;">快递邮费</text></view>
				<view class="text" style="-webkit-flex: 1;flex: 1;margin-right: 40rpx;"><input class="uni-input" maxlength="100"
					 :value="temData.publicFee" placeholder="0元代表包邮" @blur="changePublicFee" /></view>
			</view>
			<view class="uni-form-item uni-column" v-if="temData.feeSetting=='自定义邮费'">
				<view class="uni-flex uni-row" style="margin-top: 20rpx;">
					<view class="title" style="width: 140rpx;">计费方式</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;margin-top: 3px;">
						<radio-group name="gender" @change="setBillingModeValue">
							<label>
								<radio value="按件数" :checked="(temData.billingMode=='按件数')?true:false" /><text>按件数</text>
							</label>
							<label>
								<radio value="按重量" :checked="(temData.billingMode=='按重量')?true:false" /><text>按重量</text>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="uni-form-item uni-column" v-if="temData.feeSetting=='自定义邮费'">
				<view class="uni-flex uni-row" style="margin-top: 20rpx;">
					<view class="title" style="width: 140rpx;">配送区域</view>
					<view class="text" style="-webkit-flex: 1;flex: 1;margin-top: 2px;"><button class="mini-btn" type="default" size="mini"
						 style="height: 60rpx;margin-top: 5rpx;" @click="toShowDeliverRegion">指定可配送区域和运费</button></view>
					<view class="text" style="width: 100rpx;"></view>
				</view>
				<!-- <view v-for="(tmp,index) in skuArray" :key="index"> -->
				<view class="uni-form-item uni-column" v-for="(item,index) in temData.deliveryData" :key="index">
					<view class="title"><text class="uni-form-item__title">{{ item.name }}</text>
						<view style="display: inline;">
							<view class="tag-view" style="float: right;">
								<uni-tag text="删除" size="small" type="error" @click="toDel(index)" />
							</view>
							<view class="tag-view" style="float: right;margin-right: 15px;" @click="toEdit(index)">
								<uni-tag text="编辑" size="small" />
							</view>
						</view>
					</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								{{temData.billingMode=='按件数'?'首件(个)':'首重(Kg)'}}
							</view>
							<view class="uni-list-cell-db">
								<view class="uni-input"><input class="uni-input2" :value="item.sj" name="sj" :placeholder="temData.billingMode=='按件数'?'请输入首件个数':'请输入首重重量'"
									 :data-src="index" @input="changeSjValue" /></view>

							</view>
						</view>
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								运费(元)
							</view>
							<view class="uni-list-cell-db">
								<view class="uni-input"><input class="uni-input2" :value="item.yf" name="yf" placeholder="请输入运费金额" :data-src="index"
									 @input="changeYfValue" /></view>

							</view>
						</view>
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								{{temData.billingMode=='按件数'?'续件(个)':'续重(Kg)'}}
							</view>
							<view class="uni-list-cell-db">
								<view class="uni-input"><input class="uni-input2" :value="item.xj" name="xj" :placeholder="temData.billingMode=='按件数'?'请输入续件个数':'请输入续重重量'"
									 :data-src="index" @input="changeXjValue" /></view>

							</view>
						</view>
						<view class="uni-list-cell">
							<view class="uni-list-cell-left">
								续费(元)
							</view>
							<view class="uni-list-cell-db">
								<view class="uni-input"><input class="uni-input2" :value="item.xf" name="xf" placeholder="请输入续费金额" :data-src="index"
									 @input="changeXfValue" /></view>

							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="uni-form-item uni-column">
				<view class="uni-padding-wrap uni-common-mt">
					<button type="primary" form-type="submit">提 交</button>
				</view>
			</view>
		</form>
		<tki-tree ref="tkitree" :selectParent="selectParent" :multiple="multiple" :range="list" rangeKey="name" @confirm="treeConfirm"
		 @cancel="treeCancel"></tki-tree>
	</view>
</template>
<script>
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import tkiTree from "@/components/zx-ui/zx-tree/zx-tree.vue";
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import {
		getAllCity
	} from '@/common/util/util.js';
	import {
		getDataById,
		addData,
		editData
	} from '@/common/api/shipping-template.js'
	export default {
		components: {
			uniTag,
			tkiTree
		},
		data() {
			return {
				id:'',
				temData: {
					deliveryData: [],
					billingMode: '按件数',
					temName: '',
					publicFee: '',
					feeSetting: '统一邮费'
				},
				action: '',
				list: [],
				multiple: true,
				selectParent: true,
				deliveryData: [],
				state: 0
			}
		},
		onLoad(option) {
			setTimeout(() => {
				this.list = getAllCity();
			}, 300)
			
			if(option.id!=undefined){
				this.id = option.id;
				this.action = myConst.ACTION.EDIT
				this.initData()
			}else{
				this.action = myConst.ACTION.ADD
				this.temData.billingMode = '按件数';
			}
		},
		methods: {
			async initData() {
				const data = {
					id: this.id
				}
				const res = await getDataById(data)
				this.temData.deliveryData = res[0].deliveryData;
				this.temData.billingMode = res[0].billingMode;
				this.temData.temName = res[0].temName;
				this.temData.publicFee = res[0].publicFee;
				this.temData.feeSetting = res[0].feeSetting;
				this.id = res[0]._id;
			},
			changeTemName(e) {
				this.temData.temName = e.detail.value;
			},
			changePublicFee(e) {
				this.temData.publicFee = e.detail.value;
			},
			setBillingModeValue(e) {
				this.temData.billingMode = e.target.value;
			},
			setFeeSettingValue(e) {
				this.temData.feeSetting = e.target.value;
			},
			toShowDeliverRegion(e) {
				this.state = -1
				this.$refs.tkitree._show(this.temData.deliveryData);
			},
			// 确定回调事件
			treeConfirm(e) {
				if (this.state == -1) {
					let tmp = {
						data: [],
						name: '',
						sj: 1,
						yf: 0,
						xj: 0,
						xf: 0
					}
					tmp.data = e;
					for (let item in tmp.data) {
						tmp.name = tmp.name + tmp.data[item].name + " ";
						if (tmp.name.length > 10) {
							tmp.name = tmp.name + "..."
							break;
						}
					}
					this.temData.deliveryData.push(tmp);
				} else {
					this.temData.deliveryData[this.state].name = "";
					for (let item in e) {
						this.temData.deliveryData[this.state].name = this.temData.deliveryData[this.state].name + e[item].name + " ";
						if (this.temData.deliveryData[this.state].name.length > 10) {
							this.temData.deliveryData[this.state].name = this.temData.deliveryData[this.state].name + "..."
							break;
						}
					}
					this.temData.deliveryData[this.state].data = e;
				}

			},
			// 取消回调事件
			treeCancel(e) {
				console.log(e)
			},
			// 显示树形选择器
			showTree() {
				this.state = -1
				this.$refs.tkitree._show(this.temData.deliveryData);
			},
			changeSjValue(e) {
				//TODO 
				console.log(this.temData)
				this.temData.deliveryData[e.currentTarget.dataset.src].sj = e.detail.value;
			},
			changeYfValue(e) {
				this.temData.deliveryData[e.currentTarget.dataset.src].yf = e.detail.value;
			},
			changeXjValue(e) {
				this.temData.deliveryData[e.currentTarget.dataset.src].xj = e.detail.value;
			},
			changeXfValue(e) {
				this.temData.deliveryData[e.currentTarget.dataset.src].xf = e.detail.value;
			},
			toDel(i) {
				this.temData.deliveryData.splice(i, 1)
			},
			toEdit(i) {
				this.state = i;
				this.$refs.tkitree._showEdit(this.temData.deliveryData, i);
			},
			async formSubmit(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				//定义表单规则
				var that = this;

				if (that.temData.temName == '') {
					uni.showToast({
						title: '模板名称不能为空',
						icon: 'none'
					})
					return;
				}
				if (that.temData.publicFee == '' && that.temData.feeSetting == '统一邮费') {
					uni.showToast({
						title: '快递邮费不能为空',
						icon: 'none'
					})
					return;
				}
				if (that.temData.deliveryData.length == 0 && that.temData.feeSetting == '自定义邮费') {
					uni.showToast({
						title: '请选择配送区域',
						icon: 'none'
					})
					return;
				}
				const data = {
					id: that.id,
					feeSetting: that.temData.feeSetting,
					deliveryData: that.temData.deliveryData,
					temName: that.temData.temName,
					publicFee: that.temData.publicFee,
					billingMode: that.temData.billingMode,
					updatetime: new Date().getTime()
				}
				if (that.action == myConst.ACTION.ADD) {
					const res = await addData(data)
				} else {
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

	.t-fill {
		color: #FF0000;
		position: absolute;
		left: 10rpx;
	}

	.uni-input {
		height: auto;
	}

	.uni-form-item .title {
		padding-left: 0px;
		margin-left: 30rpx;
	}
</style>
