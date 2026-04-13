import request from '@/utils/request';
import type { 【Module】Req, 【Module】Res } from './types';

export const get【Module】 = (data: 【Module】Req) => request.post<【Module】Res>('/api/【module】', data);
