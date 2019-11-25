<template>
    <header id="header" class="header">
        <b-navbar toggleable="lg" type="light">
            <!-- logo  -->
            <b-navbar-brand to="/" href="#" class="logo"><img alt="Vue logo" src="../../assets/logo.png"></b-navbar-brand>
            <!-- menu btn -->
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <!-- navigation -->
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#" to="/" active-class="active">Accueil</b-nav-item>
                    <b-nav-item href="#" to="objets" active-class="active">Objets trouvés</b-nav-item>
                    <b-nav-item href="#" to="jai-trouve" active-class="active">J'ai trouvé un objet</b-nav-item>
                    <b-nav-item href="#" to="jai-perdu" active-class="active">J'ai perdu un objet</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#" to="login" active-class="active">Se connecter</b-nav-item>
                    <b-button variant="dark" to="signup" active-class="active">S'enregistrer</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- Banner  -->
        <BannerComponent></BannerComponent>
    </header>
</template>

<script>
    import BannerComponent from './BannerComponent';
    
    export default {
        name: "HeaderComponent",
        components: {
            'BannerComponent' : BannerComponent
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