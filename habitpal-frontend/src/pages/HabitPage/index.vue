<template>
  <div>
    <Header class="header" :title="habit.title"/>
    <button class="btn btn-danger btn-lg delete-btn" @click="handleDelete">Leave Habit</button>
    <Details v-if="habitFetched" class="calendar" :habitId="habitId" :habit="habit"/>
    <InviteButton class="invite-habit" :friends="friends" :members="members"/>
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import Header from '../../components/Header';
import Details from '../../components/Details';
import axios from 'axios';

axios.defaults.withCredentials = true;

async function getFriends() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/friends', config)
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

async function getHabit(habitId) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }, 
      params: {
        habitId: habitId
      }
    }

    axios.get('http://localhost:8080/habit', config, {
      params: {
        userId: 0
      }
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      alert(err);
      reject(err);
    });
  });
}

async function deleteHabit(habitId) {
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
        'http://localhost:8080/delete',
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
  components: {
    Header,
    Details,
    InviteButton,
  },
  data: function() {
    return {
      habit: {},
      habitId: this.$route.params.id,
      habitFetched: false,
      members: {},
      friends: []
    };
  },
  created: async function() {
    let habit = await getHabit(this.habitId);
    this.habit = habit;
    this.habitFetched = true;
    let friends = await getFriends();
    this.friends = friends;
    this.members = habit.members;
  }, 
  methods: {
      async handleDelete() {
          await deleteHabit(this.habitId);
          this.$router.push({ name: 'Home' });
      }
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>

.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}

.delete-btn {
  position: fixed;
  right: 45%;
  top: 125px;
  font-size: 20px;
}
</style>
