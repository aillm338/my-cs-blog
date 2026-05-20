---
title: STL 常用容器速查手册
date: 2026-04-28
tags: [C++]
---

# STL 常用容器速查手册

> vector、map、unordered_map、set 的时间复杂度、使用场景与常见陷阱，面试备考必备。

## 容器对比一览

| 容器 | 底层结构 | 查找 | 插入/删除 | 有序 | 允许重复 |
|------|---------|------|----------|------|---------|
| `vector` | 动态数组 | O(n) | 尾部 O(1)，中间 O(n) | 是 | 是 |
| `list` | 双向链表 | O(n) | O(1) | 是 | 是 |
| `map` | 红黑树 | O(log n) | O(log n) | 是（按 key） | key 唯一 |
| `unordered_map` | 哈希表 | O(1) 均摊 | O(1) 均摊 | 否 | key 唯一 |
| `set` | 红黑树 | O(log n) | O(log n) | 是 | 否 |
| `unordered_set` | 哈希表 | O(1) 均摊 | O(1) 均摊 | 否 | 否 |

## vector

```cpp
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3};

    v.push_back(4);           // 尾部插入
    v.emplace_back(5);        // 原地构造，更高效
    v.pop_back();             // 删除末尾
    v.insert(v.begin(), 0);   // 头部插入（O(n)，慎用）

    // 范围 for
    for (int x : v) cout << x << " ";

    // 注意：索引访问不检查越界
    cout << v[0];      // 不检查越界
    cout << v.at(0);   // 越界抛异常，更安全

    return 0;
}
```

## map vs unordered_map

```cpp
#include <map>
#include <unordered_map>
#include <string>
using namespace std;

// 需要有序遍历 → map
map<string, int> scores;
scores["Alice"] = 95;
scores["Bob"] = 88;
// 按 key 字典序输出

// 只需快速查找 → unordered_map
unordered_map<string, int> fastMap;
fastMap["Alice"] = 95;

// 查找
if (fastMap.count("Alice")) {
    cout << fastMap["Alice"];
}

// C++17 结构化绑定遍历
for (auto& [key, val] : fastMap) {
    cout << key << ": " << val << "\n";
}
```

## 常见陷阱

```cpp
// 陷阱：用 [] 访问 map 会自动插入默认值
map<string, int> m;
cout << m["key"];  // 此时 "key" 被插入，值为 0！

// 安全做法：先用 count 或 find 检查
if (m.count("key")) {
    cout << m["key"];
}
```
