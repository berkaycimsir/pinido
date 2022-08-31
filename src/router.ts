import { createRouter, createWebHistory } from 'vue-router';
import Todos from './components/Todos.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/todos', component: Todos },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
