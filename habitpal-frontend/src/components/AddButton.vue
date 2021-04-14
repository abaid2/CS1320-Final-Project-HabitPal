<template>
  <div class="add-habit">
      <button class="btn btn-success expand-div" @click="expand=!expand" v-show="!expand">
        New habit
      </button>
      <div class="close-container">
          <button class="btn close-btn" v-show="expand" @click="expand=false"><i class="fas fa-times"></i></button>
      </div>
      <form @submit.prevent="handleCreate" v-show="expand" autocomplete="off">
            <div>
                <div class="form-input">
                    <input type="text" placeholder="Title" v-model="title" name="email" class="form-control" />
                </div>
                <div class="form-input">
                    <textarea placeholder="Description" v-model="description" name="password" class="form-control" />
                </div>    
                <div>
                    <button class="btn btn-success create-btn">Create Habit</button>
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  
}

label {
  font-size: 30px;
  font-weight: bold;;
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
}


.close-btn {
  color: #214278;
  font-size: 30px;
  background-color: transparent;
  padding: 5px;
}

.close-container {
  float: right;
  padding-right: 10px;
}

.form-input {
  padding: 20px;
}
.btn {
  width: 100%;
}
</style>
