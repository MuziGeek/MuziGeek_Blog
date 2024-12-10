---
title: 云图库开发笔记系列一
date: 2024-12-10
updated: 2024-12-10
categories: 项目开发
tags:
  - 项目开发
  - 笔记
top: 2
---

# 前端项目初始化

## 环境准备

安装node.js

## 创建项目

使用 Vue 官方推荐的脚手架 create-vue 快速创建 Vue3 的项目：[Vue.js](https://cn.vuejs.org/guide/quick-start.html)

Vue 提供了在线编码测试，可以通过 Playground 来学习 Vue：[Vue SFC Playground](https://play.vuejs.org/)

```
npm create vue@latest
```

工具选择

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816353.png?imageSlim" />

打开项目后执行`npm install`

然后执行项目`npm run dev`

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816352.png?imageSlim" />
<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816351.png?imageSlim" />
如果不使用脚手架，就需要自己整合这些工具：

- 代码规范：[https://eslint.org/docs/latest/use/getting-started](https://eslint.org/docs/latest/use/getting-started)
- 代码美化：[https://prettier.io/docs/en/install.html](https://prettier.io/docs/en/install.html)
- 直接整合：[https://github.com/prettier/eslint-plugin-prettier#recommended-configuration（包括了](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration%EF%BC%88%E5%8C%85%E6%8B%AC%E4%BA%86) [https://github.com/prettier/eslint-config-prettier#installation）](https://github.com/prettier/eslint-config-prettier#installation%EF%BC%89)

## 引入组件库

引入Ant Design Vue组件库，参考[官方文档](https://antdv.com/docs/vue/getting-started-cn)快速上手

执行安装

```
$ npm i --save ant-design-vue@4.x
```

改变主入口文件main.ts,全局注册组件：

```
import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App)
app.use(Antd);
app.use(createPinia())
app.use(router)

app.mount('#app')
```

## 开发规范

建议遵循Vue3的组合式API（Composition API）,而不是选项式API，开发更自由高效一些。

```
<template>
  <div id="xxPage">

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#xxPage {
}

</style>
```

## 页面基本信息

可以修改项目根目录下的`index.html`文件，来定义页面的元信息，比如修改标题：

```
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>木子云图库</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

替换public目录下默认的ico图标为自己的，有很多[现成的网站](https://toolin.cn/favicon)可以制作ico图标。
<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816349.png?imageSlim" />
## 全局通用布局

### 1. 基础布局结构

在layouts目录下新建一个布局Basiclayout.vue，在App.vue全局页面入口文件中引入。

```
<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
</script>
```

移除页面内的默认样式，并且移除main.ts中默认引入的main.css,防止样式污染:

```
<style>
#app {
}
</style>
```

选用Ant Design组件库中的Layout组件，先把上中下布局编排好，然后再填充内容:

```
<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header>Header</a-layout-header>
      <a-layout-content>Content</a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>
```

样式：

```
<style scoped>
#basicLayout {
}
</style>
```

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816347.png?imageSlim" />
### 2. 全局底部栏

通常用于展示版权信息：

```
<a-layout-footer class="footer">
  <a href="https://www.easymuzi.cn" target="_blank">
    Muzi云图库 by Muzi
  </a>
</a-layout-footer>
```

样式：

```
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
```

### 3. 动态替换内容

项目使用了Vue Router路由库，可以在router/index.ts配置路由，能够根据访问的页面地址找到不同的文件加载并渲染

修改BasicLayout内容部分的代码如下：

```
<a-layout-content class="content">
  <router-view />
</a-layout-content>
```

修改样式，要和底部栏保持一定的外边距，否则内容会被遮住

```
<style scoped>
#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}
</style>
```

### 4. 全局顶部栏

由于顶部栏的开发相对复杂，可以基于[Ant Design的菜单组件](https://antdv.com/components/menu-cn)来创建`GlobalHeader`全局顶部栏组件，**组件统一放在compents目录中**。

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816346.png?imageSlim" />

在基础布局中引入顶部栏组件：

```
<a-layout-header class="header">
  <GlobalHeader />
</a-layout-header>
```

引入代码如下：

```
<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
```

效果如下：

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816345.png?imageSlim" />

可以修改下全局header的样式，清楚一些默认样式（比如背景色等），样式代码如下：

```
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
```

接下来要修改GlobalHeader组件，完善更多内容

1. 给菜单外套一层元素，用于整体样式控制

```
<div id="globalHeader">
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</div>
```

2. 根据我们的需求修改菜单配置，key为要跳转的url路径

```
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'

const current = ref<string[]>(['home'])
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '编程导航'),
    title: '编程导航',
  },
])
</script>
```

效果如图：

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816343.png?imageSlim" />

3. 完善全局顶部栏，左侧补充网站图标和标题

先把logo.png放到src/assets目录下，替换掉原本的默认logo：

修改GlobalHeader代码，补充Html：

```
  <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" alt="logo" />
            <div class="title">Muzi云图库</div>
          </div>
    </router-link>
```

4. 完善顶部导航栏，右侧展示当前用户的登录状态（暂时用登录按钮代替）：

```
<div class="user-login-status">
  <a-button type="primary" href="/user/login">登录</a-button>
</div>
```

5. 优化导航栏的布局，采用 [栅格组件的自适应布局](https://antdv.com/components/grid-cn#components-grid-demo-flex-stretch)

```
<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <router-link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" alt="logo" />
            <div class="title">Muzi云图库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <a-button type="primary" href="/user/login">登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
```

效果如下：

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816342.png?imageSlim" />

## 路由

目标：点击菜单项后，可以跳转到对应的页面，并且刷新页面后，对应的菜单自动高亮。

### 1. 修改路由配置

按需修改router/index.ts文件的routes配置，定义我们需要的页面路由，每个path对应一个component（要加载的组件）：

```
routes: [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
],
```

上述代码，会发现component支持直接传入组件，或者使用import按需懒加载组件，按需加载是一种优化首次打开站点性能的方式。

### 2. 路由跳转

给GlobalHeader的菜单组件绑定跳转事件

```
import { useRouter } from "vue-router";
const router = useRouter();

// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  });
};
```

修改HTML模板，绑定事件

```
 <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click ="doMenuClick"/>
```

## 请求

引入Axios请求库

### 1. 请求工具库

安装请求工具类Axios ，参考官方文档：[https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)

```
npm install axios
```

### 2. 全局自定义请求

需要自定义全局请求地址等，参考Axios官方文档，新增文件`request.ts`

```
import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建 Axios 实例
const myAxios = axios.create({
  baseURL: 'http://localhost:8123',
  timeout: 60000,
  withCredentials: true,//一定要写，不然就无法在发请求时携带Cookie
})

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    const { data } = response
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default myAxios
```

### 3. 自动生成请求代码

如果采用传统开发方式，针对每个请求都要单独编写代码，很麻烦

推荐使用OpenAPI工具，直接自动生成即可:[https://www.npmjs.com/package/@umijs/openapi](https://www.npmjs.com/package/@umijs/openapi)

按照官方文档的步骤，先安装：

```
npm i --save-dev @umijs/openapi
```

在项目根目录新建 `openapi.config.js`,根据自己的需要定制生成的代码：

```
import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '@/request'",
  schemaPath: 'http://localhost:8123/api/v2/api-docs',
  serversPath: './src',
})
```

注意，要将schemaPath改为自己后端服务提供的Swagger接口文档的地址。

在package.json的script中添加

```
"openapi": "node openapi.config.js",
```

执行即可生成请求代码，还包括TypeScript类型

### 4. 测试请求

可以在任意页面代码中调用API：

```
import { healthUsingGet } from '@/api/mainController'

healthUsingGet().then((res) => {
  console.log(res)
})
```

### 5. 解决跨域（可选）

如果不进行配置的话，一般都会出现跨域问题

对于跨域，可以通过修改后端代码，增加全局跨域配置或者跨域注解来解决

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816355.png?imageSlim" />

如果后端代码无法修改，还可以通过前端代理服务器来解决，如果项目使用Vite，内置了代理服务器，可以修改vite.config.ts文件，增加代理配置

```
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8123',
    }
  },
})
```

同时修改request.ts，移除请求前缀：

```
// 创建 Axios 实例
const myAxios = axios.create({
  baseURL: '',
  timeout: 60000,
  withCredentials: true,
})
```

还有很多前端请求代理工具，比如[Whistle]

## 全局状态管理

什么是全局状态管理？

答：所有页面全局共享的变量，而不是局限在某一个页面中。

适合作为全局状态的数据：已登录用户信息（每个页面几乎都要用）

Pinia是一个主流的状态管理库，相比于Vuex来说使用更简单，可参考[入门文档](about:blank)进行引入。

### 1. 引入Pinia

脚手架已经整合了Pinia 不需要引入了

### 2. 定义状态

在src/stores目录下定义user模块，定义了用户的存储，远程获取，修改逻辑

```
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<any>({
    userName: "未登录",
  });

  async function fetchLoginUser() {
    // todo 由于后端还没提供接口，暂时注释
    // const res = await getCurrentUser();
    // if (res.data.code === 0 && res.data.data) {
    //   loginUser.value = res.data.data;
    // }
  }

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser;
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
```

### 3. 使用状态

可以直接使用store中导出的状态变量和函数

在首次进入到页面时，一般我们会尝试获取登录用户信息，修改App.vue,编写远程获取数据代码：

```
const loginUserStore = useLoginUserStore()
loginUserStore.fetchLoginUser()
```

在任何页面中都可以使用数据，比如GlobalHeader全部顶部组件中直接展示：

```
{{ JSON.stringify(loginUserStore.loginUser) }}
```

修改全局顶部栏组件，在右侧展示登录状态：

```
<div class="user-login-status">
  <div v-if="loginUserStore.loginUser.id">
    {{ loginUserStore.loginUser.userName ?? '无名' }}
  </div>
  <div v-else>
    <a-button type="primary" href="/user/login">登录</a-button>
  </div>
</div>
```

### 4. 测试全局状态管理

在userStore中编写测试代码，测试用户状态的更新：

```
async function fetchLoginUser() {
  // 测试用户登录，3 秒后登录
  setTimeout(() => {
    loginUser.value = { userName: '测试用户', id: 1 }
  }, 3000)
}
```

## 页面开发流程

1. 新建src/pages目录，用于存放所有的页面文件。

然后在pages目录下新建页面文件，将所有页面按照url层级进行创建，并且页面名称尽量做到“见名知意”

2. 每次新建页面，同时也要进行路由配置比如homePage为

```
import HomePage from "@/pages/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  ...
]
```

任意修改页面代码：

```
<template>
  <div id="homePage">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
const msg = "欢迎来到Muzi云图库~";
</script>

<style scoped>
#homePage {
}
</style>
```

<hairy-image src="https://cdn.easymuzi.cn/img/20241210115816354.png?imageSlim" />