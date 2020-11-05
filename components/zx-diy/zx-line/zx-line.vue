<template>
	<view class="zxv-design-preview-item">
		<view :class="edit?'zxv-design-preview-controller':'zxv-design-preview'" @click="comOnclick()">
			<view style="height: 30px;"><view :style="'border-top:1px '+lineData.style+' '+lineData.lineColor+';margin:0 auto;margin-left:'+lineData.margin+'rpx;margin-right:'+lineData.margin+'rpx;top:50%;position: relative;'"></view></view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
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
						<view class="text" style="width: 180rpx;"><view class="title">颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(lineData.lineColor,'lineColor')"><view class="zx-color-picker__preview" :style="'background-color: '+lineData.lineColor"></view></view>
								</view>
								<view class="tag-view" @click="lineColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">边距</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setLineMarginValue">
								<label>
									<radio value="0" :checked="(lineData.margin=='0')?true:false" /><text>无边距</text>
								</label>
								<label>
									<radio value="30" :checked="(lineData.margin=='30')?true:false" /><text>左右留白</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setLineStyleValue">
								<label>
									<radio value="solid" :checked="(lineData.style=='solid')?true:false" /><text>实线</text>
								</label>
								<label>
									<radio value="dashed" :checked="(lineData.style=='dashed')?true:false" /><text>虚线</text>
								</label>
								<label>
									<radio value="dotted" :checked="(lineData.style=='dotted')?true:false" /><text>点线</text>
								</label>
							</radio-group>
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
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	export default {
		props:["toChildData", "showState"],
		components: {
			uniPopup,
			uniTag,
			tColorPicker
		},
		created:function(){
			var that = this;
			that.lineData = that.toChildData;
		},
		data() {
			return {
				type: "",
				content: '顶部弹 popup',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				edit: false,
				lineData:{}
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
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			del(e){
				this.$emit("send",this.lineData.id);
			},
			toUp(e){
				this.$emit("up",this.lineData.id);
			},
			toDown(e){
				this.$emit("down",this.lineData.id);
			},
			setLineMarginValue(e){
				this.lineData.margin = e.detail.value;
				this.$emit("changeData",this.lineData);
			},
			setLineStyleValue(e){
				this.lineData.style = e.detail.value;
				this.$emit("changeData",this.lineData);
			},
			setLineColorValue(e){
				this.lineData.color = e.detail.value;
				this.$emit("changeData",this.lineData);
			},
			setColorInputValue(e){
				this.lineData.color = e.target.dataset.color;
				this.$emit("changeData",this.lineData);
			},
			openColorSelector(e,i) {
			    // 打开颜色选择器
			    this.$refs.colorPicker.open(e,i);
			},
			colorSelectorConfirm(e) {
				if(e.item=='lineColor'){
					this.lineData.lineColor = e.hex;
					this.$emit("changeData",this.lineData);
				}
			},
			lineColorReset(e){
				this.lineData.lineColor = '#E5E5E5';
				this.$emit("changeData",this.lineData);
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

	.zxv-design-preview-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.zxv-design-preview-controller {
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