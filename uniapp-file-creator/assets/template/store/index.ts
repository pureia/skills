import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const use【StoreName】Store = defineStore('【store-name】', () => {
  const xxx = ref<【XxxType】>();

  const getXxx = computed(() => xxx.value);

  function setXxx(val: 【XxxType】) {
    xxx.value = val;
  }

  return { xxx, getXxx, setXxx };
});
