# 福帮帮 (CampusLink) 前端 UI 组件化与设计交付文档 (UI Handoff)

## 一、项目概述与交付范围

本项目为「福帮帮」（福州大学校园互助与二手闲置平台）前端 UI 高保真实现及交互原型。严格遵循 README 规范与设计稿进行组件化开发，支持在移动端浏览器及桌面端双模式平滑运行。

- **框架与语言**：Vue 3 (Composition API, `<script setup lang="ts">`) + TypeScript + Vite
- **设计基准**：以 iPhone 12/13/14 (390px 视口) 为标准移动端基准，向下适配 375px，向上响应式兼容各主流机型与 PC 端
- **运行环境**：Node.js v24+，Vite 6，0 语法警告，0 运行时控制台报错

---

## 二、目录架构与文件规范

```
c:\Users\Fate永恒\Desktop\UI\
├── public/
│   ├── assets/
│   │   ├── avatars/             # 用户及卖家头像切图
│   │   └── images/              # 校园背景、卡片图标、商品封面、论坛插图
│   └── favicon.svg              # 站点清新品牌图标
├── src/
│   ├── api/                     # REST API 接口对接层（符合 Phase 1 契约）
│   │   ├── request.ts           # 统一 Fetch 封装与 Token 携带
│   │   ├── auth.ts              # 登录与注册接口定义
│   │   └── product.ts           # 商品 CRUD 接口定义与 Mock 降级
│   ├── components/              # 独立可复用 UI 组件
│   │   ├── common/
│   │   │   ├── AppHeader.vue    # 校园背景插画、Logo、标语与状态栏
│   │   │   ├── SearchBar.vue    # 搜索框、扫一扫及输入交互
│   │   │   └── BottomNavigation.vue # 底部四 Tab 导航及 iOS 指示条
│   │   ├── home/
│   │   │   ├── FeatureEntryCard.vue # 二手闲置/校园论坛功能卡片
│   │   │   ├── ProductSection.vue   # 最新闲置横向平滑滚动区域
│   │   │   └── ForumSection.vue     # 校园论坛垂直列表区域
│   │   ├── product/
│   │   │   └── ProductCard.vue  # 通用商品卡片（支持 horizontal / grid 模式）
│   │   └── forum/
│   │       └── ForumPostCard.vue# 通用论坛帖子卡片
│   ├── views/                   # 页面与原型视图
│   │   ├── Home.vue             # 首页（高保真还原）
│   │   ├── IdleMarket.vue       # 二手闲置页（分类筛选、排序、网格列表、发布）
│   │   ├── ForumList.vue        # 校园论坛页（板块分类、发帖原型、讨论列表）
│   │   ├── ProductDetail.vue    # 商品详情页原型
│   │   ├── PostDetail.vue       # 帖子详情页原型
│   │   └── Profile.vue          # 个人中心页（个人信息、交易与互助统计、设置）
│   ├── mock/                    # 完整 Mock 数据源
│   │   └── index.ts             # 商品、帖子、用户及分类数据
│   ├── router/
│   │   └── index.ts             # Vue Router 路由配置与动态标题
│   ├── styles/
│   │   ├── variables.css        # 全局设计 Token（颜色、间距、圆角、阴影）
│   │   └── main.css             # 基础重置与响应式样式
│   ├── types/
│   │   └── index.ts             # 全局 TypeScript 接口与类型定义
│   ├── App.vue                  # 根组件（含桌面/移动端双模预览控制器）
│   ├── main.ts                  # 入口主文件
│   └── vite-env.d.ts            # Vite 环境类型
├── scripts/
│   └── take_screenshots.js      # 自动化无头截图与控制台质检脚本
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 三、核心组件清单与 Props 接口说明

### 1. `AppHeader.vue`
- **定位**：首页顶部品牌标识、校园风景插画及移动端状态栏。
- **Props**：
  | 属性名 | 类型 | 默认值 | 描述 |
  | :--- | :--- | :--- | :--- |
  | `title` | `string` | `'福帮帮'` | 品牌主标题 |
  | `subTitle` | `string` | `'福州大学校园互助平台'` | 副标题文字 |
  | `slogan` | `string` | `'在福大，遇见更好的校园生活'` | 手写体标语 |
  | `campusBg` | `string` | `'/assets/images/fzu_campus_bg.png'` | 校园风景插图资源路径 |
  | `logoSrc` | `string` | `'/assets/images/logo_brand_transparent.png'` | 品牌高清透明 Logo 图 |
  | `useImageLogo`| `boolean` | `true` | 是否优先采用书法飞溅高保真切图 |
  | `showStatusBar`| `boolean` | `true` | 是否展示移动端状态栏 |

### 2. `SearchBar.vue`
- **定位**：圆角胶囊搜索栏，集成搜索放大镜、文字输入、清空按钮与右侧扫一扫操作。
- **Props / Events**：
  - `modelValue` (`string`)：双向绑定搜索关键词
  - `placeholder` (`string`)：默认 `'搜索闲置 / 帖子 / 攻略'`
  - `readonly` (`boolean`)：是否仅触发点击事件
  - `@search(keyword)`：回车搜索触发
  - `@scan`：点击右侧扫一扫触发
  - `@click`：点击搜索栏唤起搜索模式

### 3. `FeatureEntryCard.vue`
- **定位**：首页「二手闲置」与「校园论坛」两大入口卡片。
- **Props**：
  | 属性名 | 类型 | 描述 |
  | :--- | :--- | :--- |
  | `title` | `string` | 卡片主标题（如 `'二手闲置'`） |
  | `subtitle` | `string` | 分类副标题（如 `'教材、数码、生活用品'`） |
  | `icon` | `string` | 立体卡片图标路径 |
  | `theme` | `'green' \| 'blue'` | 浅绿主题或浅蓝主题 |
  | `route` | `string` | 目标路由路径（点击自动跳转） |

### 4. `ProductCard.vue`
- **定位**：高度通用的商品展示卡片，支持首页横向滚动与列表页双列网格两种自适应排版。
- **Props**：
  - `product` (`Product`)：符合 `types/index.ts` 规范的商品实体对象（含价格、图片、标题、卖家信息、时间）
  - `layoutMode` (`'horizontal' | 'grid'`)：`'horizontal'` 用于首页水平滑动列表，`'grid'` 用于闲置列表页自适应双列
- **Events**：
  - `@click(product)`：点击触发商品详情查看

### 5. `ProductSection.vue`
- **定位**：首页「最新闲置」展示区域，包含品牌指示竖条、查看更多跳转与水平隐藏滚动条平滑滑动手势。
- **Props**：
  - `title` (`string`)：默认 `'最新闲置'`
  - `products` (`Product[]`)：商品数组
  - `moreRoute` (`string`)：更多跳转路由（默认 `'/idle'`）

### 6. `ForumPostCard.vue`
- **定位**：校园论坛帖子通用卡片，双栏图文排版，集成标签 Tag、两行摘要、作者头像、评论计数与日期。
- **Props**：
  - `post` (`ForumPost`)：帖子实体对象

### 7. `ForumSection.vue`
- **定位**：首页「校园论坛」垂直展示区域。
- **Props**：
  - `title` (`string`)：默认 `'校园论坛'`
  - `posts` (`ForumPost[]`)：帖子数组
  - `moreRoute` (`string`)：默认 `'/forum'`

### 8. `BottomNavigation.vue`
- **定位**：固定在屏幕底部的四项全局导航栏（首页、闲置、论坛、我的），具备高亮切换反馈与 iOS Home Indicator 安全区适配。

---

## 四、设计规范与 Design Tokens (`variables.css`)

统一通过 CSS 自定义属性管理，便于前端团队一键微调主题：

| Token 名称 | 变量值 | 视觉含义 |
| :--- | :--- | :--- |
| `--color-primary` | `#10B958` | 福大校园清新主品牌绿 |
| `--color-primary-light` | `#EDFBEB` | 二手闲置卡片浅绿底色 |
| `--color-secondary` | `#4DA5FA` | 校园论坛主辅助蓝 |
| `--color-secondary-light` | `#E6F3FD` | 论坛卡片浅蓝底色 |
| `--color-price` | `#FF2442` | 醒目商品价格强调红 |
| `--color-bg-page` | `#F7F9FA` | 干净温润的浅灰白页面背景 |
| `--color-bg-card` | `#FFFFFF` | 纯白卡片背景 |
| `--radius-pill` | `9999px` | 胶囊搜索框与药丸圆角 |
| `--radius-lg` | `14px` | 商品卡片与论坛卡片圆角 |
| `--shadow-search` | `0 3px 12px rgba(0, 0, 0, 0.05)` | 搜索框轻微浮起阴影 |
| `--shadow-card` | `0 2px 10px rgba(0, 0, 0, 0.03)` | 页面卡片极简阴影 |

---

## 五、路由导航与页面交互规范

1. **首页 (`/`)**：
   - 点击搜索框：呼出全屏搜索浮层，支持热门搜索词、历史搜索标签与实时双向过滤。
   - 点击扫一扫：触发相机扫码原型提示 Toast。
   - 点击「二手闲置」卡片 /「最新闲置」查看更多：直达 `/idle`。
   - 点击「校园论坛」卡片 /「校园论坛」查看更多：直达 `/forum`。
   - 点击任意商品卡片：进入 `/product/:id` 商品详情页。
   - 点击任意论坛帖子：进入 `/forum/:id` 帖子详情页。
2. **二手闲置页 (`/idle`)**：
   - 顶部提供「全部、教材、数码、生活用品、求购」无刷新分类过滤。
   - 排序按钮支持「最新发布 / 价格最低」实时重排。
   - 右下角悬浮绿色「+ 发布」按钮，点击反馈接口对接规范。
3. **校园论坛页 (`/forum`)**：
   - 顶部提供「全部、备考、新生、宿舍、学习、生活」分类标签切换。
   - 右上角提供「发帖」按钮，明确提示原型交互状态。
4. **个人中心 (`/profile`)**：
   - 展示个人资料、我发布的、我的收藏、论坛互动、历史交易数据及常用功能设置菜单。
5. **双模预览控制器 (`App.vue`)**：
   - 在 PC 浏览器端右上角提供切换器，可在「📱 iPhone (390px)」与「🖥️ 自适应宽度」自由切换。

---

## 六、Mock 数据替换与 API 对接指南

前端团队后续对接 FastAPI 后端步骤：

1. **配置环境变量**：
   在根目录新建 `.env` 或配置：
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
2. **已有 API 模块说明** (`src/api/`)：
   - `src/api/product.ts` 已内置 `getProductList`、`getProductDetail`、`createProduct`、`updateProduct`、`deleteProduct`。
   - 请求异常或后端未启动时会自动平滑 fallback 到 `src/mock/index.ts`，确保 UI 渲染不中断。
   - 联调时只需移除 `try...catch` 的 fallback 或确保后端服务开启即可。
3. **Mock 数据扩展** (`src/mock/index.ts`)：
   - 所有商品与帖子数据均基于严格 TypeScript 接口（`Product`、`ForumPost`），直接追加即可更新界面。

---

## 七、当前完成情况与待联调项

### 已完成验收项
- [x] 首页 1:1 像素级高保真视觉还原（Logo、背景插画、搜索框、核心双入口、最新闲置横向卡片、校园论坛帖子、底部四项导航栏）
- [x] 8 个核心独立 Vue 单文件组件拆分
- [x] 清晰的 TypeScript 强类型定义与设计 Token CSS 变量
- [x] 移动端 390px 视口无横向溢出、垂直纵向滚动平滑、底部导航防遮挡
- [x] 页面路由跳转网络（首页、闲置、论坛、我的、商品详情、帖子详情）
- [x] 搜索框展开浮层过滤与扫一扫交互原型
- [x] Vite 成功启动、生产打包 0 错误、浏览器 Console 0 报错

### 待后续前后端联调项（Phase 1 演进）
1. **商品管理真实对接**：后端启动后将 `src/api/product.ts` 接入真实 PostgreSQL 数据库 CRUD；
2. **用户 Token 鉴权**：登录注册成功后将 JWT Token 写入 `localStorage.getItem('token')`，`request.ts` 已配置自动携带 `Bearer Token`；
3. **论坛模块 API**：当前论坛相关功能（发帖、点赞、评论）在 Phase 1 规范中无后端接口，已完整保留为高质量原型，待未来 Phase 2 接口定义后即可接入。
