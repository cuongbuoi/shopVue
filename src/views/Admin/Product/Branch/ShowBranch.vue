<template>
    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header ">
                    <h4 class="card-title">Tất cả ngành nghề</h4>
                </div>
                <div class="card-body">
                    <table class="table bale-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên ngành nghề</th>
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
                                    {{item.branch_name}}
                                </td>
                                <td>
                                    {{item.branch_slug}}
                                </td>
                                <td>
                                    <img style="width: 30px;" :src="$BaseUrlApi + 'storage/' + item.branch_avatar" :alt="item.branch_name">
                                </td>
                                <td>
                                    <button class="btn btn-primary" @click="editBranch(item.id,index)">
                                        <i class="nc-icon nc-ruler-pencil icon-bold"></i>
                                    </button>
                                    <button class="btn btn-danger" @click="deleteBranch(item.id,index)">
                                        <i class="nc-icon nc-simple-remove icon-bold"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--<vuetable ref="vuetable"-->
                              <!--:api-mode="false"-->
                              <!--:fields="fields"-->
                              <!--:per-page="perPage"-->
                              <!--:sort-order="sortOrder"-->
                              <!--:data-manager="getBranch"-->
                    <!--&gt;-->
                        <!--<div slot="actions" slot-scope="props">-->
                            <!--<button class="btn btn-primary" @click="editBranch(props.rowData)">-->
                                <!--<i class="nc-icon nc-ruler-pencil icon-bold"></i>-->
                            <!--</button>-->
                            <!--<button class="btn btn-danger" @click="deleteBranch(props.rowData)">-->
                                <!--<i class="nc-icon nc-simple-remove icon-bold"></i>-->
                            <!--</button>-->
                        <!--</div>-->
                    <!--</vuetable>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuetable from 'vuetable-2'

    export default {
        name: 'ShowBranch',
        components: {
            Vuetable
        },
        data() {
            return {
                data: [],
                perPage: 1
            }
        },
        created() {
            this.getBranch();
        },
        mounted() {
            this.getBranch();
        },
        methods: {
            getBranch() {
                let vm = this;
                vm.$Http.get('admin/branch').then(response => {
                    vm.data = response.data;
                });

            },
            editBranch(id,index){
                this.$router.push({name: 'editBranch',params: {id:id}})
            },
            deleteBranch(id,index){
                let vm = this;
                vm.$swal({
                    title: 'Bạn muốn xóa?',
                    type: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý'
                }).then((del)=>{
                    if(del){
                        vm.$Http.delete('admin/branch/'+id).then(response=>{
                            vm.data.splice(index,1);
                        }).catch(err=>{
                            vm.$swal({
                                text: err,
                                type: 'error',
                            })
                        })
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>