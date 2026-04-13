/** 获取【module】列表请求参数 */
export interface Get【Module】ListRequestData {
  /** 页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 搜索关键词（可选） */
  keyword?: string;
}

/** 【module】列表项数据 */
export interface 【Module】ListItemData {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 创建时间 */
  createTime: string;
}

/** 获取【module】列表响应数据 */
export type Get【Module】ListResponseData = 【Module】ListItemData[];

/** 获取【module】详情响应数据 */
export interface Get【Module】DetailResponseData {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}

/** 创建【module】请求参数 */
export interface Create【Module】RequestData {
  /** 名称 */
  name: string;
}

/** 更新【module】请求参数 */
export interface Update【Module】RequestData {
  /** ID */
  id: string;
  /** 名称（可选） */
  name?: string;
}
