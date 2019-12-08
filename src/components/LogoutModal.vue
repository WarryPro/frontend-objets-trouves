<template>
  <el-button variant="dark" @click="open" active-class="active">Se déconnecter</el-button>
</template>

<script>
    export default {
        name: 'Logout',
        methods: {
        open() {
            this.$confirm('Vous allez être déconnecté. Continuer?', 'Se déconnecter', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'

            }).then(() => {

            this.$store.commit('logout');
            this.$router.push('/');
            this.$message({
                type: 'info',
                message: "Vous êtes maintenant hors ligne"
            });

            }).catch(() => {
            this.$message({
                type: 'success',
                message: 'Vous êtes tojours en ligne :)'
            });          
            });
        }
        }
    }
</script>