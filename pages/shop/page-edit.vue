<template>
	<view class="container">
		<view>
			<view style="height: 30rpx;">
					
			</view>
			
			<view class="panel panel-one">
				<view class="uni-form-item uni-row">
					<view class="title">页面标题</view>
					<input v-model="pageTitle" class="right-content uni-input" name="pageTitle" placeholder="请输入页面标题" />
				</view>
			</view>
			
			<view class="panel panel-two">
				<view class="uni-form-item uni-row">
					<view class="title">背景颜色</view>
					<view class="v-action">
						<view class="tag-view">
							<view class="zx-color-picker__text" @click="openColorSelector(backgroundColor,'backgroundColor')">
								<view class="zx-color-picker__preview" :style="'background-color: '+backgroundColor"></view>
							</view>
						</view>
						<view class="tag-view" @click="backgroundColorReset">
							<uni-tag text="重置" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="panel panel-three">
				<view class="uni-form-item uni-row" @click="toSelectTemplate">
					<view class="title">行业模板</view>
					<input v-model="templateName" disabled class="right-content uni-input" name="templateName" placeholder="请选择行业模板" />
					<text class="icon item-icon">&#xe62d;</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button class="cancel" type="default" @tap="submit(0)">保存</button>
				<button class="submit" type="default" @click="submit(1)">设计页面</button>
			</view>
		</view>
		<t-color-picker ref="colorPicker" @confirm="colorSelectorConfirm"></t-color-picker>
	</view>
</template>
<script>
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import myUtil from '@/common/util/util.js';
	import tColorPicker from '@/components/zx-ui/zx-color-picker/zx-color-picker.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	import { getDataById,addData,editData } from '@/common/api/page.js'
	export default {
		components:{
			tColorPicker,
			uniTag
		},
		data() {
			return {
				pageTitle:'',
				pageShareDetail:'',
				backgroundColor:'#F9F9F9',
				diyData:[],
				comType:'index',
				id:"",
				action:"",
				template:0,
				actionAdd:'',
				templateName:''
			}
		},
		onLoad(option) {
			this.actionAdd = myConst.ACTION.ADD
			if(option.id!=undefined){
				this.id = option.id;
				this.action = myConst.ACTION.EDIT;
				this.initData()
			}else{
				this.action = myConst.ACTION.ADD;
			}
		},
		methods: {
			async initData(){
				const data = {
					id:this.id
				}
				const res = await getDataById(data)
				this.backgroundColor = res[0].backgroundColor;
				this.pageShareDetail= res[0].pageShareDetail;
				this.pageTitle = res[0].pageTitle;
				this.comType = res[0].comType;
				this.diyData = res[0].diyData;
				this.template = res[0].template;
				this.templateName = res[0].templateName;
			},
			async submit(e) {
				// JSON.stringify(e.detail.value)
                //定义表单规则
               var that = this;
               if(that.pageTitle==''){
               	uni.showToast({
               		title:'页面标题不能为空',
               		icon:'none'
               	})
               	return;
               }
			   if(that.templateName==''){
			   	uni.showToast({
			   		title:'请选择行业模板',
			   		icon:'none'
			   	})
			   	return;
			   }
			   const data = {
					id:that.id,
					diyData:that.$data.diyData,
					templateName:that.templateName,
					pageTitle:that.$data.pageTitle,
					comType:that.comType,
					template:0,
					pageShareDetail:that.pageShareDetail,
					backgroundColor:that.backgroundColor,
					updatetime:myUtil.timestamp()
			   }
			   if(this.action==myConst.ACTION.ADD){
				   const res = await addData(data)
				   that.id = res 
			   }else{
				   const res = await editData(data)
			   }
			   
              uni.showToast({
              	title: '提交成功',
              	success:()=>{
              		if(e==1){
              			uni.redirectTo({
              				url: '/pages/shop/page-diy?pageName=pageDiy&id='+that.id
              			})
              		}else{
              			uni.navigateBack()
              		}
              	}
              });
               
			},
			openColorSelector(e,i) {
			    // 打开颜色选择器
			    this.$refs.colorPicker.open(e,i);
			},
			colorSelectorConfirm(e) {
				if(e.item=='backgroundColor'){
					this.backgroundColor = e.hex;
				}
			},
			backgroundColorReset(e){
				this.backgroundColor = '#F9F9F9';
			},
			toSelectTemplate(){
				let that = this;
				uni.$once('getTemplateData',function(data){
					that.diyData = data.diyData
					that.templateName = data.name
				 })
				uni.navigateTo({
					url: '../template/template-list?v=0'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.panel{
			background-color: #ffffff;
			border-radius: 20rpx;
			margin: 0 30rpx;
			margin-bottom: 30rpx;
			padding: 10rpx;
			position: relative;
			.title{
				width: 150rpx;
			}
			.item{
				// position:absolute;
				right:40rpx;
				padding: 13rpx 26rpx;
				color: #7E7E7E;
				font-size: 28rpx;
				border: 0px;
			}
			.value{
				position: relative;
				float: right;
				padding: 10rpx 26rpx;
			}
		}
		.footer {
			position: fixed;
			background-color: #ffffff;
			height: 150rpx;
			width: 750rpx;
			bottom: 0px;
			z-index: 200;
		
			.btn {
				padding-top: 30rpx;
				margin-right: 40rpx;
				text-align: right;
		
				button {
					width: 180rpx;
					height: 76rpx;
					font-size: 30rpx;
				}
		
				button:after {
					border: none;
				}
		
				button:active {
					opacity: 0.5;
				}
		
				.cancel {
					display: inline-block;
					margin-right: 20rpx;
					color: $zx-color-primary;
					background: $zx-color-button;
				}
		
				.submit {
					display: inline-block;
					margin-left: 20rpx;
					background: $zx-color-primary;
					color: #ffffff;
				}
			}
		}
	}
	.item-icon{
		position:absolute;
		right:20rpx;
		margin-top: 5rpx;
		color: #7E7E7E;
		font-size: 39rpx;
	}
	.v-action {
		position: relative;
		float: left;
		display: flex;
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
		width: 64px;
	    height: 22px;
	}
	.tag-view{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
		margin-left: 20rpx;
		justify-content: center;
		
	}
	
</style>
