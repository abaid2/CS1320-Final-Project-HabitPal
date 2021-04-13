<template>
    <div>
        <button class="invitation-btn"  @click="expanded=!expanded"><img class="bell-img" src="../../resources/icons8-bell-24.png"><span v-show="invitations.length" class="badge badge-primary badge-invite">{{invitations.length}}</span></button>
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
  name: 'InvitationViewer',
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.invitation-btn {
  background-color: transparent;
  border: none;
  padding: 0px;
  font-size: 20px;
}

.invitation-btn:focus {
  outline: none;
  box-shadow: none;
}

.bell-img {
    height: 50px;
    width: 50px;
}

.bell-img:hover {
    cursor: pointer;
}

.invitations {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 5px;
    padding-top: 10px;
}

.invite {
    margin-bottom: 5px;
}

.badge-invite {
    position: absolute;
    right: 0px;
    top: 0px;
}
</style>