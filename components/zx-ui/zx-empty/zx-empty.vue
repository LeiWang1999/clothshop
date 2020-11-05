<template>
	<view class="empty-content">
		<text class="icon empty-icon">&#xe687;</text>
	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: 'empty'
			},
		},

		data() {
			return {

			}
		},

		computed: {

		}
	}
</script>

<style lang="scss">
	.empty-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: $page-color-base;
		padding-bottom: 120upx;
		.empty-icon{
			font-size: 100rpx;
			color: $zx-color-primary;
		}
	}
</style>
