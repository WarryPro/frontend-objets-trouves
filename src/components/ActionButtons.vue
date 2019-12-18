<template>
    <div class="actions">
        <el-button type="primary" icon="el-icon-edit" @click="edit"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="supprimer"></el-button>
    </div>
</template>

<script>
    import Axios from 'axios';
    
    export default {
        name: 'ActionButtons',

        data() {
            return {
                active: false
            }
        },

        methods: {
            supprimer() {
                this.$confirm('Vous êtes sur de vouloir supprimer cet objet?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    Axios.delete()
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                });
            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>