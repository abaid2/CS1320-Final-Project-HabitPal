<template>
  <button class="btn btn-primary btn-lg" @click="handleLogout">Logout</button>
</template>

<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

async function logout() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.get(
        'http://localhost:8080/users/logout',
        config
    )
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export default {
  name: 'Logout',
  methods: {
      handleLogout() {
          logout();
          this.$router.push({ name: 'Login' });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
