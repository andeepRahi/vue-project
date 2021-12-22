<template>
<div>
<!-- Content Header (Page header) -->
    <Header :title="'Category Mangement Section'"></Header>
<!-- Main content -->
<section class="content" id="category">
<div class="container-fluid">
        <div class="row">
                <div class="col-md-5">
                <form role="form" id="formCategory" @submit.prevent="isUpdate ? handleUpdateSubmit() : handleSubmit();" @keydown="form.errors.clear()">
                    <div class="card card-info">
                        <div class="card-header">
                        <h3 class="card-title"  v-if="isUpdate">Edit Category</h3>
                        <h3 class="card-title" v-else>Add new Category</h3>
                        <a href="" @click.prevent="backtoAdd" class="btn btn-danger btn-sm"  v-if="isUpdate">Back to add Category</a>
                        </div>
                        <div class="card-body">
                            <div :class="form.errors.has('category') ? ' form-group  has-errors' : 'form-group ' ">
                                <label for="category">Category Name</label>
                                <input type="text" v-model="form.category" class="form-control" autoComplete="off" name="category"
                                    placeholder="Category" />
                                <small class="help-block " v-if="form.errors.has('category')" v-text="form.errors.get('category')"></small>
                            </div>
                            <div class="form-group">
                                <label for="slug">Friendly Url</label>
                                <input type="text" name="slug" v-model="form.slug" readonly autoComplete="off" class="form-control"
                                    placeholder="Friendly Url" />
                                <code>{{base_url}}/<span>{{ slugify }}</span></code>
                            </div>

                            <div class="form-group">
                                <label for="parent_id">Parent</label>
                                <select name="parent_id" :value="options" v-model="form.parent_id" autoComplete="off" class="form-control">
                                <option :selected="true" value="0">Parent</option>
                                <option v-for="option in options" :value="option.id" :key="option.id" >{{ option.cat_name }}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="status">Status</label>
                                <select name="status" id="status" v-model="form.status" autoComplete="off" class="form-control">
                                    <option value="1">Active</option>
                                    <option value="0">Deactive</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="modules_id">Attach Question Type</label>
                                <div class="row">
                                <div class="col-12">
                                <select name="modules_id[]"  v-model="form.modules_id"  multiple autoComplete="off" class="form-control" v-html="qtypes">
                                </select>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="card-footer">
                            <button type="submit" class="btn btn-success" :disabled=form.errors.any() v-if="isUpdate">Save</button>
                            <button type="submit" class="btn btn-primary" :disabled=form.errors.any() v-else>Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
                <div class="col-md-7">
                <div class="card">
            <div class="card-header">
              <h3 class="card-title float-left">Listings</h3>
              
            </div>
            <!-- /.card-header -->
            <div class="card-body">
             <ring-loader :loading="loading"></ring-loader>
              <table id="user-table" class="table table-bordered table-hover">
                <thead>
                <tr>
                   <th><input type="checkbox" name="selection" /></th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="category in categories.data" :key="category.id">
                <td> <label> <input type="checkbox" class="minimal" :value="category.id"></label></td>
                <td>{{category.cat_name}}</td>
                <td>{{category.cat_slug}}</td>
                <td class="center">
                    <a href="javascript:;"   @click.prevent="editCategory(category.id)" class="btn btn-primary btn-sm"><i class="fas fa-edit"></i>Edit</a>
                    <a href="javascript:;"   @click.prevent="deleteCategory(category.id)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i> Delete</a>
                </td>
                </tr>
                <tr  v-show="loading">
                  <td colspan="5" class="text-center"><b>Loading... </b></td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <th><input type="checkbox" name="selection" /></th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
                </tfoot>
              </table>
              <div class="clearfix"></div>
              <div class="pagination">
              </div>
            </div>
            <!-- /.card-body -->
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
export default {
  data() {
        return {
            loading: true,
            categories: [],
            form:new BpcForm({
                category: "",
                slug: "",
                id:"",
                parent_id: 0,
                status: 0,
                modules_id:[]
            }),
            submitted: false,
            qtypes:"",
            options: [],
            isUpdate:false,
            base_url:Laravel.baseUrl
        }
    },
    components:{
        Header,
    },
    computed: {
        slugify: function() {
          return this.form.slug=this.sanitizeTitle(this.form.category);
        }
    },
    methods: {
       async handleUpdateSubmit() {
                var data = document.getElementById('formCategory');
                var formData = new FormData(data);
                formData.append('slug', this.form.slug);
                formData.append('id', this.form.id);
                 axios.post("/bpc-admin/category/updateCategory", formData).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    })
                }).catch((err) => {
                    // this.errors = err.response.data.errors;
                     this.form.onFail(err.response.data.errors);
                });

        },
        backtoAdd(){
            this.form.reset();
        },
        async handleSubmit() {
            var form = document.getElementById('formCategory');
            var formData = new FormData(form);
            axios.post('/bpc-admin/category/create',formData).then((response)=>{
                this.form.onSuccess(response.data);
              Toast.fire({
                    type: 'success',
                    title: response.data.message
                })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.form.onFail(err.response.data.errors);
            });
            // var form = document.getElementById('formCategory');
            // var formData = new FormData(form);
            // formData.append('slug', this.slug);
            // this.form.post("/bpc-admin/category/create", formData).then((response) => {
            //     this.category = "";
            //     this.options = [];
        
            
        },
        async fetchCategoryList() {
            axios.get("/bpc-admin/category/catList")
                .then((response) => {
                    this.categories = response.data.categories;
                    this.options = response.data.options;
                    this.qtypes = response.data.qtypes;
                    this.loading = false;
                }).catch((err) => {})
        },
        async deleteCategory(id) {
             axios.get("/bpc-admin/category/delete/" + id).then((response) => {
                Toast.fire({
                    type: 'success',
                    title: response.data.message
                })
                FireEvent.$emit('AfterEventFire');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });

        },
       async editCategory(id)
        {
          
            this.isUpdate = true;
            this.form.id = id;
            axios.get("/bpc-admin/category/edit/" + id).then((response) => {
                this.options = response.data.categories;
                this.form.category = response.data.detail.cat_name;
                this.form.slug = response.data.detail.slug;
                this.form.status = response.data.detail.is_active;
                this.form.parent_id = response.data.detail.parent_id;
                this.qtypes = response.data.qtypes;
            }).catch((err) => {
                Toast.fire({
                    type: 'failed',
                    title: response.data.message
                })
            });
        },
        sanitizeTitle(title) {
            var slug = "";
            // Change to lower case
            var titleLower = title.toLowerCase();
            // Letter "e"
            slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
            // Letter "a"
            slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
            // Letter "o"
            slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
            // Letter "u"
            slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
            // Letter "d"
            slug = slug.replace(/đ/gi, 'd');
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');
            return slug;
        }

    },
    created() {
        this.fetchCategoryList();
        FireEvent.$on('AfterEventFire', () => {
            this.fetchCategoryList();
        });
    }
}
</script>

<style>

</style>
