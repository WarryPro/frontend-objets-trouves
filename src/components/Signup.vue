<template>
  <b-container>
    <el-form :model="signup" status-icon :rules="rules" ref="signup" class="form-user">

      <!-- <h2 class="form-title">{{formTitle}}</h2> -->
      <el-alert v-if="alert.type !== ''"
        :title="alert.title"
        :type="alert.type"
        :closable=false
        show-icon
        >
    </el-alert>

      <el-form-item prop="firstname">
        <el-input v-model="signup.firstname" placeholder="Votre prénom"></el-input>
      </el-form-item>

      <el-form-item prop="lastname">
        <el-input v-model="signup.lastname" placeholder="Votre nom"></el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input v-model="signup.email" placeholder="Votre email"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="signup.password"
          autocomplete="off"
          placeholder="Mot de passe"
        ></el-input>
      </el-form-item>

      <el-form-item prop="checkPassword">
        <el-input
          type="password"
          v-model="signup.checkPassword"
          autocomplete="off"
          placeholder="Confirmez le mot de passe"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-submit">
        <el-button type="primary" :loading="loading" @click="submitForm('signup')">{{messageButton}}</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
import { Global } from "../../Global";
import axios from "axios";

export default {
  name: "Signup",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Il faut tapez votre mot de passe"));
      } else {
        if (this.signup.checkPassword !== "") {
          this.$refs.signup.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Retapez le mot de passe"));
      } else if (value !== this.signup.password) {
        callback(
          new Error("Erreur il n'y a pas un match entre les mots de passe")
        );
      } else {
        callback();
      }
    };
    return {
      VUE_APP_URL: Global.VUE_APP_URL,
      // formTitle: 'Créez votre compte',
      loading: false,
      messageButton: "S'INSCRIRE",
      signup: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        checkPassword: ""
      },
      alert: {
        type: '',
        title: '',
      },

      rules: {
        firstname: [
          {
            required: true,
            message: "Il faut tapez votre prénom",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Votre prénom doit avoir au moins 3 carcts.",
            trigger: "blur"
          }
        ],
        lastname: [
          {
            required: true,
            message: "Il faut tapez votre nom",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Votre nom doit avoir au moins 3 carcts.",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Tapez votre adresse email",
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
            message: "Votre nom doit avoir au moins 6 carcts.",
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
            message: "Votre nom doit avoir au moins 6 carcts.",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          setTimeout(() => {
            this.loading = true;
            this.messageButton = "EN COURS..."
            
            axios.post(this.VUE_APP_URL + "register", this.signup)
              .then(res => {
                console.log(res);

                if (res.data.status !== "error") {
                  this.loading = false;
                  this.messageButton = "COMPTE CRÉÉ";
                  this.alert.type = "success";
                  this.alert.title = res.data.message;
                  this.resetForm(formName);
                  this.close();

                }else {
                  this.loading = false;
                  this.messageButton = "S'INSCRIRE"
                  this.alert.type = "error";
                  this.alert.title = res.data.message;
                  this.close();
                }
              })
              .catch(error => {
                console.log(error);
              });

          },3000)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    close() {
      setTimeout(() => {
        this.alert.type = "";
        this.alert.title = "";
      },3000)
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
}
.form-user {
  max-width: 350px;
  margin: 0 auto;
  padding: 2rem 1rem;
  border: 1px solid #DCDFE6;
  border-radius: 5px;
  .el-alert {
    margin-bottom: 1rem;
  }
  .form-submit {
    margin-bottom: 0;
    .el-button {
      width: 100%;
    }
  }
}
</style>