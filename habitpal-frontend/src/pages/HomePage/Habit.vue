<template>
  <button class="habit btn" v-bind:class="{ hoverless: hoverChild }" @click="goToHabit">
    <div class="title-container" >
      <div class="expand-container">
        <button class="expand-btn"  @click="handleExpand($event)" @mouseenter="hoverChild=true" @mouseout="hoverChild=false"><img class="expand-img" v-bind:class="{rotated: expanded}" src="../../../resources/icons8-expand-arrow-52.png"></button>
      </div>  
      <h2 class="title" v-bind:class="{completetitle: completed || !toComplete}"> {{habit.title}} </h2>
      <div class="check-container" >
        <input v-model="completed" class="complete-check checkbox-circle" type="checkbox" value="" @click="$event.stopPropagation()" @change="handleComplete($event)" @mouseenter="hoverChild=true" @mouseout="hoverChild=false">
      </div>  
    </div>  
    <p v-show="expanded"> 
      {{ habit.description }}<br/>
      <span class="habit-info">This habit should be completed every {{ intervalMsg }}</span><br/>
      <span class="habit-info">{{ timeoutMsg }}</span>
    </p>
  </button>
</template>

<script>
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

export default {
  name: 'Habit',
  data () {
      return {
          expanded: false,
          hoverChild: false,
          completed: false,
          user: '',
          toComplete: false
      }
  },
  props: {
      habit: Object
  },
  computed: {
    intervalMsg: function() {
      if (this.habit.interval === '3day') {
        return '3 days';
      } else {
        return this.habit.interval;
      }
    },
    timeoutMsg: function() {
      if (!this.habit.timeout) {
        return 'It is set to never timeout';
      } else {
        const timeoutDate = new Date(this.habit.timeout);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (timeoutDate < tomorrow) {
          //expires within 24 hours
          const now = new Date();
          const timeDiff = timeoutDate.getTime() - now.getTime();
          const minutes = Math.floor(timeDiff / (1000 * 60));
          if (minutes <= 60) {
            const plural = minutes > 1 ? 's' : '';
            return `It will timeout in ${minutes} minute${plural}`;
          } else {
            const remainingMins = minutes % 60;
            const minPl = remainingMins > 1 ? 's' : '';
            const hours = (minutes - remainingMins) / 60;
            const hourPl = hours > 1 ? 's' : '';
            return `It will timeout in ${hours} hour${hourPl} and ${remainingMins} minute${minPl}`;
          }
        } else {
          return `It will timeout on ${timeoutDate.toLocaleDateString()}`;
        }
      }
    }
  },
  watch: {
    user: function() {
      if (this.user) {
        const interval = this.$props.habit.interval;
        if (interval == 'day') {
          this.toComplete = true;
        }
        const userLogs = this.$props.habit.logs[this.user.id];
        if (!userLogs.length) {
          this.toComplete = true;
        }
        const sortedLogs = userLogs.sort((a,b) => {
          const dateA = new Date(a);
          const dateB = new Date(b);
          if (dateA > dateB) {
            return -1;
          } else if (dateA < dateB) {
            return 1;
          } else {
            return 0
          }
        });
        const mostRecent = new Date(sortedLogs[0]);
        const date = new Date();
        if (interval === '3day') {
          date.setDate(date.getDate() - 3);
        } else if (interval === 'week') {
          date.setDate(date.getDate() - 7);
        } else if (interval === 'month') {
          date.setMonth(date.getMonth() - 1);
        }
        if (date < mostRecent) {
          this.toComplete = false;
        } else {
          this.toComplete = true;
        }
      }
    }
  },
  methods: {
    goToHabit() {
      this.$router.push({ name: 'Habit', params: { id: this.habit.id } });
    },
    handleExpand(e) {
      e.stopPropagation();
      this.expanded=!this.expanded;
    },
    async handleComplete(e) {
      const today = new Date();
      const date = today.toISOString().slice(0,11) + '04:00:00.000Z';
      if (e.target.checked) {
        await updateLog(this.habit.id, date, 'add');
        this.$emit('complete', true);
      } else {
        await updateLog(this.habit.id, date, 'delete');
        this.$emit('complete', false);
      }
    }
  },
  created: async function() {
    const today = new Date();
    const date = today.toISOString().slice(0,11) + '04:00:00.000Z';
    const user = await getUser();
    this.user = user;
    this.completed = this.$props.habit.logs[user.id].includes(date);
    this.$emit('complete', this.completed);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.habit {
  margin-top: 10px;
  width: 50%;
  max-width: 1000px;
  color: #214278;
  padding: 0px;
  background-color: white;
}

.hoverless {
  background-color: white !important;
}

button:hover {
  background-color: rgb(186, 193, 194);
}

.title-container {
  height: 100px;
  display: flex;
  align-items: center;
}

.expand-container {
  flex: 2;
  display: flex;
  justify-content: left;
}

.expand-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  margin-left: 25px;
}

.expand-btn:hover {
  background-color: transparent;
}

.expand-btn:hover .habit {
  background-color: white;
  height: 300px;
}

.expand-btn:focus {
  outline: none;
  box-shadow: none;
}

.rotated {
  transform: rotate(180deg); 
  transform-origin: center;
}

.title {
  flex: 7;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
}

@media only screen and (max-width: 1400px) {
  .title {
    font-size: 2.5vw;
  }
}

.completetitle {
  color: slategrey;
}

.check-container {
  flex: 1;
}

.complete-check {
  width: 40px;
  height: 40px;
}

.complete-check:hover {
  cursor: pointer;
}

.expand-img {
  height: 30px;
  width: 30px;
}

.expand-img:hover {
  cursor: pointer;
}

.habit-info {
  color: #e67a00;
}
</style>
