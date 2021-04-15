<template>
    <div class="wrapper">
        <button class="friends-btn"  @click="expanded=!expanded"><img class="freinds-img" src="../../resources/icons8-user-group-2-64.png"><span v-show="requests.length" class="badge badge-primary badge-requests">{{requests.length}}</span></button>
        <div v-show="expanded" class="friends">
            <h3>Friends: {{friends.length}}</h3>
            <div class="friends-list">
              <Friend class="friend" v-for="friend in friends" :friend="friend" :key="friend.id" />
            </div>
            <h3 v-show="requests.length">Requests: {{requests.length}}</h3>
            <div class="friends-list">
              <FriendRequest class="friend" v-for="request in requests" :request="request" :key="request.id"/>
            </div>
            <div class="add-friend">
                <button class="btn btn-primary" v-show="!expandAdd" @click="expandAdd=!expandAdd">Add friend</button>
                <div v-show="expandAdd">
                  <input type="email" v-model="friendEmail" placeholder="email" />
                  <button class="btn btn-primary" @click="handleRequestFriend">Add friend</button>
                </div>  
              </div>  
        </div>    
    </div>
</template>

<script>
import Friend from './Friend';
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

export default {
  name: 'FriendsViewer',
  props: {
    friends: Array
  },
  data () {
      return {
          requests: [],
          expanded: false,
          expandAdd: false,
          friendEmail: ""
      }
  },
  components: {
      Friend,
      FriendRequest
  },
  methods: {
      handleRequestFriend() {
          if (this.friendEmail) {
              sendFriendRequest(this.friendEmail)
              .then(() => {
                  this.friendEmail = "";
                  this.expand = false;
              });
          }
          this.expandAdd = false;
      }
  },
  created: async function() {
    let requests = await getFriendRequests();
    this.requests = requests;
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
  width: 50px;
  align-self: center;
}

.friends-btn:focus {
  outline: none;
  box-shadow: none;
}

.friends-img {
    color: floralwhite;
}

.friends-list {
  background-color: #f8f8f8;
  max-height: 400px;
  overflow-y: auto;
}

.friends-img:hover {
    cursor: pointer;
    color: #dae5ff;
}

.friends {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
}

.friend {
    margin-bottom: 5px;
    border-bottom: 1px solid black;
}

.friend:last-child{
    border: none;
}

.badge-requests {
    position: absolute;
    right: 0px;
    top: 0px;
}

.add-friend {
  margin-top: 7px;
}
</style>