<template>
	<view class="zx-text">
		<view :class="edit?'zx-text__preview-controller':'zx-text__preview'" :style="'background:'+data.backgroundColor"
		 @click="comOnclick()">
			<view class="zx-text__content-wrap">
				<text class="zx-text__content" :style="'font-size:'+data.fontSize+';color:'+data.textColor+';text-align:'+data.displayPosition+';'">{{ data.text }}</text>
			</view>
		</view>

		<uni-popup ref="showpopup" :type="type" @change="change">
			<view class="popup-content">
				<view class="uni-form-item uni-column">
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">组件操作</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view" @click="toUp">
									<uni-tag text="上移" size="small" />
								</view>
								<view class="tag-view" @click="toDown">
									<uni-tag text="下移" size="small" />
								</view>
								<view class="tag-view" @click="del">
									<uni-tag text="删除" size="small" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">文本</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<input class="uni-input" name="nickname" placeholder="请输入文本" maxlength="100" :value="data.text" @input="setTextValue" /></view>
					</view>

					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">字体大小</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setFontSizeValue">
								<label>
									<radio value="18px" :checked="(data.fontSize=='18px')?true:false" /><text>大</text>
								</label>
								<label>
									<radio value="14px" :checked="(data.fontSize=='14px')?true:false" /><text>中</text>
								</label>
								<label>
									<radio value="12px" :checked="(data.fontSize=='12px')?true:false" /><text>小</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">显示位置</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setDisplayPositionValue">
								<label>
									<radio value="left" :checked="(data.displayPosition=='left')?true:false" /><text>居左</text>
								</label>
								<label>
									<radio value="center" :checked="(data.displayPosition=='center')?true:false" /><text>居中</text>
								</label>
								<label>
									<radio value="right" :checked="(data.displayPosition=='right')?true:false" /><text>居右</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">文字颜色</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(data.textColor,'textColor')">
										<view class="zx-color-picker__preview" :style="'background-color: '+data.textColor"></view>
									</view>
								</view>
								<view class="tag-view" @click="textColorReset">
									<uni-tag text="重置" />
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">背景颜色</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(data.backgroundColor,'backgroundColor')">
										<view class="zx-color-picker__preview" :style="'background-color: '+data.backgroundColor"></view>
									</view>
								</view>
								<view class="tag-view" @click="backgroundColorReset">
									<uni-tag text="重置" />
								</view>
							</view>
						</view>
					</view>

					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;">
							<view class="title">链接</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-to-select-page" @click="toSelectPage">
								<text v-if="data.toUrl==''" class="t-to-select-page">选择跳转到的页面</text>
								<text v-else class="t-to-select-page">{{data.toUrl.pageTitle}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<zx-page-list @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
		<zx-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></zx-color-picker>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import zxColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	import {
		navToPage
	} from '@/common/util/util.js'
	export default {
		props: ["childData", "showState"],
		components: {
			uniSection,
			uniPopup,
			uniIcons,
			uniTag,
			zxPageList,
			zxColorPicker
		},
		created: function() {
			console.log(123123123)
			this.data = this.childData
		},
		data() {
			return {
				type: "",
				content: '顶部弹 popup',
				imageDel: '/static/del.png',
				edit: false,
				data:{},
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		methods: {

			togglePopup(type, open) {
				console.log(this.data.id)
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
				if (!e.show) {
					this.edit = false
				}
			},
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			setTextValue(e) {
				this.data.text = e.detail.value;
				this.$emit("changeData", this.data);
			},
			setTitleStyleValue(e) {
				this.data.titleStyle = e.target.value;
				this.$emit("changeData", this.data);
			},
			setFontSizeValue(e) {
				this.data.fontSize = e.target.value;
				this.$emit("changeData", this.data);
			},
			del(e) {
				this.$emit("send", this.data.id);
			},
			toUp(e) {
				console.log(this.data.id)
				this.$emit("up", this.data.id);
			},
			toDown(e) {
				console.log(this.data.id)
				this.$emit("down", this.data.id);
			},
			toSelectPage(e) {
				// this.$emit("selectPage",this.data.id);
				this.$refs.zxPageList.showPageList();
			},
			setDisplayPositionValue(e) {
				this.data.displayPosition = e.target.value;
				this.$emit("changeData", this.data);
			},
			setSelectPageValue(e, v) {
				this.data.toUrl = e;
				this.data.comType = v;
				this.$emit("changeData", this.data);
			},
			openColorSelector(e, i) {
				// 打开颜色选择器
				this.$refs.colorPicker.open(e, i);
			},
			colorSelectorConfirm(e) {
				if (e.item == 'backgroundColor') {
					this.data.backgroundColor = e.hex;
					this.$emit("changeData", this.data);
				} else if (e.item == 'textColor') {
					this.data.textColor = e.hex;
					this.$emit("changeData", this.data);
				}
			},
			textColorReset(e) {
				this.data.textColor = '#333333';
				this.$emit("changeData", this.data);
			},
			backgroundColorReset(e) {
				this.data.backgroundColor = '#ffffff';
				this.$emit("changeData", this.data);
			},
			toUrl(i, p) {
				let tmp = 'pageDiy'
				uni.navigateTo({
					url: '/pages/index/diyPage?id=' + i + '&pageTitle=' + p + '&pageName=' + tmp
				});
			},
			comOnclick() {
				if (this.showState == 0) {
					this.togglePopup('bottom', 'popup')
				} else {
					if (this.data.toUrl.id == undefined) {

					} else {
						navToPage(this.data)
						// this.toUrl(this.data.toUrl.id,this.data.toUrl.pageTitle)
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.zx-text {
		position: relative;
		background-color: #FFFFFF;

		.zx-text__preview-controller {
			position: relative;
			min-height: 10px;
			border: 1px dashed #38f;
		}

		.zx-text__preview {
			position: relative;
			min-height: 10px;
		}

		.zx-text__content-wrap {
			position: relative;
			margin: 0 10px;
			padding: 10px 0;
		}

		.zx-text__content {
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

		.tag-view {
			/* #ifndef APP-PLUS-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			margin-right: 10rpx;
			justify-content: center;

		}

		.uni-row {
			margin-top: 20rpx;
		}

		.scroll-Y {
			height: 500rpx;
			width: 200rpx;
			margin-bottom: 120rpx;
			background-color: #FFFFFF;
		}

		.r-group {
			margin-top: 8rpx;
		}

		.v-to-select-page {
			margin-top: 8rpx;
		}

		.t-to-select-page {
			color: #38f;
		}

		.zx-color-picker__text {
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

		.zx-color-picker__preview {
			width: 52px;
			height: 18px;
		}
	}
</style>
