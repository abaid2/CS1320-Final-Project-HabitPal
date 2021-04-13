<template>
  <div>
      <form @submit.prevent="handleInvite" v-show="expand">
        <div class="form-group">
          <input name="email" v-model="email" class="form-control email-input" placeholder="user email" />
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

async function inviteFriend(email, habitId) {
  //alert(username);
  
  return new Promise((resolve, reject) => {
    const toSend = {
      email: email,
      habitId: habitId
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
      alert("Invalid email");
      reject(err);
    });
  });
  
}

export default {
  name: 'HabitPage',
  data () {
      return {
          email: '',
          submitted: false,
          expand: false,
      }
  },
  methods: {
      handleInvite() {
          this.submitted = true;
          const { email } = this;
          let habitId = this.$route.params.id;
          if (email) {
            inviteFriend(email, habitId)
            .then(() => {
                  this.email = '';
                  this.submitted = false;
                  this.expand = false;
              });
          } else {
            alert("Email cannot be empty");
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
