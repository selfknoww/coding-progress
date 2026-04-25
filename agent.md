# Agent Notes

## 题单数据位置

- 题单数据文件放在 `components/containers/List/data/*.ts`。
- 题单入口配置在 `config/studyPlans.ts`。
- 列表页面路由是 `app/list/[slug]/page.tsx`，会读取 `studyPlans` 自动生成 `/list/<slug>`。
- 题单渲染组件是 `components/containers/List/index.tsx` 和 `components/ProblemCatetory`。

## 创建一个新题单

1. 在 `components/containers/List/data` 新建一个数据文件，例如 `two_pointers.ts`。
2. 默认导出一个根分类对象。
3. 在 `config/studyPlans.ts` 中导入该数据文件。
4. 把它加入 `studyPlans`，key 就是 URL slug。

示例：

```ts
import twoPointers from "@components/containers/List/data/two_pointers";

export const studyPlans = {
  two_pointers: {
    title: "双指针",
    href: "/list/two_pointers",
    data: twoPointers,
  },
} as const;
```

## 添加题单中的题目

题目必须放在某个分类节点的 `leafChild` 中。

```ts
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
}
```

分类节点使用 `isLeaf: false`，题目节点使用 `isLeaf: true`。分类节点的 `leafChild` 存题目，`nonLeafChild` 存子分类。

## Summary 渲染注意事项

`summary` 支持 Markdown、HTML、表格、代码块和 LaTeX 公式：

````md
设 $0\le i<j<k<n$。

```py
def solve():
    pass
```
````

代码块必须尽量保持完整的 fenced code block。历史 v0 数据里有少量代码块被拆开，`src/summaryHtml.mjs` 做了兼容，但新增数据不要依赖这个兼容逻辑。

## 修改后的验证

修改题单数据或渲染逻辑后至少运行：

```bash
npm test
npm run build
```
