<template>
<!-- <el-button type="text" @click="dialogVisible = true">click to open the Dialog</el-button> -->

<el-dialog
    title="Créez votre compte"
    :visible.sync="$store.state.signupVisible"
    :before-close="handleClose">
    <Signup></Signup>
</el-dialog>
</template>

<script>
    import Signup from './Signup';
    export default {
        components: {
            'Signup' : Signup
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