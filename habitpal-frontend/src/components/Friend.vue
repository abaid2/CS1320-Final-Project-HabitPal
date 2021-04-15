<template>
  <div class="friend">
    <h3> {{friend.username}} </h3>
  </div>
</template>

<script>

export default {
  name: 'Friend',
  props: {
      friend: Object
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friend {
  width: 400px;
  height: 40px;
  display: flex;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
</style>
