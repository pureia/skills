import { ref, computed, type Ref, type ComputedRef } from 'vue';

export interface Use【ComponentName】LogicOptions {
  modelValue?: Ref<string>;
}

export interface Use【ComponentName】LogicReturn {
  localValue: ComputedRef<string>;
  handleClick: () => void;
}

export const use【ComponentName】Logic = (
  options: Use【ComponentName】LogicOptions = {}
): Use【ComponentName】LogicReturn => {
  const { modelValue = ref('') } = options;

  const localValue = computed({
    get: () => modelValue.value,
    set: (val) => {
      modelValue.value = val;
    },
  });

  const handleClick = () => {

  };

  return {
    localValue,
    handleClick,
  };
};
