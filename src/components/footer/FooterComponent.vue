<template>
    <footer>
        <b-container>
            <div class="footer-column">
                <h3>DSL - Secteur des objets trouvés</h3>
                <p>5, Rue des Glacis-de-Rive</p>
                <p>1207 Genève</p>
                <p>Tél. +41 22 427 90 00</p>
                <p>Email : scot@police.ge.ch</p>
            </div>
            <div class="footer-column">
                <h3>Heures d'ouverture</h3>
                <p>Du lundi au vendredi de</p>
                <p>7h30 à 12h et 13h à 16h</p>
                <p>Fermé samedi et dimanche</p>
            </div>
            <div class="footer-column">
                <h3>Bases légales</h3>
                <p>Art. 720 ss – code civil suisse</p>
                <p>Règlement concernant les objets trouvés (RObjT)</p>
            </div>
        </b-container>
    </footer>
</template>

<script>
    export default {
        name : 'FooterComponent'
    }
</script>

<style lang="scss" scoped>
    h3{
        font-size: 1rem;
        font-weight: 600;
    }
    p {
        margin-bottom: .3rem;
    }
</style>