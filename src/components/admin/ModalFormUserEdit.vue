<template>
    <el-dialog
        title="Editer l'utilisateur"
        :visible.sync="$store.state.adminUserEdit"
        :before-close="handleClose">
        <AdminUserEdit></AdminUserEdit>
    </el-dialog>
</template>

<script>
    import AdminUserEdit from './FormUserEdit';
    export default {
        components: {
            'AdminUserEdit' : AdminUserEdit
        },

        methods: {
            handleClose(done) {
                this.$confirm('Vous êtes sur de vouloir quitter le formulaire ?')
                .then(()=> {
                    done();
                    this.$store.state.adminUserEdit = false;
                    this.$store.state.selectedUserEdit = null;
                })
                .catch(() => {});
            },
        }
  };
</script>

<style lang="scss" scoped>
    
</style>