import { category, createXiaohongshuPlan } from "./xiaohongshu_shared";

export default createXiaohongshuPlan(
  "小红书高频：Hot100 分类版",
  "来自小红书“高频力扣”图片，基本按力扣 Hot 100 的分类和顺序整理；股票系列按具体 LeetCode 题拆开。",
  [
    category("哈希", ["128"]),
    category("双指针", ["11", "15", "42"]),
    category("滑动窗口与子串", ["3", "560", "239"]),
    category("普通数组与矩阵", ["53", "56", "54"]),
    category("链表", ["206", "234", "141", "142", "21", "25", "23"]),
    category("二叉树", ["94", "101", "102", "105", "236", "437"]),
    category("图论", ["200"]),
    category("回溯", ["46", "39", "22", "79", "131"]),
    category("堆", ["215", "347"]),
    category(
      "动态规划",
      ["70", "198", "121", "122", "123", "322", "139", "300", "5", "1143", "72"]
    ),
  ]
);
