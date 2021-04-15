<template>
  <div>
    <div id="home-header">
    <Logout class="logout"/>
    <InvitationViewer class="invitation-viewer icon"/>
    <FriendsViewer :friends="friends" class="friends-viewer icon"/>
    <h1>HabitPal</h1>
    </div>
    <div class="habits">
        <Habit v-for="habit in sortedHabits" :habit="habit" :key="habit.id" @complete="handleComplete(habit, $event)"/>
        <AddButton class="add-habit"/>
    </div>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import Logout from '../../components/Logout';
import AddButton from '../../components/AddButton';
import InvitationViewer from '../../components/InvitationViewer';
import FriendsViewer from '../../components/FriendsViewer';
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
      friends: [],
      completedHabits: []
    };
  },
  components: {
    Habit,
    Logout,
    AddButton,
    InvitationViewer,
    FriendsViewer
  },
  computed: {
    // sortedHabits: function() {
    //   const sorted = this.habits.sort((a,b) => {
    //     if (this.completedHabits.includes(a) && this.completedHabits.includes(b)) {
    //       return 0;
    //     } else if (this.completedHabits.includes(a)) {
    //       return 1;
    //     } else if (this.completedHabits.includes(b)) {
    //       return -1
    //     }
    //   })
    //   return sorted;
    // }
  },
  methods: {
    handleComplete(habit, value) {
      if (value && !this.completedHabits.includes(habit)) {
        this.habits.push(habit);
      } else if (!value && this.completedHabits.includes(habit)) {
        const index = this.completedHabits.indexOf(habit);
        if (index > -1) {
          this.completedHabits.splice(index, 1);
        }
      }
    }
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
body {
  background-image: url('../../assets/logo.png') !important;
}
h1 {
    margin-top: 0px;
    font-size: 60px;
    font-variation-settings: 'wght' 800;
}

.habits {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}

#home-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 50px;
  background-color: #214278;
}

.friends-viewer {
  position: fixed;
  right: 350px;
  top: 42px;
}

</style>
