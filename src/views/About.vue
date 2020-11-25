<template>
  <div class="about">
    <h1>logOut</h1>
    <button @click.prevent="signout()" class="button button-primary">logOut</button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    function signout() {
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
      signout,
    };
  },
};
</script>
