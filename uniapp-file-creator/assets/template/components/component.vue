<script setup lang="ts">
import { componentNameProps } from '.';

defineOptions({
  name: '【ComponentName】',
  options: { virtualHost: true, styleIsolation: 'shared' },
});

const props = defineProps(componentNameProps);
</script>

<template>
  <view class="【component-name】-wrap">
    <!-- 组件内容 -->
  </view>
</template>

<!-- 样式复杂时拆分到 index.scss，简单样式直接写在此处 -->
<style scoped lang="scss">
.【component-name】-wrap {

}
</style>
