<template>
  <view class="custom-nav-bar">
    <view
      class="status-bar"
      :style="{
        height: `${statusBarHeight * 2}rpx`,
      }"
    ></view>
    <view
      class="nav-bar"
      :style="{
        height: `${navBarHeight * 2}rpx`,
      }"
    >
      <view class="nav-left-wrap">
        <uni-icons
          v-if="showBackIcon"
          @click="onBack"
          type="left"
          size="24"
        ></uni-icons>
        <slot v-else name="navLeftSlot"></slot>
      </view>
      <view class="nav-mid-wrap">
        <slot name="nav-mid-slot">
          <view class="title">{{ props.navTitle }}</view>
        </slot>
      </view>
      <view class="nav-right-wrap">
        <slot name="navRightSlot"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tool from "@/common/tool";
import { jumpHome } from "@/router/index";
interface Props {
  navTitle: string;
  showBackIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  navTitle: "",
  showBackIcon: true,
});

const statusBarHeight = ref(0);
const navBarHeight = ref(0);

statusBarHeight.value = tool.getStatusBarHeight();
navBarHeight.value = tool.getNavBarHeight() - statusBarHeight.value;

const onBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack();
  } else {
    jumpHome();
  }
};
</script>

<style lang="scss" scoped>
.custom-nav-bar {
  position: relative;
  width: 100%;
  background: #ffbf00;
  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    .nav-left-wrap,
    .nav-right-wrap {
      width: 200rpx;
    }
    .nav-mid-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 350rpx;
        font-size: 40rpx;
        color: #000000;
        font-weight: bold;
      }
    }
  }
}
</style>
