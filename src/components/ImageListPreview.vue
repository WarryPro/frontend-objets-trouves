<template>
    <div class="demo-image__preview" v-if="url !== ''">
        <el-image
            style="width: 150px; height: 150px"
            :src="url" 
            alt="toto"
            :preview-src-list="srcList">
        </el-image>
    </div>
</template>

<script>
    import store from '../store';
    import { Global } from "../../Global";
    export default {
        name: 'ImageListPreview',
        mounted() {
            this.getImages()
        },

        data() {
            return {
                VUE_APP_URL: Global.VUE_APP_URL,
                url: '',
                srcList: []
            }
        },
        methods: {
            
            getImages() {
                let images = store.getters.currentItem;
                images.images.forEach(image => {
                    this.srcList.push(this.VUE_APP_URL + 'uploads/'+ image)
                    this.url = this.srcList[0]
                }); 
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>