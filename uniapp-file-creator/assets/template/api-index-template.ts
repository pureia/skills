import { http } from '@/utils/http';
import type {
  【ModuleName】ListParams,
  【ModuleName】ListResult,
  【ModuleName】DetailParams,
  【ModuleName】DetailResult,
} from './types';

const BASE_URL = '/api/【module-name】';

export const 【moduleName】Api = {
  getList: (params: 【ModuleName】ListParams) => {
    return http.get<【ModuleName】ListResult>(`${BASE_URL}/list`, { params });
  },

  getDetail: (params: 【ModuleName】DetailParams) => {
    return http.get<【ModuleName】DetailResult>(`${BASE_URL}/detail`, { params });
  },

  // TODO: 定义具体的创建请求类型替换 Record<string, unknown>
  create: (data: Record<string, unknown>) => {
    return http.post(`${BASE_URL}/create`, data);
  },

  // TODO: 定义具体的更新请求类型替换 Record<string, unknown>
  update: (data: Record<string, unknown>) => {
    return http.post(`${BASE_URL}/update`, data);
  },

  delete: (id: string | number) => {
    return http.post(`${BASE_URL}/delete`, { id });
  },
};
