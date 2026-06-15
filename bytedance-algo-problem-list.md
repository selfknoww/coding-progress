# 字节跳动算法实习生面经题单

> 汇总自小书、牛客上字节跳动相关面经（含 Commercial AI / 中国交易与广告、商业化算法、AI 算法、大模型算法等岗位）。
> 建议按「高频题 → Commercial AI 相关题 → 大模型手撕题」顺序刷。

---

## 刷题建议

1. **第一梯队（高频出现 ≥2 次）**：最长无重复子串、编辑距离、三数之和、N 皇后、分割等和子集
2. **第二梯队（Commercial AI / 广告推荐相关）**：编辑距离、sqrt、树的最大宽度、子树判断、矩阵单词路径
3. **第三梯队（大模型/深度学习手撕）**：Softmax、Attention 系列、RoPE、KV Cache、PPO/DPO/GRPO Loss
4. **查漏补缺**：hot100 中未覆盖的链表、树、DP、二分经典题

---

## 一、LeetCode / 经典算法题

| 题号 | 题目 | 难度 | 标签 | LeetCode 链接 | 出现来源 |
|------|------|------|------|---------------|----------|
| 3 | 无重复字符的最长子串 | 中等 | 字符串、滑动窗口 | [链接](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) | 梦一面、azy 一面、努力搞 ai 的喵星人一面 |
| 5 | 最长回文子串 | 中等 | 字符串、DP | [链接](https://leetcode.cn/problems/longest-palindromic-substring/) | 牛客后端面经 |
| 15 | 三数之和 | 中等 | 数组、双指针 | [链接](https://leetcode.cn/problems/3sum/) | 努力搞 ai 的喵星人二面 |
| 53 | 最大子数组和 | 中等 | DP | [链接](https://leetcode.cn/problems/maximum-subarray/) | 常见 |
| 62 | 不同路径 | 中等 | DP | [链接](https://leetcode.cn/problems/unique-paths/) | 常见 |
| 70 | 爬楼梯 | 简单 | DP | [链接](https://leetcode.cn/problems/climbing-stairs/) | 常见 |
| 72 | 编辑距离 | 困难 | 字符串、DP | [链接](https://leetcode.cn/problems/edit-distance/) | NullPointerException 二面（要求 O(n) 空间） |
| 94 | 二叉树中序遍历 | 简单 | 树 | [链接](https://leetcode.cn/problems/binary-tree-inorder-traversal/) | 常见 |
| 104 | 二叉树的最大深度 | 简单 | 树 | [链接](https://leetcode.cn/problems/maximum-depth-of-binary-tree/) | 常见 |
| 105 | 从前序与中序遍历序列构造二叉树 | 中等 | 树 | [链接](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) | 牛客后端面经 |
| 110 | 平衡二叉树 | 简单 | 树 | [链接](https://leetcode.cn/problems/balanced-binary-tree/) | 常见 |
| 114 | 二叉树展开为链表 | 中等 | 树 | [链接](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/) | 常见 |
| 128 | 最长连续序列 | 中等 | 数组、哈希 | [链接](https://leetcode.cn/problems/longest-consecutive-sequence/) | 常见 |
| 141 | 环形链表 | 简单 | 链表、双指针 | [链接](https://leetcode.cn/problems/linked-list-cycle/) | 常见 |
| 146 | LRU 缓存 | 中等 | 设计、哈希 | [链接](https://leetcode.cn/problems/lru-cache/) | 常见 |
| 198 | 打家劫舍 | 中等 | DP | [链接](https://leetcode.cn/problems/house-robber/) | 常见 |
| 200 | 岛屿数量 | 中等 | DFS、BFS | [链接](https://leetcode.cn/problems/number-of-islands/) | 常见 |
| 206 | 反转链表 | 简单 | 链表 | [链接](https://leetcode.cn/problems/reverse-linked-list/) | 常见 |
| 207 | 课程表 | 中等 | 拓扑排序 | [链接](https://leetcode.cn/problems/course-schedule/) | 常见 |
| 208 | 实现 Trie（前缀树） | 中等 | 设计、字典树 | [链接](https://leetcode.cn/problems/implement-trie-prefix-tree/) | 常见 |
| 215 | 数组中的第 K 个最大元素 | 中等 | 堆、快排 | [链接](https://leetcode.cn/problems/kth-largest-element-in-an-array/) | 常见 |
| 236 | 二叉树的最近公共祖先 | 中等 | 树 | [链接](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/) | 常见 |
| 239 | 滑动窗口最大值 | 困难 | 单调队列 | [链接](https://leetcode.cn/problems/sliding-window-maximum/) | 常见 |
| 240 | 搜索二维矩阵 II | 中等 | 矩阵、二分 | [链接](https://leetcode.cn/problems/search-a-2d-matrix-ii/) | 常见 |
| 300 | 最长递增子序列 | 中等 | DP、二分 | [链接](https://leetcode.cn/problems/longest-increasing-subsequence/) | 常见 |
| 322 | 零钱兑换 | 中等 | DP | [链接](https://leetcode.cn/problems/coin-change/) | 常见 |
| 337 | 打家劫舍 III | 中等 | 树、DP | [链接](https://leetcode.cn/problems/house-robber-iii/) | 常见 |
| 416 | 分割等和子集 | 中等 | 背包、DP | [链接](https://leetcode.cn/problems/partition-equal-subset-sum/) | WillingHuncho. 一面 |
| 438 | 找到字符串中所有字母异位词 | 中等 | 字符串、滑动窗口 | [链接](https://leetcode.cn/problems/find-all-anagrams-in-a-string/) | 常见 |
| 448 | 找到所有数组中消失的数字 | 简单 | 数组 | [链接](https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/) | 常见 |
| 494 | 目标和 | 中等 | DP | [链接](https://leetcode.cn/problems/target-sum/) | 常见 |
| 560 | 和为 K 的子数组 | 中等 | 前缀和 | [链接](https://leetcode.cn/problems/subarray-sum-equals-k/) | 常见 |
| 654 | 最大二叉树 | 中等 | 树 | [链接](https://leetcode.cn/problems/maximum-binary-tree/) | 常见 |
| 662 | 树的最大宽度 | 中等 | 树、BFS | [链接](https://leetcode.cn/problems/maximum-width-of-binary-tree/) | Layuiiiii 一面 |
| 704 | 二分查找 | 简单 | 二分 | [链接](https://leetcode.cn/problems/binary-search/) | 常见 |
| 739 | 每日温度 | 中等 | 单调栈 | [链接](https://leetcode.cn/problems/daily-temperatures/) | 常见 |
| 912 | 排序数组 | 中等 | 排序 | [链接](https://leetcode.cn/problems/sort-an-array/) | 常见 |
| 1143 | 最长公共子序列 | 中等 | DP | [链接](https://leetcode.cn/problems/longest-common-subsequence/) | 常见 |
| 剑指 Offer 26 | 树的子结构 | 中等 | 树 | [链接](https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/) | Layuiiiii 二面 |
| 剑指 Offer 12 | 矩阵中的路径 | 中等 | DFS | [链接](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/) | Layuiiiii 三面 |
| 51 | N 皇后 | 困难 | 回溯 | [链接](https://leetcode.cn/problems/n-queens/) | 努力搞 ai 的喵星人二面 |
| 69 | x 的平方根 | 简单 | 二分、数学 | [链接](https://leetcode.cn/problems/sqrtx/) | NullPointerException 三面 |

---

## 二、手写 / 非 LeetCode 算法题

| 题目 | 类型 | 出现来源 |
|------|------|----------|
| 不大于 n 的最大值 | 模拟/数学 | azy 二面 |
| 手写 Softmax | 基础层 | Fabrice_ 牛客、LLMForge 合集 |
| 手写 Sigmoid | 基础层 | Fabrice_ 牛客 |
| 手写交叉熵 | 基础层 | Fabrice_ 牛客 |
| 手写 Multi-Head Attention | 注意力机制 | LLMForge 合集 |
| 手写 Grouped Query Attention (GQA) | 注意力机制 | LLMForge 合集 |
| 手写 Multi-Head Latent Attention (MLA) | 注意力机制 | LLMForge 合集 |
| 手写 Multi-Head Cross-Attention | 注意力机制 | LLMForge 合集 |
| 手写 Softmax Attention | 注意力机制 | LLMForge 合集 |
| 手写 KV Cache Attention | 采样与推理 | LLMForge 合集 |
| 手写 Rotary Position Embedding (RoPE) | 模型架构 | LLMForge 合集 |
| 手写 PPO Clipped Loss | 对齐与多模态 | LLMForge 合集 |
| 手写 DPO Loss | 对齐与多模态 | LLMForge 合集 |
| 手写 GRPO Loss | 对齐与多模态 | LLMForge 合集 |

---

## 三、按出现频次排序（重点优先）

### 高频出现（≥2 次）

1. [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/) — 中等

### Commercial AI / 中国交易与广告相关

2. [72. 编辑距离](https://leetcode.cn/problems/edit-distance/) — 困难（重点：空间优化到 O(n)）
3. [69. x 的平方根](https://leetcode.cn/problems/sqrtx/) — 简单（重点：牛顿迭代 / 二分）
4. [662. 树的最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/) — 中等
5. [剑指 Offer 26. 树的子结构](https://leetcode.cn/problems/shu-de-zi-jie-gou-lcof/) — 中等
6. [剑指 Offer 12. 矩阵中的路径](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/) — 中等

### 其他字节算法岗常见

7. [15. 三数之和](https://leetcode.cn/problems/3sum/) — 中等
8. [51. N 皇后](https://leetcode.cn/problems/n-queens/) — 困难
9. [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/) — 中等
10. [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/) — 中等

---

## 四、大模型手撕题优先级

1. **Implement Softmax**（最简单，必会）
2. **Softmax Attention**（基础 attention）
3. **Multi-Head Attention**（MHA 标准实现）
4. **KV Cache Attention**（推理加速核心）
5. **Grouped Query Attention (GQA)**（当前主流）
6. **Rotary Position Embedding (RoPE)**（位置编码）
7. **Multi-Head Cross-Attention**（多模态/编码器-解码器）
8. **Multi-Head Latent Attention (MLA)**（DeepSeek 系列核心）
9. **PPO Clipped Loss**
10. **DPO Loss**
11. **GRPO Loss**

---

## 五、配套文件

- 详细面经原文见：`bytedance-commercial-ai-interview.md`
