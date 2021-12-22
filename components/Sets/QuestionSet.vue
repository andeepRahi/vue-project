<template>
    <div>
        <Header :title="'Set List'"></Header>
        <section class="content">
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <form role="form" id="formQuestion"
                            @submit.prevent="isUpdate ? handleUpdateSubmit() : handleSubmit();">

                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title" v-if=isUpdate>Update Sets</h3>
                                    <h3 class="card-title" v-else>Add Sets</h3>
                                    <a href="" v-if=isUpdate class="pull-right btn btn-sm btn-primary"> Back to Add
                                        New</a>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <div :class="form.errors.has('set_category') ? ' form-group  has-errors' : 'form-group ' " >
                                        <label for="set_category">Set Category</label>
                                        <select name="set_category" id="set_category" v-model="form.set_category"
                                            autoComplete="off" class="form-control" v-html="options" @change="form.errors.clear('set_category')">
                                        </select>
                                         <small class="help-block " v-if="form.errors.has('set_category')" v-text="form.errors.get('set_category')"></small>
                                    </div>
                                    <div :class="form.errors.has('set_name') ? ' form-group  has-errors' : 'form-group ' " @keydown="form.errors.clear('set_name')">
                                        <label for="set_name">Set Name</label>
                                        <input type="text" name="set_name" v-model="form.set_name" class="form-control"
                                            autoComplete="off" />
                                        <small class="help-block"  v-if="form.errors.has('set_name')" v-text="form.errors.get('set_name')"></small>
                                    </div>
                                    <div :class="form.errors.has('set_type') ? ' form-group  has-errors' : 'form-group ' " @change="form.errors.clear('set_type')">
                                        <label for="set_type">Set type</label>
                                        <select name="set_type" id="set_type" v-model="form.set_type" autoComplete="off"
                                            class="form-control">
                                            <option selected disabled>Choose Set Type</option>
                                            <option value="free">Test Mode</option>
                                            <option value="paid">Paid Mode</option>
                                        </select>
                                         <small class="help-block"  v-if="form.errors.has('set_type')" v-text="form.errors.get('set_type')"></small>
                                    </div>
                                    <div class="form-group" v-show=isPaid>
                                        <label for="set_price">Set Price</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input name="set_price" class="form-control" v-model="form.set_price"
                                                autoComplete="off">
                                            <div class="input-group-append">
                                                <span class="input-group-text">.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group ">
                                        <label for="set_type">Set Time</label>
                                        <input type="text" name="set_time" v-model="form.set_time" class="form-control"
                                            placeholder="00:00:00" />
                                    </div>
                                </div>
                                <!-- /.card-body -->
                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary" :disabled=form.errors.any()>Submit</button>
                                </div>
                            </div>
                            <!-- /.card -->
                        </form>
                    </div>
                    <div class="col-8">
                        
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">All Sets Listing</h3>
                                <div class="card-tools" style="right:1rem">
                                    <div class="input-group input-group-sm" style="width: 100%;">
                                        <div class="form-group deleteBtn" v-if="selected.length>0">
                                            <button class="btn btn-danger" type="button" @click.prevent="deleteSets">Delete Selected</button>
                                        </div>
                                            <div class="form-group px-1" v-if="selected.length==0">
                                                <select class="custom-select" v-model="count" @change='updateList' name="paginateNo">
                                                    <option selected value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                            <div class="form-group px-1" v-if="selected.length==0">
                                                <select class="custom-select" name="options" @change="updateList" v-model="sortOption" v-html="options">
                                                </select>
                                            </div>
                                        <input type="text" v-on:keyup="searchit" v-model="search" v-if="selected.length==0"
                                            placeholder="Search..." class="form-control float-right">
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <ring-loader :loading="loading"></ring-loader>
                                <table id="datatables"
                                    :class="loading ? 'table table-bordered table-hover overlay' : 'table table-bordered table-hover' ">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" name="selection" value='selected' v-model="selector" @change="selectAll" /></th>
                                            <th>Questions Sets</th>
                                            <th>Type</th>
                                            <th>Price ($)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="set in sets.data" :key="set.id">
                                            <td> <label> <input type="checkbox" v-model="selected" class="minimal" :value="set.id"></label>
                                            </td>
                                            <td>{{set.question_set_name}} ( {{set.questions_count}} )</td>
                                            <td v-if="set.question_set_type ==='free'"><span
                                                    class="badge label-success text-uppercase">{{set.question_set_type}}</span></td>
                                            <td v-else><span class="badge label-danger text-uppercase">{{set.question_set_type}}</span>
                                            </td>
                                            <td v-if="set.question_set_type ==='free'">0.00</td>
                                            <td v-else>{{set.question_set_price}}</td>
                                            <td class="center">
                                                <a href="javascript:;" v-on:click="editSet(set.id)"
                                                    class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></a>
                                                <router-link :to="'/bpc-admin/sets/'+set.id+'/questions/lists'"
                                                    class="btn btn-success btn-sm"><i class="fas fa-bars"></i> Questions
                                                </router-link>
                                                <router-link :to="'/bpc-admin/sets/'+set.id+'/questions/create'"
                                                    class="btn btn-danger btn-sm"><i class="fas fa-question"></i> Add
                                                    Question
                                                </router-link>
                                            </td>
                                        </tr>
                                        <tr v-if="!hasData">
                                            <td colspan="5" class="alert alert-info"><p>No Question sets found.</p></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th><input type="checkbox" name="selection" value='selected' v-model="selector" @change="selectAll" /></th>
                                            <th>Questions Sets</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                </table>
                                <pagination :data="sets" @pagination-change-page="getSets"></pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import _ from 'lodash'
    import Header from './../../components/Header/Header.vue';
    import Pagination from 'laravel-vue-pagination';
    export default {
        components: {
            'pagination': Pagination,
            'Header': Header
        },
        data() {
            return {
                form:new BpcForm({
                    id: "",
                    set_type: "",
                    set_name: "",
                    set_price: "",
                    set_category: "",
                    set_time: "",
                    }),
                price: '',
                search: "",
                sets: {},
                isUpdate: false,
                isFree: true,
                loading: true,
                options: "",
                total: 0,
                offset: 1,
                selected:[],
                selector:'',
                sortOption:null,
                count:10,
                
            }
        },
        computed: {
            isPaid: function () {
                if (this.form.set_type == "paid") {
                   this.form.set_price = this.price;
                    return true;
                } else {
                    this.form.set_price = "0.00";
                    return false;
                }
            },
            hasData: function(){
                if(this.sets.data){
                    if(this.sets.data.length==0){
                        return false;
                    }
                    return true;
                }else{
                    return false;
                }
            }
        },
        methods: {
            searchit: _.debounce(() => {
                FireEvent.$emit('searching');
            }, 200),
            handleSubmit() {
                var form = document.getElementById('formQuestion');
                var formData = new FormData(form);
                axios.post("/bpc-admin/sets/create", formData).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    })
                    this.form.reset();
                    FireEvent.$emit('AfterEventFire');
                }).catch((err) => {
                    this.form.onFail(err.response.data.errors);
                });
            },
            editSet(id) {
                this.isUpdate = true;
                this.form.id = id;
                axios.get("/bpc-admin/sets/edit/" + id).then((response) => {
                    this.form.set_type = response.data.question_set_type;
                    this.form.set_name = response.data.question_set_name;
                    this.form.set_price = (response.data.question_set_price == null) ? "0.0" : response.data
                        .question_set_price;
                    this.form.set_category = response.data.cat_id;
                    this.form.set_time= response.data.question_set_time;
                    this.price = (response.data.question_set_price == null) ? "0.0" : response.data
                        .question_set_price;

                }).catch((err) => {
                Toast.fire({
                    type: 'failed',
                    title: response.data.message
                })
            });
            },
            handleUpdateSubmit() {
                var formData = new FormData();
                formData.append('set_type', this.form.set_type);
                formData.append('set_name', this.form.set_name);
                formData.append('set_price', this.form.set_price);
                formData.append('set_category', this.form.set_category);
                 formData.append('set_time', this.form.set_time);
                axios.post("/bpc-admin/sets/edit/" + this.form.id, formData).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    })
                    FireEvent.$emit('AfterEventFire');
                }).catch((err) => {
                     this.form.onFail(err.response.data.errors);
                });
            },
            getSets(page = 1) {
                this.selector = '';
                this.loading = true;
                axios.get('/bpc-admin/sets/getSetLists?page=' + page,{
                    params:{
                        q: this.search,
                        count:this.count,
                        cat_id:this.sortOption,
                    }
                })
                    .then((response) => {
                        setTimeout(() => {
                            this.sets = response.data;
                            this.loading = false;
                        }, 1000);
                    })
                    .catch(() => {
                        console.log('handle server error from here');
                    });
            },
            getSearch(query = '') {
                axios.get('/bpc-admin/sets/getSetLists?q=' + query, {
                    params:{
                        count:this.count,
                        cat_id:this.sortOption,
                    }
                })
                    .then((response) => {
                        setTimeout(() => {
                            this.sets = response.data;
                            this.loading = false;
                        }, 1000);
                    })
                    .catch((err) => {

                    })
            },
            getCategory() {
                axios.get('/bpc-admin/sets/getCategory')
                    .then((response) => {
                        this.options = response.data;
                    })
                    .catch((err) => {

                    })
            },
            selectAll(e){
                if(e.target.checked){
                    this.sets.data.forEach(set => {
                        this.selected.push(set.id);
                    });
                } else{
                    this.selected = [];
                }
            },
            deleteSets(){
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
                        axios.delete('/bpc-admin/sets/deleteQuestionSets/'+this.selected)
                            .then( response => {
                                Swal.fire('Deleted!','Question set has been deleted.','success');
                                FireEvent.$emit('AfterEventFire');
                            })
                            .catch(error => {});

                    }
                })
            },
            updateList(){
                FireEvent.$emit('AfterEventFire');
            }
        },
        mounted() {
         
            this.loading = true;
            this.getSets();
            this.getCategory();
            FireEvent.$on('searching', () => {
                this.loading = true;
                let query = this.search;
                this.getSearch(query);
            })
            FireEvent.$on('AfterEventFire', () => {
                this.loading = true;
                this.selected = [];
                this.getSets();
            });
        }
    }

</script>

<style scoped>
    #app {
        /* padding:20px; */
    }

    .overlay {
        opacity: 0.5
    }

    input[type=text]{
        height: 37px;
        border-radius:5px;
    }
    .deleteBtn{
       text-align:center; 
    }

</style>
