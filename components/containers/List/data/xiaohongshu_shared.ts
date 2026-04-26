import ProblemCategory from "@components/ProblemCatetory";

export const XIAOHONGSHU_SOURCE =
  "https://www.xiaohongshu.com/explore/6961257e000000000b00b388?xsec_token=ABpvpb9nOp5UUSMqU1Q9Ft-A304Sg4tc3Kb8qVTttrmlc=&xsec_source=pc_user&source=web_user_page";

const PROBLEMS: Record<string, { title: string; slug: string }> = {
  "1": { title: "两数之和", slug: "two-sum" },
  "2": { title: "两数相加", slug: "add-two-numbers" },
  "3": {
    title: "无重复字符的最长子串",
    slug: "longest-substring-without-repeating-characters",
  },
  "4": {
    title: "寻找两个正序数组的中位数",
    slug: "median-of-two-sorted-arrays",
  },
  "5": { title: "最长回文子串", slug: "longest-palindromic-substring" },
  "7": { title: "整数反转", slug: "reverse-integer" },
  "11": { title: "盛最多水的容器", slug: "container-with-most-water" },
  "15": { title: "三数之和", slug: "3sum" },
  "17": {
    title: "电话号码的字母组合",
    slug: "letter-combinations-of-a-phone-number",
  },
  "18": { title: "四数之和", slug: "4sum" },
  "21": {
    title: "合并两个有序链表",
    slug: "merge-two-sorted-lists",
  },
  "22": { title: "括号生成", slug: "generate-parentheses" },
  "23": { title: "合并 K 个升序链表", slug: "merge-k-sorted-lists" },
  "24": { title: "两两交换链表中的节点", slug: "swap-nodes-in-pairs" },
  "25": { title: "K 个一组翻转链表", slug: "reverse-nodes-in-k-group" },
  "31": { title: "下一个排列", slug: "next-permutation" },
  "33": {
    title: "搜索旋转排序数组",
    slug: "search-in-rotated-sorted-array",
  },
  "34": {
    title: "在排序数组中查找元素的第一个和最后一个位置",
    slug: "find-first-and-last-position-of-element-in-sorted-array",
  },
  "35": { title: "搜索插入位置", slug: "search-insert-position" },
  "39": { title: "组合总和", slug: "combination-sum" },
  "42": { title: "接雨水", slug: "trapping-rain-water" },
  "43": { title: "字符串相乘", slug: "multiply-strings" },
  "45": { title: "跳跃游戏 II", slug: "jump-game-ii" },
  "46": { title: "全排列", slug: "permutations" },
  "49": { title: "字母异位词分组", slug: "group-anagrams" },
  "53": { title: "最大子数组和", slug: "maximum-subarray" },
  "54": { title: "螺旋矩阵", slug: "spiral-matrix" },
  "55": { title: "跳跃游戏", slug: "jump-game" },
  "56": { title: "合并区间", slug: "merge-intervals" },
  "59": { title: "螺旋矩阵 II", slug: "spiral-matrix-ii" },
  "64": { title: "最小路径和", slug: "minimum-path-sum" },
  "70": { title: "爬楼梯", slug: "climbing-stairs" },
  "72": { title: "编辑距离", slug: "edit-distance" },
  "74": { title: "搜索二维矩阵", slug: "search-a-2d-matrix" },
  "76": { title: "最小覆盖子串", slug: "minimum-window-substring" },
  "78": { title: "子集", slug: "subsets" },
  "79": { title: "单词搜索", slug: "word-search" },
  "92": { title: "反转链表 II", slug: "reverse-linked-list-ii" },
  "94": {
    title: "二叉树的中序遍历",
    slug: "binary-tree-inorder-traversal",
  },
  "98": { title: "验证二叉搜索树", slug: "validate-binary-search-tree" },
  "101": { title: "对称二叉树", slug: "symmetric-tree" },
  "102": {
    title: "二叉树的层序遍历",
    slug: "binary-tree-level-order-traversal",
  },
  "104": {
    title: "二叉树的最大深度",
    slug: "maximum-depth-of-binary-tree",
  },
  "105": {
    title: "从前序与中序遍历序列构造二叉树",
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
  },
  "112": { title: "路径总和", slug: "path-sum" },
  "113": { title: "路径总和 II", slug: "path-sum-ii" },
  "121": {
    title: "买卖股票的最佳时机",
    slug: "best-time-to-buy-and-sell-stock",
  },
  "122": {
    title: "买卖股票的最佳时机 II",
    slug: "best-time-to-buy-and-sell-stock-ii",
  },
  "123": {
    title: "买卖股票的最佳时机 III",
    slug: "best-time-to-buy-and-sell-stock-iii",
  },
  "124": {
    title: "二叉树中的最大路径和",
    slug: "binary-tree-maximum-path-sum",
  },
  "128": {
    title: "最长连续序列",
    slug: "longest-consecutive-sequence",
  },
  "131": { title: "分割回文串", slug: "palindrome-partitioning" },
  "135": { title: "分发糖果", slug: "candy" },
  "136": { title: "只出现一次的数字", slug: "single-number" },
  "139": { title: "单词拆分", slug: "word-break" },
  "141": { title: "环形链表", slug: "linked-list-cycle" },
  "142": { title: "环形链表 II", slug: "linked-list-cycle-ii" },
  "143": { title: "重排链表", slug: "reorder-list" },
  "146": { title: "LRU 缓存", slug: "lru-cache" },
  "148": { title: "排序链表", slug: "sort-list" },
  "152": { title: "乘积最大子数组", slug: "maximum-product-subarray" },
  "153": {
    title: "寻找旋转排序数组中的最小值",
    slug: "find-minimum-in-rotated-sorted-array",
  },
  "155": { title: "最小栈", slug: "min-stack" },
  "160": {
    title: "相交链表",
    slug: "intersection-of-two-linked-lists",
  },
  "162": { title: "寻找峰值", slug: "find-peak-element" },
  "198": { title: "打家劫舍", slug: "house-robber" },
  "199": { title: "二叉树的右视图", slug: "binary-tree-right-side-view" },
  "200": { title: "岛屿数量", slug: "number-of-islands" },
  "206": { title: "反转链表", slug: "reverse-linked-list" },
  "207": { title: "课程表", slug: "course-schedule" },
  "208": { title: "实现 Trie (前缀树)", slug: "implement-trie-prefix-tree" },
  "213": { title: "打家劫舍 II", slug: "house-robber-ii" },
  "215": {
    title: "数组中的第 K 个最大元素",
    slug: "kth-largest-element-in-an-array",
  },
  "234": { title: "回文链表", slug: "palindrome-linked-list" },
  "236": {
    title: "二叉树的最近公共祖先",
    slug: "lowest-common-ancestor-of-a-binary-tree",
  },
  "238": {
    title: "除自身以外数组的乘积",
    slug: "product-of-array-except-self",
  },
  "239": { title: "滑动窗口最大值", slug: "sliding-window-maximum" },
  "240": { title: "搜索二维矩阵 II", slug: "search-a-2d-matrix-ii" },
  "300": {
    title: "最长递增子序列",
    slug: "longest-increasing-subsequence",
  },
  "322": { title: "零钱兑换", slug: "coin-change" },
  "347": { title: "前 K 个高频元素", slug: "top-k-frequent-elements" },
  "378": {
    title: "有序矩阵中第 K 小的元素",
    slug: "kth-smallest-element-in-a-sorted-matrix",
  },
  "394": { title: "字符串解码", slug: "decode-string" },
  "437": { title: "路径总和 III", slug: "path-sum-iii" },
  "470": {
    title: "用 Rand7() 实现 Rand10()",
    slug: "implement-rand10-using-rand7",
  },
  "543": { title: "二叉树的直径", slug: "diameter-of-binary-tree" },
  "560": { title: "和为 K 的子数组", slug: "subarray-sum-equals-k" },
  "695": { title: "岛屿的最大面积", slug: "max-area-of-island" },
  "739": { title: "每日温度", slug: "daily-temperatures" },
  "875": { title: "爱吃香蕉的珂珂", slug: "koko-eating-bananas" },
  "1143": {
    title: "最长公共子序列",
    slug: "longest-common-subsequence",
  },
};

export const problem = (id: string) => {
  const item = PROBLEMS[id];

  if (!item) {
    throw new Error(`Unknown LeetCode problem id: ${id}`);
  }

  return {
    title: `${id}. ${item.title}`,
    summary: "",
    src: `/${item.slug}/`,
    original_src: `https://leetcode.cn/problems/${item.slug}/`,
    sort: 0,
    isLeaf: true,
    solution: null,
    score: null,
    leafChild: [],
    nonLeafChild: [],
    isPremium: false,
    last_update: "",
  };
};

export const category = (title: string, ids: string[], summary = "") => ({
  title,
  summary,
  src: "",
  original_src: "",
  sort: 0,
  isLeaf: false,
  solution: "",
  score: 0,
  leafChild: ids.map(problem),
  nonLeafChild: [],
  isPremium: false,
  last_update: "",
});

export const createXiaohongshuPlan = (
  title: string,
  summary: string,
  nonLeafChild: ReturnType<typeof category>[]
) =>
  ({
    title,
    summary,
    src: "",
    original_src: XIAOHONGSHU_SOURCE,
    sort: 0,
    isLeaf: false,
    solution: "",
    score: 0,
    leafChild: [],
    nonLeafChild,
    isPremium: false,
    last_update: "2026-04-26",
  }) as ProblemCategory;
