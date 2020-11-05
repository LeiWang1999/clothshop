<template>
	<view class="zx-page-list">
		<view>
			<view>
				<uni-drawer :visible="showRight" mode="right" @close="closeDrawer('right')">
					<uni-section title="跳转页面" type="line">
						<view class="button" @click="toAddNewPage"></view>
					</uni-section>
					<uni-swipe-action>
						<uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="item.id" @change="swipeChange">
							<view class="v-item" @click="swipeClick($event,item.content,item.type,item.id)">
								<text class="cont">{{item.content}}</text>
								<view style="background: #F5F5F5;width: 100%;height: 1px;"></view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</uni-drawer>
			</view>
		</view>
	</view>
</template>
<script>
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import myCloud from '@/common/util/cloud.js'
	import myConst from '@/common/util/const.js'
	import { getDataOne }  from '@/common/api/page.js'
	export default {
		components: {
			uniDrawer,
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		created() {
			this.getData();
		},
		data() {
			return {
				showRight: false,
				showLeft: false,
				swipeList: []
			}
		},
		methods: {
			async getData() {
				const res = await getDataOne({})
				this.$data.swipeList = [];
				for (let i = 0; i < res.length; i++) {
					let d = {
						id: '',
						options: [],
						content: '',
						type: ''
					}
					d.id = res[i]._id;
					d.content = res[i].pageTitle;
					d.type = res[i].comType;
					this.$data.swipeList.push(d);
				}
			},
			show(e) {
				if (e === 'left') {
					this.showLeft = true
				} else {
					this.showRight = true
				}
			},
			closeDrawer(e) {
				if (e === 'left') {
					this.showLeft = false
				} else {
					this.showRight = false
				}
			},
			showPageList() {
				this.show('right')
			},
			swipeChange(e) {
				console.log('返回：', e);
			},
			swipeClick(e, v, r, i) {
				let tmp = {
					id: i,
					pageTitle: v,
					comType: r
				};
				this.$emit("send", tmp);
				this.closeDrawer("right");
			}
		}
	}
</script>

<style lang="scss">
	.zx-page-list {
		
		.cont {
			flex: 1;
			height: 45px;
			line-height: 45px;
			padding: 0 15px;
			padding-bottom: 10px;
			position: relative;
			background-color: #fff;
			font-size: 15px;
		}

		.v-item {
			width: 100%;
			height: 100%;
			position: relative;
		}
	}
</style>
