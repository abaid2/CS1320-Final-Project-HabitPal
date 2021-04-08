<template>
  <div>
      <form @submit.prevent="handleCreate" v-show="expand">
            <div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" v-model="title" name="email" class="form-control" />
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <input type="text" v-model="description" name="password" class="form-control" />
                </div>    
                <div class="form-group">
                    <button class="btn btn-primary">Create Habit</button>
                </div>
            </div>
      </form>
      <button class="add btn btn-primary" @click="expand=!expand">+</button>
  </div>
</template>

<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

async function createHabit(title, description) {
  return new Promise((resolve, reject) => {
    const toSend = {
      title: title,
      description: description
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/habits',
        JSON.stringify(toSend),
        config
    )
    .then(res => {
      resolve(res.data);
      location.reload();
    })
    .catch(err => {
      reject(err);
    });
  });
}

export default {
  name: 'AddButton',
  data () {
      return {
          title: '',
          description: '',
          expand: false
      }
  },
  methods: {
      handleCreate() {
        const { title, description } = this;
          if (title && description) {
              createHabit(title, description)
              .then(() => {
                  this.title = '';
                  this.description = '';
                  this.expand = false;
              });
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add {
  border-radius: 100%;
  width: 70px;
  height: 70px;
  font-size: 40px;
}
</style>
