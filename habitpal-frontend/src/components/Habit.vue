<template>
  <button class="habit btn" v-bind:class="{ hoverless: hoverChild }" @click="goToHabit">
    <div class="title-container" >
      <div class="expand-container">
        <button class="expand-btn"  @click="handleExpand($event)" @mouseenter="hoverChild=true" @mouseout="hoverChild=false"><img class="expand-img" src="../../resources/icons8-expand-arrow-52.png"></button>
      </div>  
      <h2 class="title" v-bind:class="{completetitle: completed}"> {{habit.title}} </h2>
      <div class="check-container" >
        <input v-model="completed" class="complete-check checkbox-circle" type="checkbox" value="" @click="$event.stopPropagation()" @change="handleComplete($event)" @mouseenter="hoverChild=true" @mouseout="hoverChild=false">
      </div>  
    </div>  
    <p v-show="expanded"> {{ habit.description }} </p>
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
          completed: false
      }
  },
  props: {
      habit: Object
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
        this.$emit('complete');
      } else {
        await updateLog(this.habit.id, date, 'delete');
        this.$emit('undocomplete');
      }
    }
  },
  created: async function() {
    const today = new Date();
    const date = today.toISOString().slice(0,11) + '04:00:00.000Z';
    const user = await getUser();
    this.completed = this.$props.habit.logs[user.id].includes(date);
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

.title {
  flex: 7;
  text-align: left;
  font-size: 36px;
  font-weight: bold;
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

</style>
