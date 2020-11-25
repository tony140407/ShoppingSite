<template>
  <div class="container-fluid">
    <Navbar />
    <div class="row">
      <Sidebar></Sidebar>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';

export default {
  components: { Navbar, Sidebar },
  setup() {
    const { cookie } = document;
    const myCookie = cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(myCookie);
    axios.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
