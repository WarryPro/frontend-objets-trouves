<template>
    <div>
    <el-table class="table-users" :data="tableData.filter(data => !search || data.firstname.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column 
            type="expand">
            <template slot-scope="props">
                <p><span class="baseline">Prénom:</span>  {{ props.row.firstname }}</p>
                <p><span class="baseline">Nom de famille:</span> {{ props.row.lastname }}</p>
                <p><span class="baseline">Email:</span> {{ props.row.email }}</p>
                <p><span class="baseline">Rôle:</span> {{ props.row.role }}</p>
            </template>
        </el-table-column>

        <el-table-column
            label="Prénom"
            prop="firstname">
        </el-table-column>

        <el-table-column
            label="Nom"
            prop="lastname">
        </el-table-column>

        <el-table-column
            label="Actions"
            align="right">

            <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="Recherche par prénom">
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
          @current-change="getUsers"
          :page-size="users.users_per_page"
          :total="users.total_users_count">
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
        name: 'Users',

        mounted() {
        moment.locale('fr');
        this.getUsers();
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                users: [],
                tableData: [],
                search: '',
            }
        },
        methods: {

            getUsers(page = 1) {
                axios.get(this.VUE_APP_URL + "admin/users/?page="+page, {
                    headers: {
                        'Authorization' : store.getters.userToken
                    }
                }).then(res => {
                    if (res.data.status === "success") {
                        this.users = res.data;
                        this.tableData = res.data.users;
                        this.currentPage = this.users.current_page;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },

            handleEdit(index, row) {
                console.log(index, row);
                this.openFullScreen(row);
                
            },

            handleDelete(index, row) {
                console.log(index, row.id)
                let currentUser = store.state.user.id;
                
                this.$confirm((row.id === currentUser)? "Vous voulez supprimer votre compte?" : 'Vous êtes sur de vouloir supprimer cet utilisateur?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'

                }).then(() => {
                    let token = store.getters.userToken; 
                    let isAdmin = store.getters.isAdmin;

                    if(row.id !== null && token !== null) {
                        if(isAdmin)
                        axios.delete(this.VUE_APP_URL + 'admin/users/delete/'+row.id, {
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
                                        message: "L'utilisateur a été supprimé avec succès"
                                    });
                                    this.$router.push('/admin');
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
                    store.commit('showAdminUseredit', data);
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