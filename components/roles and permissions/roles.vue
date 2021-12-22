<template>
    <div>
        <Header :title="'Roles List'"></Header>
        <section class="content">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <!-- <h3 class="card-title">Roles and Permissions Management Section</h3>
                        <div class="form-group" id='count-group'>
                                <select class="custom-select" v-model='count' name="count" @change="filterData()" id="count-filter">
                                    <option selected value=10>10</option>
                                    <option value=25>25</option>
                                    <option value=50>50</option>
                                    <option value=100>100</option>
                                </select>
                        </div>
                        <div class="form-group" id='role-group'>
                                <select class="custom-select" v-model="role" name="role" @change="filterData()" id="role-filter">
                                    <option selected value=0>All</option>
                                    <option :value=role.id v-for="role in roles" :key="role.id">{{role.name.toUpperCase()}}</option>
                                </select>
                            </div>
                        <div class="card-tools"  style="right:10.5%; top:0.45em;">
                            <div class="input-group input-group-sm" style="width: 100%;">
                                <input type="text"  v-on:keyup="searchit" v-model="search"  placeholder="Search..." class="form-control float-right">
                            </div>
                        </div> -->
                <!-- <a href="/bpc-admin/role/create" class="addUser btn btn-default btn-primary ">Add New</a> -->

                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                    <ring-loader :loading="loading"></ring-loader>
                    <table id="datatables" :class="loading ? 'table table-bordered table-hover overlay' : 'table table-bordered table-hover' " >
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="selection" v-model="selection" @change="selectAll" /></th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        <tr v-for="role in roles.data" :key="role.id">
                            <td> <label> <input type="checkbox" class="minimal" :checked="selection" :value="role.id"></label></td>
                            <td class="text-capitalize">{{role.name}}</td>
                            <td v-if="role.status"><span class="badge label-success">Active</span></td>
                            <td v-else-if="!role.status"><span class="badge label-danger">Deactive</span></td>
                            <td class="center">
                                <a @click.prevent="editPermissions(role, $event)" class="btn btn-primary btn-sm text-white">Permissions</a>
                            </td>
                        </tr>
                        <tr v-if="roles.total==0">
                            <td colspan="6">
                                <div class="alert alert-danger" role="alert">
                                    <strong>No Results found.</strong>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                            <th><input type="checkbox" name="selection"  :checked="selection" @change="selectAll"/></th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </tfoot>
                    </table>
                    <pagination :data="roles" @pagination-change-page="getRoles"></pagination>
                    </div>
                </div>
          </div>
        </section>


        <!-- Modal -->
        <div class="modal fade" id="permissions" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-capitalize">{{role_name}} Permissions</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                    
                        <!-- accordian -->
                        <div id="accordion">
                            <div v-for="(permissions,category) in permissionsAll" :key="permissions.id">
                                <div class="card">
                                    <div class="card-header row" :id="category+'heading'">
                                        <div class="col-6">
                                            <h6 class="mb-0 text-capitalize">
                                                {{category}}
                                            </h6>
                                        </div>
                                         <div class='col-4'>
                                            <label class="switch">
                                                <input type="checkbox" :id="category.replace(' ','-')+'switch'" :value='category' @change='togglePermissions(permissions,$event,category)' class="form-control" />
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <div class="col-2">
                                            <button class="btn btn-link align-right" style='padding:0;margin:0;' data-toggle="collapse" :data-target="'#'+category.replace(' ','-')" aria-expanded="true" aria-controls="collapseOne">
                                                <i class="fa fa-caret-square-down"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div :id="category.replace(' ','-')" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            <div v-for="permission in permissions" :key="permission.id" class="row">
                                                <div class="col-6">
                                                    <label :for='permission.name' class="text-capitalize">{{permission.display_name}}</label>
                                                </div>
                                                <div class='col-4'>
                                                    <label class="switch">
                                                        <input type="checkbox" :id="permission.name" :value="permission.id" v-model="rolePermissions" class="form-control" />
                                                        <span class="slider round"></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ./ accordian -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click.prevent="updatePermissions()">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import Header from './../../components/Header/Header.vue';
    import Pagination  from 'laravel-vue-pagination';
    export default {
        components:{
            'pagination':Pagination,
            'Header':Header
        },
        data() {
            return {
                search:'',
                loading: true,
                roles:{},
                selected:[],
                selection: false,
                count:10,
                permissionsAll:{},
                rolePermissions:[],
                role_name:'',
                role_id: ''
            };
        },
        methods: {
            searchit: _.debounce(() => {
                FireEvent.$emit('searching');
            }, 200),
            getRoles(page=1){
                axios.get('/bpc-admin/role/list',{
                    params:{
                        page
                    }
                    })
                        .then(response => {
                            this.roles = response.data;
                            this.loading = false;
                        })
                        .catch();
            },
            selectAll(event){
                if(event.target.checked===true){
                    this.roles.data.forEach(data=>{
                    this.selected.push(data.id)
                    });
                    this.selection = true;
                } else {
                    this.selected = Array();
                    this.selection = false;
                }
            },
            getSearch(query = '') {
                axios.get('/bpc-admin/role/search?q=' + query)
                    .then((response) => {
                        setTimeout(() => {
                            this.roles = response.data;
                            this.loading = false;
                        }, 1000);
                    })
                    .catch((err) => {

                    })
            },
            togglePermissions(permissions, $event, category){
                permissions.forEach((permission) => {
                    if(this.rolePermissions.indexOf(permission.id)!==-1){
                        this.rolePermissions.splice(this.rolePermissions.indexOf(permission.id),1);  
                    }      
                });

                if($event.target.checked){
                    permissions.forEach((permission) => {
                        this.rolePermissions.push(permission.id);
                    });
                    document.getElementById(category).classList.add('show');
                }

                this.switchAll();
            },
            deleteUser(id){

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        axios.delete('/bpc-admin/role/delete/'+id)
                            .then( response => {
                                Swal.fire('Deleted!','Role has been deleted.','success');
                                FireEvent.$emit('AfterEventFire');
                            })
                            .catch(error => {});

                    }
                })

            },
            filterData(){
                FireEvent.$emit('AfterEventFire');
            },
            editPermissions(role, $event){
                $event.target.classList.add('disabled');
                $event.target.innerHTML= 'Processing..';
                this.role_name = role.name;
                this.role_id = role.id;
                axios.get('/bpc-admin/role/permissions/'+role.id)
                    .then(response => {

                        this.permissionsAll = response.data.all;
                        this.rolePermissions = [];
                        response.data.roles.forEach((role) =>{ this.rolePermissions.push(role.id); });

                        $event.target.classList.remove('disabled');
                        $event.target.innerHTML= 'Permissions';
                        
                        $('#permissions').modal('show');
                            this.switchAll();
                    })
                    .catch(error => {
                        $event.target.classList.remove('disabled');
                        $event.target.innerHTML= 'Permissions';
                    });
            },
            updatePermissions(){
                axios.get('/bpc-admin/role/update/'+this.role_id,{
                    params:{
                        permissions: this.rolePermissions
                    }
                }).then(response => {
                    Toast.fire({type: 'success',title: response.data})  ; 
                    $('#permissions').modal('hide');
                }).catch();
            },
            switchAll(){                
                setTimeout(() => {
                    
                    for(let index in this.permissionsAll){
                        
                        let totalLength =  document.querySelectorAll(`#${index.replace(' ','-')} input`).length;
                        let checkedLength =  document.querySelectorAll(`#${index.replace(' ','-')} input:checked`).length;

                        if(totalLength === checkedLength){
                            document.getElementById(`${index.replace(' ','-')}switch`).checked = true;
                        } else {
                            document.getElementById(`${index.replace(' ','-')}switch`).checked = false;
                        }
                    }
                }, 100);
            }
        },
        mounted(){
            this.getRoles();
            FireEvent.$on('searching', () => {
                this.loading = true;
                let query = this.search;
                this.getSearch(query);
            });
            FireEvent.$on('AfterEventFire', () => {
                this.loading = true;
                this.getRoles();
            });
        },
        watch: {
            rolePermissions: function(){
                this.switchAll();
            }
        },
    }
</script>


<style scoped>

.switch{
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.slider{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
}

.slider:before{
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color:white;
    transition: .4s;
}

.switch > input:checked + .slider:before{
    transform: translateX(13px);
}
.switch > input:checked + .slider{
    background-color: #2196F3; 
}

.slider.round{
    border-radius: 17px;
}

.slider.round:before{
    border-radius: 50%;
}

</style>
