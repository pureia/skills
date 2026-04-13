import { use【StoreName】Store } from '@/stores/【store-name】';
import { get【Module】 } from '@/api/【module】';

class 【ServiceName】Service {
  private get store() {
    return use【StoreName】Store();
  }

  async fetch【Module】() {
    const res = await get【Module】({});
    return res;
  }
}

export const 【serviceName】Service = new 【ServiceName】Service();
