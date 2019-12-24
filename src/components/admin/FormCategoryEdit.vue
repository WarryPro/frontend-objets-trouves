<template>
    <b-container>
    <el-form :model="categoryEdit" status-icon :rules="rules" ref="categoryEdit" class="form-user-edit">

      <el-form-item prop="name">
        <el-input v-model="categoryEdit.name" placeholder="Nom de la catégorie"></el-input>
      </el-form-item>

      <el-form-item class="form-submit">
        <el-button type="primary" :loading="loading" @click="submitForm('categoryEdit')">{{messageButton}}</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
    import {Global} from '../../../Global'; 
    import axios from 'axios';
    import store from '../../store';
    export default {
        mounted() {
            this.categoryEdit =this.$store.getters.currentCategory; // get cat from store
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                loading: false,
                messageButton: "VALIDER",
                categoryEdit: {
                    name: ''
                },

                rules: {
                    name: [
                    {
                        required: true,
                        message: "Il faut tapez le nom de la catégorie",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        message: "Le nom doit avoir au moins 3 carcts.",
                        trigger: "blur"
                    }]
                }
            }
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {

                    let categoryId = this.categoryEdit.id; 

                    if (valid && categoryId !== null) {
                        this.loading = true;
                        this.messageButton = "EN COURS..."
                        setTimeout(() => {
                            axios.put(this.VUE_APP_URL + "admin/categories/edit/"+categoryId, this.categoryEdit, {
                                headers: {
                                    "Authorization": this.$store.getters.userToken
                                }
                            })
                            .then(res => {
                            if (res.data.status !== "error") {
                                this.loading = false;
                                this.messageButton = "VALIDER";
                                this.$message({
                                type: 'success',
                                message: res.data.message
                                });
                                store.commit('setCurrentCategory', null)
                            }else {
                                this.loading = false;
                                this.messageButton = "VALIDER";
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                this.$message({
                                    type: 'error',
                                    message: error
                                });
                                this.loading = false;
                                this.messageButton = "VALIDER";
                            });

                        },1000)
                    } else {
                    console.log("error submit!!");
                    return false;
                    }
                });
                },
        }
    }
</script>

<style lang="scss" scoped>

</style>