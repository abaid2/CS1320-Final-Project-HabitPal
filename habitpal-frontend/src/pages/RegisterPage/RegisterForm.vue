<template>
    <div class="registerbody">
        <h2>Register for HabitPal</h2>
        <form @submit.prevent="handleRegister" class="registerform" >
            <div class="registeritems">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" v-model="email" name="email" class="form-control registerinput" />
                    <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" name="username" class="form-control registerinput" />
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group registerinput">
                    <label htmlFor="password">Password</label>
                    <input type="password" v-model="password" name="password" class="form-control registerinput" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                </div>
                <div class="form-group registerinput">
                    <label htmlFor="password-confirm">Confirm password</label>
                    <input type="password" v-model="passwordConfirm" name="password-confirm" class="form-control registerinput" />
                    <div v-show="submitted && !passwordConfirm" class="invalid-feedback">Password confirmation is required</div>
                    <div v-show="submitted && password && passwordConfirm && password != passwordConfirm" class="invalid-feedback">Passwords are not the same</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary registerinput">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

async function signUp(email, username, password) {
  return new Promise((resolve, reject) => {
    const toSend = {
      email: email,
      password: password,
      username: username
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/users/register',
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
  name: 'RegisterForm',
  data () {
      return {
          email: '',
          username: '',
          password: '',
          passwordConfirm: '',
          submitted: false
      }
  },
  methods: {
      handleRegister() {
          this.submitted = true;
          const { email, username, password, passwordConfirm } = this;
          if (email && username && password && password == passwordConfirm) {
              signUp(email, username, password)
              .then(() => {
                  this.$router.push({ name: 'Login' });
              });
          }
      }
  }
}
</script>

<style scoped>
h2 {
    margin-bottom: 50px;
    font-size: 40px;
}
.registerbody {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.registerform {
    display: flex;
    justify-content: center;
}

.registeritems {
    width: 600px;
    font-size: 30px;
}

.registerinput {
    font-size: 30px;
}

.registerinput:-webkit-autofill::first-line {
    font-size: 30px;
}

.invalid-feedback {
    display: block;
}
</style>