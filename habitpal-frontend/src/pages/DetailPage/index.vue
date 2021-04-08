<template>
  <div>
    <h1> habit ID: {{ this.$route.params.id }} </h1>
    <InviteButton class="invite-habit" />
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';

export default {
  name: 'DetailPage',
  components: {
    InviteButton
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}
.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
