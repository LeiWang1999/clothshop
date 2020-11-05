<template>
	<view :style="'height:'+windowHeight+'px'">
		<view v-if="diyData.length>0" v-for="(item,index) in diyData" :key="index">
			<zx-text v-if="item.name==='text'" :childData="item" :showState="showState" @send="delComponents" @selectPage="getPage"
			 @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxText"></zx-text>
			<zx-image v-if="item.name==='image'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData"  ref="zxImage"></zx-image>
			<zx-product v-if="item.name==='product'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxProduct"></zx-product>
			<zx-product-group v-if="item.name==='productGroup'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData"  ref="zxProductGroup"></zx-product-group>
			<zx-video v-if="item.name==='video'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxVideo"></zx-video>
			<zx-image-text-nav v-if="item.name==='imageTextNav'" :toChildData="item"  :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxImageTextNav"></zx-image-text-nav>
			<zx-blank v-if="item.name==='blank'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxBlank"></zx-blank>
			<zx-line v-if="item.name==='line'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxLine"></zx-line>
			<zx-search v-if="item.name==='search'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxSearch"></zx-search>			
			<zx-title v-if="item.name==='title'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxTitle"></zx-title>			
			<zx-notice v-if="item.name==='notice'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxNotice"></zx-notice>			
			<zx-free-panel v-if="item.name==='freePanel'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxFreePanel"></zx-free-panel>
			<zx-top-nav v-if="item.name==='topNav'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxTopNav"></zx-top-nav>
			<zx-classify-tem v-if="item.name==='classifyTem'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxClassifyTem"></zx-classify-tem>
			<zx-coupon v-if="item.name==='coupon'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxCoupon"></zx-coupon>
			<zx-pintuan v-if="item.name==='pintuan'" :toChildData="item" :showState="showState" @send="delComponents" @selectPage="getPage" @changeData="changeData" @up="toUpData" @down="toDownData" ref="zxPintuan"></zx-pintuan>

		</view>
		<view v-if="diyData.length==0" class="icon-item">
			<uni-icons type="chatbubble" color="#8f8f94" size="45" />
			<text class="icon-item-text">请点击右侧菜单添加组件哦</text>
		</view>
		<zx-fab @send="getSonValue" @save="saveDiyData" @nav="toUrl" ref="zxFab"></zx-fab>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import zxText from '@/components/zx-diy/zx-text/zx-text.vue'
	import zxImage from '@/components/zx-diy/zx-image/zx-image.vue'
	import zxFab from '@/components/zx-diy/zx-fab/zx-fab.vue'
	import zxProduct from '@/components/zx-diy/zx-product/zx-product.vue'
	import zxProductGroup from '@/components/zx-diy/zx-product-group/zx-product-group.vue'
	import zxVideo from '@/components/zx-diy/zx-video/zx-video.vue'
	import zxImageTextNav from '@/components/zx-diy/zx-image-text-nav/zx-image-text-nav.vue'
	import zxBlank from '@/components/zx-diy/zx-blank/zx-blank.vue'
	import zxLine from '@/components/zx-diy/zx-line/zx-line.vue'
	import zxSearch from '@/components/zx-diy/zx-search/zx-search.vue'
	import zxTitle from '@/components/zx-diy/zx-title/zx-title.vue'
	import zxNotice from '@/components/zx-diy/zx-notice/zx-notice.vue'
	import zxFreePanel from '@/components/zx-diy/zx-free-panel/zx-free-panel.vue'
	import zxTopNav from '@/components/zx-diy/zx-top-nav/zx-top-nav.vue'
	import zxClassifyTem from '@/components/zx-diy/zx-classify-tem/zx-classify-tem.vue'
	import zxCoupon from '@/components/zx-diy/zx-coupon/zx-coupon.vue'
	import zxPintuan from '@/components/zx-diy/zx-pintuan/zx-pintuan.vue'
	import myCloud from '@/common/util/cloud.js'
	import myConst from '@/common/util/const.js'
	import myUtil from '@/common/util/util.js'
	import { getData,editDataByDetail } from '@/common/api/goods.js'
	import { getDataById,editData } from '@/common/api/page.js'
	import { getTemplateDataById,editTemplateData } from '@/common/api/template.js'
	export default {
		components: {
			uniIcons,
			zxText,
			zxImage,
			zxFab,
			zxProduct,
			zxProductGroup,
			zxImageTextNav,
			zxBlank,
			zxLine,
			zxSearch,
			zxTitle,
			zxNotice,
			zxVideo,
			zxFreePanel,
			zxTopNav,
			zxClassifyTem,
			zxCoupon,
			zxPintuan
		},
		data() {
			return {
				showState: 0, // 0是编辑DIY状态  1是显示预览状态
				diyData: [],
				showPageList: false,
				tt: {
					a: 1
				},
				pageTitle: '',
				action: '',
				comType: 'index',
				id: '',
				backgroundColor: "",
				pageShareDetail: "",
				template: "",
				windowHeight: 800,
				pageName: '',
			}
		},
		onLoad(option) {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowHeight = windowHeight;
			this.id = option.id;
			this.pageName = option.pageName;
			this.action = myConst.ACTION.EDIT;
			this.initData()
		},
		onReady() {
			// if(this.action=="edit"){
			// 	this.$refs.zxPageTitle.showPageTitleData(this.pageTitle);
			// }
		},
		methods: {
			async initData(){
				let tmpId = this.id;
				if (this.pageName == 'pageDiy') //页面设计
				{
					const data = {
						id: tmpId
					}
					const res = await getDataById(data)
					this.diyData = res[0].diyData;
					this.comType = res[0].comType;
					this.pageTitle = res[0].pageTitle;
					this.backgroundColor = res[0].backgroundColor;
					this.pageShareDetail = res[0].pageShareDetail;
					this.template = res[0].template;
					uni.setNavigationBarTitle({
						title: this.pageTitle
					});
				} else if (this.pageName == 'proDetailDiy') { //商品详情页设计
					const req = {
						id: tmpId
					}
					const res = await getDataOne(req)
					this.diyData = res[0].proDetail;
				} else if (this.pageName == 'templateDiy'){
					const req = {
						_id: tmpId
					}
					const res = await getTemplateDataById(req)
					this.diyData = res[0].diyData;
				}
			},
			getSonValue: function(res) {
				this.diyData.push(res);
			},
			delComponents(e) {
				for (let i = 0; i < this.diyData.length; i++) {
					if (this.diyData[i].id == e) {
						this.diyData.splice(i, 1);
						break;
					}
				}
			},
			getPage(e) {
				this.$refs.zxFab.showPageList();
			},
			//更新diydata 数据由子组件提供
			changeData(e) {
				for (let i = 0; i < this.diyData.length; i++) {
					if (this.diyData[i].id == e.id) {
						this.diyData[i] = e;
						break;
					}
				}
			},
			toUpData(e) {
				for (let i = 0; i < this.diyData.length; i++) {
					if (this.diyData[i].id == e) {
						if (i > 0) {
							this.diyData[i] = this.diyData.splice(i - 1, 1, this.diyData[i])[0]
						}
						break;
					}
				}
			},
			toDownData(e) {
				for (let i = 0; i < this.diyData.length; i++) {
					if (this.diyData[i].id == e) {
						if (i + 1 < this.diyData.length) {
							this.diyData[i] = this.diyData.splice(i + 1, 1, this.diyData[i])[0]
						}
						break;
					}
				}
			},
			//保存到数据库
			async saveDiyData(e) {
				var that = this;
				if (that.pageName == 'pageDiy') {
					const data = {
						id: that.$data.id,
						diyData: that.$data.diyData,
						pageTitle: that.$data.pageTitle,
						comType: that.comType,
						backgroundColor: that.backgroundColor,
						pageShareDetail: that.pageShareDetail,
						template: that.template,
						updatetime: myUtil.timestamp()
					}
					const res = await editData(data)
					uni.showToast({
						title: '提交成功',
						success: () => {
							uni.navigateBack()
						}
					});
				} else if (this.pageName == 'proDetailDiy') {
					const req = {
						id: that.$data.id,
						proDetail: that.$data.diyData,
						updatetime: new Date().getTime()
					}
					const data = await editDataByDetail(req)
					uni.navigateBack()
				} else if (this.pageName == 'templateDiy'){
					const req = {
						_id: that.$data.id,
						diyData: that.$data.diyData,
						updatetime: new Date().getTime()
					}
					const data = await editTemplateData(req)
					if(data.updated==1){
						uni.showToast({
							title: '更新成功',
							icon: 'none'
						});
					}else{
						uni.showToast({
							title: '更新失败',
							icon: 'none'
						});
					}
				}
			},
			async toUrl() {
				var that = this;
				if (this.pageName == 'pageDiy') {
					const data = {
						id: that.$data.id,
						diyData: that.$data.diyData,
						pageTitle: that.$data.pageTitle,
						comType: that.comType,
						backgroundColor: that.backgroundColor,
						pageShareDetail: that.pageShareDetail,
						template: that.template,
						updatetime: myUtil.timestamp()
					}
					const res = await editData(data)
					uni.showToast({
						title: '保存成功',
						success: () => {
							let tmp = 'pageDiy';
							uni.navigateTo({
								url: '/pages/index/diy?id=' + that.id + '&pageTitle=' + that.pageTitle + '&pageName=' + tmp
							});
						}
					});
				} else if (this.pageName == 'proDetailDiy') {
					const req = {
						id: that.$data.id,
						proDetail: that.$data.diyData,
						updatetime: new Date().getTime()
					}
					const data = await editDataByDetail(req)
					uni.showToast({
						title: '保存成功',
						success: () => {
							let tmpPage = 'proDetailDiy';
							let tmpName = '商品详情';
							uni.navigateTo({
								url: '/pages/index/diy?id=' + that.id + '&pageTitle=' + tmpName + '&pageName=' + tmpPage
							});
						}
					});
				} else if (this.pageName == 'templateDiy') {
					const req = {
						_id: that.$data.id,
						diyData: that.$data.diyData,
						updatetime: new Date().getTime()
					}
					const data = await editTemplateData(req)
					uni.showToast({
						title: '保存成功',
						success: () => {
							let tmpPage = 'templateDiy';
							let tmpName = '模板设计';
							uni.navigateTo({
								url: '/pages/index/diy?id=' + that.id + '&pageTitle=' + tmpName + '&pageName=' + tmpPage
							});
						}
					});
				}
			}
		}
	}
</script>

<style>
	.icon-item {
		/* #ifndef APP-NVUE */
		display: flex;
		box-sizing: border-box;
		/* #endif */
		width: 140px;
		padding: 30rpx 10rpx;
		text-align: center;
		flex-direction: column;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.icon-item-text {
		font-size: 18px;
		text-align: center;
		color: #8f8f94;
	}
</style>
