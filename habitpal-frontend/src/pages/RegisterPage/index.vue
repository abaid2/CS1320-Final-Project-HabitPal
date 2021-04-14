<template>
  <div id="register-container">
    <h2>Sign Up</h2>
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
h2 {
    font-size: 60px;
    padding-bottom: 40px;
    font-variation-settings: 'wght' 700;
}

#register-container {
  color: floralwhite;
}
</style>
