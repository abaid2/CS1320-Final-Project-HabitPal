<template>
  <div>
      <form @submit.prevent="handleInvite" v-show="expand">
        <div class="form-group">
          <input name="username" v-model="username" class="form-control username-input" placeholder="username" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary user-invite">Invite</button>
        </div>
      </form>
      <button class="add btn btn-primary" @click="expand=!expand">+</button>
  </div>
</template>

<script>

import axios from 'axios';

axios.defaults.withCredentials = true;

async function inviteFriend(username, habitid) {
  //alert(username);
  
  return new Promise((resolve, reject) => {
    const toSend = {
      username: username,
      habitid: habitid
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/invite',
        JSON.stringify(toSend),
        config
    )
    .then(res => {
      resolve(res.data);
      location.reload();
    })
    .catch(err => {
      alert("invalid username");
      reject(err);
    });
  });
  
}

export default {
  name: 'DetailPage',
  data () {
      return {
          username: '',
          submitted: false,
          expand: false,
      }
  },
  methods: {
      handleInvite() {
          this.submitted = true;
          const { username } = this;
          let habitid = this.$route.params.id;
          if (username) {
            inviteFriend(username, habitid)
            .then(() => {
                  this.username = '';
                  this.submitted = false;
                  this.expand = false;
              });
          } else {
            alert("username cannot be empty");
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  border-radius: 100%;
  width: 70px;
  height: 70px;
  font-size: 40px;
}
</style>
