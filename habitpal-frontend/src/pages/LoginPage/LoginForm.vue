<template>
    <div class="loginbody">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin" class="loginform">
            <div class="loginitems">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" v-model="email" name="email" class="form-control logininput" />
                    <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group logininput">
                    <label htmlFor="password">Password</label>
                    <input type="password" v-model="password" name="password" class="form-control logininput" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                    <div v-show="email && password && !valid" class="invalid-feedback">Invalid login</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary logininput">Login</button>
                </div>
                <div class="form-group">
                    <router-link to="/register" class="link-primary logininput">Sign up</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

async function signIn(email, password) {
  return new Promise((resolve, reject) => {
    const toSend = {
      email: email,
      password: password
    }; 

    const config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }

    axios.post(
        'http://localhost:8080/users/login',
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
  name: 'LoginForm',
  data () {
      return {
          email: '',
          password: '',
          submitted: false,
          valid: true
      }
  },
  methods: {
      handleLogin() {
          this.submitted = true;
          const { email, password } = this;
          if (email && password) {
              signIn(email, password)
              .then(() => {
                  this.valid = true;
                  this.$router.push({ name: 'Home' });
              })
              .catch(() => {
                  this.valid = false;
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
.loginbody {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.loginform {
    display: flex;
    justify-content: center;
}

.loginitems {
    width: 600px;
    font-size: 30px;
}

.logininput {
    font-size: 30px;
}

.logininput:-webkit-autofill::first-line {
    font-size: 30px;
}

.invalid-feedback {
    display: block;
}
</style>