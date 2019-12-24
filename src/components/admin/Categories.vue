<template>
    <div>
        <ModalCategoryCreate></ModalCategoryCreate>
        <ModalCategoryEdit v-if="$store.state.editCategory"></ModalCategoryEdit>
        <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
            <el-table-column 
                type="expand">
                <template slot-scope="props">
                    <p><span class="baseline">ID :</span> {{ props.row.id}}</p>
                    <p><span class="baseline">Catégorie:</span>  {{ props.row.name }}</p>
                    <p><span class="baseline">Nombre d'objets:</span> {{ props.row.totalItems }}</p>
                </template>
            </el-table-column>

            <el-table-column>
                
            </el-table-column>
            <el-table-column
                label="ID"
                prop="id">
            </el-table-column>

            <el-table-column
                label="Catégorie"
                prop="name">
            </el-table-column>

            <el-table-column
                label="Actions"
                align="right">

                <template slot="header" slot-scope="scope">
                    <el-input
                        v-model="search"
                        size="mini"
                        placeholder="Recherche par catégorie">
                        <i slot="prefix" :class="'el-input__icon el-icon-search ' + scope"></i>
                    </el-input>
                </template>

                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button icon="el-icon-delete" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :background="true"
          :hide-on-single-page="true"
          @current-change="getCategories"
          :page-size="10"
          :total="totalCategories">
        </el-pagination>
    </div>
</template>

<script>
    import {Global} from '../../../Global';
    import store from '../../store';
    // Libraries
    import axios from "axios";
    import moment from "moment";

    // Custom components
    import ModalCategoryCreate from './ModalFormCategoryCreate';
    import ModalCategoryEdit from './ModalCategoryEdit';

    export default {
        name: 'Categories',
        components: {
            'ModalCategoryCreate': ModalCategoryCreate,
            'ModalCategoryEdit': ModalCategoryEdit,
        },
        mounted() {
        moment.locale('fr');
        this.getCategories();
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                categories: [],
                totalCategories: 1,
                tableData: [],
                search: '',
            }
        },
        methods: {

            getCategories() {
                axios.get(this.VUE_APP_URL+"categories")
                .then(res => {
                    if (res.status === 200) {
                        this.categories = res.data;
                        this.categories.forEach(category => {
                            Object.assign(category, {totalItems: category.items.length})
                        });
                        this.tableData = this.categories;
                        this.totalCategories = res.data.length;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },

            handleEdit(index, row) {
                // console.log('category index: ', index, 'category:', row)
                store.commit('setCurrentCategory', row)
            },

            handleDelete(index, row) {
                console.log(index, row)
                
                this.$confirm('Vous êtes sur de vouloir supprimer cette catégorie?', 'Supprimer catégorie', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'

                }).then(() => {
                    let token = store.getters.userToken; 
                    let isAdmin = store.getters.isAdmin;

                    if(row.id !== null && token !== null) {
                        if(isAdmin)
                        axios.delete(this.VUE_APP_URL + 'admin/categories/delete/'+row.id, {
                            headers: {
                                "Authorization": store.getters.userToken
                            }
                        })
                        .then(res => {
                            this.openFullScreen(res.data);
                            setTimeout(() => {
                                if (res.data.status !== "error") {
                                    this.$message({
                                        type: 'success',
                                        message: "La catégorie a été supprimé avec succès"
                                    });
                                    this.getCategories();
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

            openFullScreen(data) {
                const loading = this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'white'
                });
                setTimeout(() => {
                    loading.close();
                    console.log(data)
                }, 1000);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .el-icon-search {
        margin-left: 5px;
    }
</style>