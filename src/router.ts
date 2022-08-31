import { createRouter, createWebHistory } from 'vue-router';

import Todos from './views/Todos.vue';
import Home from './views/Home.vue';

import { getCurrentUserFromServerSide } from './utils/auth';

const routes = [
  { path: '/', component: Home, meta: { redirectIfAuthorized: true } },
  { path: '/todos', component: Todos, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.redirectIfAuthorized)) {
    if (await getCurrentUserFromServerSide()) next('/todos');
    else next();
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUserFromServerSide()) next();
    else next('/');
  } else next();
});

export default router;
