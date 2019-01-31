import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';

// import VueResource from 'vue-resource';
// Vue.use(VueResource);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
