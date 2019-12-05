<template>
    <div>
        
    </div>
</template>

<script>
    import {Global} from '../../Global';
    // import axios from "axios";
    export default {
        name: 'Login',
        mounted() {
            console.log(this.VUE_APP_URL)
        },
        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>