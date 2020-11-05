<template>
	<view class="container">
		<view class="content">
			<view class="uni-textarea" style="margin-top: 20rpx;">
				<textarea @input="bindTitleAreaBlur" placeholder="商品标题,限60字符" v-model="productName" maxlength=60 auto-height />
				<text v-if="showTitleCount">{{titleLength}}/60</text>
			</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image class="uni-uploader__img" :src="image" @tap="onTapImg(index)"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-if="imageList.length<9">
									<view class="uni-uploader__input" @tap="chooseImage(1)"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text tip" style="width: 100rpx;text-align: center;">价格</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;"><input class="uni-input value" v-model="price" placeholder="请输入价格" :disabled="skuDisabled" /></view>
				<view class="text tip" style="width: 50rpx;">元</view>
			</view>
			<view class="uni-flex uni-row item">
				<view class="text tip" style="width: 100rpx;text-align: center;">库存</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;"><input class="uni-input value" v-model="stock" placeholder="请输入库存" :disabled="skuDisabled" /></view>
				<view class="text tip" style="width: 50rpx;">件</view>
			</view>
			<view class="uni-flex uni-row item" v-if="showSku==true"  @tap="onTapAddSku">
				<view class="text tip" style="width: 100rpx;text-align: center;">规格</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;"><input class="uni-input value" placeholder=" " disabled /></view>
				<view class="text tip" style="width: 50rpx;"><text class="uni-navigate-icon uni-icon" style="margin-top: 4px;font-size: 22px;color: #B2B2B2;">&#xe470;</text></view>
			</view>
			<view class="uni-flex uni-column"  v-if="showSku==true">
				<view style="margin-bottom: 10rpx;margin-left: 20rpx;" v-for="(item,index) in skuDetailArray" :key="index">
					<view style="color: #3D3D3D;"><text>{{ item.name }}</text></view>
					<view style="color: #A0A0A0;"><text>￥{{item.retailPrice}}</text><text style="margin-left: 20rpx;">库存</text><text style="margin-left: 10rpx;">{{item.stock}}</text></text></view>
					
				</view>
			</view>
			<view class="uni-flex uni-row item" v-if="showDetail==true">
				<view class="goods-info">
					<view class="text tip">商品详情</view>
					<textarea style="margin-top: 15rpx;" @input="bindDetailAreaBlur" v-model="detail" maxlength=600 placeholder="商品详情,限600字符" auto-height />
					<text style="margin-top: 15rpx;" v-if="showDetailCount">{{detailLength}}/600</text>
				</view>
			</view>
			<view class="uni-flex uni-column" v-if="showDetail==true">
				<view class="detail-img" v-for="(item,index) in detailImgList" :key="index">
					<image mode="widthFix" style="width: 100%;" :src="item" @tap="onTapDetailImg(index)"></image>
				</view>
				<view class="add-img" @tap="chooseImage(2)">
					<view class="uni-flex uni-column" style="margin-top: 50rpx;">
						<text class="icon add-icon">&#xe611;</text>
						<text style="color:#C3C3C3;">添加商品详情图</text>
					</view>
				</view>
			</view>
			
			
			<view class="uni-flex uni-row item">
				<view class="detail" style="margin-right: 30rpx;margin-top: 20rpx;" v-if="showSku==false" @tap="onTapAddSku">
					<text class="icon detail-icon">&#xe621;</text>
					<text class="detail-val">规格</text>
				</view>
				<view class="detail"  style="margin-top: 20rpx;" v-if="showDetail==false" @tap="onShowDetail">
					<text class="icon detail-icon">&#xe621;</text>
					<text class="detail-val">商品详情</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button class="cancel" type="default" @tap="onTapSave(0)">暂存</button>
				<button class="submit" type="default" @tap="onTapSave(1)">上架售卖</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import permision from "@/common/util/permission.js"
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js'
	import myUtil from '@/common/util/util.js'
	import { getDataOne,editDataByName,addData,editData } from '@/common/api/goods.js'
	import { getGroupData,getGroupDataById } from '@/common/api/goods-group.js'
	import { getTemplateData,getTemplateDataById } from '@/common/api/shipping-template.js'
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		components:{
			uniPopup
		},
		onLoad(option) {
			if(option.id!=undefined){
				this.id = option.id;
				this.action = myConst.ACTION.EDIT_BY_NAME;
				this.getGoodsData()
			}else{
				this.action = myConst.ACTION.ADD;
			}
			this.initData();
		},
		data() {
			return {
				id:'',
				action:'',
				imageList: [],
				showTitleCount:false,
				showDetailCount:false,
				titleLength:0,
				detailLength:0,
				productName:'',
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				imageDel:'/static/img/del.png',
				imageRight:'/static/img/right.png',
				imageLeft:'/static/img/left.png',
				groupPopupData:[],
				templatePopupData:[],
				group:'',  //商品分组ID
				groupTitle:'',
				price:'', //商品价格
				stock:'',  //商品库存
				detail:'', //商品详情
				showDetail: false,
				detailImgList:[], //商品详情图片列表
				skuDisabled:false,
				skuArray:[],
				skuDetailArray:[],
				submitData:{},
				showState:'下架',
				showSku:false

			}
		},
		methods: {
			async getGoodsData(){
				const data = {
					id:this.id
				}
				const res = await getDataOne(data)
				let proData = res[0].proData;
				this.id = res[0]._id;
				this.productName = proData.productName;  //商品名称
				this.detail = proData.detail;
				this.detailImgList = proData.detailImgList;
				this.skuArray = proData.skuArray;  
				this.skuDetailArray = proData.skuDetailArray;
				this.price = proData.skuRetailPrice;  //建议零售价格
				this.stock = proData.skuStock;
				this.imageList = proData.imageList;
				this.showState = proData.showState;  //显示状态
				this.group = proData.group;  //商品分组
				this.sales = proData.sales;
				if(this.detail!=''||this.detailImgList.length>0){
					this.showDetail = true
				}
				if(this.skuArray.length>0){
					this.showSku = true
				}
				
			},
			async initData(){
				const req = {
					page:1,
					limit:100,
					name:''
				}
				const data = await getGroupData(req)
				for(let i=0;i<data.records.length;i++){
					let d = {id:'',title:'',selected:false}
					d.id = data.records[i]._id;
					d.title = data.records[i].groName;
					this.groupPopupData.push(d);
				}
				
				const data2 = await getTemplateData(req)
				for(let i=0;i<data2.records.length;i++){
					let d = {id:'',title:'',selected:false}
					d.id = data2.records[i]._id;
					d.title = data2.records[i].temName;
					this.templatePopupData.push(d)
				}
				if(this.action==myConst.ACTION.ADD){
					//TODO 设置默认模板和分组值
				}
			},
			bindTitleAreaBlur: function (e) {
				if(e.detail.value==""){
					this.showTitleCount = false
				}else{
					this.showTitleCount = true
				}
				this.productName =  e.detail.value
				this.titleLength = e.detail.value.length
			},
			bindDetailAreaBlur: function (e) {
				if(e.detail.value==""){
					this.showDetailCount = false
				}else{
					this.showDetailCount = true
				}
				this.detail = e.detail.value
				this.detailLength = e.detail.value.length
			},
			// 1是商品图片  2商品详情图片
			// index传值 表示替换图片
			chooseImage: async function(type,index) {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
				
				let count = 0
				if(type==1){
					count = this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex]
				}else if(type==2){
					count = this.detailImgList.length + this.count[this.countIndex] > 9 ? 9 - this.detailImgList.length : this.count[this.countIndex]
				}
				// 替换图片只能选一个
				if(index!=undefined){
					count = 1
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: count,
					success: (res) => {
						if(type==1){
							if(index!=undefined){
								this.imageList[index]= res.tempFilePaths[0];
							}else{
								this.imageList = this.imageList.concat(res.tempFilePaths);								
								// console.log(res.tempFilePaths)
							}
						}else if(type==2){
							if(index!=undefined){
								this.detailImgList[index]= res.tempFilePaths[0]
							}else{
								this.detailImgList = this.detailImgList.concat(res.tempFilePaths)
							}
						}
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			/**
			 * popup 状态发生变化触发
			 * @param {Object} e
			 */
			change(e) {
				console.log('popup ' + e.type + ' 状态', e.show)
			},
			onSelectedTemplateType(index){
				for(let i=0;i<this.templatePopupData.length;i++){
					if(this.templatePopupData[i].selected==true){
						this.templatePopupData[i].selected = false
					}
				}
				this.templatePopupData[index].selected = true
			},
			onSelectedGroupType(index){
				for(let i=0;i<this.groupPopupData.length;i++){
					if(this.groupPopupData[i].selected==true){
						this.groupPopupData[i].selected = false
					}
				}
				this.groupPopupData[index].selected = true
			},
			toSelectTemplate(){
				this.$refs.popup.open()
			},
			toSelectGroup(){
				this.$refs.popup2.open()
			},
			onShowDetail(){
				this.showDetail = true
			},
			onTapDetailImg(index){
				uni.showActionSheet({
					title:'',
					itemList: ['删除图片', '替换图片', '查看图片'],
					success: (e) => {
						if(e.tapIndex==0){
							this.detailImgList.splice(index,1);
						}else if(e.tapIndex==1){
							this.chooseImage(2,index)
						}else if(e.tapIndex==2){
							uni.previewImage({
								current: this.detailImgList[index],
								urls: this.detailImgList
							})
						}
					}
				})
			},
			onTapImg(index){
				uni.showActionSheet({
					title:'',
					itemList: ['删除图片', '替换图片', '查看图片'],
					success: (e) => {
						if(e.tapIndex==0){
							this.imageList.splice(index,1);
						}else if(e.tapIndex==1){
							this.chooseImage(1,index)
						}else if(e.tapIndex==2){
							uni.previewImage({
								current: this.imageList[index],
								urls: this.imageList
							})
						}
					}
				})
			},
			onTapAddSku(){
				let that = this;
				uni.$once('getSkuData',function(data){
					if(data.skuArray.length>0){
						that.skuArray = data.skuArray
						that.skuDetailArray = data.skuDetailArray
						that.price = data.skuRetailPrice
						that.stock = data.skuStock
						that.skuDisabled = true
						that.showSku = true
					}else{
						that.skuArray = []
						that.skuDetailArray = []
						that.skuDisabled = false
						that.showSku = false
					}
				 })
				 let data = {
				 	skuArray: that.skuArray,
				 	skuDetailArray: that.skuDetailArray,
				 	skuRetailPrice: that.skuRetailPrice,
				 	skuStock: that.skuStock
				 }
				uni.navigateTo({
					url: '/pages/goods/sku-edit?data='+JSON.stringify(data)
				})
			},
			onTapSave(type){
				this.submitData = {};
				let tempImgList = [];
				let filePath = this.imageList;
				console.log(filePath)
				if (this.productName.length < 1) {
					uni.showToast({
						title: '请填写商品名称',
						icon: 'none'
					});
					return false;
				}
				if (this.imageList.length < 1) {
					uni.showToast({
						title: '请添加商品图片',
						icon: 'none'
					});
					return false;
				}
				if(this.price==""||this.price==null){
					uni.showToast({
							title: '请填写商品价格',
							icon: 'none'
						});
						return false;
				}
				if(this.stock==""||this.stock==null){
					uni.showToast({
							title: '请填写库存',
							icon: 'none'
						});
						return false;
				}
				if(type==1){
					this.showState= '上架'
				}
				uni.showLoading({
					title: '上传图片',
					mask: false
				});
				//上传商品图片
				let mCount = 0;
				// 判断有几张图片需要上传
				for (let i = 0; i < filePath.length; i++) {
					if(myUtil.isUploadImgTmp(filePath[i])){
						mCount++;
					}
				}
				let mCount2 = 0;
				for (let i = 0; i < filePath.length; i++) {
					if(!myUtil.isUploadImgTmp(filePath[i])){   //判断不是临时文件
						mCount2++;
						if(mCount2==filePath.length){
							if(this.detailImgList.length>0){
								this.uploadDetailImg()
							}else{
								this.toAddProduct();
							}
						}	
					}else{
						myCloud.uploadFile(filePath[i],(res)=>{
							filePath[i] = res.fileID;
							tempImgList.push(res.fileID);
							if (tempImgList.length == mCount) {
								this.imageList = filePath
								if(this.detailImgList.length>0){
									this.uploadDetailImg()
								}else{
									console.log("start to AddProduct")
									this.toAddProduct();
									console.log("Add Product finished")
								}
							}
						})
					}
				}
				
			},
			uploadDetailImg(){
				//上传详情图片
				let tempImgDetailList = [];
				let filePathDetail = this.detailImgList
				let mCount3 = 0;
				// 判断有几张图片需要上传
				for (let i = 0; i < filePathDetail.length; i++) {
					if(myUtil.isUploadImgTmp(filePathDetail[i])){
						mCount3++;
					}
				}
				let mCount4 = 0;
				for (let i = 0; i < filePathDetail.length; i++) {
					if(!myUtil.isUploadImgTmp(filePathDetail[i])){
						mCount4++;
						if(mCount4==filePathDetail.length){
							this.toAddProduct();
						}	
					}else{
						myCloud.uploadFile(filePathDetail[i],(res)=>{
							filePathDetail[i] = res.fileID;
							tempImgDetailList.push(res.fileID);
							if (tempImgDetailList.length == mCount3) {
								this.detailImgList = filePathDetail
								this.toAddProduct();
							}
						})
					}
				}
			},
			toAddProduct(filePath){
				let tempData = {
					productName: this.productName,
					productSellPoint: '',
					skuWeight:'',
					skuCostPrice:'',
					skuArray: this.skuArray,
					skuDetailArray: this.skuDetailArray,
					skuRetailPrice: this.price,
					skuStock:this.stock,
					showState:this.showState,
					group:this.group,
					sales:this.sales,
					imageList: this.imageList,
					detail: this.detail,
					detailImgList: this.detailImgList,
					pintuanPrice:''
				};
				this.submitData = tempData.productName;
				this.add_product();
			},
			async add_product() {
				var that = this;
				const data = {
					id:that.id,
					proData:that.submitData,
					updatetime:new Date().getTime()
				}
				let res = {}
				if(that.action==myConst.ACTION.ADD){
					console.log("addData start")
					res = await addData(data)
					console.log("addData end")
				}else{
					res = await editDataByName(data)
				}
				uni.showToast({
					title: '提交成功',
					icon:'none'
				});
				setTimeout(()=>{
					uni.navigateBack()
				}, 800)
			},
			async checkPermission(code) {
				let status = permision.isIOS ? await permision.requestIOS('camera') :
					await permision.requestAndroid('android.permission.CAMERA');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "需要相机权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #ffffff;
	}
	.container{
		.content{
			margin-left: 40rpx;
			margin-right: 40rpx;
			margin-bottom: 200rpx;
			overflow-y:auto;
			.uni-textarea{
				textarea{
					background-color: #ffffff;
				}
				text{
					float:right;
					color: #B2B2B2;
				}
			}
			.uni-list {
				background-color: #ffffff;
				.uni-uploader__file {
					width: 205rpx;
					height: 205rpx;
				}
			}
			.uni-list::before {
				height: 0px;
			}
			.uni-list::after{
				height: 0px;
			}
			.uni-uploader__input-box{
				background-color: $zx-color-background;
				border: 0px;
			}
			.uni-uploader__input-box:before, .uni-uploader__input-box:after{
				background-color: #ABABAB;
			}
			.uni-uploader__input-box:before {
			    width: 2px;
			    height: 37px;
			}
			.uni-uploader__input-box:after {
			    width: 37px;
			    height: 2px;
			}
			.uni-input{
				background: #ffffff;
			}
			.shipping{
				position: relative;
				float: left;
				display: flex;
				margin-top: 20rpx;
				background-color: $zx-color-background;
				border-radius: 10rpx;
				.shipping-icon{
					font-size: 28rpx;
					color: #6F7FA0;
					margin-left: 20rpx;
				}
				.shipping-val{
					font-size: 28rpx;
					color: #8B8B8B;
					margin-right: 20rpx;
					margin-left: 18rpx;
				}
			}
			.tip{
				font-size: 16px;
				margin-top: 9px;
			}
			.item{
				border-top: 1px solid #EDEDED;
				
				.uni-input{
					text-align: right;
					height: 33px;
					line-height: 33px;
				}
			}
			.detail{
				position: relative;
				float: left;
				display: flex;
				.detail-icon{
					color: #6A7998;
					font-size: 33rpx;
				}
				.detail-val{
					margin-left: 10rpx;
					color: #6A7998;
					font-size: 30rpx;
				}
			}
			
			.goods-info{
				width: 94%;
				margin: 0 auto;
				textarea{
					background-color: #ffffff;
					width: 100%;
				}
				text{
					float:right;
					color: #B2B2B2;
				}
			}
			.detail-img{
				width: 94%;
				text-align: center;
				margin: 0 auto;
			}
			.add-img{
				width: 94%;
				height:250rpx;
				background-color: #F7F7F7;
				text-align: center;
				margin: 0 auto;
				vertical-align: center;
				margin-top: 20rpx;
				.add-icon{
					color: #B9B9B9;
				}
				
			}
			
		}
		.footer{
			border-top: 1px solid #EDEDED;
			width: 750rpx;
			position:fixed;
			bottom: 0;
			height: 150rpx;
			z-index: 10;
			background-color: #ffffff;;
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
		
		
		
		.popup-content {
			background-color: #ffffff;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			height: 800rpx;
			position: relative;
			.popup-title{
				padding-top: 40rpx;
				padding-left: 30rpx;
				text{
					font-size: 28rpx;
					font-weight: bold;
				}
			}
			.popup-nav{
				padding-top: 40rpx;
				height: 250px;
				overflow:auto;
				.line{
					width: 750rpx;
					height:0;
					border-top:1px solid #f0f0f0;
					padding-top: 10rpx;
				}
				.item{
					padding-left: 30rpx;
					.icon{
						font-size: 50rpx;
					}
					text{
						display: flex;
					}
					.item-content{
						display: inline-block;
						margin-left: 0rpx;
						padding-bottom: 20rpx;
						padding-top: 20rpx;
						.item-title{
							font-size: 30rpx;
							color: #1B1B1B;
						}
					}
				}
				.selected{
					float: right;
					margin-top: -88rpx;
					margin-right: 30rpx;
				}
			}
			.popup-btn{
				padding-top: 40rpx;
				margin: 0 auto;
				text-align: center;
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
