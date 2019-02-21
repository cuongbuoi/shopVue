<template>
    <div class="wrapper">
        <Sidebar></Sidebar>
        <div class="main-panel">
            <Navbar></Navbar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navbar from '../../components/Admin/Navbar'
    import Sidebar from '../../components/Admin/Sidebar'
    export default {
        name: 'AdminMasterLayout',
        components:{
            Navbar,
            Sidebar
        }
    }
</script>

<style scoped>
    @import "../../assets/admin/css/bootstrap.min.css";
    @import "../../assets/admin/css/demo.css";
    @import "../../assets/admin/css/light-bootstrap-dashboard.css";
</style>