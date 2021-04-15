<template>
  <div id="login-container">
    <h1>HabitPal</h1>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from './LoginForm';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 100px;
  font-size: max(7vw, 60px);
  padding-bottom: 40px;
}
#login-container {
  color: floralwhite;
}


</style>
