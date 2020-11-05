<template xlang="wxml" minapp="mpvue">
	<view class="tki-tree" @touchmove.stop="">
		<view class="tki-tree-mask" :class="{'show':showTree}" @tap="_cancel"></view>
		<view class="tki-tree-cnt" :class="{'show':showTree}">
			<view class="tki-tree-bar">
				<view class="tki-tree-bar-cancel" :style="{'color':cancelColor}" hover-class="hover-c" @tap="_cancel">取消</view>
				<view class="tki-tree-bar-title" :style="{'color':titleColor}">{{title}}</view>
				<view class="tki-tree-bar-confirm" :style="{'color':confirmColor}" hover-class="hover-c" @tap="_confirm">确定</view>
			</view>
			<view class="tki-tree-view">
				<scroll-view class="tki-tree-view-sc" :scroll-y="true">
					<block v-for="(item, index) in treeList" :key="index">
						<view class="tki-tree-item" :style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]" :class="{
							border: border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild
						}">
							<view class="tki-tree-label" @tap.stop="_treeItemTap(item, index)">
								<image class="tki-tree-icon" :src="item.lastRank ? lastIcon : item.showChild ? currentIcon : defaultIcon"></image>
								{{item.name}}
							</view>
							<view class="tki-tree-check" @tap.stop="_treeItemSelect(item, index)" v-if="selectParent?true:item.lastRank">
								<view class="tki-tree-check-yes" v-if="item.checked==1" :class="{'radio':!multiple}" :style="{'border-color':confirmColor}">
									<view class="tki-tree-check-yes-b" :style="{'background-color':confirmColor}"></view>
								</view>
								<view class="tki-tree-check-yes" v-else-if="item.checked==2" :class="{'radio':!multiple}" :style="{'border-color':confirmColor}">
									<view class="tki-tree-check-yes-b" style="background-color:#0081FF"></view>
								</view>
								<view class="tki-tree-check-no" v-else :class="{'radio':!multiple}" :style="{'border-color':confirmColor}"></view>
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "tki-tree",
	props: {
		range: {
			type: Array,
			default: function () {
				return []
			}
		},
		rangeKey: {
			type: String,
			default: 'label'
		},
		title: {
			type: String,
			default: ''
		},
		multiple: { // 是否可以多选
			type: Boolean,
			default: false
			// default: true
		},
		selectParent: { //是否可以选父级
			type: Boolean,
			default: false
		},
		confirmColor: { // 确定按钮颜色
			type: String,
			default: '' // #07bb07
		},
		cancelColor: { // 取消按钮颜色
			type: String,
			default: '' // #757575
		},
		titleColor: { // 标题颜色
			type: String,
			default: '' // #757575
		},
		currentIcon: { // 展开时候的ic
			type: String,
			default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEQ0QTM0MzQ1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ0QTM0MzU1Q0RBMTFFOUE0MjY4NzI1Njc1RjI1ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRDRBMzQzMjVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRDRBMzQzMzVDREExMUU5QTQyNjg3MjU2NzVGMjU4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PidwepsAAAK0SURBVHja7JxbTsJAFIYHww7ciStgCeoGvGxAiOsgURegoL5720AXYLiIr0aJviq3Zx3PhIEnKG3ndtr+f3KixrSUj/ZjzjClIqUUiFm2gAAQAREQEUAEREAERAQQAREQAREBREAEREBEEqa67h9RFDWllDv0awWYlqlQHmu1WjMRRMoV1QFttA12y3xRtdNczq8EsE4/f8FumX2q77ROvNXk8UGMEKdUz6tYJHljaZAbuyUH+UR1to5BEohTuqwPCeS4pAA/qY6o/kyHOAMCeRK3owJnj+rH1jjxhqpVsstaebCz6TmnHWyXyY+xHjSBWBY/bvSgadtXBj9u9KCN3rnIfkzkQVsTEEX0Y2IP2oKo/HhMICcFAThUcwVZNGU6FdbX/XURzkbVF4+ybGhjPrFdgP66QdXNurGtSdk6Xdb9nAJ8oDo3OQlsQZzkdPw41ONBo6vI5scDefRjZg+6gpg3Pxp50CXEvPjR2IOuIXL3oxUPuobI3Y9WPOgDIlc/WvOgL4iL/vqFCcD7LH0xB4hj7cfQ/fWH9qCT+FhG0tN+DBk1PzjOM0SVllixcsBT1AvYc/kAPhc0hRg/3uvxoCgKRN9+dOrBUBB9+9GpB0NC9OVH5x4MDdG1H714kANEV3705kEOEBf9dcPi/lQnsuvLg1wgSu3Ha0v7Uh4MMgUXeuG71H407a+VBy9CPQkOdw+MtB+nGbd/D+FBbhBNxo9SjwcngJjNj0E9yBFiFj8G9SBXiGn8GNyDnCEm8SMLD3KHGOdHNh7kDjHOj2w8mAeIi/5arX+c6b/fxHz9oADEdGdjR/fXCw/OOB5oVfCOgnepz8IB14PMw03jCmTE+QBx5z0gAmKSqK9OUF+hcAeIhu/QYr4Qie8rjW83hhMBERARQAREQAREBBABERCLnH8BBgA+TQI7U4t53AAAAABJRU5ErkJggg=='
		},
		defaultIcon: { // 折叠时候的ic
			type: String,
			default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAACE0lEQVR4Xu3c200DMRCF4XEltJAOkEugA+ggpUAHoQMqiFMCdEAJUMEiS4mEELlIO7bPOeN9i6K1rG/952myyea1WiCtXmEuYBPR4RBMxInoIOCwhOtJLKVszWyXc/5y2BvNEq6I+/3+kFK6M7OHnPM7jcLKjbZAvD/uaZtzflm5P4rbWyJWgDcze1LPuzVihfxUz7sH4ilJ2bx7Isrm3RtRMu8RiHJ5j0SUyXs0okTeCIj0eSMh0uaNhkiZNyIiXd7IiDR5oyNS5M2ACJ83EyJs3myIkHkzIsLlzYwIkzc7IkTeCojD81ZCHJa3GuKQvBURu+etjNgtb3XELnlHQGyedyTEZnlHQ2ySd0RE97wjI7rlHR3RJe+JeIrbLOecD6ePpZQ6W1kn2epo4MUrPOKyLN8ppYq1+y1VStncOjIdGnFZlo+U0uOtWOeOY2TE12Ouq//pEA7xXL7XfvcufR8K0Svfv6CREN3yDYfYIt9QiK3yjYTYLF95xB75SiP2ylcZsVu+cogj8pVCHJWvEuKwfOkREfKlRkTJlxkRJl86RMR8qRBR82VChM0XHpEhX2hElnyREWnyhUNkzBcKkTVfJETafIcjKuQ7FFEl35GIMvl2R1TMtyuiar49EWXzbY5oZpv/hibXTF2h3+s60FRKeT6+3TjMS3nrA3ZFRD8xrfY3ER1kJ+JEdBBwWGKeRAfEH1wS5WFZSDB/AAAAAElFTkSuQmCC'
		},
		lastIcon: { // 没有子集的ic
			type: String,
			default: ''
		},
		border: { // 是否有分割线
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			showTree: false,
			treeList: [],
			selectIndex: -1,
			initList: [],
			tmpList: []
		}
	},
	computed: {
	},
	methods: {
		_show(d) {
			this.treeList = [];
			this._renderTreeList(this.initList);
			for(let i in d){
				for(let j in d[i].data){
					for(let k in this.treeList){
						if(d[i].data[j].id == this.treeList[k].id&&d[i].data[j].checked==1){
							this.treeList.splice(k,1);
						}
					}
				}
			}
			for(let k in this.treeList){
				if(this.treeList[k].checked==2){
					this.treeList[k].checked = 0;
				}
			}
			this.showTree = true
		},
		_showEdit(d,index) {
			this.treeList = [];
			this._renderTreeList(this.initList);
			console.log(this.treeList)
			for(let j in d[index].data){
				for(let k in this.treeList){
					if(d[index].data[j].id == this.treeList[k].id){
						this.treeList[k].checked = d[index].data[j].checked;
					}
				}
			}
			//删除 其他选中好的数据
			for(let i in d){
				for(let j in d[i].data){
					for(let k in this.treeList){
						if(i!=index&&this.treeList[k].id==d[i].data[j].id&&d[i].data[j].checked!=2){
							this.treeList.splice(k,1);
						}
					}
				}
			}
			this.showTree = true
		},
		_hide() {
			this.showTree = false
		},
		_cancel() {
			this._hide()
			this.$emit("cancel", '');
		},
		_confirm() {
			// 处理所选数据
			let rt = [], obj = {};
			this.treeList.forEach((v, i) => {
				if (this.treeList[i].checked==1||this.treeList[i].checked==2) {
					obj = {}
					obj.parents = this.treeList[i].parents
					obj.checked = this.treeList[i].checked
					obj = Object.assign(obj, this.treeList[i].source)
					// 移除子元素
					delete obj.children
					rt.push(obj)
				}
			})
			if(rt.length>0){
				this._hide()
				this.$emit("confirm", rt);
			}else{
				uni.showToast({
					title:"数据不能我空",
					icon:"none"
				})
			}
			
		},
		//扁平化树结构
		_renderTreeList(list = [], rank = 0, parentId = [], parents = []) {
			list.forEach(item => {
				this.treeList.push({
					id: item.id,
					name: item[this.rangeKey],
					source: item,
					parentId,  // 父级id数组
					parents,  // 父级id数组
					rank,  // 层级
					showChild: false,  //子级是否显示
					show: rank === 0,  // 自身是否显示
					checked: 0,
				})
				if (Array.isArray(item.children) && item.children.length > 0) {
					let parentid = [...parentId], parentArr = [...parents];
					delete parentArr.children
					parentid.push(item.id);
					parentArr.push({ id: item.id, [this.rangeKey]: item[this.rangeKey] })
					this._renderTreeList(item.children, rank + 1, parentid, parentArr);
				} else {
					this.treeList[this.treeList.length - 1].lastRank = true;
				}
			})
			this.tmpList = this.treeList;
		},
		// 点击
		_treeItemTap(item, index) {
			if (item.lastRank === true) {
				//点击最后一级时触发事件
				this._setCurrentData(index,this.treeList[index].checked)
				this.treeList[index].checked = this.treeList[index].checked==1?0:1
				this._fixMultiple(index)
				return;
			}
			let list = this.treeList;
			let id = item.id;
			item.showChild = !item.showChild;
			list.forEach((childItem, i) => {
				if (item.showChild === false) {
					//隐藏所有子级
					if (!childItem.parentId.includes(id)) {
						return;
					}
					if (childItem.lastRank !== true) {
						childItem.showChild = false;
					}
					childItem.show = false;
				} else {
					if (childItem.parentId[childItem.parentId.length - 1] === id) {
						childItem.show = true;
					}
				}
			})
		},
		_treeItemSelect(item, index) {
			this._setCurrentData(index,this.treeList[index].checked)
			this.treeList[index].checked = this.treeList[index].checked==1?0:1
			this._fixMultiple(index)
		},
		// 处理单选多选
		_fixMultiple(index) {
			if (!this.multiple) {
				// 如果是单选
				this.treeList.forEach((v, i) => {
					if (i != index) {
						this.treeList[i].checked = 0
					}
				})
			}
		},
		// 重置数据
		_reTreeList() {
			this.treeList.forEach((v, i) => {
				this.treeList[i].checked = 0
			})
		},
		_setCurrentData(index,value){
			//value 1选中 2待选 0未选中
			//取消选中  处理父节点  
			//条件 1、同级的其他节点没有  2、同级的其他节点都没选中 3、同级的其他节点都选中
			//取消的时候 处理上一级显示问题
			console.log(this.treeList)
				if(this.treeList[index].parentId.length>0){
					
					let tjArray = [];
					let sjArray = [];
					
					if(this.treeList[index].parentId.length==1){
						for(let t1 in this.initList){
							if(this.initList[t1].id == this.treeList[index].parentId[0]){
								for(let t2 in this.initList[t1].children){
									let d = this.initList[t1].children;
									if(d[t2].id!=this.treeList[index].id){
										tjArray.push(d[t2].id);
									}
								}
								break;
							}
						}
					}
					
					if(this.treeList[index].parentId.length==2){
						for(let t1 in this.initList){
							if(this.initList[t1].id == this.treeList[index].parentId[0]){
								for(let t2 in this.initList[t1].children){
									sjArray.push(this.initList[t1].children[t2].id)
									if(this.initList[t1].children[t2].id==this.treeList[index].parentId[1]){
										for(let t3 in this.initList[t1].children[t2].children){
											if(this.initList[t1].children[t2].children[t3].id!=this.treeList[index].id){
												tjArray.push(this.initList[t1].children[t2].children[t3].id);
											}
										}
									}
								}
								break;
							}
						}
					}
					
					let count = 0;
					let count2 = 0;
					for(let z1 in tjArray){
						for(let z2 in this.treeList){
							if(tjArray[z1]==this.treeList[z2].id){
								if(this.treeList[z2].checked==0&&index!=z2){
									count++;
								}
								if(this.treeList[z2].checked==1&&index!=z2){
									count2++;
								}
								break;
							}
						}
					}
					if(tjArray.length==count&&count>0){  //说明其他同级节点 都没有选中
						for(let item1 in this.treeList[index].parentId){
							for(let item2 in this.treeList){
								if(this.treeList[item2].id == this.treeList[index].parentId[item1]){
									this.treeList[item2].checked = value==1?0:2;
									break;
								}
							}				
						}
					}
					
					if(tjArray.length!=count&&count>0){
						for(let item1 in this.treeList[index].parentId){
							for(let item2 in this.treeList){
								if(this.treeList[item2].id == this.treeList[index].parentId[item1]){
									this.treeList[item2].checked = 2;
									break;
								}
							}				
						}
					}
					
					if(tjArray.length==count2&&count2>0){  //说明其他同级节点 都有选中
						for(let item1 in this.treeList[index].parentId){
							for(let item2 in this.treeList){
								if(this.treeList[item2].id == this.treeList[index].parentId[item1]){
									this.treeList[item2].checked = value==1?2:1;
									break;
								}
							}				
						}
					}
					
					
					
					if(tjArray.length==0){
						for(let item1 in this.treeList[index].parentId){
							for(let item2 in this.treeList){
								if(this.treeList[item2].id == this.treeList[index].parentId[this.treeList[index].parentId.length==1?0:1]){
									this.treeList[item2].checked = value==1?0:1;
									break;
								}
							}				
						}
					}
					
					//TODO 上级节点
					if(sjArray.length==0&&this.treeList[index].parentId.length==2){
						for(let item1 in this.treeList[index].parentId){
							for(let item2 in this.treeList){
								if(this.treeList[item2].id == this.treeList[index].parentId[0]){
									this.treeList[item2].checked = value==1?0:1;
									break;
								}
							}				
						}
					}
					
					if(sjArray.length>0){
						let count3 = 0;
						let count4 = 0;
						for(let z1 in sjArray){
							for(let z2 in this.treeList){
								if(sjArray[z1]==this.treeList[z2].id){
									if(this.treeList[z2].checked==0&&this.treeList[index].parentId[0].id!=this.treeList[z2].id){
										count3++;
									}
									if(this.treeList[z2].checked==1&&this.treeList[index].parentId[0].id!=this.treeList[z2].id){
										count4++;
									}
									break;
								}
							}
						}
						
						if(sjArray.length==count3&&count3>0){  //说明其他同级节点 都没有选中
							for(let item1 in this.treeList[index].parentId){
								for(let item2 in this.treeList){
									if(this.treeList[item2].id == this.treeList[index].parentId[0]){
										this.treeList[item2].checked = value==1?0:2;
										break;
									}
								}				
							}
						}
						
						if(sjArray.length!=count3&&count3>0){
							for(let item1 in this.treeList[index].parentId){
								for(let item2 in this.treeList){
									if(this.treeList[item2].id == this.treeList[index].parentId[0]){
										this.treeList[item2].checked = 2;
										break;
									}
								}				
							}
						}
						
						if(sjArray.length==count4&&count4>0){  //说明其他同级节点 都有选中
							for(let item1 in this.treeList[index].parentId){
								for(let item2 in this.treeList){
									if(this.treeList[item2].id == this.treeList[index].parentId[0]){
										this.treeList[item2].checked = value==1?2:1;
										break;
									}
								}				
							}
						}
						
						
						
						if(sjArray.length==0){
							for(let item1 in this.treeList[index].parentId){
								for(let item2 in this.treeList){
									if(this.treeList[item2].id == this.treeList[index].parentId[0]){
										this.treeList[item2].checked = value==1?0:1;
										break;
									}
								}				
							}
						}
					}

				}
			
			
			
			//选中 与 未选中 包括子节点关联 处理下级显示问题
			if(this.treeList[index].source.children){
				let tmp1 = this.treeList[index].source.children;
				let tmp2 = this.treeList;
				for(let i=0;i<tmp1.length;i++){
					for(let j=0;j<tmp2.length;j++){
						if(tmp2[j].id==tmp1[i].id){
							this.treeList[j].checked = value==1?0:1;
							break;
						}
					}
				}
				//判断 是否有孩子节点还
				for(let i=0;i<tmp1.length;i++){
					if(tmp1[i].children){
						let tmp3 = tmp1[i].children;
						for(let j=0;j<tmp3.length;j++){
							for(let k=0;k<tmp2.length;k++){
								if(tmp2[k].id==tmp3[j].id){
									this.treeList[k].checked = value==1?0:1;
									break;
								}
							}
						}
					}
				}
			}
		}
	},
	watch: {
		range(list) {
			this.initList = list;
			this._renderTreeList(list);
		},
		multiple() {
			if (this.range.length) {
				this._reTreeList();
			}
		},
		selectParent() {
			if (this.range.length) {
				this._reTreeList();
			}
		},
	},
	mounted() {
	}
}
</script>

<style>
@import "style.css";
</style>
