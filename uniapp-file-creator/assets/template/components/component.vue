<script setup lang="ts">
defineOptions({
  name: '【ComponentName】',
  options: { virtualHost: true, styleIsolation: 'shared' },
});

</script>

<template>
  <view class="【component-name】-wrap">
    <!-- 组件内容 -->
  </view>
</template>

<!-- 组件复杂样式（复杂样式才需要引入） -->
<style scoped lang="scss" src="./index.scss"></style>

<!-- 组件简单样式（简单样式才需要引入） -->
<style scoped lang="scss">
.component-name-wrap {

}
</style>

