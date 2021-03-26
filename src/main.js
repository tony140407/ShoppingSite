import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import bootstrap from 'bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@/assets/scss/all.scss';
import './utils/bus';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// TODO: vue-loading-overlay support vue3?
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import App from './App.vue';

library.add(faUserSecret, faSpinner);

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

const app = createApp(App);

app.use(router, VueAxios, axios, AOS, bootstrap);

app.config.globalProperties.$filters = {
  currency(num) {
    const n = Number(num);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
      const currency = i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c;
      return currency;
    })}`;
  },
};

// app.component('Loading', Loading);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
