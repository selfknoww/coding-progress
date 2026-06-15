import binarySearch from "@components/containers/List/data/binary_search";
import basicAlgorithm from "@components/containers/List/data/basic_algorithm";
import bitwiseOperations from "@components/containers/List/data/bitwise_operations";
import bytedanceAlgo from "@components/containers/List/data/bytedance_algo";
import dataStructure from "@components/containers/List/data/data_structure";
import dynamicProgramming from "@components/containers/List/data/dynamic_programming";
import graph from "@components/containers/List/data/graph";
import greedy from "@components/containers/List/data/greedy";
import grid from "@components/containers/List/data/grid";
import hot100 from "@components/containers/List/data/hot_100";
import math from "@components/containers/List/data/math";
import monotonicStack from "@components/containers/List/data/monotonic_stack";
import slidingWindow from "@components/containers/List/data/sliding_window";
import string from "@components/containers/List/data/string";
import trees from "@components/containers/List/data/trees";
import xiaohongshuCurated from "@components/containers/List/data/xiaohongshu_curated";
import xiaohongshuHot40 from "@components/containers/List/data/xiaohongshu_hot_40";

export const studyPlans = {
  xhs_bytedance_algo: {
    title: "字节跳动算法面经",
    href: "/list/xhs_bytedance_algo",
    data: bytedanceAlgo,
  },
  basic_algorithm: {
    title: "基础算法精讲",
    href: "/list/basic_algorithm",
    data: basicAlgorithm,
  },
  hot_100: {
    title: "Hot 100",
    href: "/list/hot_100",
    data: hot100,
  },
  xhs_curated: {
    title: "小红书精选讲解",
    href: "/list/xhs_curated",
    data: xiaohongshuCurated,
  },
  xhs_hot_40: {
    title: "小红书 Hot100 分类",
    href: "/list/xhs_hot_40",
    data: xiaohongshuHot40,
  },
  sliding_window: {
    title: "滑动窗口",
    href: "/list/sliding_window",
    data: slidingWindow,
  },
  binary_search: {
    title: "二分算法",
    href: "/list/binary_search",
    data: binarySearch,
  },
  monotonic_stack: {
    title: "单调栈",
    href: "/list/monotonic_stack",
    data: monotonicStack,
  },
  grid: {
    title: "网格图",
    href: "/list/grid",
    data: grid,
  },
  bitwise_operations: {
    title: "位运算",
    href: "/list/bitwise_operations",
    data: bitwiseOperations,
  },
  graph: {
    title: "图论",
    href: "/list/graph",
    data: graph,
  },
  dynamic_programming: {
    title: "动态规划",
    href: "/list/dynamic_programming",
    data: dynamicProgramming,
  },
  data_structure: {
    title: "数据结构",
    href: "/list/data_structure",
    data: dataStructure,
  },
  math: {
    title: "数学",
    href: "/list/math",
    data: math,
  },
  greedy: {
    title: "贪心",
    href: "/list/greedy",
    data: greedy,
  },
  trees: {
    title: "链表与树",
    href: "/list/trees",
    data: trees,
  },
  string: {
    title: "字符串",
    href: "/list/string",
    data: string,
  },
} as const;

export type StudyPlanSlug = keyof typeof studyPlans;

export const defaultStudyPlanSlug: StudyPlanSlug = "dynamic_programming";
