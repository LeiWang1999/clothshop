<template>
	<view class="container">
		<view>
			<view style="height: 30rpx;">
				
			</view>
		
			<view class="panel panel-one">
				<view class="uni-form-item uni-row">
					<view class="title">行业名称</view>
					<input v-model="name" class="right-content uni-input" name="name" placeholder="请输入行业名称" />
				</view>
			</view>
			
			<view class="panel-img" v-if="imgUrl==''" @click="chooseImage">
				<view class="img-add">
					+
				</view>
			</view>
			
			<view class="template-img" v-else @click="chooseImage">
				<image class="img" :src="imgUrl"></image>
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button class="cancel" type="default" @tap="submit(0)">保存</button>
				<button class="submit" type="default" @click="submit(1)">设计模板</button>
			</view>
		</view>
	</view>
</template>

<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import myUtil from '@/common/util/util.js';
	import { addData,editData,getDataById } from '@/common/api/template.js';
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
		data() {
			return {
				action:myConst.ACTION.ADD,
				name:'',
				imgUrl:'',
				tmpImgUrl:'',
				id:'',
				diyData:[],
				useNum:0,
				sourceTypeIndex: 1,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
			}
		},
		onLoad(option) {
			if(option.id!=undefined){
				this.id = option.id;
				this.action = myConst.ACTION.EDIT
				this.getData()
			}else{
				this.action = myConst.ACTION.ADD
			}
		},
		methods: {
			async getData(){
				const req = {
					_id:this.id
				}
				const data = await getDataById(req)
				if(data.length>0){
					this.name = data[0].name;
					this.imgUrl = data[0].imgUrl;
					this.diyData = data[0].diyData;
					this.useNum = data[0].useNum;
				}
			},
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: (res) => {
						this.imgUrl = res.tempFilePaths[0];
						this.tmpImgUrl = res.tempFilePaths[0];
					},
					fail: (err) => {
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
			async submit(type){
				if(this.name==''){
					uni.showToast({
						icon:"none",
						title:"请输入行业名称"
					})
				}else if(this.imgUrl==''){
					uni.showToast({
						icon:"none",
						title:"请选择模板图片"
					})
				}else{
					// 说明图片有更新
					if(this.tmpImgUrl!=''){
						myCloud.uploadFile(this.tmpImgUrl,(res)=>{
							this.imgUrl = res.fileID;
							this.toAddTemplate(type);
						})
					}else{
						this.toAddTemplate(type);
					}
				}
			},
			async toAddTemplate(type){
				const req = {
						_id:this.id,
						name:this.name,
						imgUrl:this.imgUrl,
						diyData:this.diyData,
						useNum:this.useNum,
						updatetime:new Date().getTime()
				}
				if(this.action==myConst.ACTION.ADD){
					const data = await addData(req)
					this.id = data.id
					uni.showToast({
						title: '提交成功',
						icon:'none'
					});
				}else{
					const data = await editData(req)
				}
				
				setTimeout(()=>{
					if(type==0){
						uni.navigateBack()
					}else{
						let tmp = 'templateDiy'
						//pageType 0表示默认设计 1表示模板设计
						uni.redirectTo({
							url: '../shop/page-diy?id=' + this.id +'&pageName='+tmp
						});
					}
				}, 800)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.panel-img{
			background-color: #ffffff;
			border-radius: 20rpx;
			width: 100px;
			height: 100px;
			margin: 0 30rpx;
			.img-add{
				text-align: center;
				font-size: 50px;
			}
		}
		.template-img{
			width: 100px;
			height: 100px;
			margin: 0 30rpx;
			.img{
				border-radius: 20rpx;
				width: 100%;
				height: 100%;
			}
		}
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
			.value{
				position: relative;
				float: right;
				padding: 10rpx 26rpx;
			}
		}
		
	}
</style>
