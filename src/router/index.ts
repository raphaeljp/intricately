import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import NewDeck from '@/views/deck/create-deck.page.vue';
import Home from '@/views/home.page.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/deck',
    name: 'default',
    component: Home,
    redirect: '/deck/new',
    children: [
      {
        path: 'new',
        name: 'NewDeck',
        component: NewDeck,
        meta: { name: 'CARDS' },
      },
      {
        path: ':deck_id',
        name: 'DeckData',
        component: () => import('../views/deck/playbook.page.vue'),
        meta: { name: 'Ordered Pile' },
      },
    ],
  },
  { path: '*', redirect: '/deck/new' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
