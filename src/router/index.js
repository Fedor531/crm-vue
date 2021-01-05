import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // Объект meta для записи каких-либо свойств в route
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/registration',
    name: 'Register',
    // Объект meta для записи каких-либо свойств в route
    meta: {
      layout: 'empty'
    },
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Categories.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Detail.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/History.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Planning.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'main'
    },
    component: () => import('../views/components/Record.vue')
  },

  /*   {
      path: '/about',
      name: 'About',
      // Оптимизация lazy loading загрузка компонентов по требования - круто!
      component: () => import('../views/About.vue')
    } */
]

const router = new VueRouter({
  // history mode - слэши
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
