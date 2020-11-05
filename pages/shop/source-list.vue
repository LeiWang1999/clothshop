<template>
	<view class="content">
		<view class="cart-list">
			<block v-for="(item, index) in goodsList" :key="index">
				<view
					class="cart-item" 
					:class="{'b-b': index!==goodsList.length-1}"
					v-if="index%2==0"
				>
					<view class="image-wrapper">
						<image :src="item.url" 
							mode="aspectFill" 
							lazy-load 
							@click="previewImage(item.url)"
						></image>
						<view 
							class="yticon icon-xuanzhong2 checkbox"
							:class="{checked: item.checked}"
							:data-index="index"
							@click="proCheck"
						></view>
					</view>
					<view v-if="index+1<goodsList.length" class="image-wrapper" style="margin-left: 50rpx;">
						<image :src="goodsList[index+1].url" 
							mode="aspectFill" 
							lazy-load 
							@click="previewImage(goodsList[index+1].url)"
						></image>
						<view 
							class="yticon icon-xuanzhong2 checkbox"
							:class="{checked: goodsList[index+1].checked}"
							:data-index="index+1"
							@click="proCheck"
						></view>
					</view>
				</view>
			</block>
		</view>
		<uni-load-more :status="loadingType" style="margin-bottom: 50rpx;"></uni-load-more>
		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view 
							v-for="tItem in item.child" :key="tItem.id" 
							class="cate-item b-b" 
							:class="{active: tItem.id==cateId}"
							@click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
					<view v-for="item in groupList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view 
							v-for="tItem in item.child" :key="tItem._id" 
							>
							<view class="cate-item b-b v-group-item" 
							:class="{active: tItem._id==cateGroupId}"
							><view @click="changeCateGroup(tItem)">{{tItem.name}}</view></view>
							<view style="position: flex;float: right;margin-top: -65rpx;margin-right: 10px;" v-if="tItem.name!='未分组'">
								<view class="tag-view" style="display: inline-block;margin-right: 10px;"  @click="editImgGroup(tItem)">
									<uni-tag text="修改" size="small" />
								</view>
								<view class="tag-view" style="display: inline-block;" @click="delImgGroup(tItem)">
									<uni-tag text="删除" type="error" size="small"  />
								</view>
							</view>
							
						</view>
					</view>
					<button type="default" class="add-group" style="margin:10px" @click="addImgGroup">+ 添加图片分组</button>
				</scroll-view>
			</view>
		</view>
		
		<!-- 底部菜单栏 -->
		<view class="footer">
			<view class="btn" v-if="pageType==0">
				<button class="cancel" type="default" @tap="uploadImg()">上传</button>
				<button class="cancel" type="default" @tap="updateGroupOnclick()">改分组</button>
				<button class="cancel" type="default" @tap="delImgArray()">删除</button>
				<button class="submit" type="default" @click="toggleCateMask('show')">分组列表</button>
			</view>
			<view class="btn" v-if="pageType==1">
				<button class="cancel" type="default" @tap="toGetSource()">添加选择图片</button>
				<button class="submit" type="default" @click="toggleCateMask('show')">分组列表</button>
			</view>
		</view>
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">图片分组</text>
				<input class="uni-input uni-tip-content" name="imgGroup" :value="imgGroup.name" placeholder="请输入图片分组" @input="setImgGroupValue" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="submit('tip')">确定</text>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="showpopup" :type="type">
			<view class="popup-content">
				<view class="popup-title">
					<text>分组列表</text>
				</view>
				<view class="popup-nav" v-if="groupList.length>0">
					<view v-for="(item,index) in groupList[0].child" :key="index" @click="onSelectedTemplateType(index)">
						<view class="line"></view>
						<view class="item">
							<view class="item-content">
								<text class="item-title">{{item.name}}</text>
							</view>
						</view>
						<view class="selected" v-if="imgGroupSelected.name==item.name">
							<text class="icon">&#xeaf1;</text>
						</view>
					</view>
					<view class="line"></view>
				</view>
				<view class="popup-btn">
					<button class="cancel" type="default" @click="cancel('popup')">取消</button>
					<button class="submit" type="default" @click="submit('popup')">确定</button>
				</view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	import uniLoadMore from '@/components/zx-ui/zx-load-more/zx-load-more.vue';
	import uniSearchBar from '@/components/uni-ui/uni-search-bar/uni-search-bar.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniTag from "@/components/uni-ui/uni-tag/uni-tag.vue"
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime } from '@/common/util/util.js';
	import { getData,delData,addData,editData } from '@/common/api/source.js'
	import { getGroupData,addGroupData,editGroupData,delGroupData } from '@/common/api/source-group.js'
	export default {
		components: {
			uniLoadMore,
			uniSearchBar,
			uniTag,
			uniPopup
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 11, //已选三级分类id
				cateGroupId:'', //默认未分组
				noGroupId:'',
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				goodsList: [],
				selectedArray: [],
				searchProName:'',
				loadType:1,  //云函数 判断你要干啥 1图片 2视频
				field:'',
				order:'',
				state:'上架',
				pageType:0 ,  //页面类型0表示商品列表页  1表示从diy页面跳转过来获取商品信息
				currentGroup:'',
				groupList:[],
				type: '',
				imgGroup:{},
				imgGroupAction: '',  //add edit
				imgGroupSelected: {},
				count:10,
			};
		},
		
		onLoad(options){
			if(options.loadType!=undefined&&options.loadType==1){
				this.pageType=1
				this.loadType=1   //1图片 2视频
			}else if(options.loadType!=undefined&&options.loadType==2){
				this.pageType=1  
				this.loadType=2   //1图片 2视频
			}else{
				this.pageType=0
			}
			if(options.count!=undefined){
				this.count = options.count;
			}
			this.initData()
		},
		onShow(options){

		},
		onPageScroll(e){
		},
		//下拉刷新
		onPullDownRefresh(){
		},
		//加载更多
		onReachBottom(){
			if(this.loadingType=='more'){
				this.loadingType = 'loading';
				uni.showLoading();
				this.loadProData(this.goodsList.length,this.loadType,this.currentGroup);	
			}
		},
		methods: {
			async initData(){
				let tmp = {id:1,name:'资源分类',child:[{id:11,name:'图片'},{id:12,name:'视频'}]}
				this.cateList.push(tmp);
				let tmp2 = {id:2,name:'图片分组',child:[]};
				var that = this;
				uni.showLoading();
				const data = await getGroupData({})
				for(let item in data){
					if(data[item].name=='未分组'){
						this.cateGroupId = data[item]._id
						this.imgGroupSelected = data[item]
						this.noGroupId = data[item]._id
						break;
					}
				}
				tmp2.child = data
				that.groupList.push(tmp2)
				this.loadProData(0,this.loadType,this.cateGroupId);
			},
			proCheck(e){
				if(this.goodsList[e.currentTarget.dataset.index].checked==true){
					this.goodsList[e.currentTarget.dataset.index].checked = false;
					for(let i=0;i<this.selectedArray.length;i++){
						if(this.selectedArray[i]._id==this.goodsList[e.currentTarget.dataset.index]._id){
							this.selectedArray.splice(i,1);
							break;
						}
					}
				}else{
					if(this.selectedArray.length>=this.count){
						uni.showToast({
							icon:'none',
							title:'最多可选择'+this.count+'张图片'
						})
					}else{
						this.goodsList[e.currentTarget.dataset.index].checked = true;
						this.selectedArray.push(this.goodsList[e.currentTarget.dataset.index]);						
					}

				}
			},
			//
			async loadProData(offset,type,groupId){
				let that = this;
				const req = {
					type:type,
					offset:offset,
					groupId:groupId
				}
				const data = await getData(req)
				if(data.length<10){  //说明已经加载全部
					that.loadingType = 'noMore';
				}else{
					that.loadingType = 'more';
				}
				for(let item in data){
					data[item].checked = false;
				}
				if(offset>0){
					
				}else{
					that.goodsList=[]
				}
				that.goodsList.push.apply(that.goodsList, data);
				uni.hideLoading();
			},
			delImgArray(){
				if(this.selectedArray.length==0){
					uni.showToast({
						title:"至少选择一张图片",
						icon:"none"			
					})
					return;
				}
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否删除',
					success: (res) => {
						if (res.confirm) {
							let i = 0;
							for(let item in this.selectedArray){
								const req = {
									id:this.selectedArray[item]._id,
									url:this.selectedArray[item].url
								}
								delData(req).then(data=>{
									that.goodsList.splice(item,1)
									i++
									if(this.selectedArray.length==i){
										this.goodsList = []
										this.selectedArray = []
										this.loadProData(0,this.loadType,this.cateGroupId);
									}
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},	
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.goodsList = [];
				if(this.cateId==11){
					this.loadType = 1;
				}else if(this.cateId==12){
					this.loadType = 2;
				}
				this.loadProData(0, this.loadType,this.cateGroupId);
			},
			stopPrevent(){},
	
			toGetSource(e){
				uni.$emit('getSource',{msg:this.selectedArray})
				uni.navigateBack()
			},
			uploadImg(e){
				let that = this;
				uni.chooseImage({
				    count: 10,
				    success(res) {
				        if (res.tempFilePaths.length > 0) {
							let t = 0
							uni.showLoading();
							for(let i=0;i<res.tempFilePaths.length;i++){
								let filePath = res.tempFilePaths[i];
								//进行上传操作
								uni.getImageInfo({
								    src: res.tempFilePaths[0],
								    success: function (image) {
										myCloud.uploadFile(filePath,(res2)=>{
											var mHeight = (image.height*750)/image.width;
											// res.fileID
											const req = {
												type:1,
												url:res2.fileID,
												groupId:that.cateGroupId,
												height:mHeight,
												updatetime:new Date().getTime()
											}
											addData(req).then(data => {
											      let tmp = data[0];
											      tmp.checked = false;
											      that.goodsList.splice(0,0,data[0])  
												  t++;
												  if(t==res.tempFilePaths.length){
												  	uni.hideLoading();
												  }
											})
										},false)
														
								    }
								});
							}
				        }
				    }
				});
			},
			addImgGroup(e){
				this.imgGroup = {_id:'',name:''};
				this.imgGroupAction = myConst.ACTION.ADD;
				this.togglePopup('center', 'tip')
			},
			editImgGroup(item){
				this.imgGroup = item;
				this.imgGroupAction = myConst.ACTION.EDIT;
				this.togglePopup('center', 'tip')
			},
			delImgGroup(item){
				var that = this;
				uni.showModal({
					content: '确定删除分组？(删除分组，不删除图片，组内图片将自动归入未分组)',
					success: (confirmRes)=> {
						if (confirmRes.confirm) {
							var that = this;
							that.imgGroup = item;
							that.imgGroupAction = myConst.ACTION.DEL;
							uni.showLoading();
							const req = {
								id:that.imgGroup._id,
								noGroupId:that.noGroupId
							}
							delGroupData(req).then(data=>{
								getGroupData({}).then(dataT=>{
									that.groupList[0].child=dataT;
									that.cateGroupId = that.noGroupId;
									that.loadProData(0,this.loadType,this.cateGroupId);
								})
							})
						} 
					}
				});
			},
			togglePopup(type, open) {
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			async submit(type){
				if(type=="tip"){
					if(this.imgGroup.name==''){
						uni.showToast({
							title:'图片分组不能为空',
							icon:'none'
						})
					}else{
						var that = this;
						const req = {
							type:1,
							name:that.imgGroup.name,
							groupId:that.imgGroup._id,
							updatetime:new Date().getTime()
						}
						if(that.imgGroupAction==myConst.ACTION.ADD){
							const data = await addGroupData(req)
						}else if(that.imgGroupAction==myConst.ACTION.EDIT){
							const data = await editGroupData(req)
						}else{
							const data = await delGroupData(req)
						}
						const data2 = await getGroupData({})
						that.groupList[0].child=data2;
						that.$refs['show' + type].close()
					}
				}else if(type="popup"){
					if(this.selectedArray.length==0){
						uni.showToast({
							title:"至少选择一张图片",
							icon:"none"			
						})
						return;
					}
					let i = 0;
					this.cancel('popup')
					uni.showLoading();
					for(let item in this.selectedArray){
						const req = {
							id:this.selectedArray[item]._id,
							groupId:this.imgGroupSelected._id
						}
						const data = await editData(req)
						i++
						if(this.selectedArray.length==i){
							this.goodsList = []
							this.selectedArray = []
							this.loadProData(0,this.loadType,this.cateGroupId);
						}
					}
					
				}
				
			},
			setImgGroupValue(e){
				this.imgGroup.name = e.detail.value;
			},
			changeCateGroup(item){
				this.cateGroupId = item._id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.goodsList = [];
				this.loadType = 1;
				this.loadProData(0, this.loadType,this.cateGroupId);
			},
			updateGroupOnclick(){
				this.togglePopup('bottom', 'popup')
			},
			bindChange (e) {
				const val = e.detail.value
				this.imgGroupSelected = this.groupList[0].child[val[0]]
			},
			onSelectedTemplateType(index){
				for(let i=0;i<this.groupList[0].child.length;i++){
					this.groupList[0].child[i].selected = false
				}
				this.groupList[0].child[index].selected = true
				this.imgGroupSelected = this.groupList[0].child[index]
			},
			previewImage(e){
				uni.previewImage({
					urls: [e]
				})
			}
		},
	}
</script>

<style lang="scss">
	@import './../../common/style/mall.scss';
	page, .content{
		background: $page-color-base;
	}
	.content{
		margin-bottom: 130rpx;
	}


	
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 400upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
			.add-group{
				display: inline-block;
				margin-right: 20rpx;
				color: $zx-color-primary;
				background: $zx-color-button;
			}
			button {
				width: 360rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 25rpx;
			}
				
			button:after {
				border: none;
			}
				
			button:active {
				opacity: 0.5;
			}
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
 			font-size: 28upx;
			color: #555;
			// position: relative;
			border-bottom: 1px solid #eeeeee;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.goods-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	.action-section{
		position:fixed;
		bottom:30upx;
		z-index: 90;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
	}
	.tag-view{
		text-align: center;
		margin:0 auto;
	}
	/* 购物车列表项 */
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		padding-left: 50rpx;
		padding-right: 50rpx;
		.image-wrapper{
			width: 300upx;
			height: 300upx;
			flex-shrink: 0;
			position:relative;
			image{
				border-radius:8upx;
				opacity: 1;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:$font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $uni-color-primary;
	}
	
	
	/* 提示窗口 */
		.uni-tip {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			padding: 15px;
			width: 300px;
			background-color: #fff;
			border-radius: 10px;
		}
	
		.uni-tip-title {
			margin-bottom: 10px;
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
	
		.uni-tip-content {
			/* padding: 15px;
	*/
			font-size: 14px;
			color: #666;
		}
	
		.uni-tip-group-button {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			margin-top: 20px;
		}
	
		.uni-tip-button {
			flex: 1;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		.uni-tip-content {
			height: 30px;
			border: 1px solid #eeeeee;
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.popup-content {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			background-color: #fff;
			height: 780upx;
			font-size: 14px;
			z-index: 999;
		}
		picker-view {
		    width: 100%;
		    height: 600upx;
		    margin-top:20upx;
		}
		
		.item {
		    line-height: 100upx;
		}
		.popup-content {
			background-color: #ffffff;
			border-top-left-radius:10px;
			border-top-right-radius:10px;
			height: 800rpx;
			position: relative;
			.popup-title{
				padding-top: 40rpx;
				padding-left: 30rpx;
				text{
					font-size: 28rpx;
					font-weight: bold;
				}
			}
			.popup-nav{
				padding-top: 40rpx;
				height: 250px;
				overflow:auto;
				.line{
					width: 750rpx;
					height:0;
					border-top:1px solid #f0f0f0;
					padding-top: 10rpx;
				}
				.item{
					padding-left: 30rpx;
					.icon{
						font-size: 50rpx;
					}
					text{
						display: flex;
					}
					.item-content{
						display: inline-block;
						margin-left: 0rpx;
						padding-bottom: 20rpx;
						padding-top: 20rpx;
						.item-title{
							font-size: 30rpx;
							color: #1B1B1B;
						}
					}
				}
				.selected{
					float: right;
					margin-top: -88rpx;
					margin-right: 30rpx;
				}
			}
			.popup-btn{
				padding-top: 40rpx;
				margin: 0 auto;
				text-align: center;
				button{
					width: 180rpx;
					font-size: 30rpx;
				}
				button:after{ 
					border: none; 
				}
				button:active{
				  opacity: 0.5;
				}
				.cancel{
					display: inline-block;
					margin-right: 20rpx;
					color: $zx-color-primary;
					background: $zx-color-button;
				}
				.submit{
					display: inline-block;
					margin-left: 20rpx;
					background: $zx-color-primary;
					color: #ffffff;
				}
			}
		}
</style>