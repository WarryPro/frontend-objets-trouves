import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({

    state: {
        // GENERALS STATES
        signupVisible: false,
        loginVisible: false,
        editActive: false, // Active item edit
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('getToken') || null,
        logoutVisible: false,

        // props pour les items
        item: Object, // Item seleccionné par son item (affiché sur la page objet/:id)

        // ADMIN STATES
        adminUserEdit: false,
        selectedUserEdit: null,
        createCategory: false,
        currentCategory: null, //Catégorie selectionnée pour editer/supprimer
        editCategory: false,
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
        },
        currentCategory(state) {
            return state.currentCategory;
        }
    },

    mutations: {
        showSignupForm(state) {
            state.signupVisible = true;
        },

        showLoginForm(state) {
            state.loginVisible = true;
        },

        showEditForm(state) {
            state.editActive = true;
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
        },

        // ADMIN MUTATIONS
        showAdminUseredit(state, data) {
            state.selectedUserEdit = data;
            state.adminUserEdit = true;
        },
        showCategoryCreate(state) {
            state.createCategory = true
        },
        setCurrentCategory(state, data) {
            if(data !== null) {
                state.currentCategory = data;
                state.editCategory = true;
            }
            else {
                state.currentCategory = null;
                state.editCategory = false;
            }
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