import { ref, reactive, computed, watch, onUnmounted } from 'vue';

export const use【HookName】 = () => {
  const count = ref(0);
  const state = reactive({

  });

  const doubleCount = computed(() => count.value * 2);

  watch(count, (newVal) => {

  });

  onUnmounted(() => {

  });

  return {
    count,
    state,
    doubleCount,
  };
};
