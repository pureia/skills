---
name: API 使用规范
description: 在 UniApp 项目中创建或者优化 API 接口时的使用规范。当用户需要创建、添加、优化、更新 API 接口时调用此技能。
---

# API 使用规范

## 技能说明

帮助在 UniApp 项目中按照使用规范编写 API 接口代码。该技能提供完整的请求封装使用方式、类型定义规范、命名规范，确保 API 接口的一致性和可维护性。

---

## 相关 Skill

- **UniApp 文件创建**：当用户需要创建、修改、优化、移动文件时必须同时调用此技能。

---

## 执行前验证

**⚠️重要**：在执行任何 API 创建或修改操作之前，必须先调用 **UniApp 文件创建** 技能进行验证：

1. 调用 UniApp 文件创建技能
2. 验证目标文件路径是否符合项目规范
3. 验证文件命名是否符合规范
4. 确认是否需要创建新文件或修改现有文件
5. 验证通过后，再继续执行本指南的后续操作

---

## 一、请求封装核心

### 导入方式

```typescript
import { baseFetch } from '@/utils/fetch';
```

### 支持的请求方法

```typescript
// GET 请求
baseFetch.get<T>({ url: '/api/xxx', data: params });

// POST 请求
baseFetch.post<T>({ url: '/api/xxx', data: params });

// PUT 请求
baseFetch.request<T>({ url: '/api/xxx', method: 'PUT', data: params });

// DELETE 请求
baseFetch.request<T>({ url: '/api/xxx', method: 'DELETE' });
```

### 请求配置参数

| 参数              | 类型          | 默认值      | 说明                                      |
| ----------------- | ------------- | ----------- | ---------------------------------------|
| url               | string        | -           | 接口地址（必填）                          |
| data              | any           | -           | 请求参数                                 |
| method            | FetchMethod   | 'GET'       | 请求方法：GET | POST | PUT | DELETE       |
| isLogin           | boolean       | true        | 是否需要登录状态                           |
| isAutoToken       | boolean       | false       | 是否自动添加token                         |
| isShowLoading     | boolean       | false       | 是否显示loading                           |
| loadingText       | string        | '加载中...'  | loading文案                              |
| isDebounce        | boolean       | true        | 是否开启防抖                            |
| isShowErrorHint   | boolean       | true        | 是否显示错误提示                        |
| passStatusCodes   | number[]      | -           | 跳过默认处理的状态码                    |

---

## 二、API 文件模板

### 标准 API 文件模板

```typescript
import { baseFetch } from '@/utils/fetch';

/** 获取列表数据 */
export const getList = (params: GetListRequestData) => baseFetch.get<GetListResponseData>({
  url: '/module/path/list',
  data: params,
});

/** 获取详情 */
export const getDetail = (id: string) => baseFetch.get<DetailResponseData>({
  url: '/module/path/detail',
  data: { id },
});

/** 删除数据 */
export const deleteItem = (id: string) => baseFetch.post<void>({
  url: '/module/path/delete',
  data: { id },
});
```

---

## 三、请求参数规范

### 参数数量规则

| 参数数量 | 定义方式           | 说明                             |
| -------- | ------------------ | -------------------------------- |
| ≤ 3 个   | 允许使用形参       | 直接在函数参数中定义，简洁明了   |
| > 3 个   | 必须使用对象类型   | 定义 `XxxRequestData` 接口类型   |

### 参数定义注意事项

1. **可读性优先**：参数较多时，对象类型更易阅读和维护
2. **可选参数**：使用对象类型时，可选参数通过 `?` 标记
3. **类型复用**：对象类型可在多个接口间复用
4. **文档友好**：对象类型配合 JSDoc 注释，自动生成更好的文档

---

## 四、类型定义规范

### 类型命名规范

| 类型         | 命名规则              | 示例                                              | 说明                           |
| ------------ | --------------------- | ------------------------------------------------- | ------------------------------ |
| 请求参数     | `XxxRequestData`      | `GetListRequestData`, `CreateItemRequestData`     | 用于接口请求参数               |
| 响应数据     | `XxxResponseData`     | `GetListResponseData`, `DetailResponseData`       | 用于接口响应数据               |

> **注意**：响应数据直接是业务数据内容，不包含状态码、消息等包装字段。例如列表接口直接返回数组，详情接口直接返回对象。

### 类型定义示例

```typescript
/** 获取列表请求参数 */
export interface GetListRequestData {
  /** 页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
  /** 搜索关键词（可选） */
  keyword?: string;
}

/** 列表项数据 */
export interface ListItemData {
  /** ID */
  id: string;
  /** 名称 */
  name: string;
  /** 创建时间 */
  createTime: string;
}

/** 获取列表响应数据 */
export type GetListResponseData = ListItemData[];
```

---

### 类型不确定时的处理

**重要原则**：当无法确定具体数据类型时，**不要声明类型**，保持灵活性。

| 场景                     | 处理方式                              | 示例                                          |
| ------------------------ | ------------------------------------- | --------------------------------------------- |
| 响应数据结构未知         | 使用 `void` 或省略泛型                | `baseFetch.get({ url: '/api/xxx' })`          |
| 请求参数结构未知         | 不定义 RequestData 类型               | 函数参数使用 `any` 或省略                     |
| 字段类型不确定           | 使用 `any` 类型                       | `data: any`                                   |
| 接口文档不完整           | 暂不定义类型，待确认后补充            | -                                             |

## 五、API 函数命名规范

| 操作类型   | 命名规则          | 示例                              |
| ---------- | ----------------- | --------------------------------- |
| 查询列表   | getXxxList        | `getList`, `getOrderList`         |
| 查询详情   | getXxxDetail      | `getDetail`, `getOrderDetail`     |
| 新增       | createXxx         | `createItem`, `createOrder`       |
| 更新       | updateXxx         | `updateItem`, `updateOrder`       |
| 删除       | deleteXxx         | `deleteItem`, `deleteOrder`       |
| 批量删除   | deleteXxxBatch    | `deleteItemBatch`                 |
| 启用/禁用  | toggleXxxStatus   | `toggleItemStatus`                |
| 上传       | uploadXxx         | `uploadImage`, `uploadFile`       |
| 导出       | exportXxx         | `exportList`, `exportReport`      |
| 导入       | importXxx         | `importData`                      |
| 验证       | validateXxx       | `validateCode`, `validateToken`   |
| 检查       | checkXxx          | `checkExist`, `checkAvailable`    |

---

## 六、完整示例

### 列表接口示例

```typescript
import { baseFetch } from '@/utils/fetch';
import { GetUserListRequestData, GetUserListResponseData } from './types';

/** 获取用户列表 */
export const getUserList = (params: GetUserListRequestData) => baseFetch.get<GetUserListResponseData>({
  url: '/user/list',
  data: params,
});
```

### 详情接口示例

```typescript
/** 用户详情数据 */
export interface UserDetailData {
  /** 用户ID */
  id: string;
  /** 用户名 */
  name: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone: string;
  /** 状态 */
  status: string;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}

/** 获取用户详情 */
export const getUserDetail = (id: string) => baseFetch.get<UserDetailData>({
  url: '/user/detail',
  data: { id },
});
```

### 创建/更新接口示例

```typescript
/** 创建用户请求参数 */
export interface CreateUserRequestData {
  /** 用户名 */
  name: string;
  /** 邮箱 */
  email: string;
  /** 手机号 */
  phone: string;
}

/** 创建用户 */
export const createUser = (data: CreateUserRequestData) => baseFetch.post<void>({
  url: '/user/create',
  data,
});

/** 更新用户请求参数 */
export interface UpdateUserRequestData {
  /** 用户ID */
  id: string;
  /** 用户名 */
  name?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
}

/** 更新用户 */
export const updateUser = (data: UpdateUserRequestData) => baseFetch.post<void>({
  url: '/user/update',
  data,
});
```

---

## 七、检查清单

编写 API 代码后，请逐项检查：

- [ ] 已正确导入 `baseFetch`
- [ ] 函数命名符合规范（getXxxList、createXxx 等）
- [ ] 类型命名符合规范（XxxRequestData、XxxResponseData）
- [ ] 类型定义位置正确（与 API 函数在同一文件）
- [ ] 所有字段都有 JSDoc 注释
- [ ] 添加了清晰的函数注释
- [ ] 参数数量规范：≤ 3 个使用形参，> 3 个使用对象类型
- [ ] 类型不确定时使用 `void`、省略泛型或不定义类型
- [ ] 没有破坏现有功能
- [ ] 已更新所有引用该类型的文件

---

## 八、注意事项

### 请求相关

1. **请求方法选择**：查询使用 GET，增删改使用 POST
2. **登录状态**：无需登录的接口设置 `isLogin: false`
3. **Token处理**：默认不自动添加 Token，需要携带 Token 的接口设置 `isAutoToken: true`
4. **错误处理**：特殊状态码通过 `passStatusCodes` 跳过默认处理
5. **防抖机制**：默认开启防抖，避免重复请求

### 代码规范

6. **注释规范**：使用 JSDoc 格式添加字段注释
7. **代码简洁**：避免冗余代码，保持 API 文件简洁明了
8. **类型不确定**：当无法确定数据类型时，不声明类型，省略泛型

### 最佳实践

9. **类型复用**：多个接口共用的数据结构（如列表项）应单独定义类型
10. **文件组织**：按模块划分 API 文件，相关接口放在同一文件
11. **版本控制**：接口变更时及时更新类型定义，保持类型与接口同步
