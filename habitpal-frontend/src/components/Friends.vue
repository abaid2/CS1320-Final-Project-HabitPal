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
  padding: 5px;
  width: 100%;
  display: flex;
}
h3 {
  font-size: 25px;
  font-variation-settings: 'wght' 500;
}

</style>
