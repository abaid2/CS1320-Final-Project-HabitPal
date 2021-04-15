<template>
  <div>
    <Header class="header" :title="habit.title"/>
    <Details v-if="habitFetched" class="calendar" :habitId="habitId" :habit="habit"/>
    <InviteButton class="invite-habit" />
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import Header from '../../components/Header';
import Details from '../../components/Details';
import axios from 'axios';

axios.defaults.withCredentials = true;

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
    }
  }, 
  created: async function() {
    let habit = await getHabit(this.habitId);
    this.habit = habit;
    this.habitFetched = true;
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
</style>
