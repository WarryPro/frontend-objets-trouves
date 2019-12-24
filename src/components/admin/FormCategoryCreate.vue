<template>
    <b-container>
    <el-form :model="categoryCreate" status-icon :rules="rules" ref="categoryCreate" class="form-user-edit">

      <el-form-item prop="name">
        <el-input v-model="categoryCreate.name" placeholder="Nom de la catégorie"></el-input>
      </el-form-item>

      <el-form-item class="form-submit">
        <el-button type="primary" :loading="loading" @click="submitForm('categoryCreate')">{{messageButton}}</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
    import {Global} from '../../../Global'; 
    // import store from '../../store';
    import axios from 'axios';
    export default {
        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                loading: false,
                messageButton: "CREER CATEGORIE",
                categoryCreate: {
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
                    if (valid) {
                        this.loading = true;
                        this.messageButton = "EN COURS..."
                        setTimeout(() => {
                            
                            axios.post(this.VUE_APP_URL + "admin/categories/new", this.categoryCreate, {
                            headers: {
                                "Authorization": this.$store.getters.userToken
                            }
                            })
                            .then(res => {
                            if (res.data.status !== "error") {
                                this.loading = false;
                                this.messageButton = "CREER CATEGORIE";
                                this.$message({
                                type: 'success',
                                message: res.data.message
                                });
                                this.$emit('activeModal', {modalVisible: false})
                            }else {
                                this.loading = false;
                                this.messageButton = "CREER CATEGORIE";
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