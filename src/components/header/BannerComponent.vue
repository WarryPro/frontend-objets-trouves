<template>
    <!-- Banner -->
        <div class="banner">
            <img src="../../assets/images/Background-banner.svg" alt="Banner" class="img-fluid">
            <div v-if="$route.path == '/'" class="banner__form">
                tester

            </div>
        </div>
</template>

<script>

    export default {
        name: 'BannerComponent',
        components: {
            
        }
    }
</script>

<style lang="scss" scoped>
    .banner {
        position: relative;
        z-index: -1;
        &__form {
            position: absolute;
            top: 50%;
            left: 50%;
        }
    }
</style>