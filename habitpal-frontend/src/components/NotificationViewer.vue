<template>
    <div>
        <button class="notification-btn" @click="viewNotifications()">
          <i class="fas fa-bell fa-2x bell-img" v-bind:class="[expanded ? 'active' : 'inactive']"></i>
          <span v-show="invitations.length" class="badge badge-danger badge-invite">{{invitations.length}}</span>
        </button>
        <div v-show="expanded" class="invitations">
            <Invitation class="invite" v-for="invitation in invitations" :invitation="invitation" :key="invitation.id" />
        </div>    
    </div>
</template>

<script>
import Invitation from './Invitation';
import axios from 'axios';

axios.defaults.withCredentials = true;

async function getInvitations() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    }

    axios.get('http://localhost:8080/invite', config)
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export default {
  name: 'NotificationViewer',
  data () {
      return {
          invitations: [],
          expanded: false
      }
  },
  components: {
      Invitation
  },
  created: async function() {
    let invitations = await getInvitations();
    this.invitations = invitations;
  },
  methods: {
    viewNotifications() {
      if (this.invitations.length) { this.expanded = !this.expanded; }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notification-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  font-size: 20px;
  display: flex;
}

.notification-btn:focus {
  outline: none;
  box-shadow: none;
}

.bell-img {
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

.invitations {
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

.invite:last-child {
  border: none;
}
/* .invite {
    margin-bottom: 5px;
} */

.badge-invite {
  height: 20px;
  width: 17.5px;
  font-size: 12px;
  text-align: center;
}
</style>