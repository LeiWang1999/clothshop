<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" @click="(showState==0)?togglePopup('bottom', 'popup'):toUrl()">
			<view class="content" :style="'height:'+tabHeight+'px'" id="tabID">
				<scroll-view scroll-y class="left-aside" :style="'height:'+tabHeight+'px'">
					<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="showState==0?'':tabtap(item)" >
						{{item.className}}
					</view>
				</scroll-view>
				<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop" :style="'height:'+tabHeight+'px'">
					<view v-if="blaData.template==1" v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
						<text class="s-item">{{item.className}}</text>
						<view class="t-list">
							<view @click="showState==0?'':navToProDetail(item.id, titem.id)" v-if="titem.pid === item.id" class="uni-flex uni-row" style="margin-bottom: 10px;" v-for="titem in tlist" :key="titem.id">
								<view class="uni-flex" style="width: 180rpx;height: 180rpx;padding-right: 20rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
									<image :src="titem.picture" style="width: 180rpx;height: 180rpx;"></image>
								</view>
								<view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;">
									<text class="pro-title">{{titem.className}}</text>
									<view class="uni-flex uni-row" style="height: 24px;width: 300rpx;margin-bottom: 5px;">
										<view style="-webkit-flex: 1;flex: 1;"><view style="color: rgb(255, 68, 68);width:100%;"><text class="price-tag">¥</text><text style="font-size: 18px;">{{titem.price}}</text></view></view>
										<view style="width: 24px;"><text class="t-buy-btn icon">&#xe664;</text></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="blaData.template==2" v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
						<text class="s-item">{{item.className}}</text>
						<view class="t-list">
							<view v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id" @click="showState==0?'':navToList(titem)" >
								<image :src="titem.picture"></image>
								<text>{{titem.className}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
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
						<view class="text" style="width: 180rpx;"><view class="title">分类级别</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<radio-group name="gender" class="r-group" @change="setTemplateValue">
								<label>
									<radio value="1" :checked="(blaData.template==1)?true:false" /><text>一级分类</text>
								</label>
								<label>
									<radio value="2" :checked="(blaData.template==2)?true:false" /><text>二级分类</text>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="blaData.template==1">
						<view class="uni-flex uni-column v-uni-column">
							<view class="flex-item flex-item-V" v-for="(item,index) in blaData.proArray" :key="index">
								<view class="image-del"><text class="icon" @tap="delGroupPage(item.id)">&#xeb7e;</text></view>
								<view class="v-editor-card-item" style="" >	
										<view class="v-component-editor_subentry-item clearfix">
											<view class="subentry-item-editor-form-content">
												<view class="v-design-editor__control-group subentry-control-group">
													<label class="v-design-editor__control-group-container">
														<view class="v-design-editor__control-group-label">商品来源:</view>
														<view class="v-design-editor__control-group-control">
															<view class="rc-choose-link-menu">
																<view class="v-popover-wrapper rc-choose-link-menu-popover-wrapper" style="display: inline-block;">
																	<view class="rc-choose-link-menu-trigger" :data-index="index" @click="toSelectPage"><text v-if="item.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{item.className}}</text></view>
																</view>
															</view>
														</view>
													</label>
												</view>
												<view class="v-design-editor__control-group v-group">
													<label class="v-design-editor__control-group-container">
														<view class="v-design-editor__control-group-label">菜单名称:</view>
														<view class="v-design-editor__control-group-control">
															<view class="v-input-wrapper">
															<input class="v-input" style="width:180px" name="title" :data-index="index" :value="item.menuName" @input="setPageTitleValue" placeholder="建议4个字以内">
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
					<view class="uni-flex uni-row" v-if="blaData.template==1">
						<view class="v-rc-design" @click="toSelectProductGroup">
								<view class="v-add-img">+ 添加一个商品分组</view>
						</view>
					</view>
					
					<view class="uni-flex uni-row" v-if="blaData.template==2" v-for="(item,index) in blaData.proGroupArray" :key="index">
						<view class="v-cz-content">	
							<view class="image-del"  style="margin-top: -10px;"><text class="icon" @tap="delGroupZPage(index)">&#xeb7e;</text></view>
							<view class="v-design-editor__control-group v-group" style="margin-left: 10px;margin-top: 5px;">
								<label class="v-design-editor__control-group-container">
									<view class="v-design-editor__control-group-label">主分类名称:</view>
									<view class="v-design-editor__control-group-control">
										<view class="v-input-wrapper">
										<input class="v-input" style="width:180px" name="title" :value="item.className" :data-index="index" @input="setZTitleValue" placeholder="建议4个字以内">
										</view>
									</view>
								</label>
							</view>
							<view class="v-cz-nav" v-for="(item2,index2) in blaData.proGroupArray[index].childArray" :key="index2">
								<view class="v-cz-item-content">
									<view class="image-del" style="margin-right: -10px;margin-top: -20px;"><text class="icon" @tap="delGroupCPage(index,index2)">&#xeb7e;</text></view>
									<view class="has-choosed-image">
										<image  :src="item2.imgUrl"  class="thumb-image"  style="width: 80px; height: 80px;"></image>
										<view class="modify-image" @click="updateImg(index,index2)">更换图片</view>
									</view>
									<view class="v-cz-editor">
										<view class="v-design-editor__control-group v-group">
											<label class="v-design-editor__control-group-container">
												<view class="v-design-editor__control-group-label">子分类名称:</view>
												<view class="v-design-editor__control-group-control">
													<view class="v-input-wrapper">
													<input class="v-input" style="width:130px" name="title"  :value="item2.title" :data-index="index" :data-index2="index2" @input="setImgTitleValue"  placeholder="建议4个字以内">
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
															<view class="rc-choose-link-menu-trigger" @click="toSelectChildPage(index,index2)"><text v-if="item2.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{item2.toUrl.pageTitle}}</text></view>
														</view>
													</view>
												</view>
											</label>
										</view>
									</view>
								</view>
							</view>
							<view class="v-rc-design-c" @click="addProClassifyC(index)">
									<view class="v-add-img">+ 添加一个商品子分类</view>
							</view>
						</view>
					</view>

					
					<view class="uni-flex uni-row" v-if="blaData.template==2">
						<view class="v-rc-design" @click="addProClassifyZ">
								<view class="v-add-img">+ 添加一个商品主分类</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
		<zx-product-group  @send="setSelectProGroupValue" ref="zxProductGroup"></zx-product-group>
		<zx-page-list  @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import zxProductGroup from '@/components/zx-diy/zx-product-group/zx-product-group.vue';
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime,genID,navToPage } from '@/common/util/util.js';
	import { getData } from '@/common/api/goods.js'
	export default {
		props:["toChildData","showState"],
		components: {
			uniPopup,
			uniTag,
			zxProductGroup,
			zxPageList
		},
		created:function(){
			var that = this;
			that.blaData = that.toChildData;
			setTimeout(()=>{
			  const res = uni.getSystemInfoSync();
			  const query = uni.createSelectorQuery().in(that);
			  query.select('.content').boundingClientRect(data => {
			    that.tabHeight = res.windowHeight-data.top;
			  }).exec();
			  that.loadData();
			  
			},350);
			
		},
		data() {
			return {
				type: "",
				edit: false,
				blaData:{},
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
				tabHeight:0,
				impIndex:-1,
				impIndexC:-1,
				tmpIndex:-1
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
			loadData(){
				let list = [];
				// list.forEach(item=>{
				// 	if(!item.pid){
				// 		this.flist.push(item);  //pid为父级id, 没有pid或者pid=0是一级分类
				// 	}else if(!item.picture){
				// 		this.slist.push(item); //没有图的是2级分类
				// 	}else{
				// 		this.tlist.push(item); //3级分类
				// 	}
				// }) 
				if(this.blaData.template==1){
					this.flist=[];
					this.slist=[];
					this.tlist=[];
					for(var i=0;i<this.blaData.proArray.length;i++){
						let ftmp = {id:this.blaData.proArray[i].id,className:this.blaData.proArray[i].menuName}
						this.flist.push(ftmp);
						let stmp = {id:this.blaData.proArray[i].id,pid:this.blaData.proArray[i].id,className:this.blaData.proArray[i].menuName}
						this.slist.push(stmp);
						for(var j=0;j<this.blaData.proArray[i].data.length;j++){
							let ttmp = {id:this.blaData.proArray[i].data[j]._id,pid:this.blaData.proArray[i].id,className:this.blaData.proArray[i].data[j].proName,picture:this.blaData.proArray[i].data[j].proData.imageList[0],price:this.blaData.proArray[i].data[j].price}
							this.tlist.push(ttmp)
						}
					}
				}
				if(this.blaData.template==2){
					this.flist=[];
					this.slist=[];
					this.tlist=[];
					for(var i=0;i<this.blaData.proGroupArray.length;i++){
						let ftmp = {id:this.blaData.proGroupArray[i].id,className:this.blaData.proGroupArray[i].className}
						this.flist.push(ftmp);
						let stmp = {id:this.blaData.proGroupArray[i].id,pid:this.blaData.proGroupArray[i].id,className:this.blaData.proGroupArray[i].className}
						this.slist.push(stmp);
						for(var j=0;j<this.blaData.proGroupArray[i].childArray.length;j++){
							let ttmp = {id:this.blaData.proGroupArray[i].childArray[j].id,pid:this.blaData.proGroupArray[i].id,className:this.blaData.proGroupArray[i].childArray[j].title,picture:this.blaData.proGroupArray[i].childArray[j].imgUrl,toUrl:this.blaData.proGroupArray[i].childArray[j].toUrl}
							this.tlist.push(ttmp)
						}
					}										
				}
				// this.currentId = this.flist[0].id
			},
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem=>sitem.pid === item.id);
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item=>item.top <= scrollTop).reverse();
				if(tabs.length > 0){
					this.currentId = tabs[0].pid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.slist.forEach(item=>{
					const query = uni.createSelectorQuery().in(this);
					query.select("#main-" + item.id).fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
					
					// let view = uni.createSelectorQuery().select("#main-" + item.id); 
					// view.fields({
					// 	size: true
					// }, data => {
					// 	item.top = h;
					// 	h += data.height;
					// 	item.bottom = h;
					// }).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(item){
				navToPage(item)
			},
			navToProDetail(sid, tid){
				uni.navigateTo({
				    url: '/pagesI/product/product?id='+tid
				});
			},
			toUrl(){
				
			},
			setTemplateValue(e){
				this.blaData.template = e.target.value;
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			setSelectProGroupValue(e,v){
				if(this.tmpIndex==-1){
					let tmp = {className:e,menuName:e,id:v,data:[]}
					this.blaData.proArray.push(tmp);
				}else{
					this.blaData.proArray[this.tmpIndex].className = e;
					this.blaData.proArray[this.tmpIndex].menuName = e;
					this.tmpIndex = -1;
				}
				this.$emit("changeData",this.blaData);
				this.getProDataByGroup();
				
			},
			setSelectPageValue(e){
				this.blaData.proGroupArray[this.impIndex].childArray[this.impIndexC].toUrl = e;
				this.$emit("changeData",this.blaData);
				this.impIndex = -1;
				this.impIndexC = -1;
				this.loadData();
			},
			toSelectProductGroup(e){
				this.$refs.zxProductGroup.showGroupList();
			},
			delGroupPage(index) {
				this.blaData.proArray.splice(index,1);
				this.$emit("changeData",this.blaData);
				this.loadData()
			},
			addProClassifyZ(){
				let tmp = {
					id: genID(),
					className:'',
					childArray:[]
				}
				this.blaData.proGroupArray.push(tmp);
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			addProClassifyC(index){
				uni.showActionSheet({
					title:'',
					itemList: ['本地图片', '素材中心'],
					success: (e) => {
						if(e.tapIndex==0){
				let that = this;
				if(this.blaData.template==2){
					uni.chooseImage({
					    count: 5,
					    success(res) {
					        if (res.tempFilePaths.length > 0) {
								for(let i=0;i<res.tempFilePaths.length;i++){
									let filePath = res.tempFilePaths[i];
									//进行上传操作
									myCloud.uploadFile(filePath, (res)=>{
										let tmp = {
											id: genID(),
											pid: that.blaData.proGroupArray[index].id,
											imgUrl: '',
											title: '导航',
											toUrl: ''
										}
										that.blaData.proGroupArray[index].childArray.push(tmp);
										that.blaData.proGroupArray[index].childArray[that.blaData.proGroupArray[index].childArray.length-1].imgUrl = res.fileID;
										that.$emit("changeData",that.blaData);
										that.loadData();
									},true)	
								}      
					        }
					    }
					});	
				}
				}else{
							let that = this;
							uni.$once('getSource',function(data){
								for(let item in data.msg){
									let tmp = {
										id: genID(),
										pid: that.blaData.proGroupArray[index].id,
										imgUrl: '',
										title: '导航',
										toUrl: ''
									}
									that.blaData.proGroupArray[index].childArray.push(tmp);
									that.blaData.proGroupArray[index].childArray[that.blaData.proGroupArray[index].childArray.length-1].imgUrl = data.msg[item].url;
									that.$emit("changeData",that.blaData);
									that.loadData();
								}
							 })
							uni.navigateTo({
							    url: '/pages/shop/source-list?loadType=1&count=1'
							});
						}
					}
				})
			},
			updateImg(index,index2){
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
				            myCloud.uploadFile(filePath,(res)=>{
				            	that.blaData.proGroupArray[index].childArray[index2].imgUrl = res.fileID;
				            	that.$emit("changeData",that.blaData);
								that.loadData();
				            },true)
				        }
				    }
				});
				}else{
							let that = this;
							uni.$once('getSource',function(data){
								for(let item in data.msg){
									that.blaData.proGroupArray[index].childArray[index2].imgUrl = data.msg[item].url;
									that.$emit("changeData",that.blaData);
									that.loadData();
								}
							 })
							uni.navigateTo({
							    url: '/pages/shop/source-list?loadType=1&count=1'
							});
						}
					}
				})
			},
			setImgTitleValue(e){
				this.blaData.proGroupArray[e.currentTarget.dataset.index].childArray[e.currentTarget.dataset.index2].title = e.detail.value;
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			toSelectChildPage(index,index2){
				this.impIndex = index;
				this.impIndexC = index2;
				this.$refs.zxPageList.showPageList();
			},
			delGroupZPage(index) {
				this.blaData.proGroupArray.splice(index,1);
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			delGroupCPage(index,index2) {
				this.blaData.proGroupArray[index].childArray.splice(index2,1);
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			toSelectPage(e){
				this.tmpIndex = e.currentTarget.dataset.index;
				this.$refs.zxProductGroup.showGroupList();
			},
			setPageTitleValue(e){
				this.blaData.proArray[e.currentTarget.dataset.index].menuName = e.detail.value;
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			setZTitleValue(e){
				this.blaData.proGroupArray[e.currentTarget.dataset.index].className=e.detail.value;
				this.$emit("changeData",this.blaData);
				this.loadData();
			},
			async getProDataByGroup(){
				for(var i=0;i<this.blaData.proArray.length;i++){	
					this.blaData.proArray[i].data.splice(0,this.blaData.proArray[i].data.length)
				}
				// TODO 查询返回个数未知  需要测试  然后做判断 处理
				const req = {
					type:5
				}
				const data = await getData(req)
				for(let item in data){
					for(let item2 in data[item].proData.groupList){
						for(var i=0;i<this.blaData.proArray.length;i++){
							if(this.blaData.proArray[i].id == data[item].proData.groupList[item2].id){
								this.blaData.proArray[i].data.push(data[item])
							}
						}
					}
				}
				this.loadData()
			}
		}
	}
</script>
<style lang='scss'>

	.icon{
		font-size: 24px;
		font-family: iconfont;
		color: rgb(255, 68, 68);
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
	.scroll-Y {
		height: 700rpx;
	}
	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #F4F5F6;
		font-size: 14px;
	}
	.uni-row{
		/* margin-top: 20rpx; */
	}

	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 97%;
		background: #fff;
		/* padding-top: 12upx; */
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 170upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
	.price-tag{
		margin-right: 2px;
		font-size: 12px;
	}
	.t-buy-btn{
		float: right;
	    height: 24px;
	    font-size: 24px;
	    line-height: 24px;
	}
	.pro-title{
		margin: 1px 0 0;
		font-size: 14px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
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
	.v-rc-design-c{
			position: relative;
			background-color: #fff;
			margin-top:10px;
			padding: 10px;
			border: 1px dashed #e5e5e5;
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
			display: inline-block;
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
		.v-cz-content{
			position: relative;
			background-color: #fff;
			margin-top:10px;
			border: 1px dashed #e5e5e5;
			width: 100%;
			padding-bottom: 5px;
			margin-bottom: 10px;
			margin-left: 10px;
			margin-right: 10px;
		}
	.v-cz-nav{
		position: relative;
		background-color: #fff;
		margin-top:10px;
		padding: 10px;
		border: 1px dashed #e5e5e5;
		padding-bottom: 10px;
		margin-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;
	}
	.v-cz-editor{
		display: inline-block;
		position: absolute;
		margin-left: 10px;
	}
	
</style>