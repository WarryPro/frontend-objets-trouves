<template>
    <div class="page-single-item" v-if="item !== ''">
        <!-- Composant carousel -->
        <CarouselItem></CarouselItem>


        <b-container class="single-item">
            <b-row>
                <!-- Title block -->
                <b-col sm="12">
                    <h1 class="title--alt" v-text="item.title"></h1>
                    <span class="baseline">
                        <i class="el-icon-time"></i> Trouvé {{item.created.date | dateFR}} | 
                        <i class="el-icon-location-information"></i> à {{item.city }}
                    </span>
                </b-col>
                <!-- Content block -->
                <b-col sm="12" md="8" class="single-item__description">
                    <p v-text="item.description"></p>
                    <div class="author-info">
                        <span class="author" v-text="item.author.firstname"></span>
                        <span class="baseline">
                            <i class="el-icon-time"></i> Publié {{item.created.date | agoDate}}
                        </span>
                    </div>
                    <div class="categories">
                        <el-tag type="info" v-text="item.category"></el-tag>
                    </div>
                </b-col>

                <!-- Formulaire de contact -->
                <!-- item.author.email !== $store.state.user.email -->
                <b-col sm="12" md="4">
                    Formulaire
                </b-col>
            </b-row>

            
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from "moment";
    import { Global } from "../../Global";
    import CarouselItem from './CarouselItem';
    export default {
        name: 'Item',
        components: {
            'CarouselItem': CarouselItem
        },
        mounted() {
            this.getItem();
            moment.locale('fr');
        },
        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                item: '',
            }
        },
        methods: {
            getItem() {
                var id = (this.$route.params.id)?this.$route.params.id: null;
                axios.get(this.VUE_APP_URL + 'items/' +id)
                .then(response => {
                    if(response.status === 200) {
                        this.item = response.data.data;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        filters: {
        agoDate: function(value) {
          return value ? moment(value).fromNow() : "";
        },
        dateFR: function(value) {
          return value ? moment(value).format("DD MMMM YYYY") : "";
        }
    }
    }
</script>

<style lang="scss" scoped>
    .single-item {
        text-align: left;
    }
    .author-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 1rem;
        .author {
            margin-bottom: 0;
        }
    }
</style>