<template>
  <div>
    <Header class="header" :title="`HabitPal`" :friends="friends"/>
    <div class="habits">
        <Habit v-for="habit in habits" :habit="habit" :key="habit.id"/>
        <AddButton class="add-habit"/>
    </div>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import Header from '../../components/Header';
import AddButton from '../../components/AddButton';
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

async function getHabits() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/habits', config, {
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
  name: 'HomePage',
  data: function() {
    return {
      habits: [],
      invitations: [],
      friends: []
    };
  },
  components: {
    Habit,
    Header,
    AddButton,
  },
  created: async function() {
    let habits = await getHabits();
    this.habits = habits;
    let friends = await getFriends();
    this.friends = friends;
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>

.habits {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;

}

</style>
