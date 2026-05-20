---
title: Python 列表推导式与生成器
date: 2026-04-15
tags: [Python]
---

# Python 列表推导式与生成器

> 一行代码 vs 几行代码，性能差距在哪里？本文对比列表推导式、字典推导式与生成器表达式。

## 列表推导式

```python
# 传统写法
squares = []
for i in range(10):
    squares.append(i ** 2)

# 列表推导式：简洁、快
squares = [i ** 2 for i in range(10)]
print(squares)
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件过滤
evens = [i for i in range(20) if i % 2 == 0]
print(evens)
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

## 字典 / 集合推导式

```python
# 字典推导式
words = ['hello', 'world', 'python']
word_len = {word: len(word) for word in words}
print(word_len)
# {'hello': 5, 'world': 5, 'python': 6}

# 键值翻转
original = {'a': 1, 'b': 2, 'c': 3}
flipped = {v: k for k, v in original.items()}
print(flipped)
# {1: 'a', 2: 'b', 3: 'c'}

# 集合推导式（自动去重）
nums = [1, 2, 2, 3, 3, 4]
unique_squares = {x ** 2 for x in nums}
print(unique_squares)
# {1, 4, 9, 16}
```

## 生成器表达式

```python
import sys

# 列表推导式：一次性生成所有数据，存入内存
lst = [i ** 2 for i in range(1_000_000)]
print(sys.getsizeof(lst))   # 约 8MB

# 生成器表达式：惰性求值，按需生成
gen = (i ** 2 for i in range(1_000_000))
print(sys.getsizeof(gen))   # 约 112 字节！

# 使用：和列表一样迭代
total = sum(i ** 2 for i in range(100))
print(total)  # 328350
```

## 什么时候用哪种？

| 场景 | 推荐 |
|------|------|
| 需要多次随机访问 | 列表推导式 `[...]` |
| 一次性遍历，数据量大 | 生成器表达式 `(...)` |
| 构建映射关系 | 字典推导式 `{k: v ...}` |
| 去重后的集合 | 集合推导式 `{...}` |

## yield 生成器函数

```python
def fibonacci():
    """无限 Fibonacci 数列生成器"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


gen = fibonacci()
first_10 = [next(gen) for _ in range(10)]
print(first_10)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```
