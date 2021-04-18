<template>
  <div class="add-habit">
      <button class="btn btn-success expand-div" @click="expand=!expand" v-show="!expand">
        New habit
      </button>
      <div class="close-container">
          <button class="btn close-btn" v-show="expand" @click="expand=false"><i class="fas fa-times"></i></button>
      </div>
      <form @submit.prevent="handleCreate" v-show="expand" autocomplete="off">
            <div id="form-content">
                <div class="form-input text">
                    <input type="text" placeholder="Title" v-model="title" name="email" class="form-control" />
                </div>
                <div class="form-input description">
                    <textarea placeholder="Description" v-model="description" name="password" class="form-control" />
                </div>
                <div class="select-container">
                  <label for="interval-select" class="select-label">Select the interval for this habit:</label>
                  <select class="form-select" aria-label="Interval select" id="interval-select" v-model="interval">
                    <option value="day" selected>Daily</option>
                    <option value="3day">Every 3 days</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>
                <div class="select-container">
                  <label for="timeout-select" class="select-label">Select when you want this habit to timeout:</label>
                  <select class="form-select" aria-label="Timeout select" id="timeout-select" v-model="timeout">
                    <option value="never" selected>Never</option>
                    <option value="1day">In 24 hours</option>
                    <option value="7day">In a week</option>
                    <option value="month">In a month</option>
                  </select> 
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

async function createHabit(title, description, interval, timeout) {
  return new Promise((resolve, reject) => {
    const toSend = {
      title: title,
      description: description,
      interval: interval,
      timeout: timeout
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
          interval: 'day',
          timeout: 'never',
          expand: false
      }
  },
  methods: {
      handleCreate() {
        const { title, description, interval, timeout } = this;
          if (title && description) {
              createHabit(title, description, interval, timeout)
              .then(() => {
                  this.title = '';
                  this.description = '';
                  this.interval = 'day';
                  this.timeout = 'never';
                  this.expand = false;
              });
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#form-content {
  padding: 40px;
}

form {
  background-color: white;
  border-radius: 8px;
}

select {
  height: min-content;
  align-self: center;
  margin-left: 20px;
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
  font-size: 1.75vw;
  margin-top: 3px;
}

.add-habit {
  width: 50%;
  max-width: 1000px;
  height: 60px;
  margin-top: 10px;
}

.expand-div {
  font-size: 1.75vw;
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

.select-container {
  display: flex;
  margin-bottom: 10px;
}

.select-label {
  font-size: 24px;
  margin: 0px;
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
  padding-top: 20px;
}

.description {
  padding-bottom: 20px;
}
.btn {
  width: 100%;
}
</style>
