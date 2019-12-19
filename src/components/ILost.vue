<template>
  <div>
    <el-divider></el-divider>
    <FormItemLost></FormItemLost>
    <el-divider></el-divider>
  </div>
</template>

<script>
import FormItemLost from "./FormItemLost";
export default {
  name: "ILost",
  components: {
    FormItemLost: FormItemLost
  },
  mounted() {
    this.openFullScreen();
  },
  methods: {
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "white"
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>