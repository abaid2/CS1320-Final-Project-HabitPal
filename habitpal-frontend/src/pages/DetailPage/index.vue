<template>
  <div>
    <h1> {{ this.habit.title }} </h1>
    <h2> {{ this.habit.description }} </h2>
    <h4> members: {{ this.members_str }} </h4>
    <InviteButton class="invite-habit" />
  </div>
</template>

<script>

import InviteButton from '../../components/InviteButton';
import axios from 'axios';

axios.defaults.withCredentials = true;

async function getDetail(habitid) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
      }, 
      params: {
        habitid: habitid
      }
    }

    axios.get('http://localhost:8080/detail', config, {
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
  name: 'DetailPage',
  components: {
    InviteButton
  },
  data: function() {
    return {
      habit: {},
      habitid: this.$route.params.id,
      members_str: ""
    };
  },
  created: async function() {
    let habit = await getDetail(this.habitid);
    this.habit = habit;
    for (let i = 0; i < this.habit.members.length; i++) {
      this.members_str = this.members_str + this.habit.members[i] + " ";
    }
    //alert(habit.members);
  }
}
</script>

<!-- "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
}
.invite-habit {
  position: fixed;
  right: 100px;
  bottom: 100px;
}
</style>
