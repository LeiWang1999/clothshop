<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" @click="comOnclick()">
			<view style="height: 420rpx;">
			<video id="myVideo" :src="blaData.url"
				 @error="videoErrorCallback"  controls=true :poster="blaData.cover" style="width:750rpx;height: 420rpx;"></video>
			</view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
				<view class="uni-form-item uni-column">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">组件操作</view></view>
						<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
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
						<view class="text" style="width: 180rpx;"><view class="title">视频来源</view></view>
						<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setTypeValue">
								<label>
									<radio value="1" :checked="(blaData.type==1)?true:false" /><text>选择视频</text>
								</label>
								<label>
									<radio value="2" :checked="(blaData.type==2)?true:false" /><text>粘贴视频地址</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title"></view></view>
						<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
							<view v-if="blaData.type==1" class="uni-uploader__input-box" >
								<view v-if="blaData.url==''" class="uni-uploader__input" @tap="toSelectVideo"></view>
								<view v-else class="has-choosed-image">
								<video id="myVideo" :src="blaData.url"
									 @error="videoErrorCallback"  controls :poster="blaData.cover" style="width:140rpx;height: 140rpx;"></video>
								<view class="modify-image" :data-index="index" @click="toSelectVideo">更换视频</view>
				
								</view>
							</view>
							<input  v-if="blaData.type==2" class="uni-input" name="maintitle" placeholder="请输入视频地址" maxlength="300" :value="blaData.url" @input="setOutUrlValue"/>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">封面图</view></view>
						<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
							<view class="uni-uploader__input-box">
								<view v-if="blaData.cover==''" class="uni-uploader__input" @tap="toSelectCover"></view>
								<view v-else class="has-choosed-image">
									<image :src="blaData.cover"  class="thumb-image"  style="width: 140rpx; height: 140rpx;"></image>
									<view class="modify-image"  @click="toSelectCover">更换图片</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	export default {
		props:["toChildData", "showState"],
		components: {
			uniPopup,
			uniTag
		},
		created:function(){
			var that = this;
			that.blaData = that.toChildData;
		},
		data() {
			return {
				type: "",
				edit: false,
				blaData:{}
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
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			setOutUrlValue(e){
				this.blaData.url = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setTypeValue(e){
				this.blaData.type = e.target.value;
				this.$emit("changeData",this.blaData);	
			},
			toSelectVideo(e){
				let that = this;
				uni.chooseVideo({
					success: (res) => {
						let filePath = res.tempFilePath
						myCloud.uploadFile(filePath, (res)=>{
							that.blaData.url = res.fileID;
							that.$emit("changeData",that.blaData);
						})
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相机或相册获取视频，请在设置界面打开相关权限',
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
			toSelectCover(e){
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
									myCloud.uploadFile(filePath, (res)=>{
										that.blaData.cover = res.fileID;
										that.$emit("changeData",that.blaData);
									})
								},
							})
				        }
				    }
				});
			},
			comOnclick() {
				if (this.showState == 0) {
					this.togglePopup('bottom', 'popup')
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
		border: 1px dashed #38f;
	}
	.v-root-preview{
		position: relative;
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
		padding-right: 10px;
		font-size: 14px;
	}
	.uni-row{
		margin-top: 20rpx;
	}
	
	.uni-uploader__input-box {
		width: 140rpx;
		height: 140rpx;
		border: 1rpx solid #D9D9D9;
		background-color: #ffffff;
		margin-left: 0px;
	}
	.v-right-lay{
		padding-top: 4px;
	}
	.has-choosed-image{
		position: relative;
	    width: 140rpx;
	    height: 140rpx;
	    text-align: center;
	}
	.modify-image{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 140rpx;
	    height: 20px;
	    line-height: 20px;
	    font-size: 12px;
	    color: #fff;
	    background: rgba(0,0,0,.5);
	    cursor: pointer;
	}
</style>