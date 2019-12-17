<template>
    <div>
        <el-divider></el-divider>
        <FormItemFound></FormItemFound>
        <el-divider></el-divider>
    </div>
</template>

<script>
    import FormItemFound from './FormItemFound';

    export default {
        name: 'IFound',
        components: {
            'FormItemFound': FormItemFound,
        }
    }
</script>

<style lang="scss" scoped>

</style>