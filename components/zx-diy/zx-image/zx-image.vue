<template>
	<view class="v-root-preview-item">
		<view :class="edit?'v-root-preview-controller':'v-root-preview'" @click="showState==0?togglePopup('bottom', 'popup'):''">
			<view>
				<view class="rc-design-react-preview" v-if="imgData.imgArray.length==0">
					<view class="rc-design-component-default-preview__title">点击编辑图片广告</view>
					<view class="rc-design-component-default-preview__tip">建议宽度750像素</view>
				</view>
				<view v-else-if="imgData.template==1&&imgData.imgArray.length>0">
					<view class="image-list" :style="'padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx;'">
					    <view class="image-item" v-for="(item,index) in imgData.imgArray" :key="index" :style="'height:'+(750-2*imgData.pageMargin)*item.imgHeight/750+'rpx;margin-bottom:'+((imgData.imgArray.length>index+1)?imgData.imgMargin:0)+'rpx'" @click="showState==0?'':comEvent(item)">
					        <view class="image-content">
					            <image :style="'height:'+(750-2*imgData.pageMargin)*item.imgHeight/750+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="widthFix" :src="item.url"></image>
					        </view>
					        <view class="image-title" v-if="item.content!=''">{{item.content}}</view>
					    </view>
					</view>
				</view>
				<view v-else-if="imgData.template==2&&imgData.imgArray.length>0">
					<view class="uni-margin-wrap">
						<uni-swiper-dot :info="info" :current="current" :mode="imgData.mode" :dots-styles="imgData.dotsStyles" field="content" >
							<swiper class="swiper-box" :style="'height:'+(750-2*imgData.pageMargin)*imgData.imgArray[0].imgHeight/750+'rpx'" :autoplay="autoplay" @change="changeDot">
								<swiper-item v-for="(item, index) in imgData.imgArray"  :key="index" >
									<view :class="item.colorClass" class="swiper-item"  @click="showState==0?'':comEvent(item)">
										<image :style="'height:'+(750-2*imgData.pageMargin)*imgData.imgArray[0].imgHeight/750+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx;padding-top:'+((imgData.fillStyle==1)?imgData.pageMargin*imgData.imgArray[0].imgHeight/750:0)+'rpx;padding-bottom:'+((imgData.fillStyle==1)?imgData.pageMargin*imgData.imgArray[0].imgHeight/750:0)+'rpx;'" mode="aspectFit" :src="item.url"></image>				
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
				</view>
				<view v-else-if="imgData.template==3&&imgData.imgArray.length>0">
					<view>
						<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120" :style="'height:'+imgData.hxhdHeight+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx;'">
							<view v-for="(item,index) in imgData.imgArray" :key="index" id="demo1" class="scroll-view-item_H" :style="'width:'+750*imgData.hxhdHeight/item.imgHeight+'rpx;margin-left:'+((index>0)?imgData.imgMargin:0)+'rpx;'"  @click="showState==0?'':comEvent(item)">
								<view class="swiper-item" ><view class="image-content" :style="'height:'+imgData.hxhdHeight+'rpx;width:'+750*imgData.hxhdHeight/item.imgHeight+'rpx;'">
										<view :style="'position: absolute;background-color: rgba(51,51,51,.8);color: #fff;height: 30px;bottom:20px;width:'+750*imgData.hxhdHeight/item.imgHeight+'rpx'" v-if="item.content!=''">{{item.content}}</view>
										<image :style="'height:'+imgData.hxhdHeight+'rpx;width:'+750*imgData.hxhdHeight/item.imgHeight+'rpx; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFit" :src="item.url"></image>
									
									</view>
									
									</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view v-else-if="imgData.template==4&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 50%;margin-right:'+imgData.imgMargin+'rpx;'"  @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px;'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
							<view class="image-title" style="width: 50%;" v-if="imgData.imgArray[0].content!=''">{{imgData.imgArray[0].content}}</view>
						</view>
						
					    <view v-if="imgData.imgArray.length>1" class="flex-item" :style="'width: 50%;margin-left: '+imgData.imgMargin+'rpx'"  @click="showState==0?'':comEvent(imgData.imgArray[1])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
							<view class="image-title" style="width: 50%;left:50%" v-if="imgData.imgArray[1].content!=''&&imgData.imgArray.length>1">{{imgData.imgArray[1].content}}</view>
						</view>
					</view>
				</view>
				<view v-else-if="imgData.template==5&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/3+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 33.3%;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/3+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
							<view class="image-title" style="width: 33.3%;" v-if="imgData.imgArray[0].content!=''">{{imgData.imgArray[0].content}}</view>
						</view>
					    <view v-if="imgData.imgArray.length>1" class="flex-item" :style="'width: 33.3%;margin-left: '+imgData.imgMargin+'rpx;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[1])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/3+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
							<view class="image-title" style="width: 33.3%;left:33.3%" v-if="imgData.imgArray[1].content!=''&&imgData.imgArray.length>1">{{imgData.imgArray[1].content}}</view>
						</view>
						<view v-if="imgData.imgArray.length>2" class="flex-item" :style="'width: 33.3%;margin-left: '+imgData.imgMargin+'rpx'" @click="showState==0?'':comEvent(imgData.imgArray[2])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/3+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[2].url"></image>
							<view class="image-title" style="width: 33.3%;left:66.6%" v-if="imgData.imgArray[2].content!=''&&imgData.imgArray.length>2">{{imgData.imgArray[2].content}}</view>
						</view>
					</view>
				</view>
				<view v-else-if="imgData.template==6&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 25%;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
							<view class="image-title" style="width: 33.3%;" v-if="imgData.imgArray[0].content!=''">{{imgData.imgArray[0].content}}</view>
							
						</view>
					    <view v-if="imgData.imgArray.length>1" class="flex-item" :style="'width: 25%;margin-left: '+imgData.imgMargin+'rpx;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[1])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
							<view class="image-title" style="width: 25%;left:25%" v-if="imgData.imgArray[1].content!=''&&imgData.imgArray.length>1">{{imgData.imgArray[1].content}}</view>
							
						</view>
						<view v-if="imgData.imgArray.length>2" class="flex-item" :style="'width: 25%;margin-left: '+imgData.imgMargin+'rpx;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[2])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[2].url"></image>
							<view class="image-title" style="width: 25%;left:50%" v-if="imgData.imgArray[2].content!=''&&imgData.imgArray.length>2">{{imgData.imgArray[2].content}}</view>
							
						</view>
						<view v-if="imgData.imgArray.length>3" class="flex-item" :style="'width: 25%;margin-left: '+imgData.imgMargin+'rpx'" @click="showState==0?'':comEvent(imgData.imgArray[3])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[3].url"></image>
							<view class="image-title" style="width: 25%;left:75%" v-if="imgData.imgArray[3].content!=''&&imgData.imgArray.length>3">{{imgData.imgArray[3].content}}</view>
						</view>
					</view>
				</view>
				<view v-else-if="imgData.template==7&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 50%;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
						</view>
					    <view class="flex-item" :style="'width: 50%;margin-left: '+imgData.imgMargin+'rpx'">
							<view class="uni-flex uni-column">
								<view v-if="imgData.imgArray.length>1" class="text uni-flex" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;" @click="showState==0?'':comEvent(imgData.imgArray[1])">
									<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
								</view>
								<view v-if="imgData.imgArray.length>2" class="text uni-flex" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;" @click="showState==0?'':comEvent(imgData.imgArray[2])">
									<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[2].url"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="imgData.template==8&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 50%;margin-right: '+imgData.imgMargin+'rpx'" @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
						</view>
					    <view class="flex-item" :style="'width: 50%;margin-left:'+imgData.imgMargin+'rpx;'">
							<view class="uni-flex uni-column">
								<view v-if="imgData.imgArray.length>1" class="text uni-flex" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: center;justify-content: center;-webkit-align-items: flex-start;align-items: flex-start;" @click="showState==0?'':comEvent(imgData.imgArray[1])">
									<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
								</view>
								<view class="text uni-flex" :style="'-webkit-flex: 1;flex: 1;height:'+imgData.imgArray[0].imgHeight/4+'rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;'">
									<view class="uni-flex uni-row v-flex-row">
									    <view v-if="imgData.imgArray.length>2" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[2])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[2].url"></image>
										</view>
									    <view v-if="imgData.imgArray.length>3" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[3])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[3].url"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else-if="imgData.template==9&&imgData.imgArray.length>0">
					<view class="uni-flex uni-row v-flex-row" :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;padding-left:'+imgData.pageMargin+'rpx;padding-right:'+imgData.pageMargin+'rpx'">
					    <view v-if="imgData.imgArray.length>0" class="flex-item" :style="'width: 50%;margin-right:'+imgData.imgMargin+'rpx;'" @click="showState==0?'':comEvent(imgData.imgArray[0])">
							<image :style="'height:'+imgData.imgArray[0].imgHeight/2+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[0].url"></image>
						</view>
					    <view class="flex-item" :style="'width: 50%;margin-left: '+imgData.imgMargin+'rpx'">
							<view class="uni-flex uni-column">
								<view class="text uni-flex" :style="'-webkit-flex: 1;flex: 1;height:'+imgData.imgArray[0].imgHeight/4+'rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;'">
									<view class="uni-flex uni-row v-flex-row">
									    <view v-if="imgData.imgArray.length>1" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[1])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[1].url"></image>
										</view>
									    <view v-if="imgData.imgArray.length>2" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[2])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[2].url"></image>
										</view>
									</view>
								</view>
								<view class="text uni-flex" :style="'-webkit-flex: 1;flex: 1;height:'+imgData.imgArray[0].imgHeight/4+'rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;'">
									<view class="uni-flex uni-row v-flex-row">
									    <view v-if="imgData.imgArray.length>3" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[3])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[3].url"></image>
										</view>
									    <view v-if="imgData.imgArray.length>4" class="flex-item" :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 50%;'" @click="showState==0?'':comEvent(imgData.imgArray[4])">
											<image :style="'height:'+imgData.imgArray[0].imgHeight/4+'rpx;width: 100%; background-color: #fff;border-radius: '+imgData.borderRadius+'px'" mode="aspectFill" :src="imgData.imgArray[4].url"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
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
						<view class="text" style="width: 180rpx;"><view class="title">选择模板</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setTemplateValue">
								<view class="uni-flex uni-column">
								    <view class="flex-item flex-item-V">
								<label>
									<radio value="1" :checked="(imgData.template==1)?true:false"  /><text>一行一个</text>
								</label>
								<label>
									<radio value="2" :checked="(imgData.template==2)?true:false" /><text>多图轮播</text>
								</label>
								<label>
									<radio value="3" :checked="(imgData.template==3)?true:false" /><text>横向滑动</text>
								</label>
								</view>
								<view class="flex-item flex-item-V"  style="margin-top: 20rpx;">
								<label>
									<radio value="4" :checked="(imgData.template==4)?true:false"  /><text>一行两个</text>
								</label>
								<label>
									<radio value="5" :checked="(imgData.template==5)?true:false"  /><text>一行三个</text>
								</label>
								<label>
									<radio value="6" :checked="(imgData.template==6)?true:false"  /><text>一行四个</text>
								</label>
								</view>
								<view class="flex-item flex-item-V"  style="margin-top: 20rpx;">
								<label>
									<radio value="7" :checked="(imgData.template==7)?true:false"  /><text>一左两右</text>
								</label>
								<label>
									<radio value="8" :checked="(imgData.template==8)?true:false"  /><text>一左三右</text>
								</label>
								<label>
									<radio value="9" :checked="(imgData.template==9)?true:false"  /><text>一左四右</text>
								</label>
								</view>
								</view>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">添加图片</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;margin-top: 10rpx;">
							<view class="v-right-txt">
							<text style="color: #999;">最多添加10个广告</text>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="uni-flex uni-column v-uni-column">
							<view class="flex-item flex-item-V" v-for="(item,index) in imgData.imgArray" :key="index">
								<view class="rc-design-editor-card-item" style="" >
									<view class="v-show-del"><text class="image-del icon" :data-id="item.id"  @tap="delImage">&#xeb7e;</text></view>
									
										<view class="rc-design-component-editor_subentry-item clearfix">
											<view class="rc-design-common-choice-image-component image-editor">
												<view class="has-choosed-image">
													<image :src="item.url"  class="thumb-image"  style="width: 80px; height: 80px;"></image>
													<view class="modify-image" :data-index="index" @click="updateImg">更换图片</view>
												</view>
											</view>
											<view class="subentry-item-editor-form-content">
												<view class="zxv-design-editor__control-group v-group" >
													<label class="zxv-design-editor__control-group-container" v-if="imgData.template==1||imgData.template==2||imgData.template==3||imgData.template==4||imgData.template==5||imgData.template==6">
														<view class="zxv-design-editor__control-group-label">图片标题:</view>
														<view class="zxv-design-editor__control-group-control">
															<view class="zxv-input-wrapper">
															<input class="zxv-input" :style="'width:'+mInputWidth+'px'" name="title" :data-index="index" :value="item.content" @input="setImgTitleValue" placeholder="建议10个字以内，可不填">
															</view>
														</view>
													</label>
												</view>
												<view class="zxv-design-editor__control-group subentry-control-group">
													<label class="zxv-design-editor__control-group-container">
														<view class="zxv-design-editor__control-group-label">跳转路径:</view>
														<view class="zxv-design-editor__control-group-control">
															<view class="rc-choose-link-menu">
																<view class="zxv-popover-wrapper rc-choose-link-menu-popover-wrapper" style="display: inline-block;">
																	<view class="rc-choose-link-menu-trigger" :data-index="index" @click="toSelectPage"><text v-if="item.toUrl==''" class="t-to-select-page">选择跳转到的页面</text><text v-else class="t-to-select-page">{{item.toUrl.pageTitle}}</text></view>
																</view>
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
					<view class="uni-flex uni-row" v-if="imgData.imgArray.length<11">
						<view class="v-rc-design" @click="addToShowImg">
								<view class="v-add-img">+ 添加一个背景图</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">页面边距</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="imgData.pageMargin" max='60' show-value @change="setPageMarginValue"></slider>
						</view>
					</view>					
					<view class="uni-flex uni-row" v-if="imgData.template!=2">
						<view class="text" style="width: 180rpx;"><view class="title">图片间距</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="imgData.imgMargin" max='60' show-value @change="setImgMarginValue"></slider>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="imgData.template==2">
						<view class="text" style="width: 180rpx;"><view class="title">模式选择</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-example-body">
							<view :class="{ active: imgData.modeIndex === 0 }" class="example-body-item" @click="selectMode('default', 0)"><text class="example-body-item-text">default</text></view>
							<view :class="{ active: imgData.modeIndex === 1 }" class="example-body-item" @click="selectMode('dot', 1)"><text class="example-body-item-text">dot</text></view>
							<view :class="{ active: imgData.modeIndex === 2 }" class="example-body-item" @click="selectMode('round', 2)"><text class="example-body-item-text">round</text></view>
							<view :class="{ active: imgData.modeIndex === 3 }" class="example-body-item" @click="selectMode('nav', 3)"><text class="example-body-item-text">nav</text></view>
							<view :class="{ active: imgData.modeIndex === 4 }" class="example-body-item" @click="selectMode('indexes', 4)"><text class="example-body-item-text">indexes</text></view>
						</view>
						</view>
					</view>	
					<view class="uni-flex uni-row" v-if="imgData.template==2">
						<view class="text" style="width: 180rpx;"><view class="title">样式选择</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-example-body">
							<template>
								<view v-for="(item, index) in dotStyle" :class="{ active: imgData.styleIndex === index }" :key="index" class="example-body-item" @click="selectStyle(index)">
									<view :style="{ 'background-color': item.selectedBackgroundColor, border: item.selectedBorder }" class="example-body-dots" />
									<view :style="{ 'background-color': item.backgroundColor, border: item.border }" class="example-body-dots" />
									<view :style="{ 'background-color': item.backgroundColor, border: item.border }" class="example-body-dots" />
								</view>
							</template>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="imgData.template==3">
						<view class="text" style="width: 180rpx;"><view class="title">图片大小</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgHxhdHeightalue">
								<label>
									<radio value="500" :checked="(imgData.hxhdHeight=='500')?true:false" /><text>大</text>
								</label>
								<label>
									<radio value="200" :checked="(imgData.hxhdHeight=='200')?true:false" /><text>中</text>
								</label>
								<label>
									<radio value="100" :checked="(imgData.hxhdHeight=='60')?true:false" /><text>小</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="imgData.template==2">
						<view class="text" style="width: 180rpx;"><view class="title">填充方式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgFillStyleValue">
								<label>
									<radio value="0" :checked="(imgData.fillStyle==0)?true:false" /><text>填充</text>
								</label>
								<label>
									<radio value="1" :checked="(imgData.fillStyle==1)?true:false" /><text>留白</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图片倒角</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgBorderRadiusValue">
								<label>
									<radio value="0" :checked="(imgData.borderRadius==0)?true:false" /><text>直角</text>
								</label>
								<label>
									<radio value="8" :checked="(imgData.borderRadius==8)?true:false" /><text>圆角</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>
		<zx-page-list  @send="setSelectPageValue" ref="zxPageList"></zx-page-list>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue';
	import uniSwiperDot from '@/components/uni-ui/uni-swiper-dot/uni-swiper-dot.vue'
	import zxPageList from '@/components/zx-diy/zx-page-list/zx-page-list.vue'
	import myCloud from '@/common/util/cloud.js';
	import myConst from '@/common/util/const.js';
	import { formatTime,navToPage } from '@/common/util/util.js';
	import { genID } from '@/common/util/util.js';
	import { addData } from '@/common/api/source.js'
	export default {
		props:["toChildData","showState"],
		components: {
			uniSection,
			uniPopup,
			uniIcons,
			uniTag,
			zxPageList,
			uniSwiperDot
		},
		created() {
			var that = this;
			that.imgData = that.toChildData;
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			that.mInputWidth = windowWidth-230;
			that.info = that.imgData.imgArray
		},
		data() {
			return {
				type: '',
				content: '顶部弹 popup',
				imageDel: '/static/img/del.png',
				edit: false,
				mInputWidth: 100,
				template:0,
				imgArray:[],
				imgData:{},
				impIndex:0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				info: [],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {}
			}
		},
		methods: {
			togglePopup(type, open) {
				this.$data.edit = true;
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break

					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				this.$nextTick(() => {
					this.$refs['show' + open].open()
				})
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				if(!e.show){
					this.edit = false
				}
			},
			del(e){
				this.$emit("send",this.toChildData.id);
			},
			toUp(e){
				this.$emit("up",this.toChildData.id);
			},
			toDown(e){
				this.$emit("down",this.toChildData.id);
			},
			setTemplateValue(e){
				this.imgData.template = e.target.value;
				this.$emit("changeData",this.imgData);
			},
			async addDataReq(req){
				const data = await addData(req)
			},
			async addToShowImg(e){
				uni.showActionSheet({
					title:'',
					itemList: ['本地图片', '素材中心'],
					success: (e) => {
						if(e.tapIndex==0){
							let that = this;
							uni.chooseImage({
							    count: 10,
							    success(res) {
									let uploadFileLength = res.tempFilePaths.length;
							        if (uploadFileLength > 0) {
										uni.showLoading();
										var t=0;
										for(let i=0;i<uploadFileLength;i++){
											let filePath = res.tempFilePaths[i];
											//进行上传操作
											uni.getImageInfo({
											    src: res.tempFilePaths[0],
											    success: function (image) {
													myCloud.uploadFile(filePath, (res)=>{
														var mHeight = (image.height*750)/image.width;
														let tmp = {
															id: genID(),
															url: '',
															content: '',
															toUrl: '',
															comType: '',
															imgHeight: 0,
															imgWidth: 0
														}
														that.imgData.imgArray.push(tmp);
														that.imgData.imgArray[that.imgData.imgArray.length-1].imgHeight = mHeight;
														that.imgData.imgArray[that.imgData.imgArray.length-1].url = res.fileID;
														that.$emit("changeData",that.imgData);
														that.info = that.imgData.imgArray
														const req = {
															type:1,
															url:res.fileID,
															groupId:'001',
															height:mHeight,
															updatetime:new Date().getTime()
														}
														that.addDataReq(req)
														t++;
														if(t==uploadFileLength){
															uni.hideLoading();
														}
													})
																	
											    }
											});
										}
							            
							            
							        }
							    }
							});
						}else{
							let that = this;
							uni.$once('getSource',function(data){
								for(let item in data.msg){
									let tmp = {
										id: genID(),
										url: '',
										content: '',
										toUrl: '',
										comType: '',
										imgHeight: 0,
										imgWidth: 0
									}
									that.imgData.imgArray.push(tmp);
									that.imgData.imgArray[that.imgData.imgArray.length-1].imgHeight = data.msg[item].height;
									that.imgData.imgArray[that.imgData.imgArray.length-1].url = data.msg[item].url;
									that.$emit("changeData",that.imgData);	
									that.info = that.imgData.imgArray
								}
							 })
							uni.navigateTo({
							    url: '/pages/shop/source-list?loadType=1'
							});
						}
					}
				})


			},
			delImage(e) {
				console.log(e);
				for(let i=0;i<this.imgData.imgArray.length;i++){
					if(e.currentTarget.dataset.id==this.imgData.imgArray[i].id){
						this.imgData.imgArray.splice(i,1);
					}
				}
				this.$emit("changeData",this.imgData);
				that.info = that.imgData.imgArray
			},
			setImgTitleValue(e){
				this.imgData.imgArray[e.currentTarget.dataset.index].content = e.detail.value;
				this.$emit("changeData",this.imgData);
			},
			toSelectPage(e){
				this.impIndex = e.currentTarget.dataset.index;
				this.$refs.zxPageList.showPageList();
			},
			setSelectPageValue(e,v){			
				console.log(e)
				this.imgData.imgArray[this.impIndex].toUrl = e;
				this.$emit("changeData",this.imgData);
			},
			updateImg(e){
				this.tmpIndex = e.currentTarget.dataset.index;
				let that = this;
				uni.chooseImage({
				    count: 1,
				    success(res) {
				        console.log(res);
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0]
				            //进行上传操作
							uni.getImageInfo({
							    src: res.tempFilePaths[0],
							    success: function (image) {
									var mHeight = (image.height*750)/image.width;
									myCloud.uploadFile(filePath, (res)=>{
										that.imgData.imgArray[that.tmpIndex].imgHeight = mHeight;
										that.imgData.imgArray[that.tmpIndex].url = res.fileID;
										that.$emit("changeData",that.imgData);
										that.info = that.imgData.imgArray
									})
								},
							})
				        }
				    }
				});
			},
			setPageMarginValue(e){
				this.imgData.pageMargin = e.detail.value;
				this.$emit("changeData",this.imgData);
			},
			setImgMarginValue(e){
				this.imgData.imgMargin = e.detail.value;
				this.$emit("changeData",this.imgData);
			},
			setImgBorderRadiusValue(e){
				this.imgData.borderRadius = e.target.value;
				this.$emit("changeData",this.imgData);
			},
			setImgFillStyleValue(e){
				this.imgData.fillStyle = e.target.value;
				this.$emit("changeData",this.imgData);				
			},
			setImgHxhdHeightalue(e){
				this.imgData.hxhdHeight = e.target.value;
				this.$emit("changeData",this.imgData);
			},
			selectStyle(index) {
				this.imgData.dotsStyles = this.dotStyle[index]
				this.imgData.styleIndex = index
				this.$emit("changeData",this.imgData);
			},
			selectMode(mode, index) {
				this.imgData.mode = mode
				this.imgData.modeIndex = index
				this.$emit("changeData",this.imgData);
			},
			changeDot(e) {
				this.current = e.detail.current
			},
			toUrl(i,p){
				let tmp = 'pageDiy'
				uni.navigateTo({
				    url: '/pages/index/diy?id='+i+'&pageTitle='+p+'&pageName='+tmp
				});
			},
			comEvent(item){
				if(item.toUrl.id!=undefined){
					// this.toUrl(item.toUrl.id,item.toUrl.pageTitle)
					navToPage(item)
				}
			}
		},
		onBackPress() {
			this.$refs['showpopup'].close()
			this.$refs['showtip'].close()
			this.$refs['showimage'].close()
			this.$refs['showshare'].close()
		}
	}
</script>
<style>
	.v-root-preview-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.v-root-preview-controller {
		position: relative;
		border: 1px dashed #38f;
	}
	.v-root-preview{
		position: relative;
	}
	.rc-design-react-preview{
		position: relative;
		height: 136px;
		background-color: #ebf8fd;
		text-align: center;
		color: #88c4dc;
	}
	.rc-design-component-default-preview__title{
		padding-top: 40px;
		font-size: 14px;
	}
	.rc-design-component-default-preview__tip{
		
	}
	.cap-text__content-wrap {
		position: relative;
		margin: 0 10px;
		padding: 10px 0;
	}

	.cap-text__content {
		font-family: initial;
		line-height: 24px;
		white-space: pre-wrap;
		word-break: break-all;
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

	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #F4F5F6;
		font-size: 14px;
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
	
	.v-add-img{
		text-align: center;
		margin: 0 auto;
		color: #38f;
	}
	
	.rc-design-editor-card-item{
	    position: relative;
	    background-color: #fff;
		margin-top: 10px;
	    padding: 15px;
	    border: 1px dashed #e5e5e5;
		/* width: 100%; */
		padding-bottom:10px;
		padding-right:5px;
		/* height: 115px; */
	}
	.rc-design-component-editor_subentry-item {
		position: relative;
	}
	.rc-design-common-choice-image-component {
		float: left;
		display: inline-block;
	}
	.has-choosed-image{
		position: relative;
	    width: 80px;
	    height: 80px;
	    text-align: center;
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
	    margin-left: 100px;
	}
	.zxv-design-editor__control-group{
		margin-bottom: 15px;
	}
	.zxv-design-editor__control-group-container{
	    display: flex;
	    -webkit-box-align: center;
		align-items: center;
	}
	.zxv-design-editor__control-group-label{
	    font-size: 12px;
	    -ms-flex-negative: 0;
	    -webkit-flex-shrink: 0;
	    flex-shrink: 0;
	    text-align: right;
	    margin-right: 10px;
	}
	.zxv-input-wrapper{
		display: flex;
	    position: relative;
	    height: 30px;
	    max-height: 36px;
	}
	.zxv-input{
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
	.v-show-del{
		float: right;
		z-index: 100;
		margin-right: 16px;
		margin-top: -28px;

	}
	.image-del{
		position: absolute;
		width: 50upx;
		height: 50upx;
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
	
	.v-flex-row{
		width: 750rpx;
	}
	
	
	.example-body-item {
	
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}
	
	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}
	
	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}
	.v-example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		display: flex;
	}
	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>
