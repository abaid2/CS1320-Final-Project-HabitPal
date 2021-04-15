<template>
  <div id="container">
    <div id="details">
      <div id="calendar-container content">
        <vc-calendar id="calendar" v-if='userId.length > 0' :max-date='new Date()'
        :attributes="attributes" @dayclick="onDayClick"/>
        <h2 v-if="Object.values(this.members).length < 2">Add friends to this habit to track and compare progress.</h2>
      </div>
      <Leaderboard v-if="leaderboard" class="leaderboard content" :logs="logs" :members="members" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Leaderboard from './Leaderboard.vue';

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

export default {
    name: 'Details',
    props: {
        habitId: String,
        habit: Object,
    },
    components: {
        Leaderboard,
    },
    data: function() {
        return {
            userId: '',
            days: [],
            members: new Map(),
            logs: new Map(),
            leaderboard: false,
        };
    },
    computed: {
        attributes() {
          let map = this.days.map(day => {
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
          return map;
        }
    },
    created: async function() {
        this.members = this.habit.members;
        this.logs = this.habit.logs;
        let user = await getUser();
        this.userId= user.id;
        for (let thisUserId in this.logs) {
        let loggedDates = this.logs[thisUserId]; 
        loggedDates.map(date => this.days.push({
            id: dayjs(date).format('YYYY-MM-DD'), date: date, userId: thisUserId }))
        }
        this.leaderboard = true;
    },
    methods: {
        onDayClick(day) {
        console.log(day);
        // let userLogs = this.logs[this.userId];
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
            // this.logs[this.userId] = userLogs.push(day.date);
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

<style scoped>

#container {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10%;
}
#details {
  display: flex;
  width: 80%;
  justify-content: space-around;
  align-items: center;
}

#calendar-container {
  display: flex;
  flex-direction: column;
}

#calendar {
  align-self: center;
  margin-top: 80px;
}

h2 {
  margin-top: 50px;
  color: floralwhite;
  font-size: 1.5vw;
}

.content {
  padding: 50px;
}
</style>