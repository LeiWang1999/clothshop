<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'"  @click="showState==0?togglePopup('bottom', 'popup'):''">
			<view class="cap-image-ad">
				<view v-if="blaData.template==1" class="cap-image-ad__image-nav" :style="'overflow-x: hidden; background-color:'+blaData.backgroundColor">
					<view class="image-wrapper" v-for="(item,index) in blaData.imgArray" :key="index" :style="'width: '+imgHeight+'rpx; margin-right: 0px;'" @click="showState==0?'':comEvent(item)">
						<view class="cap-image-ad__link cap-image-ad__link--image-nav" style="color: rgb(0, 0, 0);">
							<image class="cap-image-ad__image" :style="'height: '+imgHeight+'rpx; width: '+imgHeight+'rpx;'" :src="item.imgUrl"></image>
							<view class="cap-image-ad__nav-title" :style="'color:'+blaData.textColor">{{item.title}}</view>
						</view>
					</view>
				</view>
			
				<view v-if="blaData.template==2" class="cap-image-ad__slide cap-image-ad__text-nav" style="overflow-x: hidden;">
					<view class="text-nav-wrapper" v-for="(item,index) in blaData.imgArray" :key="index" :style="'width: '+imgHeight+'rpx; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255);'" @click="showState==0?'':comEvent(item)">
						<view v-if="index==blaData.imgArray.length-1" class="cap-image-ad__nav-title" style="border-right:0px">{{item.title}}</view>
						<view v-else class="cap-image-ad__nav-title">{{item.title}}</view>
						
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="uni-form-item uni-column">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">组件操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="del" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">选择模板</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setTemplateValue">
								<label>
									<radio value="1" :checked="(blaData.template==1)?true:false" /><text>图文导航</text>
								</label>
								<label>
									<radio value="2" :checked="(blaData.template==2)?true:false" /><text>文字导航</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文字颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.textColor,'textColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.textColor"></view></view>
								</view>
								<view class="tag-view" @click="textColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">背景颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.backgroundColor,'backgroundColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.backgroundColor"></view></view>
								</view>
								<view class="tag-view" @click="backgroundColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="uni-flex uni-column v-uni-column">
							<view class="flex-item flex-item-V" v-for="(item,index) in blaData.imgArray" :key="index">
								<view class="rc-design-editor-card-item" style="" >
									<view class="v-show-del"><text class="image-del icon" :data-id="item.id"  @tap="delImage">&#xeb7e;</text></view>
									
										<view class="rc-design-component-editor_subentry-item clearfix">
											<view v-if="blaData.template==1" class="rc-design-common-choice-image-component image-editor">
												<view class="has-choosed-image">
													<image :src="item.imgUrl"  class="thumb-image"  style="width: 80px; height: 80px;"></image>
													<view class="modify-image" :data-index="index" @click="updateImg">更换图片</view>
												</view>
											</view>
											<view class="subentry-item-editor-form-content">
												<view class="zxv-design-editor__control-group v-group">
													<label class="zxv-design-editor__control-group-container">
														<view class="zxv-design-editor__control-group-label">标题:</view>
														<view class="zxv-design-editor__control-group-control">
															<view class="zxv-input-wrapper">
															<input class="zxv-input" :style="'width:'+mInputWidth+'px'" name="title" :data-index="index" :value="item.title" @input="setImgTitleValue" placeholder="建议4个字以内">
															</view>
														</view>
													</label>
												</view>
												<view class="zxv-design-editor__control-group subentry-control-group">
													<label class="zxv-design-editor__control-group-container">
														<view class="zxv-design-editor__control-group-label">链接:</view>
														<view class="zxv-design-editor__control-group-control">
															<view class="rc-choose-link-menu">
																<view class="zxv-popover-wrapper rc-choose-link-menu-popover-wrapper" style="display: inline-block;">
																	<view class="rc-choose-link-menu-trigger" :data-index="index" @click="toSelectPage"><text v-if="item.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{item.toUrl.pageTitle}}</text></view>
																</view>
															</view>
														</view>
													</label>
												</view>
											</view>
										</view>
									</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="blaData.imgArray.length<6">
						<view class="v-rc-design" @click="addToShowImg">
								<view class="v-add-img">+ 添加一个图文导航</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
		<zx-page-list  @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
		<t-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></t-color-picker>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime,navToPage,genID } from '@/common/util/util.js';
	import { addData } from '@/common/api/source.js'
	export default {
		props:["toChildData","showState"],
		components: {
			uniPopup,
			uniTag,
			tColorPicker,
			zxPageList
		},
		created:function(){
			var that = this;
			that.blaData = that.toChildData;
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			that.imgHeight = 748/that.blaData.imgArray.length;  //单个图标默认高度
			this.mInputWidth = windowWidth-230; 
		},
		data() {
			return {
				type: "",
				content: '顶部弹 popup',
				edit: false,
				blaData:{},
				imgHeight:0,
				mInputWidth: 100,
				impIndex:0,
				imageDel: '/static/img/del.png',
			}
		},
		methods: {
			togglePopup(type, open) {
				this.$data.edit = true;
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			change(e) {
				if(!e.show){
					this.edit = false
				}
			},
			del(e){
				this.$emit("send",this.blaData.id);
			},
			toUp(e){
				this.$emit("up",this.blaData.id);
			},
			toDown(e){
				this.$emit("down",this.blaData.id);
			},
			setTemplateValue(e){
				this.blaData.template = e.target.value;
				this.$emit("changeData",this.blaData);
			},
			openColorSelector(e,i) {
			    // 打开颜色选择器
			    this.$refs.colorPicker.open(e,i);
			},
			colorSelectorConfirm(e) {
				if(e.item=='backgroundColor'){
					this.blaData.backgroundColor = e.hex;
					this.$emit("changeData",this.blaData);
				}else if(e.item=='textColor'){
					this.blaData.textColor = e.hex;
					this.$emit("changeData",this.blaData);					
				}
			},
			textColorReset(e){
				this.blaData.textColor = '#000000';
				this.$emit("changeData",this.blaData);
			},
			backgroundColorReset(e){
				this.blaData.backgroundColor = '#ffffff';
				this.$emit("changeData",this.blaData);
			},
			setImgTitleValue(e){
				this.blaData.imgArray[e.currentTarget.dataset.index].title = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			toSelectPage(e){
				this.impIndex = e.currentTarget.dataset.index;
				this.$refs.zxPageList.showPageList();
			},
			setSelectPageValue(e){
				this.blaData.imgArray[this.impIndex].toUrl = e;
				this.$emit("changeData",this.blaData);
			},
			delImage(e) {
				for(let i=0;i<this.blaData.imgArray.length;i++){
					if(e.currentTarget.dataset.id==this.blaData.imgArray[i].id){
						this.blaData.imgArray.splice(i,1);
					}
				}
				this.imgHeight = 748/this.blaData.imgArray.length;  //单个图标默认高度
				this.$emit("changeData",this.blaData);
			},
			addToShowImg(e){
				let that = this;
				if(this.blaData.template==1){
					uni.chooseImage({
					    count: 6-that.blaData.imgArray.length,
					    success(res) {
					        if (res.tempFilePaths.length > 0) {
								for(let i=0;i<res.tempFilePaths.length;i++){
									let filePath = res.tempFilePaths[i];
									//进行上传操作
									uni.getImageInfo({
									    src: res.tempFilePaths[0],
									    success: function (image) {
											myCloud.uploadFile(filePath, (res)=>{
												let tmp = {
													id: genID(),
													imgUrl: '',
													title: '导航',
													toUrl: '',
													comType: ''
												}
												that.blaData.imgArray.push(tmp);
												that.blaData.imgArray[that.blaData.imgArray.length-1].imgUrl = res.fileID;
												that.imgHeight = 748/that.blaData.imgArray.length;  //单个图标默认高度
												that.$emit("changeData",that.blaData);
											})				
									    }
									});
								}      
					        }
					    }
					});	
				}else{
					let tmp = {
						id: genID(),
						imgUrl: '',
						title: '导航',
						toUrl: '',
						comType: ''
					}
					that.blaData.imgArray.push(tmp);
					that.imgHeight = 748/that.blaData.imgArray.length;  //单个图标默认高度
					that.$emit("changeData",that.blaData);
				}

			},
			updateImg(e){
				this.tmpIndex = e.currentTarget.dataset.index;
				
				uni.showActionSheet({
					title:'',
					itemList: ['本地图片', '素材中心'],
					success: (e) => {
						if(e.tapIndex==0){
							
							let that = this;
							uni.chooseImage({
							    count: 1,
							    success(res) {
							        if (res.tempFilePaths.length > 0) {
							            let filePath = res.tempFilePaths[0]
							            //进行上传操作
										uni.getImageInfo({
										    src: res.tempFilePaths[0],
										    success: function (image) {
												var mHeight = (image.height*750)/image.width;
												myCloud.uploadFile(filePath, (res)=>{
													that.blaData.imgArray[that.tmpIndex].imgUrl = res.fileID;
													that.imgHeight = 748/that.blaData.imgArray.length;  //单个图标默认高度
													that.$emit("changeData",that.blaData);
													const req = {
														action: myConst.ACTION.ADD,
														params: {
															type:1,
															url:res.fileID,
															groupId:'001',
															height:mHeight,
															updatetime:new Date().getTime()
														}
													}
													that.addDataReq(req)
												})
											},
										})
							        }
							    }
							});
						}else{
							let that = this;
							uni.$once('getSource',function(data){
								if(data.msg.length>0){
									that.blaData.imgArray[that.tmpIndex].imgUrl = data.msg[0].url;
									that.imgHeight = 748/that.blaData.imgArray.length;  //单个图标默认高度
									that.$emit("changeData",that.blaData);
								}
							 })
							uni.navigateTo({
							    url: '/pages/shop/source-list?loadType=1'
							});
						}
					}
				})
			},
			async addDataReq(req){
				await addData(req);
			},
			toUrl(i,p){
				let tmp = 'pageDiy'
				uni.navigateTo({
				    url: '/pages/index/diy?id='+i+'&pageTitle='+p+'&pageName='+tmp
				});
			},
			comEvent(item){
				console.log(item)
				if(item.toUrl.id!=undefined){
					// this.toUrl(item.toUrl.id,item.toUrl.pageTitle)
					navToPage(item)
				}
			}
		}
	}
</script>
<style>

	.v-root-preview-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.v-root-preview-controller {
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
	}
	.v-root-preview{
		position: relative;
		min-height: 10px;
	}

	.v-action {
		position: relative;
		float: left;
		display: flex;
	}
	
	.tag-view{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin: 10rpx 10rpx;
		justify-content: center;
		
	}

	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #F4F5F6;
		font-size: 14px;
	}
	.uni-row{
		margin-top: 20rpx;
	}
	.cap-image-ad__image-nav {
		text-align: center;
	}
	.cap-image-ad__image-nav .image-wrapper {
	    display: inline-block;
	    vertical-align: middle;
	}
	.cap-image-ad__image-nav .cap-image-ad__image {
	    background-size: cover;
	    background-position: 50%;
	}
	.cap-image-ad__image-nav .cap-image-ad__nav-title {
	    /* padding-bottom: 9px; */
	    height: 33px;
	    line-height: 24px;
		text-align: center;
		font-size: 12px;
	}
	.cap-image-ad__slide {
	    width: 100%;
	    overflow-x: scroll;
	    overflow-y: hidden;
	    -webkit-overflow-scrolling: touch;
	    white-space: nowrap;
	    padding-bottom: 10px;
	    margin-bottom: -10px;
	}
	.cap-image-ad__text-nav .cap-image-ad__nav-title {
	    position: relative;
	    height: 12px;
	    line-height: 12px;
	    font-size: 12px;
	    text-align: center;
		border-right: 1px solid #e5e5e5;
	}
	
	.cap-image-ad__text-nav .text-nav-wrapper {
	    display: inline-block;
	    padding: 15px 0;
	}
	
	.v-rc-design{
		position: relative;
		background-color: #fff;
		margin-top:10px;
		padding: 10px;
		border: 1px dashed #e5e5e5;
		width: 100%;
		padding-bottom: 10px;
		margin-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
	
	}
	
	.v-add-img{
		text-align: center;
		margin: 0 auto;
		color: #38f;
	}
	
	.rc-design-editor-card-item{
	    position: relative;
	    background-color: #fff;
		margin-top: 10px;
	    padding: 15px;
	    border: 1px dashed #e5e5e5;
		/* width: 100%; */
		padding-bottom:10px;
		padding-right:5px;
	}
	.rc-design-component-editor_subentry-item {
		position: relative;
	}
	.rc-design-common-choice-image-component {
		float: left;
		display: inline-block;
	}
	.has-choosed-image{
		position: relative;
	    width: 80px;
	    height: 80px;
	    text-align: center;
	}
	.thumb-image{
		min-height: 80px;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    vertical-align: bottom;
	    max-height: 100%;
	    height: auto;
	    width: auto;
	}
	.modify-image{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 80px;
	    height: 20px;
	    line-height: 20px;
	    font-size: 12px;
	    color: #fff;
	    background: rgba(0,0,0,.5);
	    cursor: pointer;
	}
	.subentry-item-editor-form-content{
	    width: 200px;
	    margin-left: 100px;
	}
	.zxv-design-editor__control-group{
		margin-bottom: 15px;
	}
	.zxv-design-editor__control-group-container{
	    display: flex;
	    -webkit-box-align: center;
		align-items: center;
	}
	.zxv-design-editor__control-group-label{
	    font-size: 12px;
	    -ms-flex-negative: 0;
	    -webkit-flex-shrink: 0;
	    flex-shrink: 0;
	    text-align: right;
	    margin-right: 10px;
	}
	.zxv-input-wrapper{
		display: flex;
	    position: relative;
	    height: 30px;
	    max-height: 36px;
	}
	.zxv-input{
		outline: none;
	    border: 1px solid #38f;
		display: inline-block;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    -webkit-flex: 1;
	    -moz-box-flex: 1;
	    flex: 1;
	    min-width: 80px;
	    height: 100%;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    padding: 0 10px;
	    margin: 0;
	    border: 1px solid #bbb;
	    color: #333;
	    font-size: 12px;
	    border-radius: 2px;
	}
	.rc-choose-link-menu{
		color: #38f;
		font-size: 12px;
		cursor: pointer;
	}
	.rc-choose-link-menu-trigger{
		font-size: 12px;
	}
	.v-group{
		padding-top: 7px;
	}
	.v-right-txt{
		padding-top: 9rpx;
	}
	.scroll-Y {
		height: 700rpx;
	}
	.v-show-del{
		float: right;
		z-index: 100;
		margin-right: 16px;
		margin-top: -28px;
	
	}
	.image-del{
		position: absolute;
		width: 50upx;
		height: 50upx;
	}
	.v-uni-column{
		width: 100%;
		margin-left: 10px;
		margin-right: 10px;
	}
	.image-title{
		text-align: center;
		overflow: hidden;
		box-sizing: border-box;
		position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    padding: 0;
	    z-index: 10;
	    background-color: rgba(51,51,51,.8);
	    color: #fff;
	    font-size: 14px;
	    height: 30px;
	    line-height: 30px;
	}
	.image-item{
		position: relative;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		/* height: 300upx; */
		/* line-height: 300upx; */
		text-align: center;
		font-size: 36upx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		/* height: 300upx; */
		/* line-height: 300upx; */
		text-align: center;
		font-size: 36upx;
	}
	
	
	.zx-color-picker__text{
	    border: 1px solid #bbb;
	    border-radius: 2px;
	    display: inline-block;
	    outline: none;
	    padding: 5px;
	    -webkit-transition: border-color .25s;
	    -moz-transition: border-color .25s;
	    transition: border-color .25s;
	    background-color: #fff;
	    position: relative;	
	}
	.zx-color-picker__preview{
		width: 52px;
	    height: 18px;
	}
</style>