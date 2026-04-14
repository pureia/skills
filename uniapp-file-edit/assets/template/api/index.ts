import { baseFetch } from '@/utils/fetch';
import type { Get【Module】ListRequestData, Get【Module】ListResponseData, Get【Module】DetailResponseData, Create【Module】RequestData, Update【Module】RequestData } from './types';

/** 获取【module】列表 */
export const get【Module】List = (params: Get【Module】ListRequestData) => baseFetch.get<Get【Module】ListResponseData>({
  url: '/【module】/list',
  data: params,
});

/** 获取【module】详情 */
export const get【Module】Detail = (id: string) => baseFetch.get<Get【Module】DetailResponseData>({
  url: '/【module】/detail',
  data: { id },
});

/** 创建【module】 */
export const create【Module】 = (data: Create【Module】RequestData) => baseFetch.post<void>({
  url: '/【module】/create',
  data,
});

/** 更新【module】 */
export const update【Module】 = (data: Update【Module】RequestData) => baseFetch.post<void>({
  url: '/【module】/update',
  data,
});

/** 删除【module】 */
export const delete【Module】 = (id: string) => baseFetch.post<void>({
  url: '/【module】/delete',
  data: { id },
});
