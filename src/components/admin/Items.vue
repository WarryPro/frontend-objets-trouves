<template>
    <div>
    <el-table :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column 
            type="expand">
            <template slot-scope="props">
                <p><span class="baseline">Titre:</span>  {{ props.row.title }}</p>
                <p v-if="props.row.type == 0"><span class="baseline">Type d'objet: </span><el-tag type="success" v-if="props.row.type == 0">Objet trouvé</el-tag></p>
                <p v-if="props.row.type == 1"><span class="baseline">Type d'objet: </span><el-tag type="warning" v-if="props.row.type == 1">Perdu</el-tag></p>
                <p><span class="baseline">Email de l'auteur:</span> {{ props.row.author.email}}</p>
                <p><span class="baseline">Nom:</span> {{ props.row.author.firstname }} {{ props.row.author.lastname}}</p>
                <p><span class="baseline">Rôle:</span> {{ props.row.author.role }}</p>
                <div class="demo-image__preview" v-if="props.row.images[0]">
                <el-image 
                    style="width: 100px; height: 100px"
                    fit="cover"
                    :src="props.row.images[0].url" 
                    :preview-src-list="props.row.srcList">
                </el-image>
                </div>

            </template>
        </el-table-column>

        <el-table-column
            label="Titre"
            prop="title">
        </el-table-column>

        <el-table-column
            label="Auteur"
            prop="author.email">
        </el-table-column>

        <el-table-column
            label="Actions"
            align="right">

            <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Recherche par titre">
                    <i slot="prefix" :class="'el-input__icon el-icon-search ' + scope"></i>
                </el-input>
            </template>

            <template slot-scope="scope">
                <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-pagination
          layout="prev, pager, next"
          :background="true"
          :hide-on-single-page="true"
          @current-change="getItems"
          :current-page="items.current_page"
          :page-size="items.items_per_page"
          :total="items.total_items_count">
        </el-pagination>
    </div>
</template>

<script>
    import {Global} from '../../../Global';
    import store from '../../store';
    // Libraries
    import axios from "axios";
    import moment from "moment";
    export default {
        name: 'Items',

        mounted() {
        moment.locale('fr');
        this.getItems();
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                items: [],
                tableData: [],
                search: '',
            }
        },
        methods: {

            getItems(page = 1) {
                axios.get(this.VUE_APP_URL + "items/?page="+page, {
                    headers: {
                        'Authorization' : store.getters.userToken
                    }
                }).then(res => {
                    if (res.data.status === "success") {
                        this.items = res.data;
                        this.tableData = res.data.items;
                        // Get the images from item
                        this.tableData.forEach(item => {
                            item.images.forEach(image => {
                                Object.assign(item, {srcList: []})
                                Object.assign(image, {url: this.VUE_APP_URL + 'uploads/'+ image.name})
                                item.srcList.push(this.VUE_APP_URL + 'uploads/'+ image.name);
                                image.name = this.VUE_APP_URL + 'uploads/'+ image.name;
                            })
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },

            handleDelete(index, row) {
                console.log(index, row.id)
                
                this.$confirm('Vous êtes sur de vouloir supprimer cet objet?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'

                }).then(() => {
                    let token = store.getters.userToken; 
                    let isAdmin = store.getters.isAdmin;

                    if(row.id !== null && token !== null) {
                        if(isAdmin)
                        axios.delete(this.VUE_APP_URL + 'items/delete/'+row.id, {
                            headers: {
                                "Authorization": store.getters.userToken
                            }
                        })
                        .then(res => {
                            this.openFullScreen();
                            setTimeout(() => {
                                if (res.data.status !== "error") {
                                    this.$message({
                                        type: 'success',
                                        message: res.data.message
                                    });
                                    this.getItems(this.items.current_page) //Reload items 
                                }else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.message
                                    }); 
                                }
                            }, 1500)
                        })
                        .catch(error => {
                            this.$message({
                                    type: 'error',
                                    message: "Une erreur est survenue, réessayez plus tard"
                            }); 
                            console.log(error);
                        })
                    }
                });
            },

            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'white'
                });
                setTimeout(() => {
                    loading.close();
                }, 500);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .el-icon-search {
        margin-left: 5px;
    }
</style>