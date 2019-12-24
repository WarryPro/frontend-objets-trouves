<template>
    <div>
        <!-- Modal -->
        <el-dialog
            title="Editer la catégorie"
            :visible.sync="$store.state.editCategory"
            :before-close="handleClose">
            <FormCategoryEdit ></FormCategoryEdit>
        </el-dialog>
    </div>
</template>

<script>
    import FormCategoryEdit from './FormCategoryEdit';
    export default {
        components: {
            'FormCategoryEdit' : FormCategoryEdit
        },

        methods: {
            handleClose(done) {
                this.$confirm('Vous êtes sur de vouloir quitter le formulaire ?')
                .then(()=> {
                    done();
                    this.$store.commit('setCurrentCategory', null)
                })
                .catch(() => {});
            },
        }
  };
</script>

<style lang="scss" scoped>
    
</style>