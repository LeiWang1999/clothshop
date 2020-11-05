<template>
	<view class="page-list">
		<uni-section title="页面列表" type="line">
			<view class="button" @click="toAddNewPage()"><text class="button-text">新建页面</text></view>
		</uni-section>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in swipeList" :options="item.options" :key="index" :data-pageTitle="item.pageTitle"
			 @change="swipeChange" @click="swipeClick($event,index)">
				<text class="cont" @click="editDiyData(index)">{{item.content}}</text>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<uni-popup ref="showtip" :type="type" :mask-click="false">
			<view class="uni-tip">
				<text class="uni-tip-title">页面标题</text>
				<input class="uni-input uni-tip-content" name="pageName" :value="pageTitle" placeholder="请输入页面标题" @input="setPageNameValue" />
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="submit()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import util from '@/common/util/util.js';
	import { getData,delData } from '@/common/api/page.js'
	export default {
		components: {
			uniSection,
			uniSwipeAction,
			uniSwipeActionItem,
			uniPopup
		},
		onShow() {
			this.getData();
		},
		onLoad(options) {
		},
		data() {
			return {
				type: '',
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
				pageTitle: '',
				action: '',
				id: '',
				diyData: [],
				comType: 'index',
				selectIndex: -1
			}
		},
		onReady() {
			this.$nextTick(() => {
				this.isOpened = true
			})
		},
		methods: {
			togglePopup(type, open, action) {
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
				this.action = action;
				this.id = '';
				this.diyData = [];
				this.comType = 'index';
				this.pageTitle = '';
				if (action == 'edit') {
					this.pageTitle = this.swipeList[this.selectIndex].pageTitle
					this.id = this.swipeList[this.selectIndex].id
					this.comType = this.swipeList[this.selectIndex].comType
					this.diyData = this.swipeList[this.selectIndex].diyData
				}
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			async getData() {
				this.diyData = [];
				const result = await getData({name:'',page:1,limit:500})
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
				// let tmp3 = {text: '设为主页',style: {backgroundColor: 'rgb(254,156,1)'}}
				this.$data.swipeList = [];
				for (let i = 0; i < res.length; i++) {
					let d = {
						id: '',
						options: [],
						content: '',
						comType: '',
						pageTitle: '',
						diyData: []
					}
					d.id = res[i]._id;
					d.comType = res[i].comType;
					d.diyData = res[i].diyData;
					d.pageTitle = res[i].pageTitle;
					d.options.push(tmp1);
					d.options.push(tmp2);
					d.content = res[i].pageTitle;
					this.$data.swipeList.push(d);
				}
			},
			toAddNewPage() {
				this.$api.navTo('/pages/shop/page-edit')
			},
			toEditPage(id) {
				this.$api.navTo('/pages/shop/page-edit?id='+id)
			},
			setPageNameValue(e) {
				this.pageTitle = e.detail.value;
			},
			submit() {
				if ("" == this.pageTitle || null == this.pageTitle) {
					uni.showToast({
						title: '页面标题不能为空',
						icon: 'none'
					})
				} else {
					this.addOrEditPageTitle();
				}
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
			swipeClick(e, index) {
				let {
					content
				} = e
				if (content.text === '删除') {
					uni.showModal({
						title: '提示',
						content: '是否删除',
						success: (res) => {
							if (res.confirm) {
								const data = {
									id: this.swipeList[index].id
								}
								const res = this.delDataReq(data)
								this.$api.msg(res)
								this.swipeList.splice(index, 1);

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else if (content.text === '编辑') {
					this.toEditPage(this.swipeList[index].id);
					// this.selectIndex = index
					// this.togglePopup('center', 'tip','edit')
				} else if (content.text === '设为主页') {
					this.selectIndex = index
					this.action = 'edit';
					this.pageTitle = this.swipeList[this.selectIndex].pageTitle
					this.id = this.swipeList[this.selectIndex].id
					this.comType = this.swipeList[this.selectIndex].comType
					this.diyData = this.swipeList[this.selectIndex].diyData
					this.addOrEditPageTitle()
				}

			},
			async delDataReq(req){
				return await delData(req);
			},
			editDiyData(e) {
				let tmp = 'pageDiy'
				uni.navigateTo({
					url: 'page-diy?id=' + this.swipeList[e].id + '&pageTitle=' + this.swipeList[e].pageTitle + '&pageName=' + tmp
				});
			},
			async addOrEditPageTitle() {
				var that = this;
				const req = {
					action: that.action,
					id: that.id,
					diyData: that.$data.diyData,
					pageTitle: that.$data.pageTitle,
					comType: that.comType,
					updatetime: formatTime(new Date())
				}
				const data = await addData(req)
				uni.showToast({
					title: '提交成功',
					success: () => {
						that.cancel('tip');
						that.getData();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page-list {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;

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
			position: absolute;
			margin-left: 530rpx;
			border-color: #e5e5e5;
			border-style: solid;
			border-width: 1px;
			padding: 4px 8px;
			border-radius: 4px;
		}

		.button-text {
			font-size: 15px;
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
			height: 38px;
			border: 1px solid #eeeeee;
			margin-top: 10px;
			margin-bottom: 10px;
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
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}
</style>
