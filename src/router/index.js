import Vue from 'vue'
import Router from 'vue-router'
import routerModule from './module'
import Layout from '@/Layout/Index'

Vue.use(Router)

const constantRouters = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'HomeIndex',
        meta: { title: '首页', affix: true, icon: 'el-icon-s-home' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/Index')
      }
    ]
  },
  {
    path: '/',
    name: 'About',
    redirect: '/about',
    component: Layout,
    children: [
      {
        path: 'about',
        name: 'HomeIndex',
        meta: { title: '关于', affix: true, icon: 'el-icon-s-opportunity' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/About')
      }
    ]
  }
]

const routes = [
  ...constantRouters,
  ...routerModule
]

export default new Router({
  mode: 'history',
  routes: routes
})
