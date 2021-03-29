<template>
  <div class="habit">
      <h3> {{habit.title}} </h3>
      <p> {{habit.description}} </p>
  </div>
</template>

<script>
export default {
  name: 'Habit',
  props: {
      habit: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.habit {
  margin: 50px;
  width: 800px;
  border: 1px solid black;
}
</style>
