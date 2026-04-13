import type { ExtractPropTypes, PropType } from 'vue';

export const componentNameProps = {
  /** 标题 */
  title: {
    type: [String, Number],
    default: '',
  },
  /** 返回 */
  back: {
    type: Function as PropType<() => void>,
    default: () => void 0,
  },
};
type ComponentNameProps = ExtractPropTypes<typeof componentNameProps>;
