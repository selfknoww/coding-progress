# coding-progress

一个本地部署的刷题题单与进度管理页面。题单数据来自 TypeScript 数据文件，刷题进度保存在浏览器本地存储中，并支持 JSON 导入导出。

## 来源说明

本项目的题单数据、页面结构和部分渲染逻辑基于 [huxulm/lc-rating](https://github.com/huxulm/lc-rating) 的 v0 版本迁移和改写，用于个人本地部署与刷题进度管理。

## 本地进度与 JSON 备份

刷题进度只保存在当前浏览器的 `localStorage` 中，不依赖账号或远端同步。右上角可以导出/导入 JSON，适合换浏览器、换机器或手动备份。

状态含义：

- `TODO`：待做，不会写入导出的 `progress`。
- `WORKING`：攻略中。
- `TOO_HARD`：太难了，不会。
- `REVIEW_NEEDED`：回头复习下。
- `AC`：过了。

导出的 JSON 会包含当前非待做题目的状态，以及这些状态最后一次更新时间：

```json
{
  "version": 2,
  "exportedAt": "2026-04-26T12:00:00.000Z",
  "progress": {
    "167": "AC",
    "15": "REVIEW_NEEDED"
  },
  "updatedAt": {
    "167": "2026-04-26T10:00:00.000Z",
    "15": "2026-04-25T18:30:00.000Z"
  }
}
```

`updatedAt` 是题目当前状态的更新时间。页面里的 `Last AC today`、首页的 Today / 3 Days / 7 Days 统计，以及最近 AC 活动列表都基于这个字段计算。导入旧版 JSON 时，如果存在历史 `history` 字段，会自动取每道题最后一次状态变化时间作为 `updatedAt`；如果没有时间信息，会在导入时为已有进度补当前时间。

为了避免误触，修改题目状态时会弹出确认框。清空状态会同时清掉该题的更新时间；导出时只会保留当前非待做题目的更新时间。

## 开发命令

```bash
npm install
npm run dev
npm test
npm run build
```

## 如何创建一个题单

题单由两部分组成：一个数据文件，以及一次配置注册。

1. 在 `components/containers/List/data` 下新增一个题单数据文件，例如 `two_pointers.ts`。

```ts
export default {
  title: "双指针",
  summary: "题单介绍，可以写 Markdown、表格、代码块和 $LaTeX$ 公式。",
  src: "",
  original_src: "https://leetcode.cn/circle/discuss/xxx",
  sort: 0,
  isLeaf: false,
  solution: "",
  score: 0,
  leafChild: [],
  nonLeafChild: [
    {
      title: "一、相向双指针",
      summary: "",
      src: "",
      original_src: "",
      sort: 0,
      isLeaf: false,
      solution: "",
      score: 0,
      leafChild: [],
      nonLeafChild: [],
      isPremium: false,
      last_update: "",
    },
  ],
  isPremium: false,
  last_update: "2026-04-26",
};
```

2. 在 `config/studyPlans.ts` 中导入并注册这个题单。

```ts
import twoPointers from "@components/containers/List/data/two_pointers";

export const studyPlans = {
  // ...
  two_pointers: {
    title: "双指针",
    href: "/list/two_pointers",
    data: twoPointers,
  },
} as const;
```

注册后页面地址就是 `/list/two_pointers`。`app/list/[slug]/page.tsx` 会从 `studyPlans` 自动生成静态路由，不需要再单独添加页面文件。

## 如何添加题单中的题目

题目放在某个分类节点的 `leafChild` 数组中。分类节点可以继续通过 `nonLeafChild` 嵌套子分类。

```ts
{
  title: "§1.1 基础",
  summary: "这里可以写本小节说明。",
  src: "",
  original_src: "",
  sort: 0,
  isLeaf: false,
  solution: "",
  score: 0,
  leafChild: [
    {
      title: "167. 两数之和 II - 输入有序数组",
      summary: "",
      src: "/two-sum-ii-input-array-is-sorted/",
      original_src: "https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/",
      sort: 0,
      isLeaf: true,
      solution: null,
      score: 1300,
      leafChild: [],
      nonLeafChild: [],
      isPremium: false,
      last_update: "",
    },
  ],
  nonLeafChild: [],
  isPremium: false,
  last_update: "",
}
```

字段约定：

- `title`：展示标题。题目建议使用 `题号. 中文标题`，本地进度会优先用题号做 key。
- `summary`：说明文本，支持 Markdown、HTML、表格、代码块、行内公式 `$...$` 和块级公式 `$$...$$`。
- `src`：LeetCode 题目路径，例如 `/two-sum/`，用于站内样式的题目链接。
- `original_src`：完整原始链接。
- `score`：难度分，没有可以填 `null`。
- `isPremium`：是否会员题。
- `leafChild`：当前分类下的题目。
- `nonLeafChild`：当前分类下的子分类。

修改数据后建议运行：

```bash
npm test
npm run build
```
