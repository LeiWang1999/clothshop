<template>
	<view class="zx-root-preview-item">
		<view :class="edit?'zx-root-preview-controller':'zx-root-preview'" :style="'background:'+textData.backgroundColor" @click="comOnclick()">
			<view class="cap-text__content-wrap">
				<view v-if="textData.titleStyle==1"><text class="cap-text__content" :style="'display:inline-block;font-size:18px;color:'+textData.textColor">{{ textData.maintitle }}</text><text style="color:#8c8c8c;font-size: 12px;display: inline-block;margin-left: 10px;">{{textData.subtitle}}</text></view>
				<view v-if="textData.titleStyle==2"><text class="cap-text__content" :style="'display:inline-block;font-size:18px;color:'+textData.textColor">{{ textData.maintitle }}</text><view class="t-subtitle"><text>{{textData.subtitle}}</text><text class="cell-more yticon icon-you"></text></view></view>
				<view v-if="textData.titleStyle==3"><text class="cap-text__content" :style="'display:inline-block;font-size:18px;color:'+textData.textColor+';border-left: 5px solid '+textData.signColor+';padding-left:5px'">{{ textData.maintitle }}</text><text style="color:#8c8c8c;font-size: 12px;display: inline-block;margin-left: 10px;">{{textData.subtitle}}</text></view>
				<view v-if="textData.titleStyle==4"><text class="cap-text__content" :style="'display:inline-block;font-size:18px;color:'+textData.textColor+';border-left: 5px solid '+textData.signColor+';padding-left:5px'">{{ textData.maintitle }}</text><view class="t-subtitle"><text>{{textData.subtitle}}</text><text class="cell-more yticon icon-you"></text></view></view>
				<view v-if="textData.titleStyle==5" style="text-align: center;"><text class="cap-text__content" :style="'font-size:18px;color:'+textData.textColor">{{ textData.maintitle }}</text><text style="color:#8c8c8c;font-size: 12px;">{{textData.subtitle}}</text></view>
			
			</view>
				
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
						<view class="text" style="width: 180rpx;"><view class="title">标题内容</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
					<input class="uni-input" name="maintitle" placeholder="请输入标题内容" maxlength="100" :value="textData.maintitle" @input="setTextValue"/></view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">副标题</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
					<input class="uni-input" name="subtitle" placeholder="请输入副标题" maxlength="100" :value="textData.subtitle" @input="setSubtitleValue"/></view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">标题样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setTitleStyleValue">
								<label>
									<radio value="1" :checked="(textData.titleStyle=='1')?true:false" /><text>一</text>
								</label>
								<label>
									<radio value="2" :checked="(textData.titleStyle=='2')?true:false" /><text>二</text>
								</label>
								<label>
									<radio value="3" :checked="(textData.titleStyle=='3')?true:false" /><text>三</text>
								</label>
								<label>
									<radio value="4" :checked="(textData.titleStyle=='4')?true:false" /><text>四</text>
								</label>
								<label>
									<radio value="5" :checked="(textData.titleStyle=='5')?true:false" /><text>五</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="textData.titleStyle==3||textData.titleStyle==4">
						<view class="text" style="width: 180rpx;"><view class="title">标记颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(textData.signColor,'signColor')"><view class="zx-color-picker__preview" :style="'background-color: '+textData.signColor"></view></view>
								</view>
								<view class="tag-view" @click="signColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文字颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(textData.textColor,'textColor')"><view class="zx-color-picker__preview" :style="'background-color: '+textData.textColor"></view></view>
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
									<view class="zx-color-picker__text" @click="openColorSelector(textData.backgroundColor,'backgroundColor')"><view class="zx-color-picker__preview" :style="'background-color: '+textData.backgroundColor"></view></view>
								</view>
								<view class="tag-view" @click="backgroundColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">链接</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-to-select-page" @click="toSelectPage"><text v-if="textData.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{textData.toUrl.pageTitle}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<zx-page-list  @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
		<t-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></t-color-picker>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	import { navToPage } from '@/common/util/util.js'
	export default {
		props:["toChildData","showState"],
		components: {
			uniSection,
			uniPopup,
			uniIcons,
			uniTag,
			zxPageList,
			tColorPicker
		},
		created:function(){
			var that = this;
			that.textData = that.toChildData;
		},
		data() {
			return {
				type: "",
				imageDel: '/static/del.png',
				edit: false,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				textData:{}
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
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				if(!e.show){
					this.edit = false
				}
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			//更新当前组件数据 并将数据发送给父组件
			setTextValue(e){
				this.textData.maintitle = e.detail.value;
				this.$emit("changeData",this.textData);
			},
			setSubtitleValue(e){
				this.textData.subtitle = e.detail.value;
				this.$emit("changeData",this.textData);				
			},
			setTitleStyleValue(e){
				this.textData.titleStyle = e.target.value;
				this.$emit("changeData",this.textData);				
			},
			setDisplayPositionValue(e){
				this.textData.displayPosition = e.target.value;
				this.$emit("changeData",this.textData);
			},
			del(e){
				this.$emit("send",this.textData.id);
			},
			toUp(e){
				this.$emit("up",this.textData.id);
			},
			toDown(e){
				this.$emit("down",this.textData.id);
			},
			toSelectPage(e){
				// this.$emit("selectPage",this.textData.id);
				this.$refs.zxPageList.showPageList();
			},

			setSelectPageValue(e,v){
				this.textData.toUrl = e;
				this.textData.comType = v;
				this.$emit("changeData",this.textData);
			},
			openColorSelector(e,i) {
			    // 打开颜色选择器
			    this.$refs.colorPicker.open(e,i);
			},
			colorSelectorConfirm(e) {
				if(e.item=='backgroundColor'){
					this.textData.backgroundColor = e.hex;
					this.$emit("changeData",this.textData);
				}else if(e.item=='textColor'){
					this.textData.textColor = e.hex;
					this.$emit("changeData",this.textData);					
				}else if(e.item=='signColor'){
					this.textData.signColor = e.hex;
					this.$emit("changeData",this.textData);					
				}
			},
			textColorReset(e){
				this.textData.textColor = '#000000';
				this.$emit("changeData",this.textData);
			},
			backgroundColorReset(e){
				this.textData.backgroundColor = '#ffffff';
				this.$emit("changeData",this.textData);
			},
			signColorReset(e){
				this.textData.signColor = '#3399FF';
				this.$emit("changeData",this.textData);				
			},
			toUrl(i,p){
				let tmp = 'pageDiy'
				uni.navigateTo({
				    url: '/pages/index/diyPage?id='+i+'&pageTitle='+p+'&pageName='+tmp
				});
			},
			comOnclick(){
				if(this.showState==0){
					this.togglePopup('bottom', 'popup')
				}else{
					if(this.textData.toUrl.id==undefined){
						
					}else{
						// this.toUrl(this.textData.toUrl.id,this.textData.toUrl.pageTitle)
						navToPage(this.textData)
					}
				}
			}
			
		},
		onBackPress() {
			this.$refs['showpopup'].close()
			this.$refs['showtip'].close()
			this.$refs['showimage'].close()
			this.$refs['showshare'].close()
		}
	}
</script>
<style>

	.zx-root-preview-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.zx-root-preview-controller {
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
	}
	.zx-root-preview{
		position: relative;
		min-height: 10px;
	}

	.cap-text__content-wrap {
		position: relative;
		margin: 0 10px;
		padding: 10px 0;
	}

	.cap-text__content {
		font-family: initial;
		line-height: 24px;
		white-space: pre-wrap;
		word-break: break-all;
		display: block;
	}

	.v-action {
		position: relative;
		float: left;
		display: flex;
	}

	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #F4F5F6;
		padding-right: 10px;
		font-size: 14px;
	}

	.i-del {
		width: 50upx;
		height: 50upx;
	}
	
	.tag-view{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		justify-content: center;
		
	}
	
	.uni-row{
		margin-top: 20rpx;
	}
	
	.scroll-Y {
		height: 500rpx;
		width: 200rpx;
		margin-bottom: 120rpx;
		background-color: #FFFFFF;
	}
	
	.r-group{
		margin-top: 8rpx;
	}
	.v-to-select-page{
		margin-top: 8rpx;
	}
	.t-to-select-page{
		color: #38f;
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
	.cell-more {
		align-self: baseline;
		font-size: 15px;
		color: #909399;
		margin-left: 4px;
	}
	.t-subtitle{
		color:#8c8c8c;
		font-size: 15px;
		display: inline-block;
		margin-left: 10px;
		float: right;
	}
</style>
