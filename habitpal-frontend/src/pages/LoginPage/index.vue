<template>
  <div>
    <h1>Welcome to HabitPal!</h1>
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
    font-size: 60px;
}

</style>
