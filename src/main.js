import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import bootstrap from 'bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App.vue';
import router from './router';
import '@/assets/scss/all.scss';

axios.defaults.withCredentials = true; // session 存前端  >application的cookie

router.beforeEach((to, from, next) => {
  // console.log(to.meta.requiresAuth);
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證~');
    const api = `${process.env.VUE_APP_API_PATH}/api/user/check`;

    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
        return;
      }
      next({ path: '/login' });
    });
    return;
  }
  next();
});

createApp(App)
  .use(router, VueAxios, axios, AOS, bootstrap)
  .mount('#app');
