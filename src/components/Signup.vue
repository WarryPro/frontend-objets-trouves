<template>
  <b-container>
    <h2>Créez votre compte</h2>
    <el-form :model="signup" status-icon :rules="rules" ref="signup" class="form-user">
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('signup')">CONTINUE</el-button>
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
      signup: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        checkPassword: ""
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
            message: "Please input email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(this.VUE_APP_URL + "register", this.signup)
            .then(res => {
              console.log(res);
              if (res.data.status !== "error") {
                this.resetForm(formName);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.form-user {
  max-width: 350px;
  margin: 0 auto;

  .el-button {
    width: 100%;
  }
}
</style>