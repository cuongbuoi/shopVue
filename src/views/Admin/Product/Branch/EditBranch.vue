<template>
    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header ">
                    <h4 class="card-title">Thêm ngành nghề</h4>
                </div>
                <div class="card-body">
                    <b-form @submit="updateBranch">
                        <b-form-group label="Tên ngành nghề" label-for="ten-nganh-nghe">
                            <b-form-input
                                    id="ten-nganh-nghe"
                                    trim
                                    type="text"
                                    v-model="tenNganh"
                                    :state="changeToSlug"
                                    placeholder="Nhập tên ngành nghề"/>
                            <p class="text-danger" v-if="checkValidate(validation.tenNganh)">
                                {{validation.tenNganh}}
                            </p>
                        </b-form-group>
                        <b-form-group label="Slug ngành nghề" label-for="slug-nganh-nghe">
                            <b-form-input
                                    id="slug-nganh-nghe"
                                    type="text"
                                    v-model="slugNganh"
                                    readonly/>
                        </b-form-group>
                        <b-form-group label="Ảnh ngành nghề" label-for="avatar-nganh-nghe">
                            <b-form-file
                                    v-model="avatarNganh"
                                    :state="Boolean(avatarNganh)"
                                    placeholder="Chọn ảnh ngành nghề..."
                                    drop-placeholder="Kéo ảnh vào..."
                                    accept=".jpg, .png, .gif"
                                    @change="previewAvatar"
                            />
                            <img v-if="preview != ''" :src="preview" alt="preview">
                            <p class="text-danger" v-if="checkValidate(validation.avatarNganh)">
                                {{validation.avatarNganh}}
                            </p>
                        </b-form-group>
                        <div class="text-center">
                            <button type="submit" class="btn btn-success">Lưu</button>
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditBranch',
        data() {
            return {
                id: '',
                tenNganh: '',
                slugNganh: '',
                avatarNganh: '',
                preview:'',
                error: '',
                validation: {
                    tenNganh: '',
                    avatarNganh: ''
                }
            }
        },
        created(){
            this.id = this.$route.params.id;
            this.getInfoBranch();
        },
        computed: {

            changeToSlug() {
                let vm = this;
                vm.slugNganh = vm.$Helper.changeToSlug(vm.tenNganh);
            }
        },
        methods:{
            previewAvatar(e){
                this.preview = URL.createObjectURL(e.target.files[0]);
            },
            getInfoBranch(){
                let vm = this;
                vm.$Http.get('admin/branch/'+vm.id).then(response=>{
                    vm.tenNganh = response.data.branch_name;
                    vm.slugNganh = response.data.branch_slug;
                    vm.avatarNganh = response.data.branch_avatar;
                })
            },
            updateBranch(e){
                e.preventDefault();
                let vm = this;
                let formData = new FormData();
                let config = {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                formData.append('branch_name',vm.tenNganh);
                formData.append('branch_avatar',vm.avatarNganh);
                formData.append('_method','put');
                vm.$Http.post('admin/branch/'+vm.id, formData, config).then(response => {
                    vm.$swal({
                        text: 'Đã sửa ngành nghề',
                        type: 'success',
                    });
                }).catch(err => {
                    if (err.response.status === 422) {
                        let validateObj = {};
                        validateObj = err.response.data.error;
                        if (vm.$Helper.checkIsset(validateObj.branch_name)) {
                            vm.validation.tenNganh = validateObj.branch_name[0];
                        } else {
                            vm.validation.tenNganh = ''
                        }
                        if (vm.$Helper.checkIsset(validateObj.branch_avatar)) {
                            vm.validation.avatarNganh = validateObj.branch_avatar[0];
                        } else {
                            vm.validation.avatarNganh = ''
                        }
                    } else {
                        vm.$swal({
                            text: err,
                            type: 'error',
                        })
                    }
                })
            },
            checkValidate(err){
                if (err != '')
                    return true
                else
                    return false
            }
        }
    }
</script>

<style scoped>

</style>