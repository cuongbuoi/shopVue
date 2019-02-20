<template>
    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <vuetable ref="vuetable"
                              :api-mode="false"
                              :fields="fields"
                              :per-page="perPage"
                              :data-manager="getBranch"
                    >
                        <div slot="actions" slot-scope="props">
                            <button class="btn btn-primary">
                                <i class="nc-icon nc-ruler-pencil icon-bold"></i>
                            </button>
                            <button class="btn btn-danger">
                                <i class="nc-icon nc-simple-remove icon-bold"></i>
                            </button>
                        </div>
                    </vuetable>
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
                fields: [
                    {
                        name: 'id',
                        title: 'ID'
                    },
                    {
                        name: 'branch_name',
                        title: 'Tên ngành nghề'
                    },
                    {
                        name: 'branch_slug',
                        title: 'Slug'
                    },
                    {
                        name: 'branch_avatar',
                        title: 'Hình Ảnh',
                        titleClass: "text-center",
                        dataClass: "text-center",
                    },
                    {
                        name: 'actions',
                        title: 'Thao tác',
                        titleClass: "text-center",
                        dataClass: "text-center",
                    }
                ],
                data: [],
                perPage: 1
            }
        },
        async created() {
            await this.getBranch();
        },
        async mounted() {
            await this.getBranch();
        },
        methods: {
            async getBranch() {
                let vm = this;
                let result = await vm.$Http.get('admin/branch').then(response => {
                    return response.data;
                });
                let newData = [];
                var baseURL = vm.$BaseUrlApi;
                result.forEach((value,index) => {
                    newData.push({
                        id: result[index].id,
                        branch_name: result[index].branch_name,
                        branch_slug: result[index].branch_slug,
                        branch_avatar: `<img src="${baseURL + result[index].branch_avatar}"/>`
                    })
                });
                vm.data = newData;
                return {
                    data: vm.data
                }
            }
        }
    }
</script>

<style scoped>

</style>