import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({

    state: {
        signupVisible: false,
        loginVisible: false,
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('getToken') || null,
        logoutVisible: false,

        // props pour les items
        item: Object, // Item seleccionné par son item (affiché sur la page objet/:id)
            
    },

    getters: {
        loggedIn(state) {
            return state.token !== null;
        },
        userToken(state) {
            return state.token;
        },
        currentItem(state) {
            return state.item;
        }, 
        isAdmin(state) {
            if(state.user !== null) {
                return state.user.role === 'admin';
            }
        }
    },

    mutations: {
        showSignupForm(state) {
            state.signupVisible = true;
        },

        showLoginForm(state) {
            state.loginVisible = true;
        },

        showLogoutModal(state) {
            state.logoutVisible = true
        },

        retrieveToken(state, data) {
            state.token = data.token;
            state.user = data.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
            state.logoutVisible = false
            localStorage.removeItem('getToken');
            localStorage.removeItem('user');
        },
        getCurrentItem(state, data) {
            state.item = data;
        }
    },

    actions: {
        getToken(context, credentials) {
            const token = credentials.token;
            const user = JSON.stringify(credentials.data);
            localStorage.setItem('getToken', token);
            localStorage.setItem('user', user);
            context.commit('retrieveToken', credentials)   
        }
    }
})