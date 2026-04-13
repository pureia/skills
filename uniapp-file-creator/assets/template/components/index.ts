import type { ExtractPropTypes, PropType } from 'vue';

export const componentNameProps = {
  /** 标题 */
  title: {
    type: [String, Number],
    default: '',
  },
};
type ComponentNameProps = ExtractPropTypes<typeof componentNameProps>;

export interface ComponentNameEmits {
  (e: 'back'): void;
}

export type { ComponentNameProps };
