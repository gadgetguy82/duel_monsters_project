import Vue from 'vue';
import App from './App.vue';
import router from '@/router.js';
import VueSocketio from 'vue-socket.io';

// Vue.use(VueSocketio, 'http://localhost:5000/');

Vue.config.productionTip = false;

export const eventBus1 = new Vue();
export const eventBus2 = new Vue();
export const eventBusInfo = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
