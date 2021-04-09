import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VCalendar from 'v-calendar'

Vue.use(VCalendar, {
    componentPrefix: 'vc',
});

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')