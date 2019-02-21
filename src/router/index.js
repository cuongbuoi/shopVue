import Vue from 'vue'
import Router from 'vue-router'
import MasterLayout from '../views/Client/MasterLayout'
import AdminMasterLayout from "../views/Admin/AdminMasterLayout";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: MasterLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: ()=>{
                        return import('../views/Client/Home/Home.vue')
                    }
                }
            ]
        },
        {
            path: '/admin',
            component: AdminMasterLayout,
            children: [
                {
                    path: 'product/show-branch',
                    name: 'showBranch',
                    component: ()=>{
                        return import('../views/Admin/Product/Branch/ShowBranch.vue')
                    }
                },
                {
                    path: 'product/add-branch',
                    name: 'addBranch',
                    component: ()=>{
                        return import('../views/Admin/Product/Branch/AddBranch.vue')
                    }
                },
                {
                    path: 'product/edit-branch/:id',
                    name: 'editBranch',
                    component: ()=>{
                        return import('../views/Admin/Product/Branch/EditBranch.vue')
                    }
                },
                {
                    path: 'product/show-category',
                    name: 'showCategory',
                    component: ()=>{
                        return import('../views/Admin/Product/Category/ShowCategory.vue')
                    }
                }
            ]
        }
    ]
})
