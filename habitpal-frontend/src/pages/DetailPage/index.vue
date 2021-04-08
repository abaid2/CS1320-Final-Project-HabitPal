<template>
  <div>
    <h1> habit ID: {{ this.$route.params.id }} </h1>
  </div>
</template>

<script>

export default {
  name: 'DetailPage'
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}
</style>
