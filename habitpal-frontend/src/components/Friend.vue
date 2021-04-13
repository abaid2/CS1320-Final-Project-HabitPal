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
  height: 80px;
  display: flex;
  background-color: #f8f8f8;
  align-items: center;
  padding: 15px;
}
</style>
