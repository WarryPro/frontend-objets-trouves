<template>
    <header id="header" class="header">
        <b-navbar toggleable="lg" type="light">
            <!-- logo  -->
            <b-navbar-brand href="#" class="logo"><img alt="Vue logo" src="../assets/logo.png"></b-navbar-brand>
            <!-- menu btn -->
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <!-- navigation -->
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#" >Accueil</b-nav-item>
                    <b-nav-item href="#">Objets trouvés</b-nav-item>
                    <b-nav-item href="#">J'ai trouvé un objet</b-nav-item>
                    <b-nav-item href="#">J'ai perdu un objet</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#">Se connecter</b-nav-item>
                    <b-button variant="dark">S'enregistrer</b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <!-- carousel -->
        <div class="banner">
            <img src="../assets/images/Background-banner.svg" alt="Banner" class="img-fluid">
        </div>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent",
    }
</script>

<style lang="scss" scoped>
    .header {
        box-shadow: 0 5px 10px 0 var(--light);
    }
    .logo img {
        height: 60px;
    }
    .nav-link {
        padding-right: 1rem;
        padding-left: 1rem;
    }
</style>