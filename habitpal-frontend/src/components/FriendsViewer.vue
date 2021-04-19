<template>
    <div class="wrapper">
        <button class="friends-btn"  @click="viewFriendRequests()">
          <i class="fas fa-user-friends fa-2x friends-img" v-bind:class="[expanded ? 'active' : 'inactive']"/>
          <span v-show="requests.length" class="badge badge-danger badge-requests">{{requests.length}}</span>
        </button>
        <div v-show="expanded" class="friends">
            <!-- <div class="friends-list">
              <Friend class="friend" v-for="friend in friends" :friend="friend" :key="friend.id" />
            </div>
            <h3 v-show="requests.length">Requests: {{requests.length}}</h3>
            <div class="friends-list"> -->
              <FriendRequest class="friend" v-for="request in requests" :request="request" :key="request.id"/>
            <!-- </div>
            <div class="add-friend">
                <button class="btn btn-primary" v-show="!expandAdd" @click="expandAdd=!expandAdd">Add friend</button>
                <div v-show="expandAdd">
                  <input type="email" v-model="friendEmail" placeholder="email" />
                  <button class="btn btn-primary" @click="handleRequestFriend">Add friend</button>
                </div>  
              </div>   -->
        </div>    
    </div>
</template>

<script>
// import Friend from './Friend';
import FriendRequest from './FriendRequest';
import axios from 'axios';

axios.defaults.withCredentials = true;

async function getFriendRequests() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/friends/requests', config)
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
  props: {
    friends: Array
  },
  data () {
      return {
          requests: [],
          expanded: false,
      }
  },
  components: {
      // Friend,
      FriendRequest
  },
  created: async function() {
    let requests = await getFriendRequests();
    this.requests = requests;
  }, 
  methods: {
    viewFriendRequests() {
      if (this.requests.length) { this.expanded = !this.expanded; }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  padding: 0px;
  font-weight: bold;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.friends-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  font-size: 20px;
  display: flex;
}

.friends-btn:focus {
  outline: none;
  box-shadow: none;
}

.friends-img {
  cursor: pointer;
}
.inactive {
    color: floralwhite;
}

.inactive:hover {
    color: #dae5ff;
}

.active {
  color: #2e89ff;
}

.friends {
    display: flex;
    flex-direction: column;
    background-color: white;
    opacity: 0.95;
    position: fixed;
    right: 3px;
    top: 85px;
    border-radius: 8px;
    padding: 2px;
}


.friend:last-child {
    border: none;
}

.badge-requests {
    height: 20px;
    width: 17.5px;
    font-size: 12px;
    text-align: center;
}

.add-friend {
  margin-top: 7px;
}
</style>