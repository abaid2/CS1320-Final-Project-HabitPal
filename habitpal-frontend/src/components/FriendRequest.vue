<template>
  <div class="friend">
    <h3> {{request.username}} </h3>
    <div id="options">
        <button class="btn btn-primary accept-btn" @click="handleAccept">Accept</button>
        <button class="btn btn-light delete-btn">Delete</button>
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
        
      }
  },
  props: {
      request: Object
  },
  methods: {
      handleAccept() {
        addFriend(this.request.id);
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 25px;
}
.friend {
  width: 24vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
  /* background-color: red; */
  border-bottom: 1px solid #dadde1;
  padding: 15px;
}

#options {
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btn {
  width: 80px;
  font-size: 1vw;
}
.accept-btn {
}

.delete-btn {
  border: 1px solid #dadde1;
}
</style>
