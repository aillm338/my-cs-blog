---
title: C++ 指针与内存管理完全指南
date: 2026-05-18
tags: [C++]
---

# C++ 指针与内存管理完全指南

> 指针是 C++ 的核心，也是最容易出错的地方。本文从零梳理指针、引用、堆栈内存的概念，帮助你建立清晰的心智模型。

## 1. 栈 vs 堆

| 特性 | 栈（Stack） | 堆（Heap） |
|------|------------|-----------|
| 分配方式 | 自动（编译器管理） | 手动（`new` / `delete`） |
| 大小限制 | 较小（通常 1~8 MB） | 受系统内存限制 |
| 速度 | 快 | 相对慢 |
| 生命周期 | 随作用域结束自动释放 | 程序员手动释放 |

## 2. 指针基础

```cpp
#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* p = &x;   // p 存储 x 的地址

    cout << "x 的值: " << x << endl;
    cout << "x 的地址: " << &x << endl;
    cout << "p 的值(x的地址): " << p << endl;
    cout << "p 解引用: " << *p << endl;   // 输出 42

    *p = 100;  // 通过指针修改 x
    cout << "修改后 x = " << x << endl;  // 100

    return 0;
}
```

## 3. 动态内存分配

```cpp
#include <iostream>
using namespace std;

int main() {
    // 在堆上分配单个 int
    int* p = new int(10);
    cout << *p << endl;  // 10
    delete p;            // 释放内存
    p = nullptr;         // 防止悬空指针

    // 在堆上分配数组
    int n = 5;
    int* arr = new int[n]{1, 2, 3, 4, 5};
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    delete[] arr;   // 注意：数组用 delete[]
    arr = nullptr;

    return 0;
}
```

## 4. 常见陷阱

### 4.1 内存泄漏

```cpp
void leak() {
    int* p = new int(42);
    // 忘记 delete p; → 内存泄漏！
}
```

**解决方案**：使用 RAII 或智能指针：

```cpp
#include <memory>

void safe() {
    auto p = std::make_unique<int>(42);
    // 作用域结束自动释放，无需手动 delete
}
```

### 4.2 悬空指针

```cpp
int* p = new int(10);
delete p;
// p 现在是悬空指针，解引用 → 未定义行为！
*p = 20;  // ❌ 危险

// 正确做法
delete p;
p = nullptr;  // ✅
```

### 4.3 重复释放

```cpp
int* p = new int(10);
delete p;
delete p;  // ❌ 双重释放 → 崩溃
```

## 5. 推荐：优先使用智能指针

```cpp
#include <memory>
#include <iostream>
using namespace std;

int main() {
    // unique_ptr：独占所有权
    auto up = make_unique<int>(42);
    cout << *up << endl;

    // shared_ptr：共享所有权，引用计数
    auto sp1 = make_shared<int>(100);
    auto sp2 = sp1;  // 引用计数 +1
    cout << sp1.use_count() << endl;  // 2

    return 0;
}
```

## 总结

- 优先使用**栈分配**，避免手动内存管理
- 必须堆分配时，**配对使用** `new/delete`，数组用 `new[]/delete[]`
- 现代 C++ 中，**优先使用智能指针**替代裸指针
- 删除后立即置 `nullptr`，防止悬空指针
