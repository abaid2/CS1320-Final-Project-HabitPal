<template>
  <div class="invitation">
    <div class="content">
      <h3> {{invitation.title}} </h3>
      <p> {{invitation.description}} </p>
    </div>
    <form @submit.prevent="handleAccept">
      <button class="btn btn-primary">Accept</button>
    </form>
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
  margin: 50px;
  width: 800px;
}
.content {
  margin: 50px;
}
</style>
