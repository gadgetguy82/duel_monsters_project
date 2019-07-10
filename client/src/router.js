import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Battlefield from '@/views/BattleField';
import Store from '@/views/Store';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/battlefield',
      name: 'battlefield',
      component: Battlefield
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    }
  ]
});

export default router;
