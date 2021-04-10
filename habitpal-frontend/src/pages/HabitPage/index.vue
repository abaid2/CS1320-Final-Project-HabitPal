<template>
  <div>
    <h1> {{ this.habit.title }} </h1>
    <h2> {{ this.habit.description }} </h2>
    <div class="progress-log">
       <vc-calendar value  :model-config="modelConfig"
        :attributes="attributes" @dayclick="onDayClick"/>
    </div>
    <InviteButton class="invite-habit" />
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import axios from 'axios';

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
      username: '',
      habit: {},
      habitId: this.$route.params.id,
      members: [],
      days: [],
      modelConfig: {
        type: 'string',
        mask: 'YYYY-MM-DD',
      }
    };
  },
  computed: {
    dates() {
      return this.days.map(day => day.date);
    },
    attributes() {
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
        popover: {
          label: this.username,
        },
      }));
    }
  },
  created: async function() {
    let habit = await getHabit(this.habitId);
    this.habit = habit;
    this.members = habit.members;
    let user = await getUser();
    this.username = user.username;
    console.log(this.username);
  },
  methods: {
    onDayClick(day) {
      console.log(day);
      const index = this.days.findIndex(d => d.id === day.id);
      if (index >= 0) {
        this.days.splice(index, 1);
        updateLog(this.habitId, day.id, 'delete').then(() => {
          console.log('Request to delete log sent successfully');
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        });
        updateLog(this.habitId, day.id, 'add').then(() => {
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
.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
