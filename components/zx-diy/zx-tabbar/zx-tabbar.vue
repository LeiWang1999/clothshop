<template>
	<view>
		<view v-for="(item,index) in tabbarData" :key="index">
			<uni-section :title="'导航'+(index+1)" type="line">
				<view class="button" :data-index="index" @click="delTabbar" v-if="index>0&&index!=tabbarData.length-1"><text class="button-text">删除</text></view>
			</uni-section>
		
			<view class="uni-flex uni-row">
				<view class="text" style="width: 150rpx;">
					<view class="title">名称</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<input class="uni-input" name="nickname" placeholder="请输入名称" maxlength="4" :data-index="index" :value="item.name" @input="setTabbarName" />
				
				</view>
				<view class="text" style="width: 30rpx;">
					<view class="title"></view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="text" style="width: 150rpx;">
					<view class="title">图片</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view  v-if="item.iconIndex==-1"  class="v-to-select-page v-img" :data-index="index" @click="toSelectIcon"><text class="t-to-select-page">选择图片</text>
					</view>
					<view v-else class="icon-wrapper" :data-index="index" @click="toSelectIcon" >
						<view v-if="item.iconIndex==0" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe6b8;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe6bb;</text>
						</view>
						<view v-if="item.iconIndex==1" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe6af;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe6b9;</text>
						</view>
						<view v-if="item.iconIndex==2" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe78b;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe78c;</text>
						</view>
						<view v-if="item.iconIndex==3" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe7c5;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7c4;</text>
						</view>
						<view v-if="item.iconIndex==4" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe7b5;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7b4;</text>
						</view>
						<view v-if="item.iconIndex==5" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe752;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe751;</text>
						</view>
						<view v-if="item.iconIndex==6" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe7c0;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7bf;</text>
						</view>
						<view v-if="item.iconIndex==7" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe708;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe707;</text>
						</view>
						<view v-if="item.iconIndex==8" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe669;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe668;</text>
						</view>
						<view v-if="item.iconIndex==9" class="icon-block" >
							<text class="i-tabbar-icons icon" >&#xe758;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe757;</text>
						</view>
						<view v-if="item.iconIndex==10" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe7c6;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe7c3;</text>
						</view>
						<view v-if="item.iconIndex==11" class="icon-block">
							<text class="i-tabbar-icons icon" >&#xe719;</text>
							<text class="i-tabbar-icons-selected icon" :style="'color:'+selectedColor">&#xe718;</text>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="text" style="width: 150rpx;">
					<view class="title">链接</view>
				</view>
				<view class="text" style="-webkit-flex: 1;flex: 1;">
					<view class="v-to-select-page" :data-index="index" @click="toSelectPage"><text v-if="item.toUrl==''||item.toUrl==null||item.toUrl.id==''" class="t-to-select-page">选择跳转到的页面</text><text
						 v-else class="t-to-select-page">{{item.toUrl.pageTitle}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt" v-if="tabbarData.length<5">
		    <button type="default" @click="addTabbar">添加导航</button>
		</view>
		<view class="uni-padding-wrap uni-common-mt" style="margin-bottom: 50px;">
		    <button type="primary" @click="saveTabbar">保  存</button>
		</view>
		<zx-page-list @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
		<zx-icon @send="setSelectIconValue" ref="zxIcon"></zx-icon>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import zxIcon from '@/components/zx-diy/zx-icon/zx-icon.vue'
	export default {
		components: {
			uniSection,
			zxPageList,
			zxIcon
		},
		data(){
			return{
				tabbarData:[],
				swipeList: [],
				ttt:0,
				mItem:"0",
				selectedColor:'#ee4444'
			}
		},
		methods:{
			showTabbarList(v){
				this.tabbarData = v;
			},
			setTabbarName(e){
				this.tabbarData[e.target.dataset.index].name = e.detail.value;
				this.$emit("changeData",this.tabbarData);
			},
			toSelectIcon(e){
				this.mItem = e.currentTarget.dataset.index;
				this.$refs.zxIcon.showIconList();
			},
			toSelectPage(e){
				this.mItem = e.currentTarget.dataset.index;
				this.$refs.zxPageList.showPageList();
			},
			toDelTabbar(){
				
			},
			setSelectPageValue(e){
				this.tabbarData[this.mItem].toUrl = e; //跳转目的地
				this.$emit("changeData",this.tabbarData);
			},
			setSelectIconValue(v){
				this.tabbarData[this.mItem].iconIndex = v
				this.$emit("changeData",this.tabbarData);
			},
			genID(length){
				return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			addTabbar(){
				let tmp1 = {
					    id: this.genID(8),
				        name: '',
				        iconIndex: -1,
						toUrl: ''
				    };
				if(this.tabbarData.length>2){
					this.tabbarData.splice(this.tabbarData.length-2,0,tmp1);
				}else{
					this.tabbarData.splice(this.tabbarData.length-1,0,tmp1);
				}
				this.$emit("changeData",this.tabbarData);
			},
			delTabbar(e){
				this.tabbarData.splice(e.currentTarget.dataset.index,1);
				this.$emit("changeData",this.tabbarData);
			},
			saveTabbar(){
				this.$emit("saveData",this.tabbarData);
			}
		}
	}
</script>

<style>

	.icon{
		font-size: 25px;
		font-family: iconfont;
		color: #666666;
	}
	.title{
		text-align: center;
		margin-top: 10rpx;
	}
	.uni-flex{
		margin-top: 10rpx;
	}
	.v-to-select-page{
		margin-top: 10rpx;
	}
	.t-to-select-page{
		color: #38f;
	}
	.button-text{
		color:#ff4444;
	}
	.i-tabbar-icons{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-size: 240px 210px;
			background-repeat: no-repeat;
			display: inline-block;
			width: 30px;
			height: 30px;
		}
		.i-tabbar-icons-selected{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-size: 240px 210px;
			background-repeat: no-repeat;
			display: inline-block;
			width: 30px;
			height: 30px;
		}
</style>
