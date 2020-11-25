import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/Products.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/login',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login', // 路徑盡可能小寫
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
