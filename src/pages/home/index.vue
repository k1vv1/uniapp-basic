<template>
  <view class="content">
    <uni-badge text="1"></uni-badge>
    <image @click="logoClick" class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="title">{{ useStore.firstName }}</view>
    <view class="title">{{ useStore.lastName }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useUserStore from "@/stores/modules/user";
const useStore = useUserStore();
const title = ref("Hello");
const logoClick = () => {
  useStore.updateLastName("kv");
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
