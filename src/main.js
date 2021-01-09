import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/ui-components/Loader'
import tooltipDirective from '@/directives/tooltip.directive'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'

import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

/* Добавляем в глобальную область видимости фильтр и даем ему название date */
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)

Vue.use(Vuelidate)

Vue.use(messagePlugin)

// Глобально зарегестрировать компоненту
Vue.component('Loader', Loader)

const config = {
  apiKey: "AIzaSyDlZv83W_yc8zFTiEt4duWzgMpmFJljz-c",
  authDomain: "crm-vue-6fe62.firebaseapp.com",
  projectId: "crm-vue-6fe62",
  storageBucket: "crm-vue-6fe62.appspot.com",
  messagingSenderId: "191652980441",
  appId: "1:191652980441:web:7ebadef16531432eb9c0c8",
  measurementId: "G-48K3PYH5J8"
};

// Инициализируем firebase
firebase.initializeApp(config)

let app

// Для автоматической авторизации пользователя
firebase.auth().onAuthStateChanged(() => {
  // Создаем экземпляр приложения
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})