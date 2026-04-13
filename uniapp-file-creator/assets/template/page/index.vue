<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { usePage } from '.';

defineOptions({ name: '【PageName】' });

const { page } = usePage();

onLoad((query) => {

});
</script>

<template>
  <!-- page-wrapper 为项目自定义布局组件，提供统一页面容器 -->
  <page-wrapper>
    <view class="page-inner-wrap">
      <!-- 页面内容 -->
    </view>
  </page-wrapper>
</template>

<!-- 样式复杂时拆分到 index.scss，简单样式直接写在此处 -->
<style scoped lang="scss">
.page-inner-wrap {

}
</style>
