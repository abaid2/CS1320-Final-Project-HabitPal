<template>
  <div>
      <form @submit.prevent="handleInvite" :style="{visibility: expand ? 'visible' : 'hidden'}">
        <div class="friends-list">
          <div class="friend" v-for="friend in filteredFriends" :key="friend.id">
            <div class="check-container" >
              <input class="check" type="checkbox" value="" @change="addToList($event, friend.id)">
            </div>
            <h3>{{friend.username}}</h3>
          </div>  
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

async function inviteFriend(id, habitId) {
  
  return new Promise((resolve, reject) => {
    const toSend = {
      id: id,
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
    })
    .catch(err => {
      reject(err);
    });
  });
  
}

export default {
  name: 'HabitPage',
  props: {
    friends: Array,
    members: Object
  },
  data () {
      return {
          expand: false,
          toInvite: []
      }
  },
  methods: {
      async handleInvite() {
          let habitId = this.$route.params.id;
          for (let i=0; i<this.toInvite.length; i++) {
            console.log(this.toInvite[i]);
            await inviteFriend(this.toInvite[i], habitId);
          }
          this.expand = false;
      },
      addToList(e, id) {
        if (e.target.checked) {
          this.toInvite.push(id);
        }
      }
  },
  computed: {
    filteredFriends: function() {
      const filteredFriends = this.friends.filter(friend => !this.members[friend.id]);
      return filteredFriends;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color: white;
}

.friends-list {
  max-height: 400px;
  overflow-y: auto;
}

.friend {
  display: flex;
  align-content: center;
}

.check-container {
  display: flex;
}

.check {
  align-self: center;
  width: 26px;
  height: 26px;
  margin-right: 15px;
}

.add {
  border-radius: 100%;
  width: 70px;
  height: 70px;
  font-size: 40px;
}
</style>
