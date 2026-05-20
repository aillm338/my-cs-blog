<template>
  <div class="blog-home">
    <!-- 最新文章 -->
    <div class="blog-section-title">最新文章</div>
    <ul class="post-list">
      <li v-for="post in latestPosts" :key="post.link" class="post-item">
        <div class="post-meta">
          <span class="post-date">{{ post.date }}</span>
        </div>
        <div class="post-content">
          <a :href="post.link" class="post-title">{{ post.title }}</a>
          <p class="post-desc">{{ post.desc }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" :class="['tag', tagClass(tag)]">
              {{ tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>

    <!-- 文章分类 -->
    <div class="blog-section-title">浏览分类</div>
    <div class="category-grid">
      <a
        v-for="cat in categories"
        :key="cat.name"
        :href="cat.link"
        class="category-card"
      >
        <div class="category-icon">{{ cat.icon }}</div>
        <div class="category-name">{{ cat.name }}</div>
        <div class="category-count">{{ cat.count }} 篇文章</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const latestPosts = [
  {
    title: 'C++ 指针与内存管理完全指南',
    link: '/posts/cpp/pointers',
    date: '2026-05-18',
    desc: '深入理解 C++ 指针、引用、堆栈内存的区别，以及常见的内存泄漏排查方法。',
    tags: ['C++'],
  },
  {
    title: 'Python 装饰器：从入门到原理',
    link: '/posts/python/decorators',
    date: '2026-05-10',
    desc: '通过实际案例，一步步理解 Python 装饰器的工作原理，以及 @wraps 的重要性。',
    tags: ['Python'],
  },
  {
    title: 'STL 常用容器速查手册',
    link: '/posts/cpp/stl-containers',
    date: '2026-04-28',
    desc: 'vector、map、unordered_map、set 的时间复杂度、使用场景与常见陷阱。',
    tags: ['C++'],
  },
  {
    title: 'Python 列表推导式与生成器',
    link: '/posts/python/list-comprehension',
    date: '2026-04-15',
    desc: '列表推导式、字典推导式与生成器表达式的区别，以及什么时候该用哪种。',
    tags: ['Python'],
  },
  {
    title: 'Git 常见问题排查笔记',
    link: '/posts/notes/git-issues',
    date: '2026-04-02',
    desc: '记录日常使用 Git 时遇到的各种坑：冲突、回滚、分支管理、远程同步等。',
    tags: ['踩坑笔记'],
  },
]

const categories = [
  { icon: '⚙️', name: 'C/C++', count: 2, link: '/pages/categories#c-cpp' },
  { icon: '🐍', name: 'Python', count: 2, link: '/pages/categories#python' },
  { icon: '📝', name: '踩坑笔记', count: 1, link: '/pages/categories#notes' },
  { icon: '🌱', name: '生活随笔', count: 0, link: '/pages/categories#life' },
]

function tagClass(tag: string): string {
  const map: Record<string, string> = {
    'C++': 'tag-cpp',
    'Python': 'tag-python',
    '踩坑笔记': 'tag-notes',
    '生活随笔': 'tag-life',
  }
  return map[tag] || 'tag-notes'
}
</script>
