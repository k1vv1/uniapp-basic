<template>
  <uni-popup
    ref="popup"
    :close-on-click-overlay="closeOnClickOverlay"
    type="bottom"
    :safe-area="false"
    :mask-click="maskClick"
  >
    <view
      class="container"
      :style="{
        background: props.bgColor,
        paddingTop: props.title ? '120rpx' : '70rpx',
      }"
    >
      <view v-if="props.title" class="title">{{ props.title }}</view>
      <slot></slot>
      <uni-icons
        class="close-icon"
        @click="close"
        v-if="showCloseIcon"
        type="closeempty"
        size="24"
      ></uni-icons>
    </view>
  </uni-popup>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  closeOnClickOverlay?: boolean;
  showCloseIcon?: boolean;
  title?: string;
  bgColor?: string;
  maskClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  closeOnClickOverlay: true,
  showCloseIcon: true,
  title: "",
  bgColor: "#fff",
  maskClick: true,
});

const popup = ref();

const open = () => {
  popup.value.open();
};

const close = () => {
  popup.value.close();
};

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  max-height: 92vh;
  border-radius: 50rpx 50rpx 0 0;
  padding: 70rpx 35rpx;
  .title {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 120rpx;
    background: #ffffff;
    border-radius: 50rpx 50rpx 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 40rpx;
    margin-bottom: 40rpx;
    z-index: 10;
  }
  .close-icon {
    position: fixed;
    right: 20rpx;
    top: 20rpx;
    z-index: 20;
    color: #2e2e2e;
  }
}
</style>
