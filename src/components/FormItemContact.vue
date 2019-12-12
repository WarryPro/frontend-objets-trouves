<template>
    <div>
        <el-form :model="formItemContact" status-icon :rules="rules" ref="formItemContact" class="form-user">
            <h4>Je suis le propriétaire</h4>
            <p>Une référence vous sera demandée pour que la personne qui a trouvé votre objet puisse verifier que vous êtes le propriétaire <i class="el-icon-warning"></i></p>

            <el-form-item prop="email">
                <el-input v-model="formItemContact.email" placeholder="Votre email"></el-input>
            </el-form-item>

            <el-form-item prop="ref">
                <el-input type="text" v-model="formItemContact.ref" placeholder="Donnez une référence le l'objet"></el-input>
            </el-form-item>

            <el-form-item prop="desc">
                <el-input type="textarea" v-model="formItemContact.desc" placeholder="Votre message"></el-input>
            </el-form-item>


            <el-form-item class="form-submit">
                <el-button type="primary" :loading="loading" @click="submitForm('formItemContact')">{{messageButton}} <i class="el-icon-arrow-right"></i></el-button>
                <!-- <el-button type="primary" :loading="loading" @click="submitForm('formItemContact')">{{messageButton}} <i class="el-icon-arrow-right"></i></el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { Global } from "../../Global";
    import axios from "axios";
    import store from '../store';

    export default {
        name: 'FormItemContact',
        data() {
            return {
            VUE_APP_URL: Global.VUE_APP_URL,

            loading: false,
            messageButton: "ENVOYER LE MESSAGE",
            formItemContact: {
                email: "",
                desc: "",
                ref: "",
                author: store.getters.currentItem.author.email
            },

            rules: {
                email: [{
                    required: true,
                    message: "Tapez votre adresse email",
                    trigger: "blur"
                },
                {
                    type: "email",
                    message: "L'adresse email n'est pas valide",
                    trigger: ["blur", "change"]
                }],

                ref: [
                {
                    required: true,
                    message: "Il faut donnez une référence",
                    trigger: "blur"
                },
                {
                    min: 3,
                    message: "Votre référence doit avoir au moins 3 carcts.",
                    trigger: "blur"
                }],

                desc: [
                {
                    required: true,
                    message: "Il faut redacter un message",
                    trigger: "blur"
                },
                {
                    min: 20,
                    message: "Votre message doit avoir au moins 20 carcts.",
                    trigger: "blur"
                }],
            }
            };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.messageButton = "EN COURS..."
          setTimeout(() => {
            axios.post(this.VUE_APP_URL + "item-contact", this.formItemContact)
              .then(res => {
                if (res.data.status !== "error") {
                  this.loading = false;
                  this.messageButton = "ENVOYER LE MESSAGE";
                  this.resetForm(formName); // Clean le form 
                  //Flash message 
                  this.$message({
                    type: 'success',
                    message: "Votre message a été envoyé avec succès :)"
                  });

                }else {
                  this.loading = false;
                  this.messageButton = "ENVOYER LE MESSAGE";
                  this.$message({
                    type: 'warning',
                    message: res.data.message
                  });  
                }
              })
              .catch(error => {
                console.log(error);
              });

          },3000)
        } else {

          this.$message({
            type: 'error',
            message: "Il faut remplir le formulaire"
          });

          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
    }
</script>

<style lang="scss" scoped>
    .el-form {
        padding: 1rem 1.5rem;
        border: 1px solid #EBEEF5;
        border-radius: 5px;

        p {
            font-size: 0.95rem;
            color: var(--gray);
        }
        .el-icon-warning {
            color: var(--warning);
            font-size: 1.1rem;
        }

        .el-button {
            width: 100%;
        }
    }
</style>