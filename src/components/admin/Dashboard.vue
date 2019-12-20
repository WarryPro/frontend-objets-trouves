<template>
    <div>
        Admin dashboard
    </div>
</template>

<script>
    export default {
        name: 'AdminDashboard',
        mounted() {
            this.openFullScreen();
        },
        methods: {
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'white'
                });
                setTimeout(() => {
                    loading.close();
                }, 1000);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>