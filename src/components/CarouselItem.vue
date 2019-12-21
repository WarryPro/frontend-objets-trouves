<template>
    <el-carousel :interval="4000" arrow="always" v-if="$mq  === 'mobile'">
        <el-carousel-item v-for="image in images" :key="image.id">
            <img :src="VUE_APP_URL + 'uploads/' + image.name" alt="image" v-if="$store.getters.currentItem.images.length > 0">
            <img :src="image" alt="image" v-else>
        </el-carousel-item>
    </el-carousel>

    <el-carousel v-else :interval="4000" arrow="always" type="card">
        <el-carousel-item v-for="image in images" :key="image.id">
            <img :src="VUE_APP_URL + 'uploads/' + image.name" alt="image" v-if="$store.getters.currentItem.images.length > 0">
            <img :src="image" alt="image" v-else>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import store from '../store';
import {Global} from '../../Global'
export default {
    name: 'CarouselItem', 
    mounted() {
        if(store.getters.currentItem.images.length > 0) {
            this.images = store.getters.currentItem.images;
        }
    },

    data() {
        return {
            VUE_APP_URL: Global.VUE_APP_URL,
            typeCarousel: 'card',
            images: []
            
            // images: [
            //     'https://images.pexels.com/photos/346793/pexels-photo-346793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 
            //     'https://images.pexels.com/photos/346805/pexels-photo-346805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            //     'https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            //     'https://images.pexels.com/photos/2095953/pexels-photo-2095953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260']
        }
    }
}

</script>

<style lang="scss" scoped>

    .el-carousel__container {
        height: 40vh;
        margin-top: 1rem;
    }
    .el-carousel__item {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
</style>