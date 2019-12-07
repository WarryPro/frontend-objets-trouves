import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        signupVisible: false,
        loginVisible: false,
    },
    mutations: {
        showSignupForm(state) {
            state.signupVisible = true;
        },
        showLoginForm(state) {
            state.loginVisible = true;
        },
    },
    actions: {

    }
})