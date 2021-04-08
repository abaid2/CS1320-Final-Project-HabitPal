<template>
  <div>
    <Logout class="logout"/>
    <h1>Habits displayed below</h1>
    <div class="habits">
        <Habit v-for="habit in habits" :habit="habit" :key="habit.id" />
    </div>
    <h1>Invitations displayed below</h1>
    <div class="invitations">
        <Invitation class="row" v-for="invitation in invitations" :invitation="invitation" :key="invitation.id" />
    </div>
    <AddButton class="add-habit"/>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import Logout from '../../components/Logout';
import AddButton from '../../components/AddButton';
import Invitation from '../../components/Invitation';
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

async function getInvitations() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/invite', config, {
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
    Invitation
  },
  created: async function() {
    let habits = await getHabits();
    this.habits = habits;
    let invitations = await getInvitations();
    this.invitations = invitations;
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

.logout {
  position: fixed;
  left: 50px;
  top: 50px;
}

.add-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}

.invitations {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

</style>
