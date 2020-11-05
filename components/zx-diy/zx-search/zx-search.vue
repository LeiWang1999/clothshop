<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" @click="searchOnClick()">
			<view class="v-search-box">
				<view class="v-search-box__view" :style="'padding-right: 15px; top: 0px; background-color:'+blaData.backgroundColor">
					<view class="v-search">
						<view class="v-search__filed v-search__filed--rect" :style="'border-radius:'+blaData.borderRadius+'px;background-color: '+blaData.frameColor">
							<icon type="search" size="16" :color="blaData.textColor" :style="'margin-left:'+(blaData.textPosition=='left'?'10px':'250rpx')"/>
							<view class="v-cell v-cell--borderless v-field" style="height: 40px;">
								<view class="v-cell__value v-cell__value--alone">
									<view class="v-field__body">
										<text class="v-field__control" style="font-size: 15px;" placeholder="搜索商品" :style="'color:'+blaData.textColor" >搜索商品</text>
									</view>
								</view>
							</view>
						</view>
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
						<view class="text" style="width: 180rpx;"><view class="title">样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setBorderRadiusValue">
								<label>
									<radio value="0" :checked="(blaData.borderRadius=='0')?true:false" /><text>方形</text>
								</label>
								<label>
									<radio value="20" :checked="(blaData.borderRadius=='20')?true:false" /><text>圆形</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文本位置</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setTextPositionValue">
								<label>
									<radio value="left" :checked="(blaData.textPosition=='left')?true:false" /><text>居左</text>
								</label>
								<label>
									<radio value="center" :checked="(blaData.textPosition=='center')?true:false" /><text>居中</text>
								</label>
							</radio-group>
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
						<view class="text" style="width: 180rpx;"><view class="title">文本颜色</view></view>
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
						<view class="text" style="width: 180rpx;"><view class="title">框体颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.frameColor,'frameColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.frameColor"></view></view>
								</view>
								<view class="tag-view" @click="frameColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-for="(item,index) in blaData.hotKeyArray" :key="index">
						<text class="image-del icon" @click="toDel(index)">&#xeb7e;</text>
						<view class="v-rc-design">
							
							<view class=""><input class="zxv-input" style="width:600rpx" name="title" :data-index="index" :value="item.value" @input="setHotKeyValue" placeholder="请输入搜索热词"></view>
	
						</view>
						
					</view>
					<view class="uni-flex uni-row">
						<view class="v-rc-design" @click="addToShowKey">
								<view class="v-add-img">+ 添加一个搜索热词</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
		<t-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></t-color-picker>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	export default {
		props:["toChildData","showState"],
		components: {
			uniPopup,
			uniTag,
			tColorPicker
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
			setBorderRadiusValue(e){
				this.blaData.borderRadius =e.target.value;
				this.$emit("changeData",this.blaData);
			},
			setTextPositionValue(e){
				this.blaData.textPosition =e.target.value;
				this.$emit("changeData",this.blaData);
			},
			setHeightValue(e){
				this.blaData.height =e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setBackgroundColorValue(e){
				this.blaData.backgroundColor = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setBackgroundColorInputValue(e){
				this.blaData.backgroundColor = e.target.dataset.color;
				this.$emit("changeData",this.blaData);
			},
			setTextColorValue(e){
				this.blaData.textColor = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setTextColorInputValue(e){
				this.blaData.textColor = e.target.dataset.color;
				this.$emit("changeData",this.blaData);
			},
			setFrameColorValue(e){
				this.blaData.frameColor = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setFrameColorInputValue(e){
				this.blaData.frameColor = e.target.dataset.color;
				this.$emit("changeData",this.blaData);
			},
			searchOnClick(){
				if(this.showState==0){
					this.togglePopup('bottom', 'popup')
				}else{
					uni.navigateTo({
					    url: `/pagesI/product/list?showSearchState=1&data=${JSON.stringify(this.blaData.hotKeyArray)}`
					});
				}
				
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
				}else if(e.item=='frameColor'){
					this.blaData.frameColor = e.hex;
					this.$emit("changeData",this.blaData);					
				}
			},
			textColorReset(e){
				this.blaData.textColor = '#999999';
				this.$emit("changeData",this.blaData);
			},
			backgroundColorReset(e){
				this.blaData.backgroundColor = '#F9F9F9';
				this.$emit("changeData",this.blaData);
			},
			frameColorReset(e){
				this.blaData.frameColor = '#FFFFFF';
				this.$emit("changeData",this.blaData);
			},
			addToShowKey(e){
				let tmp = {value:''};
				this.blaData.hotKeyArray.push(tmp)
			},
			toDel(i) {
				this.blaData.hotKeyArray.splice(i,1);
				this.$emit("changeData",this.blaData);
			},
			setHotKeyValue(e){
				this.blaData.hotKeyArray[e.currentTarget.dataset.index].value = e.detail.value;
				this.$emit("changeData",this.blaData);
			}
			
		}
	}
</script>
<style scoped>

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
	
	.v-search-box {
	    width: 100%;
	}
	
	.v-search-box__view {
	    padding: 10rpx 30rpx;
	    display: flex;
	    align-items: center;
	    transition: top .3s linear;
	}
	
	.v-search {
	    display: flex;
	    align-items: center;
	    flex: 1;
	    position: relative;
	}
	.v-search__filed {
	    display: flex;
	    flex: 1;
	    align-items: center;
	    border-radius: 4px;
	}
	
	.v-search .v-cell {
	    flex: 1;
	    padding: 0 10px;
	    height: 40px;
	    background: transparent;
	}
	
	.v-cell {
	    width: 100%;
	    display: flex;
	    padding: 10px 15px;
	    line-height: 24px;
	    position: relative;
	    background-color: #fff;
	    color: #323233;
	    font-size: 14px;
	    overflow: hidden;
	}
	
	.v-search .v-cell__value {
	    display: flex;
	    align-items: center;
	}
	
	.v-cell__value--alone {
	    color: #323233;
	    text-align: left;
	}
	
	.v-cell__value {
	    color: #969799;
	    overflow: hidden;
	    text-align: left;
	    position: relative;
	    vertical-align: middle;
	}
	
	.v-cell__title, .v-cell__value {
	    flex: 1;
	}
	
	.v-search .v-field__body {
	    flex: 1;
	}
	
	.v-field__body {
	    display: flex;
	    align-items: center;
	}
	
	.v-search .v-cell__value .v-field__control {
	    background: transparent;
	}
	
	.v-field__control {
	    border: 0;
	    margin: 0;
	    padding: 0;
	    width: 100%;
	    display: block;
	    color: #323233;
	    background-color: transparent;
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
	.v-rc-design{
		position: relative;
		background-color: #fff;
		/* margin-top:10px; */
		padding: 10px;
		border: 1px dashed #e5e5e5;
		width: 100%;
		padding-bottom: 10px;
		margin-bottom: 5px;
		margin-left: 10px;
		margin-right: 10px;
	
	}
	
	.v-add-img{
		text-align: center;
		margin: 0 auto;
		color: #38f;
	}
	.image-del{
		position: absolute;
		width: 24upx;
		height: 24upx;
		margin-left: 658rpx;
		margin-top: -20rpx;
		z-index: 10;
	}
	.zxv-input{
	    border: 1px solid #C0C0C0;
		font-size: 12px;
		padding: 8px;
		padding-left: 10px;
	}
	.scroll-Y {
		height: 700rpx;
	}
</style>