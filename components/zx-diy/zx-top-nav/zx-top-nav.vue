<template>
	<view class="v-root-preview-item"> 
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" @click="(showState==0)?togglePopup('bottom', 'popup'):''">
			<view class="tabs" id="id">
				<scroll-view v-if="blaData.scrollState==2" id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				    <view v-for="(tab,index) in blaData.pageArray" :key="tab.id" class="uni-tab-item" style="border-bottom: 3px solid #007AFF;" :id="tab.id" :data-current="index" @click="ontabtap">
				        <text v-if="tabIndex==index" class="uni-tab-item-title uni-tab-item-title-active" :style="'color:'+blaData.textSelectedColor+';border-bottom: 3px solid '+(blaData.template==1?'#ffffff':blaData.textSelectedColor)">{{tab.title}}</text>
						<text v-else class="uni-tab-item-title" :style="'color:'+blaData.textColor" >{{tab.title}}</text>
				    </view>
				</scroll-view>
				<view  v-if="blaData.scrollState==1" class="uni-flex uni-row" style="height: 80rpx;">
					<view class="flex-item" :style="'width:'+(750/blaData.pageArray.length)+'rpx'" v-for="(tab,index) in blaData.pageArray" :key="index" :data-current="index" @click="ontabtap">
						<text v-if="tabIndex==index" class="t-tab-title t-tab-title-active" :style="'color:'+blaData.textSelectedColor+';border-bottom: 3px solid '+(blaData.template==1?'#ffffff':blaData.textSelectedColor)">{{tab.title}}</text>
						<text v-else class="t-tab-title" :style="'color:'+blaData.textColor">{{tab.title}}</text>
					</view>
				</view>
				<view class="v-tab-line" v-if="blaData.scrollState==5"></view>
				<view class="line-h"></view>
				<swiper :current="tabIndex" id="tabID" class="swiper-box" :style="'flex: 1;height:'+tabHeight+'px'" :duration="300" @change="ontabchange">
				    <swiper-item class="swiper-item" v-for="(tab,index1) in blaData.pageArray" :key="index1">
						<scroll-view class="scroll-v list" :style="'height:'+tabHeight+'px'" enableBackToTop="true" scroll-y @scrolltolower="loadMore(index1)">
							<!-- <view v-for="(newsitem,index2) in tab.data" :key="newsitem.id">
								<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
							</view>
							<view class="loading-more" v-if="tab.isLoading || tab.data.length > 4">
								<text class="loading-more-text">{{tab.loadingText}}</text>
							</view> -->
							<zx-index v-if="tab.toUrl!=''" class="container" :compontentId="tab.toUrl.id" ref="zxIndex" ></zx-index>
						</scroll-view>
						
				    </swiper-item>
				</swiper>
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
						<view class="text" style="width: 180rpx;"><view class="title">样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setTemplateValue">
								<label>
									<radio value="1" :checked="(blaData.template==1)?true:false" /><text>样式一</text>
								</label>
								<label>
									<radio value="2" :checked="(blaData.template==2)?true:false" /><text>样式二</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">滑动设置</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setScrollStateValue">
								<label>
									<radio value="1" :checked="(blaData.scrollState==1)?true:false" /><text>固定</text>
								</label>
								<label>
									<radio value="2" :checked="(blaData.scrollState==2)?true:false" /><text>横向滑动</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">选中颜色</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-action">
								<view class="tag-view">
									<view class="zx-color-picker__text" @click="openColorSelector(blaData.textSelectedColor,'backgroundColor')"><view class="zx-color-picker__preview" :style="'background-color: '+blaData.textSelectedColor"></view></view>
								</view>
								<view class="tag-view" @click="textSelectedColorReset">
									<uni-tag text="重置"/>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">未选中</view></view>
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
						<view class="uni-flex uni-column v-uni-column">
							<view class="flex-item flex-item-V" v-for="(item,index) in blaData.pageArray" :key="index">
								<view class="image-del"><text class="icon" @tap="delPage(item.id)">&#xeb7e;</text></view>
								<view class="v-editor-card-item" style="" >	
										<view class="v-component-editor_subentry-item clearfix">
											<view class="subentry-item-editor-form-content">
												<view class="v-design-editor__control-group v-group">
													<label class="v-design-editor__control-group-container">
														<view class="v-design-editor__control-group-label">标题:</view>
														<view class="v-design-editor__control-group-control">
															<view class="v-input-wrapper">
															<input class="v-input" style="width:180px" name="title" :data-index="index" :value="item.title" @input="setPageTitleValue" placeholder="建议4个字以内">
															</view>
														</view>
													</label>
												</view>
												<view class="v-design-editor__control-group subentry-control-group">
													<label class="v-design-editor__control-group-container">
														<view class="v-design-editor__control-group-label">链接:</view>
														<view class="v-design-editor__control-group-control">
															<view class="rc-choose-link-menu">
																<view class="v-popover-wrapper rc-choose-link-menu-popover-wrapper" style="display: inline-block;">
																	<view class="rc-choose-link-menu-trigger" :data-index="index" @click="toSelectPage"><text v-if="item.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{item.toUrl.pageTitle}}</text></view>
																</view>
															</view>
														</view>
													</label>
												</view>
											</view>
										</view>
									</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="blaData.pageArray.length<20">
						<view class="v-rc-design" @click="addToShowPage">
								<view class="v-add-img">+ 添加一个页面导航</view>
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
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import zxIndex from '@/components/zx-diy/zx-index/zx-index.vue'
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import mediaItem from './news-item.vue';
	import { genID } from '@/common/util/util.js';
	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;
	
	export default {
		props:["toChildData","showState"],
		components: {
			uniPopup,
			uniTag,
			mediaItem,
			zxIndex,
			tColorPicker,
			zxPageList
		},
		created:function(){
			this.blaData = this.toChildData;
			setTimeout(()=>{
			  this.tabBars.forEach((tabBar) => {
			      this.newsList.push({
			          data: [],
			          isLoading: false,
			          refreshText: "",
			          loadingText: '加载更多...'
			      });
			  });
			  this.getList(0);
			  const res = uni.getSystemInfoSync();
			  // .in(this)
			  const query = uni.createSelectorQuery().in(this);
			  query.select('.tabs').boundingClientRect(data => {
			  	console.log(data)
			    this.tabHeight = res.windowHeight-data.top;
			  }).exec();
			  this.compontentId="001";
			  
			},350);
			
			
			
		},
		data() {
			return {
				compontentId:'',
				tabHeight:0,
				type: "",
				edit: false,
				blaData:{},
				newsList: [],
				cacheTab: [],
				tabIndex: 0,
				tabBars: [{
				    name: '关注',
				    id: 'guanzhu'
				}, {
				    name: '推荐',
				    id: 'tuijian'
				}, {
				    name: '体育',
				    id: 'tiyu1'
				}, {
				    name: '体育',
				    id: 'tiyu2'
				}, {
				    name: '体育',
				    id: 'tiyu3'
				}, {
				    name: '体育',
				    id: 'tiyu'
				}, {
				    name: '体育',
				    id: 'tiyu4'
				}, {
				    name: '体育',
				    id: 'tiyu5'
				}, {
				    name: '体育',
				    id: 'tiyu6'
				}, {
				    name: '体育',
				    id: 'tiyu7'
				}, {
				    name: '体育',
				    id: 'tiyu8'
				}, {
				    name: '体育',
				    id: 'tiyu9'
				}, {
				    name: '体育',
				    id: 'tiyu10'
				}, {
				    name: '体育',
				    id: 'tiyu11'
				}, {
				    name: '体育',
				    id: 'tiyu12'
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				mInputWidth:0,
				impIndex:0
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
			setBlankHeightValue(e){
				this.blaData.height = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			getList(index) {
			    let activeTab = this.newsList[index];
			    let list = [];
			    // for (let i = 1; i <= 10; i++) {
			    //     let item = Object.assign({}, newsData['data' + Math.floor(Math.random() * 5)]);
			    //     item.id = this.newGuid();
			    //     list.push(item);
			    // }
			    activeTab.data = activeTab.data.concat(list);
			},
			goDetail(e) {
			    if (this.navigateFlag) {
			        return;
			    }
			    this.navigateFlag = true;
			    uni.navigateTo({
			        url: './detail/detail?title=' + e.title
			    });
			    setTimeout(() => {
			        this.navigateFlag = false;
			    }, 200)
			},
			close(index1, index2) {
			    uni.showModal({
			        content: '是否删除本条信息？',
			        success: (res) => {
			            if (res.confirm) {
			                this.newsList[index1].data.splice(index2, 1);
			            }
			        }
			    })
			},
			loadMore(e) {
			    setTimeout(() => {
			        this.getList(this.tabIndex);
			    }, 500)
			},
			ontabtap(e) {
				if(this.showState==1){
					let index = e.target.dataset.current || e.currentTarget.dataset.current;
					this.switchTab(index);
				}
			},
			ontabchange(e) {
				if(this.showState==1){
					let index = e.target.current || e.detail.current;
					this.switchTab(index);
				}
			},
			switchTab(index) {
				if(this.showState==1){
					console.log(22222)
					console.log(index)
					console.log(this.newsList)
					if (this.newsList[index].data.length === 0) {
					    this.getList(index);
					}
								
					if (this.tabIndex === index) {
					    return;
					}
								
					// 缓存 tabId
					if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
					    let isExist = this.cacheTab.indexOf(this.tabIndex);
					    if (isExist < 0) {
					        this.cacheTab.push(this.tabIndex);
					        //console.log("cache index:: " + this.tabIndex);
					    }
					}
								
					this.tabIndex = index;
					this.scrollInto = this.tabBars[index].id;
								
					// 释放 tabId
					if (this.cacheTab.length > MAX_CACHE_PAGE) {
					    let cacheIndex = this.cacheTab[0];
					    this.clearTabData(cacheIndex);
					    this.cacheTab.splice(0, 1);
					    //console.log("remove cache index:: " + cacheIndex);
					}
				}
			},
			clearTabData(e) {
			    this.newsList[e].data.length = 0;
			    this.newsList[e].loadingText = "加载更多...";
			},
			refreshData() {},
			onpullingdown(e) {
			    var tab = this.newsList[this.tabIndex];
			    if (tab.refreshing || this.pulling) {
			        return;
			    }
			    if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			        tab.refreshFlag = true;
			        tab.refreshText = "释放立即刷新";
			    } else {
			        tab.refreshFlag = false;
			        tab.refreshText = "下拉可以刷新";
			    }
			},
			newGuid() {
			    let s4 = function() {
			        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
			    }
			    return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
			},
			
			
			setTemplateValue(e){
				this.blaData.template = e.target.value;
				this.$emit("changeData",this.blaData);
			},
			setScrollStateValue(e){
				this.blaData.scrollState = e.target.value;
				this.$emit("changeData",this.blaData);				
			},
			openColorSelector(e,i) {
			    // 打开颜色选择器
			    this.$refs.colorPicker.open(e,i);
			},
			colorSelectorConfirm(e) {
				if(e.item=='backgroundColor'){
					this.blaData.textSelectedColor = e.hex;
					this.$emit("changeData",this.blaData);
				}else if(e.item=='textColor'){
					this.blaData.textColor = e.hex;
					this.$emit("changeData",this.blaData);					
				}
			},
			textColorReset(e){
				this.blaData.textColor = '#000000';
				this.$emit("changeData",this.blaData);
			},
			textSelectedColorReset(e){
				this.blaData.textSelectedColor = '#ee4444';
				this.$emit("changeData",this.blaData);
			},
			delPage(id) {
				for(let i=0;i<this.blaData.pageArray.length;i++){
					if(id==this.blaData.pageArray[i].id){
						this.blaData.pageArray.splice(i,1);
					}
				}
				this.$emit("changeData",this.blaData);
			},
			setPageTitleValue(e){
				this.blaData.pageArray[e.currentTarget.dataset.index].title = e.detail.value;
				this.$emit("changeData",this.blaData);
			},
			toSelectPage(e){
				this.impIndex = e.currentTarget.dataset.index;
				this.$refs.zxPageList.showPageList();
			},
			setSelectPageValue(e){
				this.blaData.pageArray[this.impIndex].toUrl = e;
				this.$emit("changeData",this.blaData);
			},
			addToShowPage(e){
				let that = this;
				let tmp = {
					id: genID(),
					title: '导航',
					toUrl: ''
				}
				that.blaData.pageArray.push(tmp);
				that.$emit("changeData",that.blaData);
			},
			toUrl(){
				
			}
		}
	}
</script>
<style>

	.icon{
		font-size: 25px;
		font-family: iconfont;
		color: #ee4444;
	}
	
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
		/* padding-right: 10px; */
		font-size: 14px;
	}


    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750upx;
        height: 40px;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1upx;
        background-color: #f0f0f0;
    }
	.v-tab-line{
	    height: 3px;
	    background-color: #f44;
	}
    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 34upx;
        padding-right: 34upx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
		padding: 6px;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750upx;
    }

    .update-tips {
        position: absolute;
        left: 0;
        top: 41px;
        right: 0;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #FDDD9B;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .update-tips-text {
        font-size: 14px;
        color: #ffffff;
    }

    .refresh {
        width: 750upx;
        height: 64px;
        justify-content: center;
    }

    .refresh-view {
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
    }

	.refresh-icon {
		width: 30px;
		height: 30px;
		transition-duration: .5s;
		transition-property: transform;
		transform: rotate(0deg);
		transform-origin: 15px 15px;
	}

	.refresh-icon-active {
		transform: rotate(180deg);
	}

	.loading-icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
		color: #999999;
	}

    .loading-text {
        margin-left: 2px;
        font-size: 16px;
        color: #999999;
    }

    .loading-more {
        align-items: center;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
    }

    .loading-more-text {
        font-size: 28upx;
        color: #999;
    }
	
	.cap-image-ad__image-nav {
		text-align: center;
	}
	.cap-image-ad__image-nav .image-wrapper {
	    display: inline-block;
	    vertical-align: middle;
	}
	.cap-image-ad__image-nav .cap-image-ad__image {
	    background-size: cover;
	    background-position: 50%;
	}
	.cap-image-ad__image-nav .cap-image-ad__nav-title {
	    padding-bottom: 9px;
	    height: 33px;
	    line-height: 24px;
		text-align: center;
		font-size: 12px;
	}
	.cap-image-ad__slide {
	    width: 100%;
	    overflow-x: scroll;
	    overflow-y: hidden;
	    -webkit-overflow-scrolling: touch;
	    white-space: nowrap;
	    padding-bottom: 10px;
	    margin-bottom: -10px;
	}
	.cap-image-ad__text-nav .cap-image-ad__nav-title {
	    position: relative;
	    height: 12px;
	    line-height: 12px;
	    font-size: 12px;
	    text-align: center;
		border-right: 1px solid #e5e5e5;
	}
	
	.cap-image-ad__text-nav .text-nav-wrapper {
	    display: inline-block;
	    padding: 15px 0;
	}
	
	.v-rc-design{
		position: relative;
		background-color: #fff;
		margin-top:10px;
		padding: 10px;
		border: 1px dashed #e5e5e5;
		width: 100%;
		padding-bottom: 10px;
		margin-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
	
	}
	
	.v-add-img{
		text-align: center;
		margin: 0 auto;
		color: #38f;
	}
	
	.v-editor-card-item{
	    position: relative;
	    background-color: #fff;
		margin-top: 10px;
	    border: 1px dashed #e5e5e5;
	}
	.v-component-editor_subentry-item {
		position: relative;
		margin: 5px;
	}
	.v-common-choice-image-component {
		float: left;
		display: inline-block;
	}
	.has-choosed-image{
		position: relative;
	    width: 80px;
	    height: 80px;
	    text-align: center;
	}
	.thumb-image{
		min-height: 80px;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    vertical-align: bottom;
	    max-height: 100%;
	    height: auto;
	    width: auto;
	}
	.modify-image{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    width: 80px;
	    height: 20px;
	    line-height: 20px;
	    font-size: 12px;
	    color: #fff;
	    background: rgba(0,0,0,.5);
	    cursor: pointer;
	}
	.subentry-item-editor-form-content{
	    width: 200px;
	    margin-left: 10px;
	}
	.v-design-editor__control-group{
		margin-bottom: 10px;
	}
	.v-design-editor__control-group-container{
	    display: flex;
	    -webkit-box-align: center;
		align-items: center;
	}
	.v-design-editor__control-group-label{
	    font-size: 13px;
	    -ms-flex-negative: 0;
	    -webkit-flex-shrink: 0;
	    flex-shrink: 0;
	    text-align: right;
	    margin-right: 10px;
	}
	.v-input-wrapper{
		display: flex;
	    position: relative;
	    height: 30px;
	    max-height: 36px;
	}
	.v-input{
		outline: none;
	    border: 1px solid #38f;
		display: inline-block;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    -webkit-flex: 1;
	    -moz-box-flex: 1;
	    flex: 1;
	    min-width: 80px;
	    height: 100%;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    padding: 0 10px;
	    margin: 0;
	    border: 1px solid #bbb;
	    color: #333;
	    font-size: 12px;
	    border-radius: 2px;
		text-align: left;
	}
	.uni-input-placeholder{
		margin-top: 6px;
	}
	.rc-choose-link-menu{
		color: #38f;
		font-size: 12px;
		cursor: pointer;
	}
	.rc-choose-link-menu-trigger{
		font-size: 12px;
	}
	.v-group{
		padding-top: 7px;
	}
	.v-right-txt{
		padding-top: 9rpx;
	}
	.scroll-Y {
		height: 700rpx;
	}
	.image-del{
		float: right;
		z-index: 1011;
		position: relative;
		margin-top: -1px;
	}
	.v-uni-column{
		width: 100%;
		margin-left: 10px;
		margin-right: 10px;
	}
	.image-title{
		text-align: center;
		overflow: hidden;
		box-sizing: border-box;
		position: absolute;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    padding: 0;
	    z-index: 10;
	    background-color: rgba(51,51,51,.8);
	    color: #fff;
	    font-size: 14px;
	    height: 30px;
	    line-height: 30px;
	}
	.image-item{
		position: relative;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item {
		/* height: 300upx; */
		/* line-height: 300upx; */
		text-align: center;
		font-size: 36upx;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		/* height: 300upx; */
		/* line-height: 300upx; */
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
	.flex-item {
/* 		width: 33.3%;
		height: 80rpx; */
		text-align: center;
		line-height: 80rpx;
	}
	.t-tab-title{
		font-size: 15px;
	}
	.v-tab-line{
	    width: 53.5px;
	    transform: translateX(26.75px);
	    transition-duration: 0.3s;
		z-index: 1;
	    border-radius: 3px;
	    background-color: #f44;
	}
	.t-tab-title-active{
		padding: 6px;
	}
</style>