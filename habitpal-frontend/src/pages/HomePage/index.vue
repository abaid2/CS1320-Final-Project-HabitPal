<template>
  <div>
    <h1>Habits displayed below</h1>
    <div class="habits">
        <Habit v-for="habit in habits" :habit="habit" :key="habit.id" />
    </div>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import axios from 'axios';



async function getHabits() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.get('http://localhost:8080/habits', config, {
      params: {
        userId: 0
      }
    })
    .then(res => {
      console.log(res.data);
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}


export default {
  name: 'HomePage',
  data: function() {
    return {
      habits: []
    };
  },
  components: {
    Habit
  },
  created: async function() {
    getHabits()
      .then(res => this.habits = res)
      .catch(err => console.log(err));
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}

.habits {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
