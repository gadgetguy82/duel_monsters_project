import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import GameBoard from '@/views/GameBoard';
import Store from '@/views/Store';
import About from '@/views/About';
import Development from '@/views/Development';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/gameboard',
      name: 'game-board',
      component: GameBoard
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/develop',
      name: 'develop',
      component: Development
    }
  ]
});

export default router;
