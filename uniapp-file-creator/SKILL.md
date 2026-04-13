---
name: UniApp 文件创建
description: 在 UniApp 项目中按规范创建和修改文件及文件夹。
---

# UniApp 文件创建

帮助在 UniApp 项目中按照规范创建和修改各类文件及文件夹。提供完整的目录结构规范、命名规范和文件模板。

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
