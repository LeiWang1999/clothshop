<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">电话</text>
			<input class="input" type="number" v-model="mobile" placeholder="自提点联系电话" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">{{address + " " +addressName}}</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>

		<view class="uni-title uni-common-pl">接待时间（每天重复）</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">开始时间</view>
				<view class="uni-list-cell-db">
					<picker class="time-picker" mode="multiSelector" @change="bindStartMultiPickerChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{startTime}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">结束时间</view>
				<view class="uni-list-cell-db">
					<picker class="time-picker" mode="multiSelector" @change="bindEndMultiPickerChange" :value="multiEndIndex" :range="multiArray">
						<view class="uni-input">{{endTime}}</view>
					</picker>
				</view>
			</view>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import myCloud from "@/common/util/cloud.js";
	import myConst from "@/common/util/const.js";
	import myUtil from "@/common/util/util.js";
	import { getDataById,addData,editData } from '@/common/api/selfget.js'
	export default {
		props: {
			sTime: {
				//开始小时
				type: [Number, String],
				default: "6"
			},
			cTime: {
				//结束小时
				type: [Number, String],
				default: "24"
			},
			timeNum: {
				//延迟小时
				type: [Number, String],
				default: "0"
			},
			interval: {
				//分钟间隔
				type: [Number, String],
				default: "30"
			},
			sDay: {
				//开始天数
				type: [Number, String],
				default: "0"
			},
			dayNum: {
				//预约天数
				type: [Number, String],
				default: "7"
			}
		},
		data() {
			return {
				action: "",
				id: "",
				startTime: "8:00",
				endTime: "20:00",
				mobile: "",
				address: "在地图选择",
				addressName: "",
				sDayNum: 0,
				multiArray: [
					[0, 1, 2, 3, 4, 5, 6],
					[0, 10, 20]
				],
				multiIndex: [2, 0],
				multiEndIndex: [14, 0],
				multiSelector: ""
			};
		},
		onLoad(option) {
			let title = "新增自提点";
			if (option.id != undefined) {
				title = "编辑自提点";
				console.log(option.id);
				this.id = option.id;
				this.action = myConst.ACTION.EDIT;
				this.getData();
			} else {
				this.action = myConst.ACTION.ADD;
			}

			uni.setNavigationBarTitle({
				title
			});
		},
		beforeMount() {
			this.pickerTap();
		},
		methods: {
			async getData() {
				const data = {
					_id: this.id
				}
				const res = await getDataById(data)
				if (res.length > 0) {
					this.mobile = res[0].mobile;
					this.address = res[0].address;
					this.addressName = res[0].addressName;
					this.startTime = res[0].startTime;
					this.endTime = res[0].endTime;
				}
			},

			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: data => {
						this.address = data.address;
						this.addressName = data.name;
					}
				});
			},

			//提交
			async confirm() {
				if (!this.mobile) {
					this.$api.msg("请填写联系电话");
					return;
				}
				if (this.address == "在地图选择") {
					this.$api.msg("请在地图选择所在位置");
					return;
				}
				const data = {
						_id: this.id,
						mobile: this.mobile,
						address: this.address,
						addressName: this.addressName,
						startTime: this.startTime,
						endTime: this.endTime,
						updatetime: new Date().getTime()
				}
				if(this.action == myConst.ACTION.ADD){
					const res = await addData(data)
				}else{
					const res = await editData(data)
				}
				uni.showToast({
					title: "提交成功",
					icon: "none"
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			},

			timeFormat: function(num) {
				if (num < 10 && (num + "").length == 1) {
					return "0" + num;
				}
				return num;
			},
			pickerTap: function() {
				let date = new Date();
				let monthDay = [];
				let hours = [];
				let minute = [];
				this.sDayNum = this.sDay;

				// 时
				let date1 = new Date(date);
				let sT = +this.sTime;
				let eT = +this.cTime;

				if (sT <= eT) {
					let h = sT;
					h = h + parseInt(this.timeNum);
					if (h > eT || this.sDayNum > 0) {
						this.sDayNum =
							this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
						for (let i = sT; i <= eT; i++) {
							hours.push(this.timeFormat(i) + "时");
						}
					} else {
						for (let i = h; i <= eT; i++) {
							hours.push(this.timeFormat(i) + "时");
						}
					}
				} else {
					let h = sT;
					h = h + parseInt(this.timeNum);
					if ((h > eT && h < sT) || h > 23 || this.sDayNum > 0) {
						this.sDayNum =
							this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
						for (let i = 0; i <= 23; i++) {
							if (i < sT && i > eT) {} else {
								hours.push(this.timeFormat(i) + "时");
							}
						}
					} else {
						for (let i = h; i <= 23; i++) {
							if (i < sT && i > eT) {} else {
								hours.push(this.timeFormat(i) + "时");
							}
						}
					}
				}

				// 月-日
				for (
					let i = +this.sDayNum; i <= parseInt(this.sDayNum) + parseInt(this.dayNum); i++
				) {
					let date1 = new Date(date);
					date1.setDate(date.getDate() + i);
					let md =
						date1.getFullYear() +
						"-" +
						this.timeFormat(date1.getMonth() + 1) +
						"-" +
						this.timeFormat(date1.getDate());
					monthDay.push(md);
				}

				let inter = +this.interval < 60 ? +this.interval : 59;
				// 分
				for (let i = 0; i < 60; i += inter) {
					minute.push(i < 10 ? "0" + i + "分" : i + "分");
				}

				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};

				// data.multiArray[0] = monthDay;
				data.multiArray[0] = hours;
				data.multiArray[1] = minute;
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			bindStartMultiPickerChange(e) {
				this.multiIndex = e.detail.value;
				let da = this.multiArray;
				let di = e.detail.value;
				let caseDate =
					da[0][di[0]].replace("时", ":") +
					this.timeFormat(da[1][di[1]].replace("分", ""));
				this.startTime = caseDate;
			},
			bindEndMultiPickerChange(e) {
				this.multiIndex = e.detail.value;
				let da = this.multiArray;
				let di = e.detail.value;
				let caseDate =
					da[0][di[0]].replace("时", ":") +
					this.timeFormat(da[1][di[1]].replace("分", ""));
				this.endTime = caseDate;
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(0.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
