---
name: UniApp 文件编辑
description: 用于在 UniApp 项目中按规范创建、编辑及重构文件与目录结构，涵盖页面、组件、API、Hooks、Store、类型定义、工具函数、服务模块、配置文件及静态资源
---

# UniApp 文件编辑

## 能力
- 在 UniApp 项目中按标准目录结构创建页面、组件、API、Hooks、Store、类型定义、工具函数、服务模块、配置文件及静态资源
- 提供命名规范、文件模板，并自动更新 `pages.json` 路由配置
- 协助迁移和重构不符合规范的文件结构

## 使用场景
- 新增主包页面或分包页面
- 新增全局公共组件或模块私有组件
- 新增接口模块、Hooks、Store、类型定义、工具函数、服务模块、配置文件
- 按规范存放静态资源
- 对现有项目目录进行规范化重构

## 工作流程

### Step 1: 解析需求
- 识别文件类型（页面/组件/API/Hook/Store/类型/工具/服务/配置/静态资源）及所属模块（全局/主包/分包）
- 确认是否需要同时创建关联文件（如创建页面时是否需要 API、类型定义等）
- 若需创建分包页面且未明确分包名，从路径自动推断（如 `src/pages/order/views/list` → 分包名 `order`）

### Step 2: 确认路径与内容
根据文件类型及所属模块，查阅下方「文件规范」推导路径与内容。

### Step 3: 路径校验
- 检查目标路径是否已存在同名文件或目录，若存在则合并优化路径，避免重复创建
- 检查父级目录是否存在，若不存在则一并创建

### Step 4: 创建目录与文件
- Windows: `New-Item -ItemType Directory -Force -Path "路径"`
- macOS/Linux: `mkdir -p 路径`
- 按文件规范生成文件内容，模板占位符替换为实际值

### Step 5: 更新 pages.json（仅创建页面时）
1. 读取 `src/pages.json`，解析 `pages` 和 `subPackages` 数组
2. **主包页面**：在 `pages` 数组添加配置（首页置首，其余置末）
3. **分包页面**：在 `subPackages` 中查找或创建对应分包，添加页面配置
4. 注意事项：
   - `path` 不含扩展名，以 `index` 结尾
   - 主包 path 含 `pages/` 前缀；分包 path 不含（`root` 已包含）
   - 保持 JSON 缩进与现有文件一致，修改后验证格式正确性

### Step 6: 输出检查清单
完成后续验证项（见文末「检查清单」）

---

## 文件规范
> 严格按规范文档执行，避免创建或修改不符合规范的文件。

### 路径规则

| 类型 | 作用域 | 路径 | 示例 |
|------|--------|------|------|
| 页面 | 主包 | `src/pages/main/views/{page}/` | `src/pages/main/views/home/` |
| 页面 | 分包 | `src/pages/{pkg}/views/{page}/` | `src/pages/order/views/list/` |
| 组件 | 全局 | `src/components/{name}/` | `src/components/user-card/` |
| 组件 | 分包 | `src/pages/{pkg}/components/{name}/` | `src/pages/order/components/order-item/` |
| 组件 | 页面私有 | `src/pages/{pkg}/views/{page}/components/{name}/` | `src/pages/order/views/detail/components/pay-bar/` |
| 组件 | 嵌套子组件 | `{父组件路径}/components/{name}/` | `src/components/form-modal/components/form-item/` |
| API | 全局公共 | `src/api/common/` | `src/api/common/` |
| API | 模块 | `src/api/{module}/` | `src/api/order/` |
| API | 主包私有 | `src/pages/main/api/{page}/` | `src/pages/main/api/home/` |
| API | 分包私有 | `src/pages/{pkg}/api/{page}/` | `src/pages/order/api/order-query/` |
| Hooks | 全局 | `src/hooks/` | `src/hooks/` |
| Hooks | 主包 | `src/pages/main/hooks/` | `src/pages/main/hooks/` |
| Hooks | 分包 | `src/pages/{pkg}/hooks/` | `src/pages/order/hooks/` |
| Hooks | 页面私有 | `src/pages/{pkg}/views/{page}/hooks/` | `src/pages/order/views/detail/hooks/` |
| Store | 全局 | `src/stores/name/` | `src/stores/user/` |
| 类型 | 全局 | `src/types/` | `src/types/` |
| 类型 | 模块 | `src/types/modules/` | `src/types/modules/` |
| 工具 | 全局 | `src/utils/{name}.ts` | `src/utils/format.ts` |
| 服务 | 全局 | `src/services/{name}.ts` | `src/services/auth.ts` |
| 配置 | 全局 | `src/config/{name}.config.ts` | `src/config/env.config.ts` |
| 静态资源 | 全局 | `src/static/{icons|images}/` | `src/static/icons/` |
| 静态资源 | 主包 | `src/pages/main/static/{icons|images}/` | `src/pages/main/static/icons/` |
| 静态资源 | 分包 | `src/pages/{pkg}/static/{icons|images}/` | `src/pages/order/static/icons/` |

### 文件结构与模板

#### 页面
```
{page-path}/
├── index.vue       # 必需 → assets/template/page/index.vue
├── index.scss      # 可选 → assets/template/page/index.scss
├── index.ts        # 可选 → assets/template/page/index.ts
├── types.d.ts      # 可选，页面类型定义文件
└── components/     # 可选，页面私有组件
```

#### 组件
```
{component-path}/
├── [name|index].vue  # 必需（全局用 {name}.vue 以符合 easycom，其余用 index.vue）→ assets/template/components/component.vue
├── index.scss        # 可选 → assets/template/components/index.scss
├── index.ts          # 可选 → assets/template/components/index.ts
├── types.d.ts        # 可选，组件类型定义文件
└── components/       # 可选，嵌套子组件
```

#### API
> **📌 创建或修改 API 文件时**：请务必查阅 [API 使用规范](references/api-usage.md)，遵循请求封装、类型定义、函数命名等规范。
```
{api-path}/
├── index.ts       # 必需 → assets/template/api/index.ts
└── types.d.ts     # 可选，API类型定义文件 → assets/template/api/types.d.ts
```

#### Hooks
- 文件：`use{Feature}.ts`（camelCase 命名）

#### Store
```
{store-path}/
├── index.ts       # 必需, Store 模块入口文件
└── types.d.ts     # 可选，Store类型定义文件
```

#### 类型定义
> 仅用于未明确归属页面/组件/API/Hook 的独立类型文件
- 全局：`src/types/{name}.d.ts`
- 公共模块：`src/types/modules/{name}.d.ts`

#### 工具函数
- 文件：`src/utils/{name}.ts`（kebab-case）
- 导出独立函数，每个函数含 JSDoc 注释

#### 服务模块
- 文件：`src/services/{name}.ts`（kebab-case）
- 封装业务逻辑，可调用 API 和 Store

#### 配置文件
- 文件：`src/config/{name}.config.ts`（kebab-case，以 `.config.ts` 结尾）
- 导出配置对象，使用 `as const` 保证类型推断

#### 静态资源
- 图标放 `icons/`，图片放 `images/`
- 命名：kebab-case，如 `user-avatar.png`、`icon-home.svg`

---

## 命名规范

| 类型 | 规则 | 示例 |
|------|------|------|
| 目录 | kebab-case | `user-info`, `order-list` |
| Vue文件 | kebab-case | `index.vue`, `user-card.vue` |
| TS文件 | kebab-case | `index.ts`, `helpers.ts` |
| SCSS文件 | kebab-case | `index.scss` |
| 组件名 | kebab-case | `user-card` |
| Hooks文件 | camelCase | `useForm.ts`, `usePageRefresh.ts` |
| 工具/服务/配置 | kebab-case | `format.ts`, `auth.ts`, `env.config.ts` |

---

## pages.json 注册模板

```json
{
  "pages": [
    {
      "path": "pages/main/views/{page}/index"
    }
  ],
  "subPackages": [
    {
      "root": "pages/{pkg}",
      "pages": [
        {
          "path": "views/{page}/index"
        }
      ]
    }
  ]
}
```

---

## 检查清单

### 通用
- [ ] 目录结构符合规范
- [ ] 命名使用正确规则
- [ ] 模板占位符已全部替换，命名风格一致
- [ ] 目标路径无同名文件冲突

### 页面
- [ ] 已在 `pages.json` 正确注册
- [ ] 主包 path 含 `pages/` 前缀，分包不含
- [ ] 已设置 `navigationBarTitleText`
- [ ] JSON 格式正确

### Vue 文件
- [ ] 使用 `<script setup lang="ts">`
- [ ] 组件使用 `defineOptions` 定义名称和选项
- [ ] 样式使用 `<style scoped lang="scss">`
- [ ] 类名使用 `{component-name}-wrap` 格式
- [ ] 全局组件 Vue 文件名用 `{name}.vue`，其余用 `index.vue`

### 关联文件
- [ ] 类型定义、API、Hooks、Store 已按需创建

---

## 参考文档

- [API 使用规范](references/api-usage.md) - API 接口编写规范，包含请求封装、类型定义、命名规范等

---

## 注意事项

1. 非TabBar页面应放入分包，减少主包体积
2. 每个分包体积不超过 2MB，总包体积不超过 20MB（微信小程序限制）
3. 多模块共用组件放 `src/components/`，模块私有放对应分包
4. 模块私有API放模块目录下，公共API放 `src/api/`
5. 页面/组件类型放同目录 `types.d.ts`，全局类型放 `src/types/`
6. 小图标建议使用字体图标，大图片放对应模块 `static/`
7. 组件名 kebab-case，`defineOptions.name` 用 PascalCase
8. 创建前必须检查路径是否已存在，避免意外覆盖
9. 修改 `pages.json` 后必须验证 JSON 格式
10. 工具函数保持单一职责，含 JSDoc 注释
11. 服务层封装业务逻辑，不应在组件中直接调用 API
12. 配置文件使用 `as const` 确保类型推断
13. 全局组件遵循 easycom 规范：组件目录名与 Vue 文件名一致（如 `src/components/user-card/user-card.vue`），方可自动注册无需手动 import
