import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import HomePage from '@/pages/HomePage';
import HabitPage from '@/pages/HabitPage';

Vue.use(Router);

export default new Router({
    routes: [{
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
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/home',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/habit/:id',
            name: 'Habit',
            component: HabitPage
        }
    ]
});