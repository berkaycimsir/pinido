import { createRouter, createWebHistory } from 'vue-router';

import Todos from './views/Todos.vue';
import Home from './views/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/todos', component: Todos },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
