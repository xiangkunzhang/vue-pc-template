'use strict'

import router from '@/router'
// import store from '@/store'

// 系统名称
const SystemName = process.env.VUE_APP_SYSTEM_NAME || '系统名称'
// 不重定向白名单
// const whiteList = ['/login', '/404', '/redirect']

router.beforeEach((to, from, next) => {
  let toMeta = to.meta
  window.document.title = toMeta && toMeta.title ? `${SystemName} —— ${toMeta.title}` : SystemName
  next()
})
