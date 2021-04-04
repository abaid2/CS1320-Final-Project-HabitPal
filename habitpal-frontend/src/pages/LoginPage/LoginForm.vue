<template>
    <div class="loginbody">
        <h2>Login</h2>
        <form class="loginform">
            <div class="loginitems">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" class="form-control logininput" />
                </div>
                <div class="form-group logininput">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" class="form-control logininput" />
                </div>
                <div class="form-group">
                    <router-link to="/home" class="btn btn-primary logininput">Login</router-link>
                </div>
                <div class="form-group">
                    <router-link to="/register" class="link-primary logininput">Sign up</router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'LoginForm'
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
</style>