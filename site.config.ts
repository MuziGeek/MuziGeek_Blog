import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  lang: 'zh-CN',
  title: 'Muzi\'s Blog',
  url: 'https://www.easymuzi.cn/',
  author: {
    avatar: 'https://cdn.easymuzi.cn/gh/MuziGeek/Blog_Img/cdnImg/20241205010750914.jpg',
    name: '木子金又二丨',
  },
  search: {
    enable: true,
    type: 'fuse',
  },
  description: 'Muzi\'s Notes',
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-material-symbols-rss-feed-rounded',
      color: 'orange',
    },
    {
      name: '951416545',
      link: '--',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/MuziGeek',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=3317014130',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    {
      name: '知乎',
      link: 'https://www.zhihu.com/people/mao-mao-47-99-46',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/1490903',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: '微信公众号',
      link: '',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },
    {
      name: 'E-Mail',
      link: 'mailto:liduo0316@gmail.com',
      icon: 'i-material-symbols-attach-email',
      color: '#8E71C1',
    },
    {
      name: '微博',
      link: 'https://weibo.com/easymuzi',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    },
    {
      name: 'Muzi',
      link: 'https://travellings.link',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],
  statistics: { enable: true },
  comment: { enable: true },
})