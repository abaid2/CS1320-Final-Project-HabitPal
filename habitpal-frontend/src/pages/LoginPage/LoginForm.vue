<template>
    <div class="loginbody">
        <form @submit.prevent="handleLogin" class="loginform">
            <div class="loginitems">
                <div class="form-group">
                    <input type="email" v-model="email" name="email" class="form-control logininput" placeholder="Email address"/>
                    <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
                </div>
                <div class="form-group logininput">
                    <input type="password" v-model="password" name="password" class="form-control logininput" placeholder="Password" />
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                    <div v-show="email && password && !valid" class="invalid-feedback">Invalid login</div>
                </div>
                <div class="form-group login">
                    <button class="btn btn-primary logininput">Login</button>
                </div>
                <div class="form-group register">
                    <router-link to="/register" class="link-primary logininput"><button class="btn btn-success">Create New Account</button></router-link>
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

.loginbody {
    width: 32vw;
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
    border: none;
    background-color: white;
}

.loginform {
    display: flex;
    justify-content: center;
}

.loginitems {
    width: 36vw;
    padding:25px;
}

.login {
    padding-bottom: 30px;
    border-bottom: 1px solid #dadde1;
}
.logininput {
    font-size: 1.5vw;
    width: 100%;
    margin-bottom: 1px solid black;
}

.logininput:-webkit-autofill::first-line {
    font-size: 2vw;
}

.invalid-feedback {
    display: block;
}

.logininput:hover {
    text-decoration: none;
}

.register {
    padding-top: 10px;
}

</style>