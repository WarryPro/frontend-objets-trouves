<template>
  <div>
      Derniers objets
      <div v-for="item in items.items" :key="item.id">
          {{item.title}}
          {{item.images}}
          {{item.description}}
          {{item.category}}
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LastItemsComponent",

  mounted() {
      this.getItems();
  },

  data() {
    return {
      items: []
    };
  },

  methods: {
    getItems() {
      axios.get("http://127.0.0.1:8000/items").then(res => {
          if(res.data.status === 'success') {
              this.items = res.data;
          }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>