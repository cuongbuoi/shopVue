<template>
    <div class="sidebar" data-color="orange" data-image="../../../assets/img/sidebar-5.jpg">
        <div class="sidebar-wrapper">
            <div class="logo">
                <a href="https://www.creative-tim.com" class="simple-text logo-mini">
                    Cb
                </a>
                <a href="https://www.creative-tim.com" class="simple-text logo-normal">
                    Admin
                </a>
            </div>
            <ul class="nav h-100">
                <li class="nav-item ">
                    <router-link class="nav-link" to="/admin">
                        <i class="nc-icon nc-chart-pie-35"></i>
                        <p>Dashboard</p>
                    </router-link>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" v-b-toggle.sanpham>
                        <i class="nc-icon nc-app"></i>
                        <p>
                            Sản phẩm
                            <b class="caret"></b>
                        </p>
                    </b-link>
                    <b-collapse id="sanpham" class="mt-2">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{name: 'showBranch'}">
                                    <span class="sidebar-normal">Ngành nghề</span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{name: 'addBranch'}">
                                    <span class="sidebar-normal">Thêm ngành nghề</span>
                                </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{name: 'showCategory'}">
                                    <span class="sidebar-normal">Danh mục sản phẩm</span>
                                </router-link>
                            </li>
                        </ul>
                    </b-collapse>
                </li>
                <li class="nav-item">
                    <b-link class="nav-link" v-b-toggle.nganhnghe>
                        <i class="nc-icon nc-app"></i>
                        <p>
                            Sản phẩm
                            <b class="caret"></b>
                        </p>
                    </b-link>
                    <b-collapse id="nganhnghe" class="mt-2">
                        <ul class="nav">
                            <li class="nav-item ">
                                <router-link class="nav-link" :to="{name: 'showBranch'}">
                                    <span class="sidebar-normal">Ngành nghề</span>
                                </router-link>
                            </li>
                        </ul>
                    </b-collapse>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar'
    }
</script>

<style scoped>

</style>