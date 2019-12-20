<template>
    <header id="header" class="header">
        <b-navbar toggleable="lg" type="light">
            <b-container>
                <!-- logo  -->
                <b-navbar-brand to="/" href="#" class="logo"><img alt="Vue logo" src="../../assets/logo.png"></b-navbar-brand>
                <!-- menu btn -->
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                <!-- navigation -->
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#" :to="{path: '/'}">Accueil</b-nav-item>
                        <b-nav-item href="#" :to="{path: '/objets'}" active-class="active">Objets trouvés</b-nav-item>
                        <b-nav-item href="#" :to="{path: '/jai-trouve'}" active-class="active">J'ai trouvé un objet</b-nav-item>
                        <b-nav-item href="#" :to="{path: '/jai-perdu'}" active-class="active">J'ai perdu un objet</b-nav-item>
                        <b-nav-item href="#" v-if="user.role === 'admin' && user !== null" :to="{path: '/admin'}" active-class="active">Dashboard</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item href="#" @click="$store.commit('showLoginForm')" active-class="active" v-if="!$store.getters.loggedIn">Se connecter</b-nav-item>
                        <b-button variant="dark" @click="$store.commit('showSignupForm')" active-class="active" v-if="!$store.getters.loggedIn">S'enregistrer</b-button>
                        <Logout v-if="$store.getters.loggedIn"></Logout>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>

        <!-- Banner  -->
        <BannerComponent  v-if="$route.name !== 'Item'"></BannerComponent>
    </header>
</template>

<script>
    import BannerComponent from './BannerComponent';
    import Logout from '../LogoutModal'
    export default {
        name: "HeaderComponent",
        components: {
            'BannerComponent' : BannerComponent,
            'Logout' : Logout
        },
        mounted() {
            this.user = (JSON.parse(localStorage.getItem('user')) !== null) ? JSON.parse(localStorage.getItem('user')) : ''
        },
        data() {
            return {
                user: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    .header {
        box-shadow: 0 5px 10px 0 var(--light);
    }
    .navbar {
        position: relative;
        z-index: 1;
        box-shadow: 0 -15px 20px 0 var(--dark);
    }
    .logo img {
        height: 60px;
    }
</style>