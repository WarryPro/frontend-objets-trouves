<template>
  <div>
    <div class="page-items">
      <div>
        <h2 class="title">Resultats de votre recherche</h2>
        <p v-if="!items">Aucun objet trouvé...</p>
        <b-container class="items-container">
            <el-card :body-style="{ padding: '0px' }" v-for="item in items" :key="item.id">
              <img
                :src="VUE_APP_URL + 'uploads/' + item.images[0].name"
                class="image"
              />
              <div style="padding: 20px;">
                <h3 class="card__title">{{item.title}}</h3>
                <div class="bottom">
                  <div class="author">
                    <span class="author__label">Trouvé par</span>
                    <span class="author__nom">{{item.author.firstname}} {{item.author.lastname}}</span>
                  </div>
                  <div class="category">
                    <span class="category__label">Catégorie</span>
                    <span class="category__nom">{{item.category}}</span>
                  </div>
                  <div class="date">
                    <span class="date__label">Trouvé le</span>
                    <span class="date__created">{{ item.created.date | dateFilter }}</span>
                  </div>
                  <b-button variant="dark" :to="{name: 'Item', params: {id : item.id}}">Je suis le propiétaire</b-button>
                </div>
              </div>
            </el-card>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import {Global} from '../../Global'
// Libraries
// import axios from "axios";
import moment from "moment";
// custom components
export default {
  name: "HomeSearchResult",

  mounted() {
    this.items = this.$route.params.homeItemsSearch;
    moment.locale('fr');
  },
  components: {
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
  }
};
</script>

<style lang="scss" scoped>
  

</style>