import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import dateFilter from '@/filters/date.filter'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

/* Добавляем в глобальную область видимости фильтр и даем ему название date */
 Vue.filter('date', dateFilter)


// Создаем экземпляр приложения
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
