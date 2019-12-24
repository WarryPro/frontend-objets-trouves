
<template>
    <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane label="Utilisateurs">
            <Users></Users>
        </el-tab-pane>
        
        <el-tab-pane label="Objets">
            Objets
        </el-tab-pane>

        <el-tab-pane label="Catégories">
            <Categories></Categories>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import Users from './Users';
import Categories from './Categories';

    export default {
        name: "DashboardTabs",
        components: {
            'Users' : Users,
            'Categories': Categories,
        },
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>