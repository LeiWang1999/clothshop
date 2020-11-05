<template>
	<view>
		<view v-for="(item,index) in diyData" :key="index">
			<zx-text v-if="item.name==='text'" :childData="item" :showState="showState" ref="zxText" ></zx-text>
			<zx-image v-if="item.name==='image'" :toChildData="item" :showState="showState" ref="zxImage"></zx-image>
			<zx-product v-if="item.name==='product'" :toChildData="item" :showState="showState" ref="zxProduct"></zx-product>
			<zx-product-group v-if="item.name==='productGroup'" :toChildData="item" :showState="showState" ref="zxProductGroup"></zx-product-group>
			<zx-video v-if="item.name==='video'" :toChildData="item" :showState="showState" ref="zxVideo"></zx-video>
			<zx-image-text-nav v-if="item.name==='imageTextNav'" :toChildData="item"  :showState="showState" ref="zxImageTextNav"></zx-image-text-nav>
			<zx-blank v-if="item.name==='blank'" :toChildData="item" :showState="showState" ref="zxBlank"></zx-blank>
			<zx-line v-if="item.name==='line'" :toChildData="item" :showState="showState" ref="zxLine"></zx-line>
			<zx-search v-if="item.name==='search'" :toChildData="item" :showState="showState" ref="zxSearch"></zx-search>			
			<zx-title v-if="item.name==='title'" :toChildData="item" :showState="showState" ref="zxTitle"></zx-title>			
			<zx-notice v-if="item.name==='notice'" :toChildData="item" :showState="showState" ref="zxNotice"></zx-notice>			
			<zx-free-panel v-if="item.name==='freePanel'" :toChildData="item" :showState="showState" ref="zxFreePanel"></zx-free-panel>
			<zx-top-nav v-if="item.name==='topNav'" :toChildData="item" :showState="showState" ref="zxTopNav"></zx-top-nav>
			<zx-classify-tem v-if="item.name==='classifyTem'" :toChildData="item" :showState="showState" ref="zxClassifyTem"></zx-classify-tem>
			<zx-coupon v-if="item.name==='coupon'" :toChildData="item" :showState="showState" ref="zxCoupon"></zx-coupon>

		</view>
	</view>
</template>

<script>
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
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js'
	import { formatTime } from '@/common/util/util.js';
	import { getDataById } from '@/common/api/page.js'
	export default {
		props:["compontentId"],
		components: {
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
			zxCoupon
		},
		created() {
			if(this.compontentId!="-1"){
				this.showData(this.compontentId)
			}
		},
		data(){
			return{
				showState:1,  //判断是否显示编辑状态
				diyData:[],
				comType:'',
				pageTitle:'',
			}
		},
		methods:{
			async showData(id){
				const req = {
					id:id
				}
				const data = await getDataById(req)
				this.diyData = data[0].diyData;
				// this.comType = data[0].comType;
				this.pageTitle = data[0].pageTitle;
				uni.setNavigationBarTitle({
				　　title:this.pageTitle
				})
			}
		}
	}
</script>

<style>
</style>