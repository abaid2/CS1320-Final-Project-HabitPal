import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "Login"
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/home',
            name: 'Home',
            component: HomePage
        }
    ]
});