<template>
  <div>
    <div>
      <aside>filtres</aside>
      <div>
        <h2>Derniers objets trouvés et rapportés</h2>
        <b-container class="items-container">
            <el-card :body-style="{ padding: '0px' }" v-for="item in items.items" :key="item.id">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
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
                  <b-button variant="dark" :to="{name: 'Item', params: {id : item.id}}" replace>{{item.id}}</b-button>
                </div>
              </div>
            </el-card>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "LastItemsComponent",

  mounted() {
    this.getItems();
    moment.locale('fr');
  },

  data() {
    return {
      items: []
    };
  },

  filters: {
    dateFilter: function(value) {
      return value ? moment(value).format("dddd, DD MMMM YYYY") : "";
    }
  },

  methods: {
    getItems() {
      axios.get("http://127.0.0.1:8000/items").then(res => {
        if (res.data.status === "success") {
          this.items = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .items-container {
    display: grid;
    grid-template-columns: repeat(3, calc(100% / 3));
    grid-gap: 3rem;
  }
  .image {
    width: 100%;
    display: block;
    max-height: 260px;
    object-fit: cover;
  }
  .card__title {
    color: var(--dark);
    font-size: 1rem;
  }
  
  .author, .category, .date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    &__label {
      color: #999;
    }
    &__label, &__created {
      font-size: 13px;
    }
    &__nom {
      text-transform: uppercase;
      color: var(--gray);
      font-size: 12px;
    }
  }
  
  .category__nom, .date__created {
    text-transform: initial;
    color: var(--gray);
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    .btn {
      width: 100%;
    }
  }

</style>