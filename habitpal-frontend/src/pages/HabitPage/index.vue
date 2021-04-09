<template>
  <div>
    <h1> {{ this.habit.title }} </h1>
    <h2> {{ this.habit.description }} </h2>
    <div class="progress-log">
      <datepicker id="calendar" :inline="true" :highlighted="highlighted"
       v-on:selected="userLog"></datepicker>
    </div>
    <InviteButton class="invite-habit" />
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import axios from 'axios';
import Datepicker from "vuejs-datepicker";

const state = {
  date: new Date()
};

axios.defaults.withCredentials = true;

// async function saveLog(user, date) {
//   return new Promise((resolve, reject) => {
//     const toSend = {
//       user: user,
//       date: date
//     }; 

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         'Access-Control-Allow-Origin': '*',
//       }
//     }

//     axios.post(
//         'http://localhost:8080/log',
//         JSON.stringify(toSend),
//         config
//     )
//     .then(res => {
//       resolve(res.data);
//     })
//     .catch(err => {
//       reject(err);
//     });
//   });
// }


async function getHabit(habitid) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }, 
      params: {
        habitid: habitid
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
    InviteButton,
    Datepicker
  },
  data: function() {
    return {
      habit: {},
      habitid: this.$route.params.id,
      members: [],
      state: state,
      highlighted: {dates: []},
    };
  },
  created: async function() {
    let habit = await getHabit(this.habitid);
    this.habit = habit;
    this.members = habit.members;
    console.log(habit._id);
  },
  methods: {
    userLog(date) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      console.log(this.highlighted.dates.length)
      let alreadyLogged = false;
      let filtered = {dates: []};
      for (let currentDate of this.highlighted.dates) {
        if (currentDate.getTime() === date.getTime()) { 
          alreadyLogged = true; 
          this.selected = null;
          continue;
        }
        filtered.dates.push(currentDate);
      }
      if (!alreadyLogged) { filtered.dates.push(date); }
      this.highlighted = filtered;
    },
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}
.progress-log {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
