import Vue from 'vue'
import Vuex from 'vuex'
import { VueCsvImport } from "vue-csv-import"
import BootstrapVue from "bootstrap-vue"
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import GetTextPlugin from 'vue-gettext'
import translations from './languages'
import VueClipboard from 'vue-clipboard2'


//googl place autocomplete

import './plugins/vuetify'
import router from './router'
import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue'
import Pages from './Layout/Wrappers/pagesLayout.vue'
import Apps from './Layout/Wrappers/appLayout.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueClipboard)

Vue.use(GetTextPlugin, {
  defaultLanguage: 'fi_FI',
  translations: translations
})

Vue.component('default-layout', Default)
Vue.component('userpages-layout', Pages)
Vue.component('apps-layout', Apps)
Vue.component('vue-csv-import', VueCsvImport)



const store = new Vuex.Store({
  state: {
    authenticated: false,
    user: null,
    receiver: null,
    query: null,
    value: null,
    toCompany: null,
  },
  mutations: {
    increment (state) {
      state.count++
    },
    login(state) {
      state.authenticated = true
    }
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store: store,
  components: { App  }
});
