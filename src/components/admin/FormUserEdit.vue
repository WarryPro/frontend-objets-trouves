<template>
  <b-container>
    <el-form :model="userEdit" status-icon :rules="rules" ref="userEdit" class="form-user-edit">

      <el-form-item prop="firstname">
        <el-input v-model="userEdit.firstname" placeholder="Votre prénom"></el-input>
      </el-form-item>

      <el-form-item prop="lastname">
        <el-input v-model="userEdit.lastname" placeholder="Votre nom"></el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="userEdit.email" placeholder="Votre email"></el-input>
      </el-form-item>

      <el-form-item prop="role">
        <el-select v-model="userEdit.role" placeholder="Séléctionnez un rôle">
          <el-option
            v-for="role in roles"
            :key="role.value"
            :label="role.label"
            :value="role.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="userEdit.password"
          autocomplete="off"
          placeholder="Mot de passe"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <el-input
          type="password"
          v-model="userEdit.checkPassword"
          autocomplete="off"
          placeholder="Confirmez le mot de passe"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-submit">
        <el-button type="primary" :loading="loading" @click="submitForm('userEdit')">{{messageButton}}</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
import { Global } from "../../../Global";
import axios from "axios";

export default {
  name: "userEdit",

  mounted() {
    this.getUser();
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Il faut tapez le mot de passe"));
      } else {
        if (this.userEdit.checkPassword !== "") {
          this.$refs.userEdit.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Retapez le mot de passe"));
      } else if (value !== this.userEdit.password) {
        callback(
          new Error("Erreur il n'y a pas un match entre les mots de passe")
        );
      } else {
        callback();
      }
    };
    return {
      VUE_APP_URL: Global.VUE_APP_URL,
      loading: false,
      messageButton: "METTRE A JOUR",
      userEdit: {
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
        checkPassword: ""
      },
      roles: [
        { value: 'user', label: 'Utilisateur'},
        { value: 'admin', label: 'Admin'},
      ],

      rules: {
        firstname: [
          {
            required: true,
            message: "Il faut tapez le prénom",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Le prénom doit avoir au moins 3 carcts.",
            trigger: "blur"
          }
        ],
        lastname: [
          {
            required: true,
            message: "Il faut tapez le nom",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Le nom doit avoir au moins 3 carcts.",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Tapez l'adresse email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "L'adresse email n'est pas valide",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { 
            validator: validatePass, 
            trigger: "blur",
          },
          {
            min: 6,
            message: "Le nom doit avoir au moins 6 carcts.",
            trigger: "blur"
          }
        ],
        checkPassword: [
          { 
            validator: validatePass2, 
            trigger: "blur",
          },
          {
            min: 6,
            message: "Le nom doit avoir au moins 6 carcts.",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    getUser() {
      this.userEdit = this.$store.state.selectedUserEdit;
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            this.loading = true;
            this.messageButton = "EN COURS..."
            
            axios.put(this.VUE_APP_URL + "admin/users/edit/"+ this.userEdit.id, this.userEdit, {
              headers: {
                "Authorization": this.$store.getters.userToken
              }
            })
            .then(res => {
              if (res.data.status !== "error") {
                this.loading = false;
                this.messageButton = "METTRE A JOUR";
                this.$store.state.adminUserEdit = false;
                this.$store.state.selectedUserEdit = null;
                this.$message({
                  type: 'success',
                  message: res.data.message
                });
              }else {
                  this.loading = false;
                  this.messageButton = "METTRE A JOUR";
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

          },3000)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
.form-user-edit {
  max-width: 350px;
  margin: 0 auto;
  padding: 2rem 1rem;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  .form-submit {
    margin-bottom: 0;
    .el-button {
      width: 100%;
    }
  }
}
</style>