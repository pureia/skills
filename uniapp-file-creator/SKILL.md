---
name: UniApp 文件创建
description: 在 UniApp 项目中按规范创建或修改文件及文件夹，提供完整的目录结构、命名规范与文件模板。
---

# UniApp 文件创建

## 能力
- 在 UniApp 项目中按照标准目录结构创建页面、组件、API、Hooks、Store、类型定义及静态资源。
- 提供命名规范、文件模板，并自动更新 `pages.json` 路由配置。
- 协助迁移和重构不符合规范的文件结构。

## 使用场景
- 新增主包页面或分包页面。
- 新增全局公共组件或模块私有组件。
- 在 `api/` 或分包 `api/` 目录下新增接口模块。
- 在 `hooks/` 或分包 `hooks/` 目录下创建可复用组合式函数。
- 在 `stores/` 下添加新的 Pinia 模块。
- 在全局 `types/` 或页面/组件同目录下补充 TypeScript 类型定义。
- 按规范存放图标、图片等静态资源。
- 对现有项目目录进行规范化重构。

## 工作流程

### Step 1: 解析需求
- 识别用户需要创建或修改的文件类型（页面/组件/API/Hook/静态资源等）及所属模块（全局/主包/分包）。

### Step 2: 确定所属目录路径
根据需要创建或修改的文件类型及所属模块，按以下规则推导目标所属目录路径。
> 文件目录的命名一律遵循 **kebab-case**

#### 1. 页面文件

- **主包页面（TabBar 页面）** 
  路径：`src/pages/main/views/{page-name}/` 
  示例：`src/pages/main/views/home/`

- **分包页面** 
  路径：`src/pages/{subpackage-name}/views/{page-name}/` 
  示例：`src/pages/order/views/list/`

#### 2. 组件文件

- **全局公共组件** 
  路径：`src/components/{component-name}/` 
  示例：`src/components/user-card/`

- **分包私有组件** 
  路径：`src/pages/{subpackage-name}/components/{component-name}/` 
  示例：`src/pages/order/components/order-item/`

- **页面私有组件** 
  路径：`src/pages/{module}/views/{page-name}/components/{component-name}/` 
  示例：`src/pages/order/views/detail/components/pay-bar/`

- **组件内部子组件（嵌套组件）** 
  仅在该组件内部使用的子组件，存放于该组件目录下的 `components/` 子目录中。 
  路径：`{parent-component-path}/components/{sub-component-name}/` 
  示例： 
  - 全局组件内的子组件：`src/components/form-modal/components/form-item/` 
  - 分包组件内的子组件：`src/pages/order/components/order-card/components/goods-cell/` 
  - 页面私有组件内的子组件：`src/pages/order/views/detail/components/pay-bar/components/coupon-selector/`

#### 3.API文件

- **全局公共 API** 
  路径：`src/api/common/`（公共接口模块） 
  示例：`src/api/common/`

- **公共模块 API（按业务划分）** 
  路径：`src/api/{module-name}/` 
  示例：`src/api/order/`

- **主包私有 API** 
  路径：`src/pages/main/api/{page-name}/` 
  示例：`src/pages/main/api/home/`

- **分包私有 API** 
  路径：`src/pages/{subpackage-name}/api/{page-name}/` 
  示例：`src/pages/order/api/order-query/`

#### 4. Hooks 文件

- **全局 Hooks** 
  路径：`src/hooks/` 
  示例：`src/hooks/`

- **主包公共 Hooks** 
  路径：`src/pages/main/hooks/` 
  示例：`src/pages/main/hooks/`

- **分包公共 Hooks** 
  路径：`src/pages/{package-name}/hooks/` 
  示例：`src/pages/order/hooks/`

- **页面私有 Hooks**（仅当前页面使用） 
  路径：`src/pages/{module}/views/{page-name}/hooks/` 
  示例：`src/pages/order/views/detail/hooks/`

#### 5. Store 文件（Pinia）

- **全局 Store** 
  路径：`src/stores/{store-name}/` 
  示例：`src/stores/user/`

#### 6. 类型定义文件
> 只用于未明确文件类型（页面/组件/API/Hook）的类型定义文件

- **全局类型** 
  路径：`src/types/` 
  示例：`src/types/`

- **全局模块类型**
  路径：`src/types/modules/` 
  示例：`src/types/modules/`

#### 7. 静态资源

- **全局静态资源** 
  - 图标：`src/static/icons/` 
  - 图片：`src/static/images/` 
  示例：`src/static/icons/`

- **主包静态资源** 
  - 图标：`src/pages/main/static/icons/` 
  - 图片：`src/pages/main/static/images/` 
  示例：`src/pages/main/static/icons/`

- **分包静态资源** 
  - 图标：`src/pages/{subpackage-name}/static/icons/` 
  - 图片：`src/pages/{subpackage-name}/static/images/` 
  示例：`src/pages/order/static/icons/`

### Step 3: 创建目录
- 使用对应系统的命令创建所需文件夹。
   - Windows: `New-Item -ItemType Directory -Force -Path "路径"`
   - macOS/Linux: `mkdir -p 路径`

### Step 4: 生成文件
根据需要创建或修改的文件类型及所属模块，按以下规则生成文件：

#### 1. 页面文件
- 页面目录
  ├── index.vue       # 页面视图（必需）
  ├── index.scss      # 页面样式（必需）
  ├── index.ts        # 页面逻辑（可选，复杂逻辑抽离）
  └── types.d.ts      # 类型定义（可选）
- **index.vue（必需）**：参考模板：`assets/template/page/index.vue`
- **index.scss（必需）**：参考模板：`assets/template/page/index.scss`
- **index.ts（可选）**：参考模板：`assets/template/page/index.ts`

#### 2. 组件文件
- 组件目录
  ├── [component-name | index].vue       # 组件视图（组件名（全局公共组件使用）或 index.vue）（必需）
  ├── index.scss      # 组件样式（可选）
  ├── index.ts        # 组件逻辑（可选，复杂逻辑抽离）
  └── types.d.ts      # 类型定义（可选）
- **[component-name | index].vue（必需）**：参考模板：`assets/template/components/component-vue-template.vue`
- **index.scss（可选）**：参考模板：`assets/template/component-scss-template.scss`
- **index.ts（可选）**：参考模板：`assets/template/component-ts-template.ts`
- **types.d.ts（可选）**：参考模板：`assets/template/types-template.d.ts`

#### 3. API 文件
- API 目录
  ├── index.ts        # 接口定义（必需）
  └── types.d.ts      # 类型定义（可选）
- **index.ts（必需）**：参考模板：`assets/template/api-index-template.ts`
- **types.d.ts（可选）**：参考模板：`assets/template/api-types-template.d.ts`

#### 4. Hooks 文件
- **全局 Hooks**：`src/hooks/use-[feature].ts`
- **分包 Hooks**：`src/pages/[module]/hooks/use-[feature].ts`
- **文件模板**：参考模板：`assets/template/hooks-template.ts`

#### 5. Store 文件（Pinia）
- Store 目录
  └── [store-name].ts  # 状态定义（必需）
- **[store-name].ts（必需）**：参考模板：`assets/template/store-template.ts`

#### 6. 类型定义文件
- **全局类型**：`src/types/[name].d.ts`
- **模块类型**：`src/types/modules/[name].d.ts`

#### 7. 静态资源
- **图标资源**：存放于 `icons/` 目录
- **图片资源**：存放于 `images/` 目录
- **命名规范**：使用 kebab-case，如 `user-avatar.png`、`icon-home.svg`

### Step 5: 更新配置
- 若为页面，在 `pages.json` 中注册路由。

### Step 6: 输出检查清单
- 提醒用户完成后续验证项。

## 相关 Skill
- **API 使用规范**：创建、添加、优化、更新接口或接口类型时配合使用。提供请求封装、类型定义、命名规范等指南。

---

## 项目目录结构

```
src/
├── api/                          # 全局API接口目录
│   ├── common/                   # 公共接口目录
│   └── [module]/                 # 模块相关接口目录
│
├── components/                   # 全局组件目录
│   ├── basics/                   # 基础组件（按钮、图标、弹窗等）
│   └── [component-name]/         # 业务组件
│
├── config/                       # 配置文件目录
│   ├── env.config.ts             # 环境配置
│   └── [config-name].config.ts   # 其他配置文件
│
├── hooks/                        # 全局组合式函数目录
│   └── [use-feature].ts          # 功能hooks
│
├── pages/                        # 页面目录
│   ├── main/                     # 主包页面目录（TabBar页面）
│   │   ├── views/
│   │   │   └── [page]/           # 页面目录
│   │   ├── api/                  # 主包API
│   │   ├── components/           # 主包公共组件
│   │   ├── hooks/                # 主包hooks
│   │   └── static/               # 主包静态资源
│   │
│   └── [sub-package]/            # 分包目录
│       ├── views/
│       │   └── [page]/           # 页面目录
│       ├── api/                  # 分包API
│       ├── components/           # 分包组件
│       ├── hooks/                # 分包hooks
│       └── static/               # 分包静态资源
│
├── static/                       # 全局静态资源
│   ├── icons/                    # 图标资源
│   └── images/                   # 图片资源
│
├── stores/                       # 状态管理
│   ├── app.ts                    # 应用状态
│   ├── user.ts                   # 用户状态
│   └── [store].ts                # 其他状态
│
├── styles/                       # 全局样式
│   ├── global.scss               # 全局样式
│   └── tools.scss                # 工具样式
│
├── types/                        # 类型定义
│   ├── global.d.ts               # 全局类型
│   ├── env.d.ts                  # 环境类型
│   ├── declare.d.ts              # 声明类型
│   └── modules/                  # 模块类型
│
├── utils/                        # 工具函数
│   └── [util].ts                 # 其他工具
│
├── register/                     # 注册模块
│   └── index.ts
│
├── services/                     # 服务模块
│   └── [service].ts
│
├── App.vue                       # 应用入口
├── main.ts                       # 主入口
├── manifest.json                 # 应用配置
├── pages.json                    # 页面路由配置
└── uni.scss                      # 全局样式变量

```

---

## 命名规范

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 目录 | kebab-case | `user-info`, `order-list` |
| Vue文件 | kebab-case | `index.vue`, `user-card.vue` |
| TS文件 | kebab-case | `index.ts`, `use-form.ts` |
| SCSS文件 | kebab-case | `index.scss`, `card-style.scss` |
| 组件名 | kebab-case | `user-card`, `order-item` |
| API文件 | kebab-case | `user.ts`, `order-info.ts` |
| 类型文件 | kebab-case | `user.d.ts`, `order.d.ts` |
| Hooks文件 | camelCase | `useForm.ts`, `usePageRefresh.ts` |

---

## 文件创建规范

### 创建命令模板

```powershell
# Windows PowerShell
New-Item -ItemType Directory -Force -Path "目标路径"

# macOS/Linux
mkdir -p 目标路径
```

---

## 一、页面文件

### 目录结构

```
src/pages/[module]/views/[page]/
├── index.vue       # 页面视图（必需）
├── index.scss      # 页面样式（必需）
├── index.ts        # 页面逻辑（可选，复杂逻辑抽离）
├── types.d.ts      # 类型定义（可选）
└── components/     # 页面私有组件目录（可选）
    └── [component-name]/
        ├── index.vue
        ├── index.scss
        └── index.ts
```

### 创建示例

```powershell
# 创建页面目录
New-Item -ItemType Directory -Force -Path "src/pages/[module]/views/[page]/components"
```

### 路由注册

在 `src/pages.json` 中注册：

```json
{
  "pages": [
    {
      "path": "pages/main/views/[page]/index"
    }
  ],
  "subPackages": [
    {
      "root": "pages/[module]",
      "pages": [
        {
          "path": "views/[page]/index"
        }
      ]
    }
  ]
}
```

---

## 二、组件文件

### 目录结构

**全局组件：**
```
src/components/[component-name]/
├── [component-name].vue   # 组件视图（必需）
├── index.scss             # 组件样式（可选）
├── index.ts               # 组件业务逻辑（可选）
├── types.d.ts             # 类型定义（可选）
└── components/            # 子组件目录（可选）
```

**分包组件：**
```
src/pages/[module]/components/[component-name]/
├── index.vue
├── index.scss
├── index.ts
├── types.d.ts
└── components/            # 子组件目录（可选）
```

### 创建示例

```powershell
# 全局组件
New-Item -ItemType Directory -Force -Path "src/components/[component-name]/components"

# 分包组件
New-Item -ItemType Directory -Force -Path "src/pages/[module]/components/[component-name]/components"
```

### 组件模板

```vue
<script setup lang="ts">
defineOptions({
  name: '[ComponentName]',
  options: { virtualHost: true, styleIsolation: 'shared' },
});
</script>

<template>
  <view class="【component-name】-wrap">
    <!-- 组件内容 -->
  </view>
</template>

<style scoped lang="scss">

</style>
```

---

## 三、API 接口文件

### 目录结构

```
[api-path]/
├── index.ts       # 接口定义（必需）
└── types.d.ts     # 类型定义（可选）
```

**路径说明：**
- 全局公共API：`src/api/common/`
- 模块API：`src/api/[module]/`
- 页面私有API：`src/pages/[module]/api/[name]/`

### 创建示例

```powershell
New-Item -ItemType Directory -Force -Path "src/api/[module]"
```

---

## 四、Hooks 文件

### 目录结构

- **全局Hooks：** `src/hooks/[use-feature].ts`
- **分包Hooks：** `src/pages/[module]/hooks/[use-feature].ts`

### 创建示例

```powershell
# 全局
New-Item -ItemType Directory -Force -Path "src/hooks"

# 分包
New-Item -ItemType Directory -Force -Path "src/pages/[module]/hooks"
```

---

## 五、类型定义文件

### 目录结构

```
src/types/
├── global.d.ts               # 全局类型
├── env.d.ts                  # 环境类型
├── declare.d.ts              # 声明类型
└── modules/                  # 模块类型
```

### 创建示例

```powershell
New-Item -ItemType Directory -Force -Path "src/types/modules/api/[module]"
```

---

## 六、Store 文件

### 目录结构

```
src/stores/
├── app.ts        # 应用状态
├── user.ts       # 用户状态
└── [store].ts    # 其他状态
```

---

## 七、静态资源

### 目录结构

- **全局资源：** `src/static/[type]/`
- **模块资源：** `src/pages/[module]/static/[type]/`

**分类：**
- `icons/` - 图标
- `images/` - 图片

### 创建示例

```powershell
# 全局
New-Item -ItemType Directory -Force -Path "src/static/icons"
New-Item -ItemType Directory -Force -Path "src/static/images"

# 模块
New-Item -ItemType Directory -Force -Path "src/pages/[module]/static/icons"
New-Item -ItemType Directory -Force -Path "src/pages/[module]/static/images"
```

---

## 检查清单

创建文件后，请逐项检查：

- [ ] 文件目录结构符合规范
- [ ] 文件命名使用正确的命名规则（kebab-case / camelCase）
- [ ] 页面已在 `pages.json` 中注册
- [ ] Vue文件使用 `<script setup lang="ts">`
- [ ] 组件使用 `defineOptions` 定义名称和选项
- [ ] 样式文件使用 `<style scoped lang="scss">`
- [ ] 组件样式类名使用 `【component-name】-wrap` 格式
- [ ] 类型定义文件已创建（如需要）
- [ ] API接口已创建（如需要）

---

## 注意事项

1. **分包原则**：非TabBar页面应放入分包，减少主包体积
2. **组件复用**：多个模块共用的组件放入 `src/components/`
3. **API组织**：模块私有API放在模块目录下，公共API放在 `src/api/`
4. **类型定义**：页面/组件类型放在同目录 `types.d.ts`，全局类型放在 `src/types/`
5. **静态资源**：小图标建议使用字体图标，大图片放在对应模块的 `static/` 下
6. **组件命名**：组件名使用 kebab-case，`defineOptions.name` 使用 PascalCase
7. **文件命名**：组件Vue文件统一使用 `index.vue`
