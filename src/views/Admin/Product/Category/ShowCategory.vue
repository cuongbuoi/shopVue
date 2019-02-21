<template>
    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header ">
                    <h4 class="card-title">Chọn ngành nghề</h4>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <select v-model="branchId" class="form-control" @change="getCategory">
                            <option value="" selected>Chọn ngành nghề</option>
                            <option v-for="item in branch" :key="item.id" :value="item.id">
                                {{item.branch_name}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card" v-if="branchId != ''">
                <div class="card-header ">
                    <h4 class="card-title">Tất cả danh mục</h4>
                </div>
                <div class="card-body">
                    <table class="table bale-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên danh mục</th>
                            <th>Slug</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in data" :key="item.id">
                            <td>
                                {{item.id}}
                            </td>
                            <td>
                                {{item.type_name}}
                            </td>
                            <td>
                                {{item.type_slug}}
                            </td>
                            <td>
                                <img style="width: 30px;" :src="item.type_avatar"
                                     :alt="item.type_name">
                            </td>
                            <td>
                                <button class="btn btn-primary" @click="editCategory(item.id,index)">
                                    <i class="nc-icon nc-ruler-pencil icon-bold"></i>
                                </button>
                                <button class="btn btn-danger" @click="deleteCategory(item.id,index)">
                                    <i class="nc-icon nc-simple-remove icon-bold"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <b-modal ref="modalEditCategory" hide-footer title="Thông tin danh mục">
            <div class="d-block">
                <form action="">
                    <div class="form-group">
                        <label>Tên danh mục</label>
                        <b-form-input
                                id="ten-nganh-nghe"
                                trim
                                type="text"
                                v-model="categoryInfo.type_name"
                                :state="changeToSlug"/>
                    </div>
                    <div class="form-group">
                        <label>Slug danh mục</label>
                        <b-form-input
                                id="slug-nganh-nghe"
                                type="text"
                                v-model="categoryInfo.type_slug"
                                readonly/>
                    </div>
                    <div class="form-group">
                        <label>Ảnh danh mục</label>
                        <b-form-file
                                v-model="categoryInfo.type_avatar"
                                :state="Boolean(categoryInfo.type_avatar)"
                                placeholder="Chọn ảnh ngành nghề..."
                                drop-placeholder="Kéo ảnh vào..."
                                accept=".jpg, .png, .gif"
                        />
                    </div>
                </form>
            </div>
            <div class="text-right">
                <b-button class="mt-3" variant="outline-danger" @click="hideModal">Đóng</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: 'ShowCategory',
        data() {
            return {
                branch: [],
                branchId: '',
                data: [],
                categoryInfo: {
                    type_name: '',
                    type_slug: '',
                    type_avatar: '',
                    type_state: '',
                    branch_id: ''
                },
            }
        },
        mounted() {
            this.getBranch();
        },
        computed: {
            changeToSlug() {
                let vm = this;
                vm.categoryInfo.type_slug = vm.$Helper.changeToSlug(vm.categoryInfo.type_slug);
            }
        },
        methods: {
            getBranch() {
                let vm = this;
                vm.$Http.get('admin/branch').then(response => {
                    vm.branch = response.data;
                });

            },
            getCategory() {
                let vm = this;
                vm.$Http.get('admin/type?branch_id='+vm.branchId).then(response => {
                    vm.data = response.data.data;
                });

            },
            editCategory(id,index){
                let vm = this;
                vm.$Http.get('admin/type/'+id).then(response => {
                    vm.categoryInfo = response.data;
                });
                vm.$refs.modalEditCategory.show();
            },
            saveCategory(){

            },
            deleteCategory(id,index){
                let vm = this;
                vm.$swal({
                    title: 'Bạn muốn xóa?',
                    type: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý'
                }).then((del)=>{
                    if(del){
                        vm.$Http.delete('admin/type/'+id).then(response=>{
                            vm.data.splice(index,1);
                        }).catch(err=>{
                            vm.$swal({
                                text: err,
                                type: 'error',
                            })
                        })
                    }
                })
            },
            hideModal(){
                this.$refs.modalEditCategory.hide();
            }
        }
    }
</script>

<style scoped>

</style>