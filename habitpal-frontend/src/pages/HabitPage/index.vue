<template>
  <div>
    <h1> {{ this.habit.title }} </h1>
    <h2> {{ this.habit.description }} </h2>
    <div class="progress-log">
       <vc-calendar id="calendar" v-if='userId.length > 0' :max-date='new Date()'
        :attributes="attributes" @dayclick="onDayClick"/>
    </div>
    <InviteButton class="invite-habit" :friends="friends" :members="members"/>
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import axios from 'axios';
import dayjs from 'dayjs';

axios.defaults.withCredentials = true;

async function updateLog(habitId, date, action) {
  return new Promise((resolve, reject) => {
    const toSend = {
      habitId: habitId,
      date: date,
      action: action
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/log',
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

async function getUser() {
    return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/users/auth', config, {
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
    InviteButton,
  },
  data: function() {
    return {
      userId: '',
      habit: {},
      habitId: this.$route.params.id,
      members: new Map(),
      logs: new Map(),
      days: [],
      friends: []
    };
  },
  computed: {
    attributes() {
      return this.days.map(day => {
        let dayAttributes = {
          dates: day.date,
          popover: {
            label: this.members[day.userId].username,
          },
        }
        if (day.userId === this.userId) { 
          dayAttributes.highlight = {
            color: 'red',
            fillMode: 'solid',
          };
          dayAttributes.order = 1;
        } else {
            dayAttributes.highlight = {
              color: 'pink',
              fillMode: 'outline',
            };
          }
          return dayAttributes; 
      });
    }
  },
  created: async function() {
    let habit = await getHabit(this.habitId);
    this.habit = habit;
    let user = await getUser();
    this.userId= user.id;
    let friends = await getFriends();
    this.friends = friends;
    this.members = habit.members;
    this.logs = habit.logs;
    for (let thisUserId in this.logs) {
      let loggedDates = this.logs[thisUserId]; 
      loggedDates.map(date => this.days.push({
        id: dayjs(date).format('YYYY-MM-DD'), date: date, userId: thisUserId }))
    }
    console.log(this.members[this.userId]);
  },
  methods: {
    onDayClick(day) {
      console.log(day);
      if (day.date > new Date()) { return; }
      const index = this.days.findIndex(d => (d.id === day.id) 
      && (d.userId === this.userId));
      console.log(index);
      if (index >= 0) {
        this.days.splice(index, 1);
        updateLog(this.habitId, day.date, 'delete').then(() => {
          console.log('Request to delete log sent successfully');
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
          userId: this.userId
        });
        updateLog(this.habitId, day.date, 'add').then(() => {
          console.log('Request to log date sent successfully');
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
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
#calendar { 
}
.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
