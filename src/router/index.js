import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/Products.vue';
import Orders from '@/components/Orders.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import CustomerOrders from '../views/CustomerOrders.vue';

const routes = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/login',
  },
  {
    path: '/',
    name: 'CustomerDashboard',
    component: Dashboard,
    children: [
      {
        path: 'customer_orders',
        name: 'CustomerOrders',
        component: CustomerOrders,
      },
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
    ],
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
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
