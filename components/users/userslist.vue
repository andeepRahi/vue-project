<template>
    <div>
        <Header :title="'Users List'"></Header>
        <section class="content">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Users Management Section</h3>
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
                        </div>
                <a href="/bpc-admin/user/create" v-if="selected.length==0" class="addUser btn btn-default btn-primary btn-sm">Add New</a>
                <button class="addUser btn btn-danger btn-sm" v-if="selected.length>0" type="button" @click.prevent="deleteUsers">Delete Selected</button>

                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                    <ring-loader :loading="loading"></ring-loader>
                    <table id="datatables" :class="loading ? 'table table-bordered table-hover overlay' : 'table table-bordered table-hover' " >
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="selection" v-model="selection" @change="selectAll" /></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        <tr v-for="user in users.data" :key="user.id">
                            <td> <label> <input type="checkbox" class="minimal" v-model="selected" :value="user.id"></label></td>
                            <td class="text-capitalize">{{user.display_name}}</td>
                            <td>{{user.email}}</td>
                            <td class="text-capitalize">{{user.role_name}}</td>
                            <td v-if="user.status"><span class="badge label-success">Active</span></td>
                            <td v-else-if="!user.status"><span class="badge label-danger">Deactive</span></td>
                            <td class="center">
                                <a :href="'/bpc-admin/user/edit/'+user.id" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></a>
                                <a @click.prevent="deleteUser(user.id)" class="btn btn-danger btn-sm text-white"><i class="fas fa-trash"></i></a>
                            </td>
                        </tr>
                        <tr v-if="users.total==0">
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
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </tfoot>
                    </table>
                    <pagination :data="users" @pagination-change-page="getUsers"></pagination>
                    </div>
                </div>
          </div>
        </section>
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
                users:{},
                selected:[],
                selection: false,
                count:10,
                role:0,
                roles:{}
            };
        },
        methods: {
            searchit: _.debounce(() => {
                FireEvent.$emit('searching');
            }, 200),
            getUsers(page=1){
                axios.get('/bpc-admin/user/getUsers',{
                    params:{
                        count:this.count,
                        role:this.role,
                        page
                    }
                    })
                        .then(response => {
                            this.users = response.data;
                            this.loading = false;
                        })
                        .catch();
            },
            selectAll(event){
                if(event.target.checked===true){
                    this.users.data.forEach(data=>{
                    this.selected.push(data.id)
                    });
                    this.selection = true;
                } else {
                    this.selected = Array();
                    this.selection = false;
                }
            },
            getSearch(query = '') {
                axios.get('/bpc-admin/user/search?q=' + query)
                    .then((response) => {
                        setTimeout(() => {
                            this.users = response.data;
                            this.loading = false;
                        }, 1000);
                    })
                    .catch((err) => {

                    })
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
                        axios.delete('/bpc-admin/user/delete/'+id)
                            .then( response => {
                                Swal.fire('Deleted!','User has been deleted.','success');
                                FireEvent.$emit('AfterEventFire');
                            })
                            .catch(error => {});

                    }
                })
            },
            deleteUsers(){
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
                        axios.delete('/bpc-admin/user/deleteUsers/'+this.selected)
                            .then( response => {
                                Swal.fire('Deleted!','Selected Users has been deleted.','success');
                                FireEvent.$emit('AfterEventFire');
                            })
                            .catch(error => {});

                    }
                })
            },
            getRoles(){
                axios.get('/bpc-admin/user/getRoles').then(response =>{
                    this.roles = response.data;
                }).catch();
            },
            filterData(){
                FireEvent.$emit('AfterEventFire');
            }
        },
        mounted(){
            this.getUsers();
            this.getRoles();
            FireEvent.$on('searching', () => {
                this.loading = true;
                let query = this.search;
                this.getSearch(query);
            });
            FireEvent.$on('AfterEventFire', () => {
                this.loading = true;
                this.selected = [];
                this.selection = false;
                this.getUsers();
            });
        }
    }
</script>

<style scoped >
#role-group{
    position:absolute;
    top:0.45em;
    right: 27%;
    max-width: 150px;
}

#count-group{
    position:absolute;
    top:0.45em;
    right: 37.3%;
    max-width: 150px;
}

#role-filter{
    height: 30px;
}

#count-filter{
    height: 30px;
}
</style>

