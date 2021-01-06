import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

/* Добавляем в глобальную область видимости фильтр и даем ему название date */
Vue.filter('date', dateFilter) 

Vue.use(Vuelidate)

Vue.use(messagePlugin)


// Создаем экземпляр приложения
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
