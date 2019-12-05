<template>
    <!-- Banner -->
        <div class="banner">
            <img src="@/assets/images/Background-banner.svg" alt="Banner" class="img-fluid">

            <div v-if="$route.path == '/'" class="banner__form">
                <HomeSearch></HomeSearch>
            </div>
        </div>
</template>

<script>
    import HomeSearch from './../HomeSearchComponent'
    export default {
        name: 'BannerComponent',
        components: {
            'HomeSearch' : HomeSearch
        }
    }
</script>

<style lang="scss" scoped>
    .banner {
        position: relative;
        &__form {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0;
        }
    }
</style>