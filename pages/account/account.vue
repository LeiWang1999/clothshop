<template>
	<view class="uni-container">
		<view class="uni-header-logo">
		</view>
		<view class="uni-panel" v-for="(item, index) in list" :key="item.id">
			<view class="uni-navigate-item"  @click="triggerCollapse(index)">
				<text class="uni-panel-text">{{item.name}}</text>
				<text class="uni-panel-icon uni-icon">&#xe470;</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		adminLogout
	} from '@/common/api/account.js';
	import {
	    mapState,
		mapMutations  
	} from 'vuex'; 
	export default {
		components: {

		},
		data() {
			return {
				list: [
					{
						id: 'pwd',
						url: '/pages/index/index',
						name: '修改密码',
						open: false
					},
					{
						id: 'logout',
						url: '/pages/index/index',
						name: '退出登录',
						open: false
					}
				],
				navigateFlag: false
			}
		},
		methods: {
			...mapMutations(['logout']),
			async triggerCollapse(e) {
				console.log(e)
				if(e==0){
					uni.navigateTo({
						url: '/pages/public/password-edit'
					});
				}else if(e==1){
					adminLogout().then(()=>{
						this.logout()
						uni.switchTab({
							url: '/pages/index/index'
						});
					})
				}
			},
			goDetailPage(e) {
				if (this.navigateFlag) {
					return;
				}
				this.navigateFlag = true;
				if (typeof e === 'string') {

				} else {
					uni.navigateTo({
						url: e.url
					})
				}
				setTimeout(() => {
					this.navigateFlag = false;
				}, 200)
			}
		}
	}
</script>

<style lang="scss">
	@import '../../common/style/uni-nvue.css';
	.uni-panel-icon {
		float: right;
		margin-right: 8px;
		margin-top: 4px;
	}

	.uni-navigate-icon {
		float: right;
		margin-right: 8px;
		margin-top: 4px;
	}
</style>