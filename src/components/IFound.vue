<template>
    <div>
        <el-divider></el-divider>
        <FormItemFound></FormItemFound>
        <el-divider></el-divider>
    </div>
</template>

<script>
    import FormItemFound from './FormItemFound';

    export default {
        name: 'IFound',
        components: {
            'FormItemFound': FormItemFound,
        },
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