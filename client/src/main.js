import Vue from 'vue';
import App from './App.vue';
import router from '@/router.js';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

let socketPort = process.env.SOCKET_PORT || 4000;
const conn = `http://localhost:${socketPort}`

export const SocketInstance = socketio(conn);

Vue.use(new VueSocketIO({
  debug: true,
  connection: conn,
  vue: {
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "" }
}), SocketInstance);

Vue.config.productionTip = false;

export const eventBus1 = new Vue();
export const eventBus2 = new Vue();
export const eventBusInfo = new Vue();
export const eventBusPlayingHand = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
