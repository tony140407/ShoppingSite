<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">LogIn</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="signOut">Signout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    function signOut() {
      const api = `${process.env.VUE_APP_API_PATH}/logout`;
      axios.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          router.push({
            path: '/login',
          });
        }
      });
    }
    return {
      signOut,
    };
  },
};
</script>
