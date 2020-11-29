<template>
  <div id="nav" class="container">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/login">LogIn</router-link>
    <router-link to="/admin/products">products</router-link>
  </div>
  <!-- <router-view data-aos="flip-up" data-aos-duration="1000" /> -->
  <router-view />
</template>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
</style>
<script>
// import AOS from 'aos';
// import axios from 'axios';
// import { onBeforeMount, onMounted } from 'vue';

export default {
  setup: () => {
    // const api = `${process.env.VUE_APP_API_PATH}/api/\
    // ${process.env.VUE_APP_CUSTOM_PATH}/products`;
    // axios.get(api).then((response) => {
    //   console.log(response.data);
    // });
    // onBeforeMount(() => {
    //   AOS.init();
    // });
    // onMounted(() => {
    //   console.log('api: ', process.env.VUE_APP_API_PATH);
    // });
  },
};
</script>
