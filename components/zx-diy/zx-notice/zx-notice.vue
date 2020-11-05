<template>
	<view class="v-root-item">
		<view :class="edit?'v-root-edit':'v-root-edit-preview'"  @click="comOnclick()">
			<view style="height: 39px;">
				<uni-notice-bar speed="60" :show-icon="true" :scrollable="true" :single="true" :text="blaData.content" :background-color="blaData.backgroundColor" :color="blaData.textColor" />
				
			</view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
				<view class="uni-form-item uni-column">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">组件操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="up">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="down">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="del" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">公告内容</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
					<input class="uni-input" name="content" placeholder="请输入公告内容" maxlength="500" :value="blaData.content" @input="setContentValue"/></view>
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
					<view class="uni-flex uni-row" style="margin-bottom: 20px;">
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
				</view>
			</view>
		</uni-popup>
		<t-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></t-color-picker>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniNoticeBar from '@/components/uni-ui/uni-notice-bar/uni-notice-bar.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	export default {
		props:["toChildData", "showState"],
		components: {
			uniPopup,
			uniTag,
			uniNoticeBar,
			tColorPicker
		},
		created:function(){
			var that = this;
			that.blaData = that.toChildData;
		},
		data() {
			return {
				type: "",
				content: '顶部弹 popup',
				edit: false,
				blaData:{}
			}
		},
		methods: {
			togglePopup(type, open) {
				this.$data.edit = true;
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			change(e) {
				console.log('是否打开:' + e.show)
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
			setContentValue(e){
				this.blaData.content = e.detail.value;
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
				this.blaData.textColor = '#de8c17';
				this.$emit("changeData",this.blaData);
			},
			backgroundColorReset(e){
				this.blaData.backgroundColor = '#fffbe8';
				this.$emit("changeData",this.blaData);
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
	.v-root-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.v-root-edit {
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
	}
	.zxv-design-preview{
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
		padding-right: 10px;
		font-size: 14px;
	}
	.uni-row{
		margin-top: 20rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		margin-left: 10rpx;
	}
	
	.scroll-view-item {
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 36upx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 30%;
		height: 70rpx;
		line-height: 70rpx;
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