<template>
  <div class="friend" v-show="visible">
    <h3> {{request.username}} </h3>
    <div class="buttons">
        <button class="btn btn-success" @click="handleAccept">accept</button>
        <button class="btn btn-danger">reject</button>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

async function addFriend(id) {
  return new Promise((resolve, reject) => {
    const toSend = {
      id: id,
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/friends',
        JSON.stringify(toSend),
        config
    )
    .then(res => {
      resolve(res.data);
      location.reload();
    })
    .catch(err => {
      reject(err);
    });
  });
}

export default {
  name: 'FriendRequest',
  data () {
      return {
          visible: true
      }
  },
  props: {
      request: Object
  },
  methods: {
      handleAccept() {
        addFriend(this.request.id)
        .then(() => {
            this.visible = false;
        });
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friend {
  width: 400px;
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  align-items: center;
  padding: 15px;
}

.buttons {
    display: flex;
}
</style>
