import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface Use【FeatureName】Options {
  immediate?: boolean;
}

export interface Use【FeatureName】Return {
  data: Ref<unknown>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: () => Promise<void>;
  reset: () => void;
}

export const use【FeatureName】 = (
  options: Use【FeatureName】Options = {}
): Use【FeatureName】Return => {
  const { immediate = true } = options;

  const data = ref<unknown>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // TODO: 实现具体的数据获取逻辑
  const fetchData = async () => {
    return null;
  };

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      const result = await fetchData();
      data.value = result;
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  onMounted(() => {
    if (immediate) {
      execute();
    }
  });

  onUnmounted(() => {
    reset();
  });

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};
