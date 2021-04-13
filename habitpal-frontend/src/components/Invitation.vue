<template>
  <div class="invitation">
    <h3> {{invitation.title}} </h3>
    <button class="btn btn-primary accept-btn" @click="handleAccept">Accept</button>
  </div>
</template>

<script>

import axios from 'axios';

axios.defaults.withCredentials = true;

async function acceptInvitation(habitId) {
  //alert(username);
  
  return new Promise((resolve, reject) => {
    const toSend = {
      habitId: habitId
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/accept',
        JSON.stringify(toSend),
        config
    )
    .then(res => {
      resolve(res.data);
      location.reload();
    })
    .catch(err => {
      alert("accept invitation failed");
      reject(err);
    });
  });
  
}

export default {
  name: 'Invitation',
  props: {
      invitation: Object
  },
  methods: {
      handleAccept() {
        const habitId = this.invitation.id;
        acceptInvitation(habitId);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invitation {
  width: 400px;
  height: 80px;
  display: flex;
  background-color: #f8f8f8;
  align-items: center;
  padding: 15px;
}

.accept-btn {
  position: absolute;
  right: 0;
}
</style>
