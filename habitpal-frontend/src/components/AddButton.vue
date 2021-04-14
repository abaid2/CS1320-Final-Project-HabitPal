<template>
  <div class="add-habit">
      <div class="expand-div" @click="expand=!expand" v-show="!expand">
        <h2>New habit</h2>
      </div>
      <div class="close-container">
          <button class="btn close-btn" v-show="expand" @click="expand=false">x</button>
      </div>
      <form @submit.prevent="handleCreate" v-show="expand" autocomplete="off">
            <div>
                <div>
                    <label for="title">Title</label>
                    <input type="text" v-model="title" name="email" class="form-control" />
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea v-model="description" name="password" class="form-control" />
                </div>    
                <div>
                    <button class="btn btn-primary create-btn">Create Habit</button>
                </div>
            </div>
      </form>
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
form {
  background-color: teal;
  padding: 20px;
}

label {
  font-size: 30px;
  font-weight: bold;
  color: white;
  float: left;
}

textarea {
  resize: none;
}

.form-control {
  font-size: 26px;
}

.create-btn {
  width: 100%;
  font-size: 26px;
  margin-top: 3px;
}

.add-habit {
  width: 50%;
  max-width: 1000px;
  height: 60px;
  margin-top: 10px;
  background-color: teal;
}

.expand-div {
  height: 80px;
  border: 1px solid black;
  padding: 0px;
  cursor: pointer;
  color: white;
  font-size: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: teal;
}

.expand-div:hover {
  background-color: rgb(0, 104, 104);
}

.close-btn {
  color: white;
  font-size: 30px;
  background-color: transparent;
  padding: 0px;
}

.close-container {
  float: right;
  padding-right: 50px;
}
</style>
