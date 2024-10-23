import { createRouter, createWebHistory } from 'vue-router';
import { LoginPage, MainPage } from '@/pages';

const routes = [
  { path: '/', name: 'login', component: LoginPage },
  { path: '/main', name: 'main', component: MainPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
