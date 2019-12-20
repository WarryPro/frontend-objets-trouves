import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/sass/app.scss';

// Mediaqueries
import VueMq from 'vue-mq';


//ROUTES 
import LastItems from './components/LastItemsComponent';
import ItemsFound from './components/ItemsFound';
import IFound from './components/IFound';
import ILost from './components/ILost';
import Login from './components/Login'
import Signup from './components/Signup'
import Item from './components/Item'
import HomeSearchResults from './components/HomeSearchResults'

// ADMIN ROUTES
import AdminDashboard from './components/admin/Dashboard'

Vue.config.productionTip = false


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(require('vue-moment'));
Vue.use(VueMq, {
  breakpoints: {
    mobile: 550,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
  }
})



const ifAuthenticated = (to, from, next) => {
  if (store.getters.loggedIn) {
    next()
    return
  }
  next('/')
  store.commit('showLoginForm');
}

const routes = [
  { 
    name: 'home',
    path: '/', 
    component: LastItems
  },
  { name: 'objets',
    path: '/objets', 
    component: ItemsFound
  },
  {
    path: '/objets/:id',
    name: 'Item',
    component: Item
  },
  { path: '/jai-trouve', 
    component: IFound,
    beforeEnter: ifAuthenticated
  },
  { path: '/jai-perdu', 
    component: ILost,
    beforeEnter: ifAuthenticated
    // beforeEnter: (to, from, next) => {
    //   if(store.getters.loggedIn) {
    //     next()
    //   }else {
    //     store.commit('showLoginForm');
    //   }
    // }
  },
  { path: '/login', 
    component: Login
  },
  { path: '/signup', 
    component: Signup
  },
  {
    name: 'search',
    path: '/search',
    component: HomeSearchResults
  },

  //ADMIN ROUTES
  {
    name: 'Admin',
    path: '/admin',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      let user = JSON.parse(localStorage.getItem('user'));
      if(user !== null && user.role === 'admin') {
        next()
      }else {
        router.push('/');
      }
    }
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
