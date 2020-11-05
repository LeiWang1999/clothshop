<template>
	<view>
		<zx-tabbar v-if="PageCur=='首页'" @send="getSonValue" @changeData="changeData" @saveData="saveData" ref="zxTabbar"></zx-tabbar>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" v-for="(item,index) in tabbarData" :key="index" :data-cur="item.name">
				<view class='cuIcon-cu-image'>
					<view class="i-tabbar-icon2" v-if="item.iconIndex==-1"></view>
					<view v-if="item.iconIndex==0" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe6b8;</text>
					</view>
					<view v-if="item.iconIndex==1" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe6af;</text>
					</view>
					<view v-if="item.iconIndex==2" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe78b;</text>
					</view>
					<view v-if="item.iconIndex==3" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe7c5;</text>
					</view>
					<view v-if="item.iconIndex==4" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe7b5;</text>
					</view>
					<view v-if="item.iconIndex==5" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe752;</text>
					</view>
					<view v-if="item.iconIndex==6" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe7c0;</text>
					</view>
					<view v-if="item.iconIndex==7" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe708;</text>
					</view>
					<view v-if="item.iconIndex==8" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe669;</text>
					</view>
					<view v-if="item.iconIndex==9" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe758;</text>
					</view>
					<view v-if="item.iconIndex==10" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe7c6;</text>
					</view>
					<view v-if="item.iconIndex==11" class="icon-block">
						<text class="i-tabbar-icons icon">&#xe719;</text>
					</view>
				</view>
				<view class="text-gray">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import zxTabbar from '@/components/zx-diy/zx-tabbar/zx-tabbar.vue'
	import myCloud from '@/common/util/cloud.js'
	import myConst from '@/common/util/const.js'
	import myUtil from '@/common/util/util.js'
	import { getData,editData } from '@/common/api/tabbar.js'
	export default {
		components: {
			zxTabbar
		},
		data() {
			return {
				PageCur: '首页',
				tabbarData: [],
				id:0
			}
		},
		onLoad() {


		},
		onShow() {

		},
		onReady() {
			this.getData();

		},
		methods: {
			async getData() {
				const req = {
				}
				const res = await getData(req)
				if (res.length >= 1){
					this.tabbarData = res[0].data;
					this.id = res[0]._id;
				}
					
				this.$refs.zxTabbar.showTabbarList(this.tabbarData);
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			},
			genID(length) {
				return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
			},
			test() {
				this.$refs.zxTabbar.test();
			},
			//更新data 数据由子组件提供
			changeData(e) {
				this.tabbarData = e;
			},
			async saveData(e) {
				var that = this;
				const data = {
					id: that.id,
					tabbarData: that.$data.tabbarData,
					updatetime: myUtil.timestamp()
				}
				const res = await editData(data)
				uni.showToast({
					title: '提交成功',
					success: () => {
						uni.navigateBack()
					}
				});
			}
		}
	}
</script>

<style>
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}

	.icon {
		font-size: 25px;
		font-family: iconfont;
		color: #666666;
	}

	.cu-bar.tabbar.shadow {
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.cu-bar.tabbar {
		padding: 0;
		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	}

	.cu-bar.foot {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1024;
		box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	.cu-bar {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		position: relative;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 100rpx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		line-height: 1;
	}

	.cu-bar.tabbar .action {
		font-size: 22rpx;
		position: relative;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		text-align: center;
		padding: 0;
		display: block;
		height: auto;
		line-height: 1;
		margin: 0;
		background-color: inherit;
		overflow: initial;

	}

	/* .cu-bar .action: first-child {
		margin-left: 30rpx;
		font-size: 30rpx;
	} */
	.cu-bar .action {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		height: 100%;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		max-width: 100%;
	}

	.cu-bar.tabbar .action .cuIcon-cu-image {
		margin: 0 auto;
		line-height: 1;
		margin-top: -6px;
	}

	.cu-bar.tabbar .action [class*="cuIcon-"] {
		width: 100rpx;
		position: relative;
		display: block;
		height: auto;
		/* margin: 0 auto 10rpx; */
		text-align: center;
		font-size: 40rpx;

	}

	.cu-bar .action>text[class*="cuIcon-"],
	.cu-bar .action>view[class*="cuIcon-"] {
		font-size: 36rpx;

	}

	[class*="cuIcon-"] {
		font-family: "cuIcon";
		font-size: inherit;
		font-style: normal;

	}

	.cu-bar.tabbar .action .cuIcon-cu-image image {
		width: 50rpx;
		height: 50rpx;
		display: inline-block;

	}

	image {
		max-width: 100%;
		display: inline-block;
		position: relative;
		z-index: 0;

	}

	.text-red {
		color: rgb(255, 68, 68);
		line-height: 1;
	}

	.text-gray {
		line-height: 1;
	}

	.i-tabbar-icon {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url(https://b.yzcdn.cn/public_files/2019/08/07/47d548494fa5556abbb2b0656831b6df.png);
		/* background-position: -120px 0; */
		background-size: 240px 210px;
		background-repeat: no-repeat;
		display: inline-block;
		width: 30px;
		height: 30px;
	}

	.i-tabbar-icon-selected {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-image: url(https://b.yzcdn.cn/public_files/2019/08/07/47d548494fa5556abbb2b0656831b6df.png);
		/* 		background-position: 0 0; */
		background-size: 240px 210px;
		background-repeat: no-repeat;
		display: inline-block;
		width: 30px;
		height: 30px;
	}

	.uni-input {
		padding: 0rpx 25rpx;
	}
	
	.icon-block{
		line-height: 1.2;
	}
</style>
