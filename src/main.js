import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//ROUTES 
import LastItems from './components/LastItemsComponent';
import ItemsFound from './components/ItemsFound';
import IFound from './components/IFound';
import ILost from './components/ILost';
import Login from './components/Login'
import Signup from './components/Signup'

Vue.config.productionTip = false


Vue.use(VueRouter);
Vue.use(BootstrapVue)


const routes = [
  { path: '/', 
    component: LastItems
  },
  { path: '/objets', 
    component: ItemsFound
  },
  { path: '/jai-trouve', 
    component: IFound
  },
  { path: '/jai-perdu', 
    component: ILost
  },
  { path: '/login', 
    component: Login
  },
  { path: '/signup', 
    component: Signup
  },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
