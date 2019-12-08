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


//ROUTES 
import LastItems from './components/LastItemsComponent';
import ItemsFound from './components/ItemsFound';
import IFound from './components/IFound';
import ILost from './components/ILost';
import Login from './components/Login'
import Signup from './components/Signup'
import Item from './components/Item'
import HomeSearchResults from './components/HomeSearchResults'

Vue.config.productionTip = false


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(require('vue-moment'));

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.loggedIn) {
    next('/')
    store.commit('showLoginForm');
    return
  }
  next('/')
}

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
    component: Item,
    beforeEnter: ifNotAuthenticated
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
