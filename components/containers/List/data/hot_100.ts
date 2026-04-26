const problem = (
  id: string,
  title: string,
  slug: string,
  isPremium = false
) => ({
  title: `${id}. ${title}`,
  summary: "",
  src: `/${slug}/`,
  original_src: `https://leetcode.cn/problems/${slug}/`,
  sort: 0,
  isLeaf: true,
  solution: null,
  score: null,
  leafChild: [],
  nonLeafChild: [],
  isPremium,
  last_update: "",
});

const category = (title: string, leafChild: ReturnType<typeof problem>[]) => ({
  title,
  summary: "",
  src: "",
  original_src: "",
  sort: 0,
  isLeaf: false,
  solution: "",
  score: 0,
  leafChild,
  nonLeafChild: [],
  isPremium: false,
  last_update: "",
});

export default {
  title: "LeetCode 热题 100",
  summary:
    "力扣官方 Hot 100 题单。站内用户最喜爱的 100 道题，按官方分类组织。",
  src: "",
  original_src: "https://leetcode.cn/studyplan/top-100-liked/",
  sort: 0,
  isLeaf: false,
  solution: "",
  score: 0,
  leafChild: [],
  nonLeafChild: [
    category("哈希", [
      problem("1", "两数之和", "two-sum"),
      problem("49", "字母异位词分组", "group-anagrams"),
      problem("128", "最长连续序列", "longest-consecutive-sequence"),
    ]),
    category("双指针", [
      problem("283", "移动零", "move-zeroes"),
      problem("11", "盛最多水的容器", "container-with-most-water"),
      problem("15", "三数之和", "3sum"),
      problem("42", "接雨水", "trapping-rain-water"),
    ]),
    category("滑动窗口", [
      problem(
        "3",
        "无重复字符的最长子串",
        "longest-substring-without-repeating-characters"
      ),
      problem(
        "438",
        "找到字符串中所有字母异位词",
        "find-all-anagrams-in-a-string"
      ),
    ]),
    category("子串", [
      problem("560", "和为 K 的子数组", "subarray-sum-equals-k"),
      problem("239", "滑动窗口最大值", "sliding-window-maximum"),
      problem("76", "最小覆盖子串", "minimum-window-substring"),
    ]),
    category("普通数组", [
      problem("53", "最大子数组和", "maximum-subarray"),
      problem("56", "合并区间", "merge-intervals"),
      problem("189", "轮转数组", "rotate-array"),
      problem(
        "238",
        "除自身以外数组的乘积",
        "product-of-array-except-self"
      ),
      problem("41", "缺失的第一个正数", "first-missing-positive"),
    ]),
    category("矩阵", [
      problem("73", "矩阵置零", "set-matrix-zeroes"),
      problem("54", "螺旋矩阵", "spiral-matrix"),
      problem("48", "旋转图像", "rotate-image"),
      problem("240", "搜索二维矩阵 II", "search-a-2d-matrix-ii"),
    ]),
    category("链表", [
      problem("160", "相交链表", "intersection-of-two-linked-lists"),
      problem("206", "反转链表", "reverse-linked-list"),
      problem("234", "回文链表", "palindrome-linked-list"),
      problem("141", "环形链表", "linked-list-cycle"),
      problem("142", "环形链表 II", "linked-list-cycle-ii"),
      problem("21", "合并两个有序链表", "merge-two-sorted-lists"),
      problem("2", "两数相加", "add-two-numbers"),
      problem(
        "19",
        "删除链表的倒数第 N 个结点",
        "remove-nth-node-from-end-of-list"
      ),
      problem("24", "两两交换链表中的节点", "swap-nodes-in-pairs"),
      problem("25", "K 个一组翻转链表", "reverse-nodes-in-k-group"),
      problem("138", "随机链表的复制", "copy-list-with-random-pointer"),
      problem("148", "排序链表", "sort-list"),
      problem("23", "合并 K 个升序链表", "merge-k-sorted-lists"),
      problem("146", "LRU 缓存", "lru-cache"),
    ]),
    category("二叉树", [
      problem("94", "二叉树的中序遍历", "binary-tree-inorder-traversal"),
      problem("104", "二叉树的最大深度", "maximum-depth-of-binary-tree"),
      problem("226", "翻转二叉树", "invert-binary-tree"),
      problem("101", "对称二叉树", "symmetric-tree"),
      problem("543", "二叉树的直径", "diameter-of-binary-tree"),
      problem("102", "二叉树的层序遍历", "binary-tree-level-order-traversal"),
      problem(
        "108",
        "将有序数组转换为二叉搜索树",
        "convert-sorted-array-to-binary-search-tree"
      ),
      problem("98", "验证二叉搜索树", "validate-binary-search-tree"),
      problem(
        "230",
        "二叉搜索树中第 K 小的元素",
        "kth-smallest-element-in-a-bst"
      ),
      problem("199", "二叉树的右视图", "binary-tree-right-side-view"),
      problem(
        "114",
        "二叉树展开为链表",
        "flatten-binary-tree-to-linked-list"
      ),
      problem(
        "105",
        "从前序与中序遍历序列构造二叉树",
        "construct-binary-tree-from-preorder-and-inorder-traversal"
      ),
      problem("437", "路径总和 III", "path-sum-iii"),
      problem(
        "236",
        "二叉树的最近公共祖先",
        "lowest-common-ancestor-of-a-binary-tree"
      ),
      problem("124", "二叉树中的最大路径和", "binary-tree-maximum-path-sum"),
    ]),
    category("图论", [
      problem("200", "岛屿数量", "number-of-islands"),
      problem("994", "腐烂的橘子", "rotting-oranges"),
      problem("207", "课程表", "course-schedule"),
      problem("208", "实现 Trie (前缀树)", "implement-trie-prefix-tree"),
    ]),
    category("回溯", [
      problem("46", "全排列", "permutations"),
      problem("78", "子集", "subsets"),
      problem(
        "17",
        "电话号码的字母组合",
        "letter-combinations-of-a-phone-number"
      ),
      problem("39", "组合总和", "combination-sum"),
      problem("22", "括号生成", "generate-parentheses"),
      problem("79", "单词搜索", "word-search"),
      problem("131", "分割回文串", "palindrome-partitioning"),
      problem("51", "N 皇后", "n-queens"),
    ]),
    category("二分查找", [
      problem("35", "搜索插入位置", "search-insert-position"),
      problem("74", "搜索二维矩阵", "search-a-2d-matrix"),
      problem(
        "34",
        "在排序数组中查找元素的第一个和最后一个位置",
        "find-first-and-last-position-of-element-in-sorted-array"
      ),
      problem("33", "搜索旋转排序数组", "search-in-rotated-sorted-array"),
      problem(
        "153",
        "寻找旋转排序数组中的最小值",
        "find-minimum-in-rotated-sorted-array"
      ),
      problem("4", "寻找两个正序数组的中位数", "median-of-two-sorted-arrays"),
    ]),
    category("栈", [
      problem("20", "有效的括号", "valid-parentheses"),
      problem("155", "最小栈", "min-stack"),
      problem("394", "字符串解码", "decode-string"),
      problem("739", "每日温度", "daily-temperatures"),
      problem("84", "柱状图中最大的矩形", "largest-rectangle-in-histogram"),
    ]),
    category("堆", [
      problem("215", "数组中的第K个最大元素", "kth-largest-element-in-an-array"),
      problem("347", "前 K 个高频元素", "top-k-frequent-elements"),
      problem("295", "数据流的中位数", "find-median-from-data-stream"),
    ]),
    category("贪心算法", [
      problem("121", "买卖股票的最佳时机", "best-time-to-buy-and-sell-stock"),
      problem("55", "跳跃游戏", "jump-game"),
      problem("45", "跳跃游戏 II", "jump-game-ii"),
      problem("763", "划分字母区间", "partition-labels"),
    ]),
    category("动态规划", [
      problem("70", "爬楼梯", "climbing-stairs"),
      problem("118", "杨辉三角", "pascals-triangle"),
      problem("198", "打家劫舍", "house-robber"),
      problem("279", "完全平方数", "perfect-squares"),
      problem("322", "零钱兑换", "coin-change"),
      problem("139", "单词拆分", "word-break"),
      problem("300", "最长递增子序列", "longest-increasing-subsequence"),
      problem("152", "乘积最大子数组", "maximum-product-subarray"),
      problem("416", "分割等和子集", "partition-equal-subset-sum"),
      problem("32", "最长有效括号", "longest-valid-parentheses"),
    ]),
    category("多维动态规划", [
      problem("62", "不同路径", "unique-paths"),
      problem("64", "最小路径和", "minimum-path-sum"),
      problem("5", "最长回文子串", "longest-palindromic-substring"),
      problem("1143", "最长公共子序列", "longest-common-subsequence"),
      problem("72", "编辑距离", "edit-distance"),
    ]),
    category("技巧", [
      problem("136", "只出现一次的数字", "single-number"),
      problem("169", "多数元素", "majority-element"),
      problem("75", "颜色分类", "sort-colors"),
      problem("31", "下一个排列", "next-permutation"),
      problem("287", "寻找重复数", "find-the-duplicate-number"),
    ]),
  ],
  isPremium: false,
  last_update: "2026-04-26",
};
