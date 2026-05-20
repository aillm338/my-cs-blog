---
title: Git 常见问题排查笔记
date: 2026-04-02
tags: [踩坑笔记]
---

# Git 常见问题排查笔记

> 日常使用 Git 踩过的坑，遇到了就记下来，下次不再问 Stack Overflow。

## 撤销操作

### 撤销未提交的修改

```bash
# 撤销工作区的修改（危险！不可恢复）
git checkout -- <file>

# Git 2.23+ 推荐写法
git restore <file>

# 撤销所有未暂存的修改
git restore .
```

### 撤销已暂存的文件

```bash
# 把文件从暂存区移回工作区
git restore --staged <file>

# 老版本写法
git reset HEAD <file>
```

### 修改最后一次提交

```bash
# 修改提交信息
git commit --amend -m "新的提交信息"

# 补充文件到上一次提交（不修改信息）
git add forgotten-file.txt
git commit --amend --no-edit
```

## 分支操作

```bash
# 创建并切换分支
git checkout -b feature/new-ui
# 或（推荐）
git switch -c feature/new-ui

# 重命名当前分支
git branch -m old-name new-name

# 删除已合并的本地分支
git branch -d feature/done

# 强制删除（未合并也删）
git branch -D feature/abandoned

# 查看所有分支（本地 + 远程）
git branch -a
```

## 处理冲突

```bash
# 发生冲突后，手动编辑冲突文件，然后：
git add <resolved-file>
git commit

# 用 VS Code 解决冲突（推荐）
git config --global merge.tool vscode
git mergetool
```

冲突标记长这样：

```
<<<<<<< HEAD
你的修改
=======
别人的修改
>>>>>>> feature/branch
```

## 回退版本

```bash
# 查看提交历史
git log --oneline --graph

# 软回退：保留工作区修改（最安全）
git reset --soft HEAD~1

# 混合回退：保留文件，取消暂存（默认）
git reset HEAD~1

# 硬回退：丢弃所有修改（危险！）
git reset --hard HEAD~1

# 更安全的回退：生成一个新的"撤销提交"
git revert HEAD
```

## 远程同步

```bash
# 拉取并变基（保持线性历史）
git pull --rebase origin main

# 强推（覆盖远程，谨慎！）
git push --force-with-lease   # 比 --force 更安全

# 查看远程地址
git remote -v

# 修改远程地址
git remote set-url origin <new-url>
```

## 实用小技巧

```bash
# 储藏当前修改，稍后恢复
git stash
git stash pop

# 从其他分支拿一个提交
git cherry-pick <commit-hash>

# 查看某行代码是谁写的
git blame <file>

# 搜索提交历史中的关键词
git log -S "某个函数名" --oneline
```
