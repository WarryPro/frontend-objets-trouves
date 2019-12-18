<template>
    <div class="actions">
        <el-button type="primary" icon="el-icon-edit" @click="edit" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="supprimer" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
    </div>
</template>

<script>
    import Axios from 'axios';
    import store from '../store';
    import {Global} from '../../Global';
    export default {
        name: 'ActionButtons',

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                fullscreenLoading: false, // Animation loading full ecran 
                active: false // true pour afficher le form éditer
            }
        },

        methods: {
            supprimer() {
                this.$confirm('Vous êtes sur de vouloir supprimer cet objet?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    let itemId = this.$route.params.id; 
                    let token = store.getters.userToken; 
                    let isAdmin = store.getters.isAdmin;
                    let currentAutheur = store.getters.currentItem.author.email; 
                    let userLogged = store.state.user.email;

                    if(itemId !== null && token !== null) {
                        if(isAdmin || userLogged === currentAutheur)
                        Axios.delete(this.VUE_APP_URL + 'items/delete/'+itemId, {
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
                                        message: "L'objet a été supprimé avec succès"
                                    });
                                    this.$router.push('/');
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

            edit() {
                console.log('edit')
                this.openFullScreen()
            },


            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 2000);
            },
        }
        
    }
</script>

<style lang="scss" scoped>

</style>