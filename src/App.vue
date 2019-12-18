<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>

    <ModalFormSignup v-if="$store.state.signupVisible"></ModalFormSignup>
    <ModalFormLogin v-if="$store.state.loginVisible"></ModalFormLogin>
  </div>
</template>

<script>
import HeaderComponent from './components/header/HeaderComponent'
import ModalFormSignup from './components/ModalFormSignup'
import ModalFormLogin from './components/ModalFormLogin'

export default {
  name: 'app',
  components: {
    // HelloWorld
    HeaderComponent,
    ModalFormSignup,
    ModalFormLogin,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
