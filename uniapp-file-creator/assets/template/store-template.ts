import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const use【StoreName】Store = defineStore('【store-name】', () => {
  const data = ref<unknown>(null);
  const loading = ref(false);

  const hasData = computed(() => !!data.value);

  // TODO: 实现具体的 API 调用逻辑
  const fetchFromApi = async () => {
    return null;
  };

  const setData = (value: unknown) => {
    data.value = value;
  };

  const clearData = () => {
    data.value = null;
  };

  const fetchData = async () => {
    loading.value = true;
    try {
      const result = await fetchFromApi();
      data.value = result;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    hasData,
    setData,
    clearData,
    fetchData,
  };
});
