<template>
  <button class="habit btn" @click="goToHabit">
      <h3> {{habit.title}} </h3>
      <p> {{habit.description}} </p>
  </button>
</template>

<script>

export default {
  name: 'Habit',
  props: {
      habit: Object
  },
  methods: {
    goToHabit() {
      this.$router.push({ name: 'Detail', params: { id: this.habit.id } });
    }
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
button:hover {
  background-color: rgb(186, 193, 194);
}
</style>
