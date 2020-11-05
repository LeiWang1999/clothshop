<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" >
			<view :style="'width: '+blaData.width+'rpx;height: '+blaData.height+'rpx;background-color:'+blaData.backgroundColor+';margin:0 auto;text-align:center'">
				<view v-for="(item,index) in blaData.panelData" :key="index" :style="'position:absolute;left:'+item.positionX+'rpx;top:'+item.positionY+'rpx'">
					<text v-if="item.name=='text'" :class="item.edit?'v-border':'v-border-n'" :style="'font-size:'+item.fontSize+'rpx;color:'+item.fontColor+';font-weight:'+item.fontWeight" @click="showElementEdit(index)">{{item.value}}</text>
					<image v-if="item.name=='image'" :class="item.edit?'v-border':'v-border-n'" :src="item.imgUrl" :style="'width:'+item.width+'px;height:'+item.height+'px;border-raduis:'+item.borderRadius+'px;opacity:'+item.opacity" @click="showElementEdit(index)"></image>
					<view v-if="item.name=='view'" :class="item.edit?'v-border':'v-border-n'" :style="'width:'+item.width+'px;height:'+item.height+'px;background-color:'+item.backgroundColor+';border-radius:'+item.borderRadius+'px;opacity:'+item.opacity" @click="showElementEdit(index)"></view>
				</view>
			</view>		
		</view>
		<uni-tag v-if="showState==0" text="编辑面板" size="small" style="position: absolute;top:0;right:0;" @click="togglePopup('bottom', 'popup')" />

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
						<view class="text" style="width: 180rpx;"><view class="title">添加组件</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toAddText">
									<uni-tag text="文本" size="small" />
								</view>
								<view class="tag-view" @click="toAddImage">
									<uni-tag text="图片" size="small" />
								</view>
								<view class="tag-view" @click="toAddView">
									<uni-tag text="图层" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">高度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.height" max='1000' min="1" show-value @change="setBlankHeightValue"></slider>
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
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showpopuptext" :type="type" @change="change2">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="uni-form-item uni-column" v-if="curIndex>=0">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文本操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toZjUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toZjDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="delZj" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文本内容</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<input class="uni-input" name="nickname" placeholder="请输入文本" maxlength="100" :value="blaData.panelData[curIndex].value" @input="setTextValue"/>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">横向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionX" :max="750" :min="0" @change="setPositionXValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionX" @change="setPositionXSliderValue" min="0" max="750" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">纵向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionY" :max='blaData.height' :min="0" @change="setPositionYValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionY" @change="setPositionYSliderValue" min="0" :max='blaData.height' />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">字体大小</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :value="blaData.panelData[curIndex].fontSize" @change="setTextFontSizeValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">字体加粗</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<switch :checked="(blaData.panelData[curIndex].fontWeight=='normal'?false:true)" @change="setTextFontWeight" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">字体颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.panelData[curIndex].fontColor,'fontColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.panelData[curIndex].fontColor"></view></view>
								</view>
								<view class="tag-view" @click="setTextFontColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">链接</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-to-select-page" @click="toSelectPage"><text v-if="blaData.panelData[curIndex].toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{blaData.panelData[curIndex].toUrl.pageTitle}}</text></view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>	
		<uni-popup ref="showpopupimage" :type="type" @change="change2">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="uni-form-item uni-column" v-if="curIndex>=0">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图片操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toZjUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toZjDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="delZj" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图片</view></view>
						<view class="text v-right-lay" style="-webkit-flex: 1;flex: 1;">
							<view class="uni-uploader__input-box">
								<view v-if="blaData.panelData[curIndex].imgUrl==imgUrl" class="uni-uploader__input" @tap="setImageSelected"></view>
								<view v-else class="has-choosed-image">
									<image :src="blaData.panelData[curIndex].imgUrl"  class="thumb-image"  style="width: 140rpx; height: 140rpx;"></image>
									<view class="modify-image"  @click="setImageSelected">更换图片</view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">横向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionX" :max="750" :min="0" @change="setPositionXValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionX" @change="setPositionXSliderValue" min="0" max="750" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">纵向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionY" :max='blaData.height' :min="0" @change="setPositionYValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionY" @change="setPositionYSliderValue" min="0" :max='blaData.height' />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">宽度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :min="1" :max="750" :value="blaData.panelData[curIndex].width" @change="setWidthValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">高度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :min="1" :max="blaData.height" :value="blaData.panelData[curIndex].height" @change="setHeightValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">圆角</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :value="blaData.panelData[curIndex].borderRadius" @change="setBorderRadiusValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">透明度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :value="blaData.panelData[curIndex].opacity" :step="0.1" :max='1' :min="0" @change="setOpacityValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">链接</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-to-select-page" @click="toSelectPage"><text v-if="blaData.panelData[curIndex].toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{blaData.panelData[curIndex].toUrl.pageTitle}}</text></view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="showpopupview" :type="type" @change="change2">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-Y">
				<view class="uni-form-item uni-column" v-if="curIndex>=0">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图层操作</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toZjUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toZjDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="delZj" >
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">背景颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.panelData[curIndex].backgroundColor,'viewColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.panelData[curIndex].backgroundColor"></view></view>
								</view>
								<view class="tag-view" @click="setViewColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">横向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionX" :max="750" :min="0" @change="setPositionXValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionX" @change="setPositionXSliderValue" min="0" max="750" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">纵向移动</view></view>
						<view class="text" style="width: 120px;">
							<uni-number-box :value="blaData.panelData[curIndex].positionY" :max='blaData.height' :min="0" @change="setPositionYValue" />
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.panelData[curIndex].positionY" @change="setPositionYSliderValue" min="0" :max='blaData.height' />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">宽度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :min="1" :max="750" :value="blaData.panelData[curIndex].width" @change="setWidthValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">高度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :min="1" :max="blaData.height" :value="blaData.panelData[curIndex].height" @change="setHeightValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">圆角</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :value="blaData.panelData[curIndex].borderRadius" @change="setBorderRadiusValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">透明度</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<uni-number-box :value="blaData.panelData[curIndex].opacity" :step="0.1" :max='1' :min="0" @change="setOpacityValue" />
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">链接</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-to-select-page" @click="toSelectPage"><text v-if="blaData.panelData[curIndex].toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{blaData.panelData[curIndex].toUrl.pageTitle}}</text></view>
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
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue';
	import { formatTime,genID,navToPage } from '@/common/util/util.js';
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { addData } from '@/common/api/source.js'
	export default {
		props:["toChildData","showState"],
		components: {
			zxPageList,
			uniNumberBox,
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
				blaData:{},
				curIndex:-1,
				imgUrl:'/static/img/pro-img-default.jpg'
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
			togglePopupZj(type, open) {
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
			change2(e) {
				if(!e.show){
					this.blaData.panelData[this.curIndex].edit = false
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
			delZj(e){
				this.blaData.panelData.splice(this.curIndex,1)
				this.$emit("changeData",this.blaData);
			},
			toZjUp(e){
				if(this.curIndex==this.blaData.panelData.length-1){
					
				}else{
					if(this.blaData.panelData.length>1){
						this.blaData.panelData[this.curIndex] = this.blaData.panelData.splice(this.curIndex+1, 1, this.blaData.panelData[this.curIndex])[0]
						this.curIndex=this.curIndex+1;
						this.$emit("changeData",this.blaData);
					}
				}
			},
			toZjDown(e){
				if(this.curIndex==0){
					
				}else{
					if(this.blaData.panelData.length>1){
						this.blaData.panelData[this.curIndex] = this.blaData.panelData.splice(this.curIndex-1, 1, this.blaData.panelData[this.curIndex])[0]
						this.curIndex=this.curIndex-1;
						this.$emit("changeData",this.blaData);
					}
				}
			},
			setBlankHeightValue(e){
				this.blaData.height = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			backgroundColorReset(e){
				this.blaData.backgroundColor = '#ffffff';
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
				}else if(e.item=='fontColor'){
					this.blaData.panelData[this.curIndex].fontColor = e.hex;
					this.$emit("changeData",this.blaData);					
				}else if(e.item=='viewColor'){
					this.blaData.panelData[this.curIndex].backgroundColor = e.hex;
					this.$emit("changeData",this.blaData);	
				}
			},
			toAddText(){
				let tmp = {
						id: genID(8),
				        name: 'text',
						value: '文本',
						positionX:0,
						positionY:0,
						fontColor:'#666666',
						fontWeight:'normal',
						fontSize:30,
						edit:false,
						toUrl:''
				    };
				this.blaData.panelData.push(tmp)
				this.$emit("changeData",this.blaData);
			},
			toAddImage(){
				let tmp = {
						id: genID(8),
				        name: 'image',
						height:100,
						width:100,
						positionX:0,
						positionY:0,
						borderRadius:0,
						opacity:1,
						imgUrl:this.imgUrl,
						edit:false,
						toUrl:''
				    };
				this.blaData.panelData.push(tmp)
				this.$emit("changeData",this.blaData);
			},
			toAddView(){
				let tmp = {
						id: genID(8),
				        name: 'view',
						height:100,
						width:100,
						positionX:0,
						positionY:0,
						borderRadius:0,
						backgroundColor:'#f0f0f0',
						opacity:1,
						edit:false,
						toUrl:''
				    };
				this.blaData.panelData.push(tmp)
				this.$emit("changeData",this.blaData);
			},
			showElementEdit(index){
				if(this.showState==0){
					this.curIndex = index;
					this.blaData.panelData[index].edit = true
					this.togglePopupZj('bottom', 'popup'+this.blaData.panelData[index].name);
				}else{
					if(this.blaData.panelData[index].toUrl!="")
						navToPage(this.blaData.panelData[index])
						// this.toUrl(this.blaData.panelData[index].toUrl.id,this.blaData.panelData[index].toUrl.pageTitle)
				}
			},
			setTextValue(e){
				this.blaData.panelData[this.curIndex].value = e.detail.value;
				this.$emit("changeData",this.blaData);					
			},
			setTextFontSizeValue(v){
				this.blaData.panelData[this.curIndex].fontSize = v;
				this.$emit("changeData",this.blaData);					
			},
			setTextFontWeight(e){
				if(e.detail.value){
					this.blaData.panelData[this.curIndex].fontWeight = 'bold';
				}else{
					this.blaData.panelData[this.curIndex].fontWeight = 'normal';
				}
				this.$emit("changeData",this.blaData);	
			},
			setTextFontColorReset(){
				this.blaData.panelData[this.curIndex].fontColor = '#f0f0f0';
				this.$emit("changeData",this.blaData);
			},
			setViewColorReset(){
				this.blaData.panelData[this.curIndex].backgroundColor = '#f0f0f0';
				this.$emit("changeData",this.blaData);
			},
			setPositionXValue(v){
				this.blaData.panelData[this.curIndex].positionX = v;
				this.$emit("changeData",this.blaData);
			},
			setPositionXSliderValue(e){
				this.blaData.panelData[this.curIndex].positionX = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			setPositionYValue(v){
				this.blaData.panelData[this.curIndex].positionY = v;
				this.$emit("changeData",this.blaData);
			},
			setPositionYSliderValue(e){
				this.blaData.panelData[this.curIndex].positionY = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			async addDataReq(req){
				const data = await addData(req)
			},
			async setImageSelected(e){
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
													that.blaData.panelData[that.curIndex].imgUrl = res.fileID;
													that.$emit("changeData",that.blaData);
													const req = {
														type:1,
														url:res.fileID,
														groupId:'001',
														height:mHeight,
														updatetime:new Date().getTime()
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
									that.blaData.panelData[that.curIndex].imgUrl =data.msg[0].url;
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
			setWidthValue(v){
				this.blaData.panelData[this.curIndex].width = v;
				this.$emit("changeData",this.blaData);					
			},
			setHeightValue(v){
				this.blaData.panelData[this.curIndex].height = v;
				this.$emit("changeData",this.blaData);					
			},
			setBorderRadiusValue(v){
				this.blaData.panelData[this.curIndex].borderRadius = v;
				this.$emit("changeData",this.blaData);					
			},
			setOpacityValue(v){
				this.blaData.panelData[this.curIndex].opacity = v;
				this.$emit("changeData",this.blaData);
			},
			setSelectPageValue(e){
				this.blaData.panelData[this.curIndex].toUrl = e;
				this.$emit("changeData",this.blaData);
			},
			toSelectPage(e){
				this.$refs.zxPageList.showPageList();
			},
			toUrl(i,p){
				let tmp = 'pageDiy'
				uni.navigateTo({
				    url: '/pages/index/diy?id='+i+'&pageTitle='+p+'&pageName='+tmp
				});
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
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		justify-content: center;
		
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
	
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: auto;
		width: auto;
		/* background-color: #007AFF; */
	}
	
	movable-area {
		overflow: hidden;
	}
	
	.max {
		width:500upx;
		height: 500upx;
	}
	
	.del-icon{
		position: absolute;
	}
	.icon{
		font-size: 25px;
		font-family: iconfont;
		color: #ee4444;
	}
	.v-border{
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
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
	.has-choosed-image{
		position: relative;
	    width: 140rpx;
	    height: 140rpx;
	    text-align: center;
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
	.v-to-select-page{
		margin-top: 8rpx;
	}
	.t-to-select-page{
		color: #38f;
	}
	.scroll-Y {
		height: 700rpx;
	}
	.uni-input{
		margin-right: 15px;
	}
</style>