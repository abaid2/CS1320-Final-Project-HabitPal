<template>
    <div>
        <button class="friends-btn"  @click="expanded=!expanded"><i class="fas fa-user-friends fa-2x friends-img"></i></button>
        <div v-show="expanded" class="friends">
            <Friend class="friend" v-for="friend in friends" :friend="friend" :key="friend.id" />
        </div>    
    </div>
</template>

<script>
import Friend from './Friend';
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

export default {
  name: 'FriendsViewer',
  data () {
      return {
          friends: [],
          expanded: false
      }
  },
  components: {
      Friend
  },
  created: async function() {
    let friends = await getFriends();
    this.friends = friends;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friends-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  font-size: 20px;
}

.friends-btn:focus {
  outline: none;
  box-shadow: none;
}

.friends-img {
    color: floralwhite;
}

.friends-img:hover {
    cursor: pointer;
    color: #dae5ff;
}

.friends {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 5px;
    padding-top: 10px;
}

.friend {
    margin-bottom: 5px;
}
</style>