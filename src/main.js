import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
// import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'font-awesome/css/font-awesome.css';

// import VueResource from 'vue-resource';
// Vue.use(VueResource);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);


// import VueSocketIO from 'vue-socket.io';
// Vue.use(VueSocketio, 'http://localhost:8090/wsendpoint/app/hello', store);
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:8080/wsendpoint',
//   vuex: {
//       store,
//       actionPrefix: 'SOCKET_',
//       mutationPrefix: 'SOCKET_'
//   }
// }))
// import VueNativeSock from 'vue-native-websocket'
// Vue.use(VueNativeSock, 'ws://localhost:8090/wsendpoint')

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
