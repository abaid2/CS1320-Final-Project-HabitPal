<template>
  <div>
    <Logout class="logout"/>
    <InvitationViewer class="invitation-viewer"/>
    <FriendsViewer class="friends-viewer"/>
    <h1>Habits displayed below</h1>
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
h1 {
    margin-top: 100px;
    font-size: 60px;
}

.habits {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}

.logout {
  position: fixed;
  left: 50px;
  top: 50px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.invitation-viewer {
  position: fixed;
  right: 100px;
  top: 50px;
}

.friends-viewer {
  position: fixed;
  right: 350px;
  top: 42px;
}

</style>
