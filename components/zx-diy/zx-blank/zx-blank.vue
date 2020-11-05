<template>
	<view class="zx-blank">
		<view :class="edit?'zx-blank__preview-controller':'zx-blank__preview'" @click="comOnclick()">
			<view :style="'height:'+blaData.height+'px'"></view>
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
							<view class="title">空白高度</view>
						</view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="blaData.height" max='100' min="0" show-value @change="setBlankHeightValue"></slider>
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
	export default {
		props: ["toChildData", "showState"],
		components: {
			uniPopup,
			uniTag
		},
		created: function() {
			var that = this;
			that.blaData = that.toChildData;
		},
		data() {
			return {
				type: "",
				edit: false,
				blaData: {}
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
				if (!e.show) {
					this.edit = false
				}
			},
			del(e) {
				this.$emit("send", this.blaData.id);
			},
			toUp(e) {
				this.$emit("up", this.blaData.id);
			},
			toDown(e) {
				this.$emit("down", this.blaData.id);
			},
			setBlankHeightValue(e) {
				this.blaData.height = e.detail.value;
				this.$emit("changeData", this.blaData);
			},
			comOnclick() {
				if (this.showState == 0) {
					this.togglePopup('bottom', 'popup')
				} 
			}
		}
	}
</script>
<style lang="scss">
	.zx-blank {
		position: relative;
		background-color: #FFFFFF;

		.zx-blank__preview-controller {
			position: relative;
			min-height: 10px;
			border: 1px dashed #38f;
		}

		.zx-blank__preview {
			position: relative;
			min-height: 10px;
		}

		.v-action {
			position: relative;
			float: left;
			display: flex;
		}

		.tag-view {
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

		.uni-row {
			margin-top: 20rpx;
		}
	}
</style>
