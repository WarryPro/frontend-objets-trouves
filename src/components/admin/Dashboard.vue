<template>
    <div>
        <el-divider></el-divider>
        <b-container>
            <!-- Title et intro -->
            <div>
                <h2 class="title">Dashboard d'administration</h2>  
                <p>Gérez les utilisateurs, objets ou catégories depuis le dasboard d'administration</p>
            </div>
            <!-- TABS de gestion -->
            <DashboardTabs></DashboardTabs>
        </b-container>
    </div>
</template>

<script>
    import DashboardTabs from './DashboardTabs'
    export default {
        name: 'AdminDashboard',
        components: {
            'DashboardTabs' : DashboardTabs
        },
        mounted() {
            this.openFullScreen();
        },
        methods: {
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'white'
                });
                setTimeout(() => {
                    loading.close();
                }, 1000);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>