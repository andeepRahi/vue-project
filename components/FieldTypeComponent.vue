<template>
<div class="template">
    <div class="card-body">
        <ring-loader :loading="loading"></ring-loader>
        <table id="user-table" class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th><input type="checkbox" name="selection" /></th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                 <tr v-for="(modules,key,index) in modules_type" :key="index">
                    <td><input type="checkbox" name="checkbox[]" value="" /></td>
                       <th>{{modules.q_type}}</th>
                    <td><a  v-on:click.prevent="showModal(modules.id,modules.q_type)" class="btn btn-primary btn-sm" ><i class="fas fa-edit"></i></a> </td>
                </tr>
    
            </tbody>
            <tfoot>
               <tr>
                    <th><input type="checkbox" name="selection" /></th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </tfoot>
        </table>
    </div>
    <!-- /.card-body -->

    <div class="modal fade" id="basicModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
         <form @submit.prevent="handleSubmit()">
        <div class="modal-dialog modal-dialog-centered" role="document">

            <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title">{{field_name}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                <div class="modal-body">
                    <div :class="errors.category ? ' form-group  has-errors' : 'form-group '">
                            <label for="slug">Category Type</label>
                            <select name="field_type" :value="category" v-model="category" class="form-control">
                                <option v-for="(type, key, index) in categoryDropdown" :key="index" :value="key">{{type}}</option>
                            </select>
                        </div>
                        <div :class="errors.field_type ? ' form-group  has-errors' : 'form-group '">
                            <label for="slug">Field Type</label>
                            <select name="field_type" :value="field_type" v-model="field_type" class="form-control" v-on:change="onChange">
                                <option v-for="(type, key, index) in typedropdown" :key="index" :value="key">{{type}}</option>
                            </select>
                             <small class="help-block" v-if=errors.field_type :errors=errors>{{errors.field_type[0]}}</small>
                        </div>
                        <div :class="errors.repeator_field ? ' form-group  has-errors' : 'form-group '" v-if=repeator>
                            <label for="repeator_field">Sub Field Type</label>
                            <select name="repeator_field" :value="repeator_field" v-model=repeator_field class="form-control">
                                <option v-for="(type, key, index) in typedropdown" :key="index" :value="key">{{type}}</option>
                            </select>
                             <small class="help-block" v-if=errors.repeator_field :errors=errors>{{errors.repeator_field[0]}}</small>
                        </div>
                  
                </div>
                <div class="modal-footer">
                     <input type="hidden" name="type_id" v-model="type_id"/>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
        </form>
    </div>
</div>
</template>
<script>
import {mapState} from "vuex";
export default {
    data(){
        return{
           field_type:'text',
           modules_type:[],
           type_id:"",
           repeator:false,
           category:'',
           loading:true,
           repeator_field:"",
           field_name:"",
           errors: []
        }
    },
    computed:{
        ...mapState([
         'title',
         'typedropdown',
         'categoryDropdown'
       ]),
     
    },
    methods: {
        handleSubmit() {
            var formData = new FormData();
            formData.append('field_type', this.field_type);
            formData.append('is_repeator', this.repeator);
            formData.append('type_id', this.type_id);
            formData.append('repeator_field', this.repeator_field);
            formData.append('category', this.category);
            axios.post("/bpc-admin/types/update/data", formData).then((response) => {
              Toast.fire({
                    type: 'success',
                    title: response.data.message
                });
              $("#basicModal").modal('hide');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        getQuestionType(){
            axios.get("/bpc-admin/types/lists/data").then((response) => {
                this.modules_type= response.data;
               
                this.loading=false;
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
        },
        onChange(e){
            let value=e.target.value;
            console.log(value);
              switch(value) {
              case 'repeator':
               this.repeator=true;
              break;
              default:
                this.repeator=false;
              break;
              }
        },
        showModal(id,type){
            this.type_id=id;
            this.field_name=type;
            axios.get("/bpc-admin/types/detail/"+id).then((response) => {
               this.field_type=response.data.q_field;
               this.category=response.data.category;
               this.repeator=(response.data.is_repeator==1) ? true :false;
               this.repeator_field=(response.data.is_repeator==1) ? response.data.repeator_field :"text";
                $("#basicModal").modal('show');
            }).catch((err) => {
                this.errors = err.response.data.errors;
            });
          
        }

    },
    mounted(){
        this.getQuestionType();
    }
}
</script>