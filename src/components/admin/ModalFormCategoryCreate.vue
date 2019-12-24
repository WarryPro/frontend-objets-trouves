<template>
    <div>
        <div class="text-left">
            <!-- Trigger  -->
            <el-button icon="el-icon-plus" size="mini" type="primary" @click="modalVisible = true"></el-button>
        </div>

        <!-- Modal -->
        <el-dialog
            title="Créer une catégorie"
            :visible.sync="modalVisible"
            :before-close="handleClose">
            <FormCategoryCreate v-on:activeModal="activeModal"></FormCategoryCreate>
        </el-dialog>
    </div>
</template>

<script>
    import FormCategoryCreate from './FormCategoryCreate';
    export default {
        components: {
            'FormCategoryCreate' : FormCategoryCreate
        },

        data() {
            return {
               modalVisible: false
            }
        },

        methods: {
            handleClose(done) {
                this.$confirm('Vous êtes sur de vouloir quitter le formulaire ?')
                .then(()=> {
                    done();
                })
                .catch(() => {});
            },

            activeModal(response) {
                this.modalVisible = response.modalVisible;
            }
        }
  };
</script>

<style lang="scss" scoped>
    
</style>