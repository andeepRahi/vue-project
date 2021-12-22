<template>
    <main>
        <Header :title="'Question Lists'" :set="set"></Header>
        <section class="content">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">All Lists</h3>
                            <div class="card-tools">
                                <!-- <div class="input-group input-group-sm" style="width: 250px;">
                                    <input type="text" name="table_search" @keyup=searchit
                                        class="form-control float-right" placeholder="Search">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default btn-primary"><i
                                                class="fa fa-search"></i></button>
                                    </div>
                                </div> -->
                            </div>
                            <router-link :to="{ name: 'QuestionCreate' }" v-if="selected.length==0" class="btn btn-primary btn-sm">Add Question
                            </router-link>
                            <button class="btn btn-danger btn-sm" v-if="selected.length>0" @click.prevent="deleteQuestions" type="button" >Delete Selected</button>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <ring-loader :loading="loading"></ring-loader>
                            <table id="user-table"
                                :class="loading ? 'table table-bordered table-hover overlay' : 'table table-bordered table-hover' ">
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" name="selection" value='selected' v-model="selector" @change="selectAll" /></th>
                                        <th>Questions</th>
                                        <th>Type</th>
                                        <th>Duration ( Time )</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(question,id) in questions" :key="id">
                                        <td><input type="checkbox" name="selection" :value="question.id" v-model="selected" /></td>
                                        <td v-if="question.question!=null">{{question.question | limitWords}}
                                        </td>
                                        <td v-else>{{question.additional_note}}</td>
                                        <td>{{question.qtype.q_type}}</td>
                                        <td>{{question.time_frame}}</td>
                                        <td class="center">
                                            <router-link :to="'/bpc-admin/sets/'+set.id+'/questions/edit/'+question.id"
                                                class="btn btn-primary btn-sm"><i class="fas fa-edit"></i></router-link>
                                            <a href="javascript:;" @click.prevent=deleteQuestion(question.id)
                                                class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    <tr v-if="questions.length==0">
                                        <td class="alert alert-info" colspan="5">No Questions found in this Set.</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th><input type="checkbox" name="selection" value='selected' v-model="selector" @change="selectAll" /></th>
                                        <th>Questions</th>
                                        <th>Type</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import _ from 'lodash'
    import Header from './../../components/Header/Header.vue';
    import Pagination from 'laravel-vue-pagination';
    export default {
        components: {
            "Header": Header,
            'pagination': Pagination,
        },
        data() {
            return {
                id: this.$route.params.id,
                loading: true,
                questions: [],
                set: {},
                createUrl: '',
                selector:'',
                selected:[],
            }
        },
        created() {
            this.getQuestionsList();
             FireEvent.$on('AfterEventFire',()=>{
                 this.selected = [];
                 this.selector = '';
                this.getQuestionsList()
            })
        },
        filters: {
            limitWords: function (value) {
                return (value.length >50 ) ? value.substring(0,75)+"...": value;
            }
        },
        methods: {
            // searchit: _.debounce(() => {
            //     FireEvent.$emit('searching');
            // }, 200),
            getQuestionsList() {
                axios.get('/bpc-admin/sets/questions/' + this.id + '/data')
                    .then((response) => {
                        setTimeout(() => {
                            this.questions = response.data.questions.data;
                            this.set = response.data.set;
                            this.createUrl = response.data.addurl;
                            this.loading = false;
                        }, 1000);
                    })
                    .catch(() => {
                        console.log('handle server error from here');
                    });
            },
            editQuestion(id) {

            },
            deleteQuestion(id) {
                axios.get("/bpc-admin/sets/questions/delete/" + id).then((response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    })
                    FireEvent.$emit('AfterEventFire');
                }).catch((err) => {
                    this.errors = err.response.data.errors;
                });
            },

            selectAll(e){
                if(e.target.checked){
                    this.questions.forEach(set => {
                        this.selected.push(set.id);
                    });
                } else{
                    this.selected = [];
                }
            },
            deleteQuestions(){
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
                        axios.delete('/bpc-admin/sets/questions/deleteQuestions/'+this.selected)
                            .then( response => {
                                Swal.fire('Deleted!','Selected Questions has been deleted.','success');
                                FireEvent.$emit('AfterEventFire');
                            })
                            .catch(error => {});

                    }
                })
            }

        }

    }

</script>

<style>

</style>
