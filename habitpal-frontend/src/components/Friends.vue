<template>
  <div class="friend">
    <h3> {{friend.username}} </h3>
    <div class="unfriend">
      <button id="unfriend-button" class="btn btn-danger" data-toggle="modal" data-target="#unfriendModal">
        <i class="fas fa-user-minus fa-lg"/>
      </button>
      <div id="unfriendModal" tabindex="-1" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Unfriend {{friend.username}}</h4>
            </div>
            <div class="modal-body">
              Are you sure you want to remove {{friend.username}} as your friend?
            </div>
            <div id="modal-footer" class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" id="modal-button">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Friend',
  props: {
      friend: Object
  },
  methods: {
    unfriend(friend) {
      console.log(friend);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.friend {
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 15px;
}

h3 {
  font-size: 25px;
  font-variation-settings: 'wght' 500;
}

.unfriend {
  margin-bottom: 5px;
}

#unfriend-button {
  font-size: 10px;
}

</style>
