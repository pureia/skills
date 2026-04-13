<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePage } from '.';

defineOptions({ name: '【PageName】'});

const { page } = usePage();

</script>

<template>
  <page-wrapper>
    <view class="page-inner-wrap">
      <!-- 页面内容 -->
    </view>
  </page-wrapper>
</template>

<style scoped lang="scss" src="./index.scss"></style>
