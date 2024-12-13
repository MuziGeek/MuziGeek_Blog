import { defineConfig } from 'valaxy'
import type { ThemeConfig } from 'valaxy-theme-hairy'
import { addonWaline } from 'valaxy-addon-waline'
import { addonMeting } from 'valaxy-addon-meting'

/**
 * User Config
 * do not use export const config to avoid defu conflict
 */
export default defineConfig<ThemeConfig>({
  theme: 'hairy',
  themeConfig: {
    theme: 'dark',
    home: {
      headline: 'Muzi\'s Blog',
      title: 'Muzi\'s Notes',
      description: 'Muzi\'s Notes',
      images: [
        'https://cdn.easymuzi.cn/img/20241209171520865.jpg?imageSlim',
       ]
    },
    post:{
      images:[
        'https://cdn.easymuzi.cn/img/20241209171520873.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520872.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520871.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520870.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520869.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520864.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520859.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520866.jpg?imageSlim',
        'https://cdn.easymuzi.cn/img/20241209171520867.jpg?imageSlim',
      ]
    },
    nav: [
      {
        text: 'Home',
        link: '/',
        icon: 'i-material-symbols-home-work-sharp',
      },
      {
        text: 'About',
        link: '/about',
        icon: 'i-material-symbols-recent-actors-rounded',
      },
      {
        text: 'Posts',
        link: '/archives/',
        icon: 'i-material-symbols-import-contacts-rounded',
      },
      {
        text: 'Links',
        link: '/links/',
        icon: 'i-material-symbols-monitor-heart',
      },
      {
        text: 'Library',
        link: 'https://book.easymuzi.cn',
        icon: 'i-ri-sd-card-mini-fill',
      },
      {
        text: 'Github',
        link: 'https://github.com/MuziGeek',
        icon: 'i-ri-github-fill',
      },
    ],
    footer: {
      since: 2024,
      beian: {
        enable: true,
        icp: '豫ICP备2024099312号',
      },
      powered: false,
    },
  },

  addons: [
    addonMeting({
      global: true,
      props: {
        // 设置你的网易云/qq或其他歌单 ID
        id: '4998744284',
        type: 'playlist',
        autoplay: true,
        theme: 'var(--hy-c-primary)',
      },
    }),
    // 请参考 https://waline.js.org/ 设置 serverURL 地址
    addonWaline({
      comment: true,
      serverURL: 'https://waline.easymuzi.cn',
      emoji: [
        '//unpkg.com/@waline/emojis@1.0.1/weibo',
        '//unpkg.com/@waline/emojis@1.0.1/bilibili',
      ],
      pageview: true,
    }),
  ]
})