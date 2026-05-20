// .vitepress/theme/index.ts
// 自定义主题：在 VitePress 默认主题基础上扩展
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'
import HomeContent from './HomeContent.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 首页插槽：在 hero 下方插入文章列表
      'home-features-after': () => h(HomeContent),
    })
  },
}
