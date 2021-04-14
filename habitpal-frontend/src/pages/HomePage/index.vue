<template>
  <div>
    <div id="home-header">
    <Logout class="logout"/>
    <h1>HabitPal</h1>
    <div id="icons">
      <InvitationViewer class="invitation-viewer icon"/>
      <FriendsViewer class="friends-viewer icon"/>
    </div>
    </div>
    <div class="habits">
        <Habit v-for="habit in habits" :habit="habit" :key="habit.id"/>
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
    };
  },
  components: {
    Habit,
    Logout,
    AddButton,
    InvitationViewer,
    FriendsViewer
  },
  created: async function() {
    let habits = await getHabits();
    this.habits = habits;
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

#icons {
  display: flex;
  flex-direction: row;
}

.icon {
  padding: 20px;
}

</style>
