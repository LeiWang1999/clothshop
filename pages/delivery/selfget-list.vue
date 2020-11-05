<template>
  <view>
    <uni-section title="上门自提列表" type="line">
      <view class="button" @click="toAddSelfGet">
        <text class="button-text">新增自提点</text>
      </view>
    </uni-section>
    <uni-swipe-action>
      <uni-swipe-action-item
        v-for="(item,index) in swipeList"
        :options="item.options"
        :key="item.id"
        :data-pageTitle="item.temName"
        @change="swipeChange"
        @click="swipeClick($event,index)"
      >
        <text class="cont">{{item.content}}</text>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
import uniSection from "@/components/uni-ui/uni-section/uni-section.vue";
import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue";
import uniSwipeActionItem from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue";
import myCloud from "@/common/util/cloud.js";
import myConst from "@/common/util/const.js";
import { getData,delData } from '@/common/api/selfget.js'
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
      options1: [
        {
          text: "取消置顶"
        }
      ],
      options2: [
        {
          text: "取消",
          style: {
            backgroundColor: "#007aff"
          }
        },
        {
          text: "确认",
          style: {
            backgroundColor: "#dd524d"
          }
        }
      ],
      swipeList: []
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.isOpened = true;
    });
  },
  methods: {
    async getData() {
	  const result = await getData({name:'',page:1,limit:100})
	  const res = result.records
      let tmp1 = {
        text: "编辑"
      };
      let tmp2 = {
        text: "删除",
        style: {
          backgroundColor: "rgb(255,58,49)"
        }
      };
      this.$data.swipeList = [];
      for (let i = 0; i < res.length; i++) {
        let d = {
          id: "",
          options: [],
          content: ""
        };
        d.id = res[i]._id;
        d.content = res[i].addressName;
        d.options.push(tmp1);
        d.options.push(tmp2);
        this.$data.swipeList.push(d);
      }
    },
    toAddSelfGet(e) {
      uni.navigateTo({
        url: `/pages/delivery/selfget-edit`
      });
    },
    bindClick(e) {
      uni.showToast({
        title: `点击了${e.content.text}按钮`,
        icon: "none"
      });
    },
    setOpened() {
      this.isOpened = !this.isOpened;
    },
    change(e) {
      this.isOpened = e;
    },
    swipeChange(e) {},
    swipeClick(e, index) {
      let { content } = e;
      if (content.text === "删除") {
        uni.showModal({
          title: "提示",
          content: "是否删除",
          success: res => {
            if (res.confirm) {
              const data = {
                _id: this.swipeList[index].id
              };
			  const res = this.delDataReq(data)
              this.swipeList.splice(index, 1);
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      } else if (content.text === "编辑") {
        uni.navigateTo({
          url: "selfget-edit?id=" + this.swipeList[index].id
        });
      }
    },
	async delDataReq(req){
		const data = await delData(req)
		return data
	}
  }
};
</script>

<style>
/* #ifndef APP-NVUE */
page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #efeff4;
  min-height: 100%;
  height: auto;
}

view {
  font-size: 14px;
  line-height: inherit;
}

.example {
  padding: 0 15px 15px;
}

.example-info {
  padding: 15px;
  color: #3b4144;
  background: #ffffff;
}

.example-body {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  font-size: 14px;
  background-color: #ffffff;
}

/* #endif */
.example {
  padding: 0 15px;
}

.example-info {
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
  padding: 15px;
  color: #3b4144;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 20px;
}

.example-info-text {
  font-size: 14px;
  line-height: 20px;
  color: #3b4144;
}

.example-body {
  flex-direction: column;
  padding: 15px;
  background-color: #ffffff;
}

.word-btn-white {
  font-size: 18px;
  color: #ffffff;
}

.word-btn {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 48px;
  margin: 15px;
  background-color: #007aff;
}

.word-btn--hover {
  background-color: #4ca2ff;
}

.cont {
  flex: 1;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  position: relative;
  background-color: #fff;
  font-size: 15px;
  border-bottom-color: #f5f5f5;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}

.example-body {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  justify-content: center;
  padding: 10px 0;
  background-color: #fff;
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
