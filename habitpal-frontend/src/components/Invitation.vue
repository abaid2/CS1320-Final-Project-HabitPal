<template>
  <div class="invitation">
    <h3> {{invitation.title}} </h3>
    <div id="options">
      <button class="btn btn-primary accept-btn" @click="handleResponse('accept')">Join</button>
      <button class="btn btn-light delete-btn" @click="handleResponse('delete')">Delete</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

axios.defaults.withCredentials = true;

async function handleInvitationResponse(habitId, response) {
  //alert(username);
  
  return new Promise((resolve, reject) => {
    const toSend = {
      habitId: habitId,
      response: response
    }; 

    console.log(toSend);

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
      alert("Handle invitation failed");
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
    handleResponse(response) {
      const habitId = this.invitation.id;
      handleInvitationResponse(habitId, response);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  font-size: 25px;
}
.invitation {
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
