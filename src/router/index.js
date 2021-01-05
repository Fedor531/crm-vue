import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    // Объект meta для записи каких-либо свойств в route
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/registration',
    name: 'register',
    // Объект meta для записи каких-либо свойств в route
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Categories.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Record.vue')
  },
]

const router = new VueRouter({
  // history mode - слэши
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
