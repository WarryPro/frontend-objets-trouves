<template>
    <div class="page-single-item" v-if="item !== ''">
        <!-- Composant carousel -->
        <CarouselItem></CarouselItem>


        <b-container class="single-item">
            <b-row>
                <!-- Title block -->
                <b-col sm="12">
                    <h1 class="title--alt" v-text="item.title"></h1>
                    <span class="baseline" v-if="item.type == 0">
                        <i class="el-icon-time"></i> Trouvé {{item.created.date | dateFR}} | 
                        <i class="el-icon-location-information"></i> à {{item.city }}
                    </span>
                    <span class="baseline" v-else>
                        <i class="el-icon-time"></i> Perdu {{item.created.date | dateFR}} | 
                        <i class="el-icon-location-information"></i> à {{item.city }}
                    </span>
                </b-col>
                <!-- Content block -->
                <b-col sm="12" lg="8" class="single-item__description">
                    <!-- Content -->
                    <p v-text="item.description"></p>
                    <!-- Images List -->
                    <ImageList></ImageList>
                    <!-- Author -->
                    <div class="author-info">
                        <span class="author" v-text="item.author.firstname"></span>
                        <span class="baseline">
                            <i class="el-icon-time"></i> Publié {{item.created.date | agoDate}}
                        </span>
                    </div>
                    <!-- Category tags -->
                    <div class="categories">
                        <el-tag type="info" v-text="item.category"></el-tag>
                    </div>
                    <!-- Action boutons pour editer/supprimer l'objet ou les images -->
                    <div class="actions" v-if="$store.getters.loggedIn && item.author.email === $store.state.user.email">
                        <ActionButtons></ActionButtons>
                    </div>
                    <el-divider></el-divider>

                    <div v-if="$store.getters.loggedIn && item.author.email === $store.state.user.email && $store.state.editActive">
                        <FormItemEdit></FormItemEdit>
                        
                    </div>
                </b-col>

                <!-- Formulaire de contact -->
                <!-- item.author.email !== $store.state.user.email -->
                <b-col sm="12" md="6" lg="4" v-if="$store.getters.loggedIn && item.author.email !== $store.state.user.email">
                    <FormItemContact></FormItemContact>
                </b-col>
                <b-col sm="12" lg="4" v-else-if="$store.getters.loggedIn && item.author.email === $store.state.user.email">
                    <div class="item-images-container">
                        <div>
                            <ImageEdit></ImageEdit>
                        </div>
                    </div>
                </b-col>
                <b-col sm="12" md="6" lg="4" v-else>
                    <Login></Login>
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
    import Login from './Login';
    import ImageList from './ImageListPreview';
    import FormItemContact from './FormItemContact';
    import FormItemEdit from './FormItemEdit';
    import ActionButtons from './ActionButtons';
    import ImageEdit from './ImageEdit';

    export default {
        name: 'Item',
        components: {
            'Login': Login,
            'CarouselItem': CarouselItem,
            'FormItemContact': FormItemContact,
            'FormItemEdit': FormItemEdit,
            'ImageList': ImageList,
            'ActionButtons': ActionButtons,
            'ImageEdit': ImageEdit
        },
        mounted() {
            this.openFullScreen();
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
                    if(response.data.status !== "error") {
                        this.item = response.data.data;
                        this.$store.commit('getCurrentItem', response.data.data);
                    }else {
                        this.openFullScreen()
                        this.open();
                        this.$router.push('/');
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            },

            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'white'
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            },
            
            open() {
                this.$message.error("Ouups, cet objet n'existe pas.");
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
    .actions {
        display: flex;
        justify-content: flex-end;
    }
</style>