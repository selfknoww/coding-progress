import binarySearch from "@components/containers/List/data/binary_search";
import bitwiseOperations from "@components/containers/List/data/bitwise_operations";
import dataStructure from "@components/containers/List/data/data_structure";
import dynamicProgramming from "@components/containers/List/data/dynamic_programming";
import graph from "@components/containers/List/data/graph";
import greedy from "@components/containers/List/data/greedy";
import grid from "@components/containers/List/data/grid";
import math from "@components/containers/List/data/math";
import monotonicStack from "@components/containers/List/data/monotonic_stack";
import slidingWindow from "@components/containers/List/data/sliding_window";
import string from "@components/containers/List/data/string";
import trees from "@components/containers/List/data/trees";

export const studyPlans = {
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
