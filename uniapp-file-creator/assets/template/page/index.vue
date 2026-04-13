<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';
import { usePage } from '.';

defineOptions({ name: '【PageName】' });

const { page } = usePage();

onShow(() => {

});
</script>

<template>
  <page-wrapper>
    <view class="page-inner-wrap">
      <!-- 页面内容 -->
    </view>
  </page-wrapper>
</template>

<!-- 页面复杂样式（复杂样式才需要引入） -->
<style scoped lang="scss" src="./index.scss"></style>

<!-- 页面简单样式（简单样式不需要引入） -->
<style scoped lang="scss">
.page-inner-wrap {  

}
</style>

