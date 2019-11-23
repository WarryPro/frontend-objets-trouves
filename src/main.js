import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//ROUTES 
import LastItems from './components/LastItemsComponent';

Vue.config.productionTip = false


Vue.use(VueRouter);
Vue.use(BootstrapVue)


const routes = [
  { path: '/', 
    component: LastItems },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
