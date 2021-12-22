<template>
    <div>
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">

                        <h1 v-if="!isUpdate">Add User</h1>
                        <h1 v-else>Update User</h1>

                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="/bpc-admin">Home</a></li>
                            <li class="breadcrumb-item "><a href="bpc-admin/users">Users</a></li>
                            <li class="breadcrumb-item active">Add</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <form role="form" id="formUser" @submit.prevent="isUpdate ? handleUpdateSubmit() : handleSubmit()">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-info">
                                <div class="card-header">
                                    <h3 class="card-title" v-if="$route.path==='/bpc-admin/user/create'">New User</h3>
                                    <h3 class="card-title" v-else>User: {{form.display_name}}</h3>
                                </div>
                                <div class="card-body">
                                    <div
                                        :class="form.errors.has('first_name') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="first_name">First
                                            Name</label>
                                        <input type="text" name="first_name" v-model="form.first_name"
                                            class="form-control" autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('first_name')"
                                            v-text="form.errors.get('first_name')"></small>
                                    </div>
                                    <div
                                        :class="form.errors.has('last_name') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="last_name">Last
                                            Name</label><input type="text" name="last_name" v-model="form.last_name"
                                            class="form-control" autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('last_name')"
                                            v-text="form.errors.get('last_name')"></small>

                                    </div>
                                    <div
                                        :class="form.errors.has('display_name') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="display_name">Display
                                            Name</label><input type="text" name="display_name"
                                            v-model="form.display_name" class="form-control" autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('display_name')"
                                            v-text="form.errors.get('display_name')"></small>
                                    </div>

                                    <div
                                        :class="form.errors.has('address') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="address">Address</label><input type="text" name="address"
                                            class="form-control" v-model="form.address" autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('address')"
                                            v-text="form.errors.get('address')"></small>
                                    </div>
                                    <div :class="form.errors.has('phone') ? 'form-group  has-errors' : 'form-group ' ">
                                        <label for="phone">Phone</label><input type="text" name="phone"
                                            class="form-control" v-model="form.phone" autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('phone')"
                                            v-text="form.errors.get('phone')"></small>
                                    </div>
                                    <div :class="form.errors.has('email') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="email">Email
                                            Address</label>
                                        <input type="text" name="email" class="form-control" v-model="form.email"
                                            autoComplete="off" />
                                        <small class="help-block " v-if="form.errors.has('email')"
                                            v-text="form.errors.get('email')"></small>
                                    </div>
                                    <div
                                        :class="form.errors.has('password') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="password">Password</label>
                                        <input type="password" name="password" class="form-control"
                                            autocomplete="off" />
                                        <small class="help-block " v-if="form.errors.has('password')"
                                            v-text="form.errors.get('password')"></small>
                                    </div>
                                    <div
                                        :class="form.errors.has('country_id') ? ' form-group  has-errors' : 'form-group ' ">
                                        <label for="country">Country</label>
                                        <select id="country" name="country_id" v-model="form.country_id" autoComplete="off"
                                            class="form-control">
                                            <option selected disabled value="0">Choose Country</option>
                                            <option v-for="country in countries" :key="country.id" :value="country.id"
                                                v-text="country.country_name.toUpperCase()"></option>
                                        </select>
                                        <small class="help-block " v-if="form.errors.has('country_id')"
                                            v-text="form.errors.get('country_id')"></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card card-info">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>'Have you sit for PTE Academic before?
                                        </label>
                                        <select class="custom-select" v-model="form.pte_academic" @change="pteScore"
                                            name="pte_academic" id="academic">
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select></div>
                                    <div class="form-group" v-show='pteScoreShow'>
                                        <label>Previous Score in PTE Academic</label>
                                        <input type="text" v-model="form.pte_score" name="pte_score"
                                            class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label for="role_id">User Role</label>
                                        <select name="role_id" id="role_id" v-model='form.role_id' autoComplete="off"
                                            class="form-control">
                                            <option selected disabled value="0">Choose Roles</option>
                                            <option v-for="role in getRoles" :key="role.id" :value='role.id'>
                                                {{ role.name }}</option>
                                        </select>
                                        <small><a href="" v-on:click.prevent="showRoleInput">Create New Role</a></small>
                                        <div class="cRole form-group">
                                            <input type="text" v-show='isRole' v-model="role_name"
                                                v-on:keyup="addButton" class="form-control form-role"
                                                placeholder="Enter Your New Role">
                                            <a href="" v-show='submitted' v-on:click="addRole"><i
                                                    class="fas fa-check"></i></a>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="status">Status</label>
                                        <select name="status" id="status" v-model='form.status' autoComplete="off"
                                            class="form-control">
                                            <option selected disabled>Choose Status</option>
                                            <option value="1">Active</option>
                                            <option value="0">Deactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary" :disabled="hasSubmited"
                                        v-html="textSwap"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        props: ['userId'],
        data() {
            return {
                isRole: false,
                submitted: false,
                formSubmitted:false,
                id: '',
                role_name:"",
                roles: [],
                errors: [],
                countries: '',
                form: new BpcForm({
                    first_name: '',
                    last_name: '',
                    display_name: '',
                    address: '',
                    phone: '',
                    email: '',
                    country_id: 0,
                    pte_academic: 'no',
                    pte_score:"",
                    role_id: '',
                    status: 0
                })
            }
        },
        computed: {
            pteScoreShow: function () {
                return (this.form.pte_academic == 'yes') ? true : false;
            },
            getRoles: function () {
                return this.roles;
            },
            isUpdate: function () {
                if (this.$route.params.userId) {
                    return 1;
                } else {
                    return 0;
                }
            },
            hasSubmited: function () {
                return (this.formSubmitted) ? true : false;
            },
            textSwap: function () {
                return (this.formSubmitted) ? "processing..." : "Save";
            }
        },
        methods: {
            handleSubmit() {
                var form = document.getElementById('formUser');
                var formData = new FormData(form);
                this.formSubmitted = true;
                axios.post("/bpc-admin/user/create", formData).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    });
                    this.formSubmitted = false;
                }).catch((err) => {
                    this.formSubmitted = false;
                    this.form.onFail(err.response.data.errors);
                });
            },
            getAllRoles() {
                axios.get("/bpc-admin/user/getRoles").then((response) => {
                    this.roles = response.data;
                }).catch((err) => {});
            },
            addRole(e) {
                e.preventDefault();
                let formdata = {
                    role_name: this.role_name
                };
                axios.post("/bpc-admin/role/create", formdata).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    });
                    this.submitted = false;
                    this.isRole = false
                }).catch((err) => {
                        this.errors = err.response.data.errors;
                    }

                );
            },
            addButton: function (e) {
                return (this.role_name) ? this.submitted = true : this.submitted = false

            },
            showRoleInput() {
                return (this.isRole == false) ? this.isRole = true : this.isRole = false;
            },
            handleUpdateSubmit() {
                if (this.isUpdate) {
                    var form = document.getElementById('formUser');
                    var formData = new FormData(form);
                    this.formSubmitted = true;
                    axios.post("/bpc-admin/user/edit/" + this.userId, formData).then((response) => {
                        Toast.fire({
                            type: 'success',
                            title: response.data.message
                        })
                        this.formSubmitted = false;
                    }).catch((err) => {
                            this.errors = err.response.data.errors;
                            this.formSubmitted = false;
                        }

                    );
                }
            },
            getCountries() {
                axios.get('/getCountries')
                    .then(response => {
                        this.countries = response.data;
                    })
            },
            getUser() {
                axios.get('/bpc-admin/user/edit/' + this.userId)
                    .then(response => {
                    for (let property in this.form.data()) {   
                     this.form[property] = response.data[property];
                    }
                    }).catch((err) => {});
                   
            },
            pteScore(e) {
                this.form.pte_academic = e.target.value;
            }
        },
        mounted() {
            if (this.$route.params.userId) {
                this.getUser();
            }
            this.getAllRoles();
            this.getCountries();
        }
    }

</script>

<style scoped>

</style>
