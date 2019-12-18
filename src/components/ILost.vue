<template>
    <div>
        <el-divider></el-divider>
        <FormItemLost></FormItemLost>
        <el-divider></el-divider>
    </div>
</template>

<script>
    import FormItemLost from './FormItemLost';
    export default {
        name: 'ILost',
        components: {
            'FormItemLost': FormItemLost,
        }
    }
</script>

<style lang="scss" scoped>

</style>