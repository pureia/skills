export interface 【TypeName】Item {
  id: string | number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface 【TypeName】Params {
  id?: string | number;
  keyword?: string;
}

export interface 【TypeName】Result {
  success: boolean;
  data?: 【TypeName】Item;
  message?: string;
}

export type 【TypeName】Status = 'pending' | 'active' | 'completed' | 'cancelled';
