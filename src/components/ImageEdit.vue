<template>
    <div class="images-container col-sm-12">
        <h3>Supprimez ou ajoutez des images</h3>
        <p>Vous pouvez visionner, supprimer ou ajouter rapidement les images</p>
        <el-upload
            :action="VUE_APP_URL + 'upload'"
            drag
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :file-list="itemImages"
            :thumbnail-mode="true"
            :on-remove="handleRemove"
            fit="cover">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" v-for="image in itemImages" :key="image.id">
            <img width="100%" :src="image.url">
        </el-dialog>
    </div>
</template>

<script>
    import {Global} from '../../Global';
    import axios from 'axios';
    import store from '../store';

    export default {
        name: 'ImageEdit',
        mounted() {
            this.getItemImages();
        },
        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                dialogVisible: false,
                disabled: false,
                itemImages: [],
            };
        },
        methods: {
            getItemImages() {
                let currentItemImages = store.getters.currentItem.images;
                currentItemImages.forEach(image => {
                    Object.assign(image, {url: this.VUE_APP_URL+'uploads/'+ image.name})
                    this.itemImages.push(image)
                });
                console.log(this.itemImages)
                
            },
            handleRemove(file) {
                console.log(file.id)
                axios.delete(this.VUE_APP_URL+'images/delete/'+file.id, { headers: {
                    "Authorization": store.getters.userToken
                }})
            },

            handlePictureCardPreview(file) {
                this.itemImages.url = file.url;
                this.dialogVisible = true;
            },
            // uploadSuccess(response, file, fileList) {
            //     console.log(response, file, fileList)
            //     let newImage = [{
            //         id: response.data.id,
            //         name: response.data.name,
            //         url: response.data.url
            //     }]
            //     this.itemImages.push(newImage);

            // }
        }
    }
</script>

<style lang="scss" scoped>
    h3, p {
        text-align: center;
    }
    p {
        font-weight: 300;
        font-size: 0.95rem;
        color: var(--gray);
    }
</style>