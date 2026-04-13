export interface 【ModuleName】ListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface 【ModuleName】ListItem {
  id: string | number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface 【ModuleName】ListResult {
  list: 【ModuleName】ListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface 【ModuleName】DetailParams {
  id: string | number;
}

export interface 【ModuleName】DetailResult {
  id: string | number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
