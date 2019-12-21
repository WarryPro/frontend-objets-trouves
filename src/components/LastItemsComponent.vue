<template>
  <div>
    <el-divider></el-divider>
    <div class="page-items">
      <Filters></Filters>
      <div>
        <h2 class="title">Derniers objets trouvés et rapportés</h2>
        <b-container class="items-container">
          <el-card :body-style="{ padding: '0px' }" v-for="item in items.items" :key="item.id">
            <img
              v-if="item.images[0]"
              :src="VUE_APP_URL + 'uploads/' + item.images[0].name"
              class="image"
            />
            <img
              v-else
              src="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg"
              class="image"
            />
            <div style="padding: 20px;">
              <h3 class="card__title">{{item.title}}</h3>
              <div class="bottom">
                <div class="author">
                  <span class="author__label" v-if="item.type == 0">Trouvé par</span>
                  <span class="author__label" v-else>Propriétaire</span>
                  <span class="author__nom">{{item.author.firstname}} {{item.author.lastname}}</span>
                </div>
                <div class="category">
                  <span class="category__label">Catégorie</span>
                  <span class="category__nom">{{item.category}}</span>
                </div>
                <div class="date">
                  <span class="date__label" v-if="item.type == 0">Trouvé le</span>
                  <span class="date__label" v-else>Perdu le</span>
                  <span class="date__created">{{ item.created.date | dateFilter }}</span>
                </div>
                <b-button
                  variant="dark"
                  :to="{name: 'Item', params: {id : item.id}}"
                >Je suis le propiétaire</b-button>
              </div>
            </div>
          </el-card>
        </b-container>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { Global } from "../../Global";
// Libraries
import axios from "axios";
import moment from "moment";
// custom components
import Filters from "./Filters";
export default {
  name: "LastItemsComponent",

  mounted() {
    this.openFullScreen();
    this.getItems();
    moment.locale("fr");
  },
  components: {
    Filters: Filters
  },

  data() {
    return {
      VUE_APP_URL: Global.VUE_APP_URL,
      items: []
    };
  },

  filters: {
    dateFilter: function(value) {
      return value ? moment(value).format("DD MMMM YYYY") : "";
    }
  },

  methods: {
    getItems() {
      axios.get(this.VUE_APP_URL + "items").then(res => {
        if (res.data.status === "success") {
          this.items = res.data;
        }
      });
    },

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