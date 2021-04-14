<template>
  <div id="register-container">
    <h1>Sign Up</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from './RegisterForm';

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#register-container {
  color: floralwhite;
}
</style>
