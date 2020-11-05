<template>
	<view class="container">
		<view class="uni-form-item uni-column item">
			<view class="example-body" style="">
				<view class="uni-form-item uni-column">
					<view v-for="(tmp,index) in skuArray" :key="index">
						<view class="uni-flex uni-row" style="margin-top: 10rpx;">
							<view class="title" style="width: 168rpx;">规格名称</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;"><input class="uni-input" name="nickname" placeholder="请输入规格名称"
								 :data-src="index" @input="changeSkuName" :value="tmp.name" /></view>
							<view class="text" style="width: 100rpx;">
								<image class="" style="position: relative;width: 60rpx;height: 60rpx;top:10% ;left:20%" :src="skuDel" :data-src="index"
								 @tap="delSku"></image>
							</view>
						</view>
						<view class="uni-flex uni-row" style="margin-top: 10rpx;">
							<view class="title" style="width: 168rpx;">产品属性</view>
							<view class="text" style="-webkit-flex: 1;flex: 1;"><input class="uni-input" name="nickname" placeholder="多个产品属性以#隔开"
								 :data-src="index" @input="changeSkuPro" :value="tmp.pro" /></view>
							<view class="text" style="width: 100rpx;"></view>
						</view>
					</view>
					<view class="uni-flex uni-row" style="margin-top: 20rpx;">
						<view class="title" style="width: 168rpx;">规格设置</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;"><button class="mini-btn" type="default" size="mini" style="height: 60rpx;margin-top: 5rpx;"
							 @click="addSku">添加规格</button></view>
						<view class="text" style="width: 100rpx;"></view>
					</view>
				</view>
				<view v-if="skuArray.length>0" v-for="(tmp,index) in skuDetailArray" :key="index">
					<view class="uni-form-item uni-column">
						<view class="title"><text class="uni-form-item__title">{{ tmp.name }}</text></view>
						<view class="uni-list">
							<view class="uni-list-cell">
								<view class="uni-list-cell-left">
									价格
								</view>
								<view class="uni-list-cell-db">
									<view class="uni-input"><input class="uni-input2" :value="tmp.retailPrice" name="nickname" type="digit"
										 placeholder="请输入零售价格" :data-src="index" @input="changeSkuDetailRetail" /></view>

								</view>
							</view>
							<view class="uni-list-cell">
								<view class="uni-list-cell-left">
									库存
								</view>
								<view class="uni-list-cell-db">
									<view class="uni-input"><input class="uni-input2" :value="tmp.stock" name="nickname" type="digit" placeholder="请输入商品库存"
										 :data-src="index" @input="changeSkuDetailStock" /></view>

								</view>
							</view>
							<view class="uni-list-cell" style="display: none;">
								<view class="uni-list-cell-left">
									重量
								</view>
								<view class="uni-list-cell-db">
									<view class="uni-input"><input class="uni-input2" :value="tmp.weight" name="nickname" type="digit" placeholder="请输入重量(Kg)"
										 :data-src="index" @input="changeSkuDetailWeight" /></view>

								</view>
							</view>
							<view class="uni-list-cell" style="display: none;">
								<view class="uni-list-cell-left">
									成本价格
								</view>
								<view class="uni-list-cell-db">
									<view class="uni-input"><input class="uni-input2" :value="tmp.costPrice" name="nickname" type="digit"
										 placeholder="请输入成本价格" :data-src="index" @input="changeSkuDetailCost" /></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button class="cancel" type="default" @tap="onTapCancel">取消</button>
				<button class="submit" type="default" @tap="onTapSave">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skuArray: [],
				skuDetailArray: [],
				skuDel: '/static/img/del2.png',
				skuRetailPrice: '',
				skuCostPrice: '',
				skuWeight: '',
				skuStock: '',
				skuPro: '',
			}
		},
		onLoad(options) {
			let data = JSON.parse(options.data) 
			this.skuArray = data.skuArray
			this.skuDetailArray = data.skuDetailArray
			this.skuRetailPrice = data.skuRetailPrice
			this.skuStock = data.skuStock
		},
		methods: {
			addSku(e) {
				let tmp = {
					name: '',
					pro: ''
				};
				this.skuArray.push(tmp);
			},
			delSku(e) {
				this.skuArray.splice(e.target.dataset.src, 1);
				this.updateSkuDetail()
			},
			changeSkuName(e) {
				this.skuArray[e.target.dataset.src].name = e.detail.value;
			},
			changeSkuPro(e) {
				if (e.detail.value == '' || e.detail.value == null) {

				} else {
					if (this.skuArray[e.target.dataset.src].name == '' || this.skuArray[e.target.dataset.src].name == null) {
						uni.showToast({
							title: '请填写规格名称',
							icon: 'none'
						});
					}
					this.skuArray[e.target.dataset.src].pro = e.detail.value;
					this.updateSkuDetail()
				}

			},
			updateSkuDetail(){
				this.skuDetailArray = [];
				if (this.skuArray.length == 1) {
					for (let j = 0; j < this.skuArray[0].pro.split("#").length; j++) {
						let tmp = {
							retailPrice: '',
							costPrice: '',
							pintuanPrice: '',
							stock: '',
							name: ''
						};
						tmp.name = this.skuArray[0].pro.split("#")[j];
						this.skuDetailArray.push(tmp);
					}
				}
				if (this.skuArray.length == 2) {
				
					for (let j = 0; j < this.skuArray[0].pro.split("#").length; j++) {
						for (let k = 0; k < this.skuArray[1].pro.split("#").length; k++) {
							let tmp = {
								retailPrice: '',
								costPrice: '',
								pintuanPrice: '',
								stock: '',
								name: ''
							};
							tmp.name = this.skuArray[0].pro.split("#")[j] + "-" + this.skuArray[1].pro.split("#")[k];
							this.skuDetailArray.push(tmp);
						}
					}
				}
				if (this.skuArray.length == 3) {
					for (let j = 0; j < this.skuArray[0].pro.split("#").length; j++) {
						for (let k = 0; k < this.skuArray[1].pro.split("#").length; k++) {
							for (let m = 0; m < this.skuArray[2].pro.split("#").length; m++) {
								let tmp = {
									retailPrice: '',
									costPrice: '',
									pintuanPrice: '',
									stock: '',
									name: ''
								};
								tmp.name = this.skuArray[0].pro.split("#")[j] + "-" + this.skuArray[1].pro.split("#")[k] + "-" + this.skuArray[
									2].pro.split("#")[m];
								this.skuDetailArray.push(tmp);
							}
						}
					}
				}
			},
			changeSkuDetailRetail(e) {
				this.skuRetailPrice = '';
				this.skuDetailArray[e.target.dataset.src].retailPrice = e.detail.value;
				let tmp = 0;
				for (let i = 0; i < this.skuDetailArray.length; i++) {
					if (this.skuDetailArray[i].retailPrice == '') {
						tmp = 1;
						break;
					}
				}
				if (tmp == 0) {
					this.skuRetailPrice = Math.min.apply(Math, this.skuDetailArray.map(item => {
						return item.retailPrice
					}));
				}
			},
			changeSkuDetailCost(e) {
				this.skuDetailArray[e.target.dataset.src].costPrice = e.detail.value;
			},
			changeSkuDetailWeight(e) {
				this.skuDetailArray[e.target.dataset.src].weight = e.detail.value;
			},
			changeSkuDetailStock(e) {
				this.skuStock = '';
				this.skuDetailArray[e.target.dataset.src].stock = e.detail.value;
				let tmp = 0;
				for (let i = 0; i < this.skuDetailArray.length; i++) {
					if (this.skuDetailArray[i].stock == '') {
						tmp = 1;
						break;
					}
				}
				if (tmp == 0) {
					this.skuStock = 0;
					for (let item in this.skuDetailArray) {
						this.skuStock = parseInt(this.skuStock) + parseInt(this.skuDetailArray[item].stock);
					}
				}
			},
			changeSkuRetail(e) {
				this.skuRetailPrice = e.detail.value;
			},
			changeSkuWeight(e) {
				this.skuWeight = e.detail.value;
			},
			changeSkuCost(e) {
				this.skuCostPrice = e.detail.value;
			},
			changeSkuStock(e) {
				this.skuStock = e.detail.value;
			},
			changeExpressFee(e) {
				this.expressFee = e.detail.value;
			},
			onTapCancel(){
				uni.navigateBack()
			},
			onTapSave(){
				for(let i=0;i<this.skuArray.length;i++){
					if(this.skuArray[i].name==""||this.skuArray[i].name==null){
						uni.showToast({
							title: '请填写规格名称',
							icon: 'none'
						});
						return false;
					}
					if(this.skuArray[i].pro==""||this.skuArray[i].pro==null){
						uni.showToast({
							title: '请填写产品属性',
							icon: 'none'
						});
						return false;
					}
				}
				for(let i=0;i<this.skuDetailArray.length;i++){
					if(this.skuDetailArray[i].retailPrice==""||this.skuDetailArray[i].retailPrice==null){
						uni.showToast({
							title: '请填写价格',
							icon: 'none'
						});
						return false;
					}
					if(this.skuDetailArray[i].stock==""||this.skuDetailArray[i].stock==null){
						uni.showToast({
							title: '请填写库存',
							icon: 'none'
						});
						return false;
					}
				}
				uni.$emit('getSkuData',{skuArray:this.skuArray,skuDetailArray:this.skuDetailArray,skuRetailPrice:this.skuRetailPrice,skuStock:this.skuStock})
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.item {
		margin-bottom: 200rpx;
		.uni-input {
		    height: 25px;
		}
	}

	.container {
		.footer {
			border-top: 1px solid #EDEDED;
			width: 750rpx;
			position: fixed;
			bottom: 0;
			height: 150rpx;
			z-index: 10;
			background-color: #ffffff;
			;

			.btn {
				padding-top: 30rpx;
				margin-right: 40rpx;
				text-align: right;

				button {
					width: 180rpx;
					font-size: 30rpx;
				}

				button:after {
					border: none;
				}

				button:active {
					opacity: 0.5;
				}

				.cancel {
					display: inline-block;
					margin-right: 20rpx;
					color: $zx-color-primary;
					background: $zx-color-button;
				}

				.submit {
					display: inline-block;
					margin-left: 20rpx;
					background: $zx-color-primary;
					color: #ffffff;
				}
			}
		}
	}
</style>
