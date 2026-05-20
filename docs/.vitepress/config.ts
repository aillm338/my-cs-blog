import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '// CS Blog',
  description: '河北农业大学 · 计算机科学与技术 · 编程学习记录',
  lang: 'zh-CN',

  // 干净的 URL，去掉 .html 后缀
  cleanUrls: true,

  // head 标签
  head: [
    ['meta', { name: 'theme-color', content: '#1e1e2e' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'color-scheme', content: 'dark light' }],
  ],

  themeConfig: {
    // 站点 logo / 导航标题
    siteTitle: '// CS Blog',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/pages/archive' },
      { text: '分类', link: '/pages/categories' },
      { text: '关于', link: '/pages/about' },
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
    ],

    // 本地搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文章',
                buttonAriaLabel: '搜索文章',
              },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清空搜索',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    // 页脚
    footer: {
      message: '用代码记录生活，用文字沉淀思考',
      copyright: `© ${new Date().getFullYear()} CS Blog · 河北农业大学`,
    },

    // 文档最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    // 文章翻页
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    // 大纲标题
    outline: {
      label: '本文目录',
      level: [2, 3],
    },

    // 返回顶部
    returnToTopLabel: '回到顶部',

    // 侧边栏（文章页自动生成，这里留空，由各页面自定义）
    sidebar: {
      '/posts/': [
        {
          text: 'C/C++',
          collapsed: false,
          items: [
            { text: '指针与内存管理', link: '/posts/cpp/pointers' },
            { text: 'STL 常用容器', link: '/posts/cpp/stl-containers' },
          ],
        },
        {
          text: 'Python',
          collapsed: false,
          items: [
            { text: 'Python 装饰器详解', link: '/posts/python/decorators' },
            { text: '列表推导式与生成器', link: '/posts/python/list-comprehension' },
          ],
        },
        {
          text: '踩坑笔记',
          collapsed: false,
          items: [
            { text: 'Git 常见问题排查', link: '/posts/notes/git-issues' },
          ],
        },
      ],
    },
  },

  // Markdown 配置
  markdown: {
    // 代码块行号
    lineNumbers: true,
    // 主题
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
