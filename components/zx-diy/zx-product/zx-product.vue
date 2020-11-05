<template>
	<view class="v-root-item">
		<view :class="edit?'v-root-edit':'v-root-edit-preview'" :style="'background:'+proData.backgroundColor" @click="showState==0?togglePopup('bottom', 'popup'):''">
			<view class="v-item-pro" v-if="proData.template==1&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view>
					<image :style="'width:'+ (750-2*proData.pageMargin)+'rpx; height: '+((750-2*proData.pageMargin)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="showProImg"></image>
					<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750-2*proData.pageMargin)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
						<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
					</view>
				</view>
				<view class="v-pro-info">	
					<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{showProName1}}</text></view>
					<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{showProDetail}}</text></view>
					<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
						<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥66</text>
						<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
						<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
						<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
						<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
					</view>
					<view v-if="proData.textAlign=='center'">
						<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥66</text></view>
						<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
							<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
							<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-item-pro" v-if="proData.template==1&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in proData.proList" :key="index" :style="'margin-top:'+((index==0)?0:proData.imgMargin)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
					<view>
						<image :style="'width:'+ (750-2*proData.pageMargin)+'rpx; height: '+((750-2*proData.pageMargin)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'" :src="item.proData.imageList[0]"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750-2*proData.pageMargin)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info">	
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{item.proName}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{item.proData.productSellPoint}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥{{item.price}}</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥{{item.price}}</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="v-item-pro" v-if="proData.template==2&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in dataTwo" :key="index" :style="'display: inline-block;margin-left:'+(index==0?0:proData.imgMargin)+'rpx;margin-right:'+(index==1?0:proData.imgMargin)+'rpx;'" >
					<view :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx;'">
						<image :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx; height: '+((750/2-proData.pageMargin-proData.imgMargin)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="showProImg"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750/2-proData.pageMargin-proData.imgMargin)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{showProName2}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{showProDetail}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥66</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥66</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-item-pro1" v-if="proData.template==2&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in proData.proList" :key="index" :style="'display: inline-block;margin-left:'+(index%2==0?0:proData.imgMargin)+'rpx;margin-right:'+(index%2==1?0:proData.imgMargin)+'rpx;margin-top:'+((index<2)?0:proData.imgMargin)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
					<view :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx;'">
						<image :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx; height: '+((750/2-proData.pageMargin-proData.imgMargin)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="item.proData.imageList[0]"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750/2-proData.pageMargin-proData.imgMargin)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+ (750/2-proData.pageMargin-proData.imgMargin)+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{item.proName}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{item.productSellPoint}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥{{item.price}}</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥{{item.price}}</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="v-item-pro" v-if="proData.template==3&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in dataThree" :key="index" :style="'display: inline-block;margin-left:'+((index%3==0&&index%3!=1)?0:proData.imgMargin)+'rpx;margin-right:'+((index%3==2&&index%3!=1)?0:proData.imgMargin)+'rpx;'" >
					<view :style="'width:'+(750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx;'">
						<image :style="'width:'+ (750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx; height: '+((750/3-(proData.pageMargin*2-proData.imgMargin*4)/3)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="showProImg"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750/3-(proData.pageMargin*2-proData.imgMargin*4)/3)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+ (750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{showProName2}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{showProDetail}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥66</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥66</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-item-pro1" v-if="proData.template==3&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in proData.proList" :key="index" :style="'display: inline-block;margin-left:'+((index%3==0&&index%3!=1)?0:proData.imgMargin)+'rpx;margin-right:'+((index%3==2&&index%3!=1)?0:proData.imgMargin)+'rpx;margin-top:'+((index<3)?0:proData.imgMargin)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
					<view :style="'width:'+ (750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx;'">
						<image :style="'width:'+ (750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx; height: '+((750/2-proData.pageMargin-proData.imgMargin)/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="item.proData.imageList[0]"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(750/3-(proData.pageMargin*2-proData.imgMargin*4)/3)/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+ (750/3-(proData.pageMargin*2+proData.imgMargin*4)/3)+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{item.proName}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{item.productSellPoint}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥{{item.price}}</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥{{item.price}}</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<view class="v-item-pro" v-if="proData.template==4&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in dataThree" :key="index" :style="'display: inline-block;margin-left:'+(index%3==2?proData.imgMargin:0)+'rpx;margin-right:'+(index%3==1?proData.imgMargin:0)+'rpx;margin-top:'+((index<1)?0:proData.imgMargin)+'rpx'" >
					<view :style="'width:'+ (index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx;'">
						<image :style="'width:'+ (index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx; height: '+((index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="showProImg"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+(index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{showProName2}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{showProDetail}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥66</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥66</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-item-pro1" v-if="proData.template==4&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view v-for="(item,index) in proData.proList" :key="index" :style="'display: inline-block;margin-left:'+(index%3==2?proData.imgMargin:0)+'rpx;margin-right:'+(index%3==1?proData.imgMargin:0)+'rpx;margin-top:'+((index<1)?0:proData.imgMargin)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
					<view :style="'width:'+ (index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx;'">
						<image :style="'width:'+ (index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx; height: '+((index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="item.proData.imageList[0]"></image>
						<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-(index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
							<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
						</view>
					</view>
					<view class="v-pro-info" :style="'width:'+ (index%3==0?(750-proData.pageMargin*2):(750/2-proData.pageMargin-proData.imgMargin))+'rpx;'">	
						<view :style="'text-align:'+proData.textAlign+';'" class="v-two-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{item.proName}}</text></view>
						<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{item.productSellPoint}}</text></view>
						<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
							<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥{{item.price}}</text>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
							<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
							<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
						</view>
						<view v-if="proData.textAlign=='center'">
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥{{item.price}}</text></view>
							<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
								<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
								<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="v-item-pro1" v-if="proData.template==5&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view class="uni-flex uni-row" :style="'height:280rpx;margin-top:'+proData.imgMargin+'rpx;margin-bottom: '+proData.imgMargin+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'">
					<view class="text" style="width: 280rpx;">
						<view style="width: 280rpx; ">
							<image style="width: 280rpx; height: 280rpx; background-color: #eeeeee;" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="showProImg"></image>
							<view class="tag-view" style="position: absolute;margin: 0;margin-top:-280rpx;" v-if="proData.showContent[4].checked==true">
								<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
							</view>
						</view>
					</view>
					<view class="text" style="width: 20rpx;"></view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">
						<view>
							<view class="v-pro-info">	
								<view style="height: 200rpx;margin-top: 8rpx;margin-right: 5px;">
									<view class="v-two-line_data"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'" v-if="proData.showContent[0].checked==true">{{showProName2}}</text></view>
									<view class="v-one-line_data"><text class="t-pro-detail" v-if="proData.showContent[1].checked==true">{{showProDetail}}</text></view>
								</view>
								<view style="height: 37px;padding-top: 5px;bottom: 0;"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'" v-if="proData.showContent[2].checked==true">¥66</text>
									<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right;margin-right:5px"></image>
									<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right;margin-right:5px"></image>
									<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right;margin-right:5px"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
									<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right;margin-right:5px"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="v-item-pro1" v-if="proData.template==5&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:'+proData.pageMargin+'rpx'">
				<view class="uni-flex uni-row" v-for="(item,index) in proData.proList" :key="index" :style="'height:280rpx;margin-top:'+proData.imgMargin+'rpx;margin-bottom: '+proData.imgMargin+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
					<view class="text" style="width: 280rpx;">
						<view style="width: 280rpx;">
							<image style="width: 280rpx; height: 280rpx; background-color: #eeeeee;" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"  :src="item.proData.imageList[0]"></image>
							<view class="tag-view" style="position: absolute;margin: 0;margin-top:-280rpx;"  v-if="proData.showContent[4].checked==true">
								<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
							</view>
						</view>
					</view>
					<view class="text" style="width: 20rpx;"></view>
					<view class="text" style="-webkit-flex: 1;flex: 1;">
						<view>
							<view class="v-pro-info">	
								<view style="height: 200rpx;margin-top: 8rpx;margin-right: 5px;">
									<view class="v-two-line_data"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'" v-if="proData.showContent[0].checked==true">{{item.proName}}</text></view>
									<view class="v-one-line_data"><text class="t-pro-detail" v-if="proData.showContent[1].checked==true">{{item.proData.productSellPoint}}</text></view>
								</view>
								<view style="height: 37px;padding-top: 5px;bottom: 0;"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'" v-if="proData.showContent[2].checked==true">¥{{item.price}}</text>
									<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right;margin-right:5px"></image>
									<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right;margin-right:5px"></image>
									<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right;margin-right:5px"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
									<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right;margin-right:5px"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="v-item-pro1" v-if="proData.template==6&&proData.proList.length==0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:0rpx'">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H" v-for="(item,index) in dataFive" :key="index" :style="'margin-left:'+(index>0?proData.imgMargin:0)+'rpx;margin-right:'+(index<dataFive.length-1?proData.imgMargin:0)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" >
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view>
								<view>
									<image :style="'width:200rpx; height: '+(200/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"   :src="showProImg"></image>
									<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-200/proData.ratio)+'rpx;'" v-if="proData.showContent[4].checked==true">
										<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
									</view>
								</view>
								<view class="v-pro-info" style="width: 200rpx;">	
									<view :style="'text-align:'+proData.textAlign+';'" class="v-one-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{showProName1}}</text></view>
									<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{showProDetail}}</text></view>
									<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
										<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥66</text>
										<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
										<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
										<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
										<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
									</view>
									<view v-if="proData.textAlign=='center'">
										<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥66</text></view>
										<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
											<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
											<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="v-item-pro1" v-if="proData.template==6&&proData.proList.length>0" :style="'padding-left:'+proData.pageMargin+'rpx;padding-right:0rpx'">
				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
					<view id="demo1" class="scroll-view-item_H" v-for="(item,index) in proData.proList" :key="index" :style="'margin-left:'+(index>0?proData.imgMargin:0)+'rpx;margin-right:'+(index<proData.proList.length-1?proData.imgMargin:0)+'rpx;box-shadow:'+((proData.imgStyle==1)?showProImgStyle2:0)+';border-radius:'+proData.borderRadius+'px'" @click="comEvent(item)">
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view>
								<view>
									<image :style="'width:200rpx; height: '+(200/proData.ratio)+'rpx; background-color: #fff;'" :mode="proData.isFilled==1?'scaleToFill':'aspectFit'"   :src="item.proData.imageList[0]"></image>
									<view class="tag-view" :style="'position: absolute;margin: 0;margin-top:'+(-200/proData.ratio)+'rpx;'"  v-if="proData.showContent[4].checked==true">
										<uni-tag :mark="true" :text="proData.proMarker" type="error" size="small" />
									</view>
								</view>
								<view class="v-pro-info" style="width: 200rpx;">	
									<view :style="'text-align:'+proData.textAlign+';'" class="v-one-line_data" v-if="proData.showContent[0].checked==true"><text class="t-pro-name" :style="'font-weight:'+proData.fontWeight+';'">{{item.proName}}</text></view>
									<view :style="'text-align:'+proData.textAlign" class="v-one-line_data" v-if="proData.showContent[1].checked==true"><text class="t-pro-detail" >{{item.productSellPoint}}</text></view>
									<view style="height: 37px;padding-top: 5px;" v-if="proData.textAlign=='left'">
										<text v-if="proData.showContent[2].checked==true" class="t-pro-price" :style="'font-weight:'+proData.fontWeight">¥{{item.price}}</text>
										<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==1" :src="btnBuy1" style="width:24px;height:24px;float:right"></image>
										<image v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==2" :src="btnBuy2" style="width:24px;height:24px;float:right"></image>
										<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==3" class="tag-view" style="width:60px;float:right"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view>
										<view v-if="proData.showContent[3].checked==true&&proData.buyBtnStyle==4" class="tag-view" style="width:45px;float:right"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view>
									</view>
									<view v-if="proData.textAlign=='center'">
										<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[2].checked==true"><text class="t-pro-price" :style="'font-weight:'+proData.fontWeight+';'">¥{{item.price}}</text></view>
										<view :style="'text-align:'+proData.textAlign" v-if="proData.showContent[3].checked==true">
											<view v-if="proData.buyBtnStyle==3" class="v-btn-buy"><view class="tag-view"><uni-tag :circle="true" text="马上抢" type="error" size="small" /></view></view>
											<view v-if="proData.buyBtnStyle==4" class="v-btn-buy2"><view class="tag-view"><uni-tag :inverted="true" text="购买" type="error" size="small" /></view></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
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
											<radio value="1" :checked="(proData.template==1)?true:false"  /><text>大图模式</text>
										</label>
										<label style="margin-left: 20rpx;">
											<radio value="2" :checked="(proData.template==2)?true:false" /><text>一行两个</text>
										</label>
									</view>
								    <view class="flex-item flex-item-V" style="margin-top: 20rpx;">
										<label>
											<radio value="3" :checked="(proData.template==3)?true:false" /><text>一行三个</text>
										</label>
										<label style="margin-left: 20rpx;">
											<radio value="4" :checked="(proData.template==4)?true:false"  /><text>一大两小</text>
										</label>
									</view>
								    <view class="flex-item flex-item-V" style="margin-top: 20rpx;">
										<label>
											<radio value="5" :checked="(proData.template==5)?true:false" /><text>详细列表</text>
										</label>
										<label style="margin-left: 20rpx;">
											<radio value="6" :checked="(proData.template==6)?true:false" /><text>横向滚动</text>
										</label>
									</view>
								</view>
							</radio-group>
							</view>
						</view>
					</view>
					
					<view class="uni-flex uni-row" style="display: none;">
						<view class="text" style="width: 180rpx;"><view class="title">选择商品</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;margin-top: 20rpx;">
							<view @click="toSelectProduct" class="v-select-pro-icon uni-flex" style="-webkit-flex: 1;flex: 1;height: 100rpx;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;align-items: center;">
								<text style="font-size: 38rpx;">+</text>
							</view>
						</view>
						
					</view>	
					<view class="uni-list list-pd">
							<view class="uni-list-cell cell-pd">
								<view class="uni-uploader">
									<view class="uni-uploader-head">
										<view class="uni-uploader-title">选择商品</view>
										<view class="uni-uploader-info">{{proData.proList.length}}/20</view>
									</view>
									<view class="uni-uploader-body">
										<view class="uni-uploader__files">
											<block v-for="(item,index) in proData.proList" :key="index">
												<view class="uni-uploader__file">
													<image class="uni-uploader__img" :src="item.proData.imageList[0]" ></image>
													<view class="v-img-bak"></view>
													<image class="image-left" :src="imageLeft" :data-src="index" @tap="toLeftImage"></image>
													<image class="image-right" :src="imageRight" :data-src="index" @tap="toRightImage"></image>
													<image class="image-del" :src="imageDel" :data-src="index" @tap="delImage"></image>												
													
												</view>
											</block>
											<view class="uni-uploader__input-box">
												<view class="uni-uploader__input" @tap="toSelectProduct"></view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
			
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">页面边距</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="proData.pageMargin" max='60' show-value @change="setPageMarginValue"></slider>
						</view>
					</view>					
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">商品间距</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<slider :value="proData.imgMargin" max='60' show-value @change="setImgMarginValue"></slider>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">商品样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgShadowValue">
								<label>
									<radio value="0" :checked="(proData.imgStyle==0)?true:false" /><text>无边白底</text>
								</label>
								<label>
									<radio value="1" :checked="(proData.imgStyle==1)?true:false" /><text>卡片投影</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图片比例</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgRatioValue">
								<label>
									<radio value=1 :checked="(proData.ratio==1)?true:false" /><text>1:1</text>
								</label>
								<label>
									<radio value=1.5 :checked="(proData.ratio==1.5)?true:false" /><text>3:2</text>
								</label>
								<label>
									<radio value=0.75 :checked="(proData.ratio==0.75)?true:false" /><text>3:4</text>
								</label>
								<label>
									<radio value=1.8 :checked="(proData.ratio==1.8)?true:false" /><text>16:9</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">图片填充</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setImgIsFilledValue">
								<label>
									<radio value="0" :checked="(proData.isFilled==0)?true:false" /><text>周边留白</text>
								</label>
								<label>
									<radio value="1" :checked="(proData.isFilled==1)?true:false" /><text>填充</text>
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
									<radio value="0" :checked="(proData.borderRadius==0)?true:false" /><text>直角</text>
								</label>
								<label>
									<radio value="8" :checked="(proData.borderRadius==8)?true:false" /><text>圆角</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文本样式</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setFontWeightValue">
								<label>
									<radio value="normal" :checked="(proData.fontWeight=='normal')?true:false" /><text>常规体</text>
								</label>
								<label>
									<radio value="bold" :checked="(proData.fontWeight=='bold')?true:false" /><text>加粗体</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">文本对齐</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setTextAlignValue">
								<label>
									<radio value="left" :checked="(proData.textAlign=='left')?true:false" /><text>左对齐</text>
								</label>
								<label>
									<radio value="center" :checked="(proData.textAlign=='center')?true:false" /><text>居中对齐</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="text" style="width: 180rpx;"><view class="title">显示内容</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<checkbox-group name="loves" @change="setShowContentValue">
								<label v-for="item in proData.showContent" :key="item.value">
									<checkbox :value="item.value" :checked="item.checked" /><text>{{item.name}}</text>
									<text>\n</text>
								</label>
							</checkbox-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="proData.showContent[3].checked==true">
						<view class="text" style="width: 180rpx;"><view class="title">购买按钮</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setBuyBtnStyleValue">
								<label>
									<radio value="1" :checked="(proData.buyBtnStyle==1)?true:false" :disabled="proData.textAlign=='center'?true:false"/><text>样式1</text>
								</label>
								<label>
									<radio value="2" :checked="(proData.buyBtnStyle==2)?true:false"  :disabled="proData.textAlign=='center'?true:false" /><text>样式2</text>
								</label>
								<label>
									<radio value="3" :checked="(proData.buyBtnStyle==3)?true:false" /><text>样式3</text>
								</label>
								<label>
									<radio value="4" :checked="(proData.buyBtnStyle==4)?true:false" /><text>样式4</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row" v-if="proData.showContent[4].checked==true">
						<view class="text" style="width: 180rpx;"><view class="title">商品角标</view></view>
						<view class="text" style="-webkit-flex: 1;flex: 1;">
							<view class="v-right-txt">
							<radio-group name="gender" @change="setProMarkerValue">
								<label>
									<radio value="新品" :checked="(proData.proMarker=='新品')?true:false" /><text>新品</text>
								</label>
								<label>
									<radio value="热卖" :checked="(proData.proMarker=='热卖')?true:false" /><text>热卖</text>
								</label>
								<label>
									<radio value="NEW" :checked="(proData.proMarker=='NEW')?true:false" /><text>NEW</text>
								</label>
								<label>
									<radio value="HOT" :checked="(proData.proMarker=='HOT')?true:false" /><text>HOT</text>
								</label>
							</radio-group>
							</view>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniSection from '@/components/uni-ui/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue'
	import uniTag from '@/components/uni-ui/uni-tag/uni-tag.vue'
	export default {
		props:["toChildData","showState"],
		components: {
			uniSection,
			uniPopup,
			uniIcons,
			uniTag
		},
		created:function(){
			var that = this;
			that.proData = that.toChildData;
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.windowWidth = windowWidth;
			this.mProImgWidth = windowWidth-28;
		},
		data() {
			return {
				type: "",
				edit: false,
				old: {
					scrollTop: 0
				},
				windowWidth:350,
				proData:{},
				dataOne:[1],
				dataTwo:[1,2],
				dataThree:[1,2,3],
				dataFive:[1,2,3,4,5],
				mProImgWidth:0,
				imageDel:'/static/img/del.png',
				imageRight:'/static/img/right.png',
				imageLeft:'/static/img/left.png',
				skuDel:'/static/img/del2.png',
				btnBuy1:'/static/img/buy.png',
				btnBuy2:'/static/img/buy2.png',
				showProName1:'这里显示商品名称，最多显示一行',
				showProName2:'这里显示商品名称，最多显示两行',
				showProDetail:'这里显示商品描述',
				showProImg:'/static/img/pro-img-default.jpg',
				showProImgStyle2:'0 2px 8px rgba(93,113,127,.08)',
			}
		},
		methods: {
			togglePopup(type, open) {
				this.$data.edit = true;
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
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
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
			toSelectProduct(e){
				// this.$refs.zxProductList.showPageList();
				var that = this;
				uni.$once('update',function(data){
					for(let item in data.msg){
						that.proData.proList.push(data.msg[item])
					}
					that.$emit("changeData",that.proData);
				})
				uni.navigateTo({
					url: '/pages/goods/goods-list?v=1'				,
					});
			},

			delImage(e) {
				this.proData.proList.splice(e.target.dataset.src,1);
				this.$emit("changeData",this.proData);
			},
			toLeftImage(e){
				if(e.target.dataset.src>0){
					this.proData.proList[e.target.dataset.src] = this.proData.proList.splice(e.target.dataset.src-1, 1, this.proData.proList[e.target.dataset.src])[0]
					this.$emit("changeData",this.proData);
				}
			},
			toRightImage(e){
				if(e.target.dataset.src+1<this.proData.proList.length){
					this.proData.proList[e.target.dataset.src] = this.proData.proList.splice(e.target.dataset.src+1, 1, this.proData.proList[e.target.dataset.src])[0]
					this.$emit("changeData",this.proData);
				}
			},
			/**
			 * 选择模板
			 */
			setTemplateValue(e){
				this.proData.template = e.target.value;
				this.$emit("changeData",this.proData);
			},
			setPageMarginValue(e){
				this.proData.pageMargin = e.detail.value;
				this.$emit("changeData",this.proData);
			},
			setImgMarginValue(e){
				this.proData.imgMargin = e.detail.value;
				this.$emit("changeData",this.proData);
			},
			setImgBorderRadiusValue(e){
				this.proData.borderRadius = e.target.value;
				this.$emit("changeData",this.proData);
			},
			setImgRatioValue(e){
				this.proData.ratio = e.target.value;
				this.$emit("changeData",this.proData);				
			},
			setImgShadowValue(e){
				this.proData.imgStyle = e.target.value;
				this.$emit("changeData",this.proData);				
			},
			setImgIsFilledValue(e){
				this.proData.isFilled = e.target.value;
				this.$emit("changeData",this.proData);					
			},
			setFontWeightValue(e){
				this.proData.fontWeight = e.target.value;
				this.$emit("changeData",this.proData);					
			},
			setTextAlignValue(e){
				this.proData.buyBtnStyle = 3;
				this.proData.textAlign = e.target.value;
				this.$emit("changeData",this.proData);					
			},
			setBuyBtnStyleValue(e){
				this.proData.buyBtnStyle = e.target.value;
				this.$emit("changeData",this.proData);					
			},
			setProMarkerValue(e){
				this.proData.proMarker = e.target.value;
				this.$emit("changeData",this.proData);					
			},
			setShowContentValue(e){
				var items = this.proData.showContent,
                values = e.detail.value;
                for (var i = 0, lenI = items.length; i < lenI; ++i) {
                    const item = items[i]
                    if(values.includes(item.value)){
                        this.$set(item,'checked',true)
						this.proData.showContent[i].checked = true
                    }else{
                        this.$set(item,'checked',false)
						this.proData.showContent[i].checked = false
                    }
                }
				this.$emit("changeData",this.proData);	
			},
			comEvent(item){
				if(this.showState==0){
					return;
				}
				uni.navigateTo({
				    url: '/pagesI/goods/goods-detail?id='+item._id
				});
			}
		}
	}
</script>
<style>

	.v-root-item {
		position: relative;
		background-color: #FFFFFF;
	}

	.v-root-edit {
		position: relative;
		min-height: 10px;
		border: 1px dashed #38f;
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

	.v-pro-info{
/* 		padding-left: 5px;
		padding-right: 5px; */
	}
	.t-pro-name{
		font-size: 14px;
	    line-height: 20px;
	    max-height: 20px;
	    margin-bottom: 5px;
	}
	.t-pro-detail{
		font-size: 12px;
		line-height: 16px;
		color: #999;
		height: 16px;
	}
	.t-pro-price{
		color: #f44;
		height: 16px;
		line-height: 16px;
		font-size: 16px;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H {
		display: inline-block;
		margin-right: 20rpx;
		font-size: 36upx;
		margin-bottom: 10px;
	}
	
	.scroll-Y {
		height: 700rpx;
	}
	.v-right-txt{
		padding-top: 9rpx;
	}
	.t-select-pro-icon-add{
	 
	}
	.v-select-pro-icon {
		border: 1px dashed #ddd;
		background-color: #fff;
		width: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
	}
	.uni-uploader__img{
		position: absolute;
	}
	.uni-uploader__input-box{
		width: 150rpx;
		height: 150rpx;
	}
	.image-del{
		position: absolute;
		margin-top: 100upx;
		margin-left: 100upx;
		width: 50upx;
		height: 50upx;
	}
	.image-left{
		position: absolute;
		margin-top: 100upx;
		width: 50upx;
		height: 50upx;
	}
	.image-right{
		position: absolute;
		margin-top: 100upx;
		margin-left: 50upx;
		width: 50upx;
		height: 50upx;
	}
	.uni-uploader__img{
		position: absolute;
	}
	.v-img-bak{
		position: absolute;
		margin-top: 100upx;
		width: 150upx;
		height:50upx;
		background-color: #bfbfbf; 
		opacity: 0.6;
	}
	.cell-pd {
		padding: 22upx 30upx;
	}
	.list-pd {
		margin-top: 50upx;
	}
	.uni-uploader__file {
		margin: 10rpx;
		width: 150rpx;
		height: 150rpx;
	}
	.uni-uploader__img {
		display: block;
		width: 150rpx;
		height: 150rpx;
	}
	.v-text{
		display: inline-block;
		margin-left: 25rpx;
	}
	.i-image{
		background-color: #EEEEEE;
	}
	.v-btn-buy{
		width: 68px;
		margin: 0 auto;
	}
	.v-btn-buy2{
		width: 55px;
		margin: 0 auto;
	}
	.v-one-line_data{
		overflow: hidden;
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	.v-two-line_data{
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
