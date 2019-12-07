<template>
<!-- <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button> -->

<el-dialog
    title="Se connecter"
    :visible.sync="$store.state.loginVisible"
    :before-close="handleClose">

    <Login></Login>
</el-dialog>
</template>

<script>
    import Login from './Login';
    export default {
        components: {
            'Login' : Login
        },
        methods: {
            handleClose(done) {
                this.$confirm('Vous êtes sur de vouloir quitter le formulaire ?')
                .then(()=> {
                    done();
                })
                .catch(() => {});
            }
        }
  };
</script>

<style lang="scss" scoped>

</style>