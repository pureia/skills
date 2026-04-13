<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: '【ComponentName】',
  options: { virtualHost: true, styleIsolation: 'shared' },
});

interface Props {
  modelValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const localValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <view class="【component-name】-wrap">
    <slot />
  </view>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
