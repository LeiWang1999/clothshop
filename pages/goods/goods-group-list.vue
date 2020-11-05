<template>
	<view>
		<uni-section title="商品分组列表" type="line">
			<view class="button" @click="toAddNewGoodsGroup"><text class="button-text">新建分组</text></view>
		</uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="item.id" :data-pageTitle="item.pageTitle"
			 @change="swipeChange" @click="swipeClick($event,index)">
				<text class="cont">{{item.content}}</text>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import myUtil from '@/common/util/util.js';
	import { getData,delData } from '@/common/api/goods-group.js'
	export default {
		components: {
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem
		},
		onShow() {
			this.getData();
		},
		data() {
			return {
				isOpened: false,
				options1: [{
					text: '取消置顶'
				}],
				options2: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				swipeList: [],

			}
		},
		onReady() {
			this.$nextTick(() => {
				this.isOpened = true
			})
		},
		methods: {
			async getData() {
				const result = await getData({name:'',page:1,limit:100})
				const res = result.records
				let tmp1 = {
					text: '编辑'
				}
				let tmp2 = {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}
				this.$data.swipeList = [];
				for (let i = 0; i < res.length; i++) {
					let d = {
						id: '',
						options: [],
						content: ''
					}
					d.id = res[i]._id;
					d.content = res[i].groName;
					d.options.push(tmp1);
					d.options.push(tmp2);
				
				
					this.$data.swipeList.push(d);
				}
			},
			toAddNewGoodsGroup(e) {
				this.$api.navTo('/pages/goods/goods-group-edit')
			},
			bindClick(e) {
				uni.showToast({
					title: `点击了${e.content.text}按钮`,
					icon: 'none'
				})
			},
			setOpened() {
				this.isOpened = !this.isOpened
			},
			change(e) {
				this.isOpened = e
			},
			swipeChange(e) {},
			async delDataReq(index){
				const data = {
					id: this.swipeList[index].id
				}
				const res = await delData(data)
				this.swipeList.splice(index, 1);
			},
			async swipeClick(e, index) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: (res) => {
							if (res.confirm) {
								this.delDataReq(index)

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '编辑') {
					uni.navigateTo({
						url: 'goods-group-edit?id=' + this.swipeList[index].id
					});
				}

			}
		}
	}
</script>

<style>

	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
</style>
