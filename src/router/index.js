import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
