<template>
  <div>
    <Header class="header" :title="`HabitPal`" :friends="friends"/>
    <div class="friends-wrapper">
      <div class="friends-container">
        <h2>Friends</h2>
        <div class="add-friend">
            <input class="form-control" type="email" v-model="friendEmail" placeholder="Email address" />
            <button class="btn btn-primary" @click="handleRequestFriend">Add friend</button>
        </div> 
        <div id="see-all">
          <i class="fas fa-lg expand-img" @click="seeAllFriends()" v-bind:class="[seeAllExpanded ? 'fa-chevron-circle-up active' : 'fa-chevron-circle-down inactive']" />
          <h3>See {{seeAllExpanded ? 'Less' : 'All'}}</h3>
        </div>
        <div class="friends">
          <Friends v-show="seeAllExpanded" v-for="friend in friends" :friend="friend" :key="friend.id"/>
        </div>
      </div>
    </div>
    <div class="habits">
        <Habit v-for="habit in sortedHabits" :habit="habit" :key="habit.id" @complete="handleComplete(habit, $event)"/>
        <AddButton class="add-habit"/>
    </div>
  </div>
</template>

<script>
import Habit from '../../components/Habit';
import Header from '../../components/Header';
import Friends from '../../components/Friends';
import AddButton from '../../components/AddButton';
import axios from 'axios';

axios.defaults.withCredentials = true;

async function sendFriendRequest(email) {
  return new Promise((resolve, reject) => {
    const toSend = {
      email: email,
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/friends/requests',
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
      completedHabits: [],
      sortedHabits: [],
      invitations: [],
      friends: [],
      friendEmail: "",
      numCompleted: 0,
      seeAllExpanded: false,
    };
  },
  components: {
    Habit,
    Header,
    Friends,
    AddButton,
  },
  created: async function() {
    let habits = await getHabits();
    this.habits = habits;
    this.sortedHabits = habits;
    let friends = await getFriends();
    this.friends = friends;
    console.log(friends);
  },
  watch: {
    numCompleted: function() {
      this.sortedHabits = this.habits.sort((a,b) => {
        if (a.completed && b.completed) {
          return 0;
        } else if (a.completed) {
          return 1;
        } else if (b.completed) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  },
  methods: {
    handleComplete(habit, value) {
      if (value) {
        habit.completed = true;
        this.numCompleted += 1;
      } else {
        habit.completed = false;
        this.numCompleted -= 1;
      }
    },
    handleRequestFriend() {
      if (this.friendEmail) {
        sendFriendRequest(this.friendEmail)
        .then(() => {
          this.friendEmail = "";
          this.expand = false;
        });
      }
      this.expandAdd = false;
    },
    seeAllFriends() {
      this.seeAllExpanded = !this.seeAllExpanded;
    }
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

.friends-wrapper {
  width: 310px;
  position: fixed;
  top: 110px;
  left: 30px;
}

.add-friend {
  display: flex;
  flex-direction: column;
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #dadde1;
}

input {
  margin-bottom: 20px;
}
.friends-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  align-items: flex-start;
  padding: 15px;
}

#see-all {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-bottom: 5px;
}

h3 {
  font-size: 25px;
  font-variation-settings: 'wght' 600;
}
.expand-img {
  padding: 20px 5px 10px 0;
  cursor: pointer;
}

.inactive:hover {
    color: rgb(65, 65, 65);
}

.active {
  color: #2e89ff;
}

.friends {
  font-size: 15px;
  width: 100%
}

@media only screen and (max-width: 1350px) {
  .friends-wrapper {
    display: none;
  }
}
</style>
