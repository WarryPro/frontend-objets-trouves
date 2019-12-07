<template>
  <b-container>
    <el-form :model="login" status-icon :rules="rules" ref="login" class="form-user">
      <el-alert v-if="alert.type !== ''"
        :title="alert.title"
        :type="alert.type"
        :closable=false
        show-icon
        >
    </el-alert>

      <el-form-item prop="email">
        <el-input v-model="login.email" placeholder="Votre email"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="login.password"
          autocomplete="off"
          placeholder="Mot de passe"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-submit">
        <el-button type="primary" :loading="loading" @click="submitForm('login')">{{messageButton}}</el-button>
      </el-form-item>
    </el-form>
  </b-container>
</template>

<script>
import { Global } from "../../Global";
import axios from "axios";
import store from '../store'

export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("Il faut tapez votre mot de passe"));
        }
        callback();
    };
    
    return {
      VUE_APP_URL: Global.VUE_APP_URL,

      loading: false,
      messageButton: "SE CONNECTER",
      login: {
        email: "",
        password: "",
        getToken: true
      },
      alert: {
        type: '',
        title: '',
      },

      rules: {
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
            
            axios.post(this.VUE_APP_URL + "login", this.login)
              .then(res => {
                console.log(res);

                if (res.data.status !== "error") {
                  this.loading = false;
                  this.messageButton = "CONNECTÉ";
                  this.alert.type = "success";
                  this.alert.title = res.data.message;
                  this.resetForm(formName);
                  this.close();
                  // hide form login
                  setTimeout(() => {
                      store.state.loginVisible = false
                  }, 3000)

                }else {
                  this.loading = false;
                  this.messageButton = "SE CONNECTER"
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
      },4000)
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