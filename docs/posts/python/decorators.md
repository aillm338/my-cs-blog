---
title: Python 装饰器：从入门到原理
date: 2026-05-10
tags: [Python]
---

# Python 装饰器：从入门到原理

> 装饰器是 Python 中最优雅的语法糖之一，理解它需要先搞懂「函数是一等公民」。

## 前置知识：函数是对象

```python
def greet(name):
    return f"Hello, {name}!"

# 函数可以赋值给变量
say_hi = greet
print(say_hi("World"))  # Hello, World!

# 函数可以作为参数传递
def apply(func, arg):
    return func(arg)

print(apply(greet, "Python"))  # Hello, Python!
```

## 手写一个装饰器

```python
def timer(func):
    """计时装饰器"""
    import time
    from functools import wraps

    @wraps(func)   # 保留原函数的元信息
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} 耗时: {end - start:.4f}s")
        return result

    return wrapper


@timer
def slow_sum(n):
    """计算 1 到 n 的累加"""
    return sum(range(n + 1))


print(slow_sum(10_000_000))
# slow_sum 耗时: 0.2341s
# 50000005000000
```

## @wraps 为什么重要？

```python
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper  # 没有 @wraps

@bad_decorator
def my_func():
    """这是我的函数"""
    pass

print(my_func.__name__)   # wrapper  ← 被覆盖了！
print(my_func.__doc__)    # None     ← 文档丢失了！

# 使用 @wraps 后：
from functools import wraps

def good_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@good_decorator
def my_func():
    """这是我的函数"""
    pass

print(my_func.__name__)   # my_func  ✅
print(my_func.__doc__)    # 这是我的函数 ✅
```

## 带参数的装饰器

```python
def repeat(times):
    """执行 n 次的装饰器"""
    def decorator(func):
        from functools import wraps

        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator


@repeat(3)
def say(msg):
    print(msg)


say("Hello!")
# Hello!
# Hello!
# Hello!
```

## 内置装饰器一览

```python
class MyClass:
    class_count = 0

    def __init__(self, value):
        self.value = value

    @staticmethod
    def helper():
        """静态方法，不依赖实例或类"""
        return "I'm static"

    @classmethod
    def create(cls, value):
        """类方法，第一个参数是类本身"""
        return cls(value)

    @property
    def doubled(self):
        """将方法当属性访问"""
        return self.value * 2


obj = MyClass(21)
print(obj.doubled)     # 42，无需加括号
print(MyClass.helper())
```

## 总结

- 装饰器本质是**高阶函数**：接收函数，返回函数
- 始终用 `@functools.wraps` 保护原函数元信息
- 带参装饰器需要**三层嵌套**：`参数 → 装饰器 → 包装函数`
