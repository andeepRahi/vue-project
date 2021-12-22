<template>
    <div class="dform">
        <Header :title="isEditSection ? 'Edit Question' : 'Add Question'" :set="sets"></Header>
        <form role="form" id="formQuestion" @submit.prevent="isUpdate ? handleUpdateSubmit() : handleSubmit();"
            novalidate="true">
            <div class="row">
                <div class="col-9  mr-auto  ml-auto">
                    <div class="card card-info">
                        <div class="card-header">
                            <h3 class="card-title" v-if="isEditSection">Edit Question</h3>
                            <h3 class="card-title" v-else>Add New Question</h3>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div :class="form.errors.has('question_type') ? ' form-group  has-errors' : 'form-group'">
                                <label for="question_type">Question Type</label>
                                <select name="question_type" 
                                    id="question_type" 
                                    class="form-control"
                                    v-on:change="onChange" 
                                    :value="form.question_type" 
                                    v-model="form.question_type"
                                    @change="form.errors.clear('question_type')"
                                    >
                                    <option selected disabled value="">Choose Questions Type</option>
                                    <option v-for="(set,key,index) in modules" :key="index" :value="set.id">
                                        {{set.qtype}}</option>
                                </select>
                                <small class="help-block" v-if="form.errors.has('question_type')" 
                                    v-text="form.errors.get('question_type')"></small>
                            </div>
                            <!-- non repeator section goes here--->
                            <div class="form-group" v-if="showQuestionName">
                                <label for="question_name">Question Setup</label>
                                <p><small v-if="field.slug=='rfb' || field.slug=='rwfb'">To Create blank type underscore e.g (r_)</small></p>
                                <textarea class="form-control" cols="20" v-model="form.question_name" rows="5"
                                    name="question_name"></textarea>
                            </div>

                            <div class="form-group" v-if="field.q_field=='file' || isListening">
                                <label v-if="field.slug=='describe-image'">Image File Upload</label>
                                <label v-else>Audio File Upload</label>
                                <input type="file" class="form-control" name='image'
                                    v-if="field.slug=='describe-image'" />
                                <input type="file" class="form-control" name='file' v-else />
                            </div>
                            <div class="form-group" v-if="field.slug=='re-tell-lecture' && field">
                                <label>Image Upload</label>
                                <input type="file" class="form-control" name='image' />
                            </div>
                            <div class="form-group" v-if="showQuestionSummary">
                                <label for="question_summary">Question Summary</label>
                                <textarea class="form-control" :value="form.question_summary" name="question_summary"
                                    cols="20" rows="5"></textarea>
                            </div>
                            <speaking-answer :field='field'></speaking-answer>
                            <!-- For Repeator Section -->
                            <form-repeator :field="field" :metas="metas" :correct-answered="answer"
                                :is-edit="isUpdate"  v-if="isRepeator" ></form-repeator>
                        <div class="fillinBlank" v-if="field.slug=='hiw' || field.slug==='finb'">
                            <div class="correctOrder">
                                <h5>Correct Answer Setup</h5>
                                <small>Please add  commas (,) to sepeate answer</small>
                                <input class="form-control"  name="fill_correct_answer" v-model="answer.answer"/>
                            </div>
                        </div>
                         <div v-if="isListening && field.slug === 'wfd'">
                            <label for="answer">Answer</label>
                            <textarea name="answer" id="answer" class="form-control" cols='30' v-model='answer.answer.qnAnswer'></textarea>
                        </div>   
                            <div :class="form.errors.has('additional_note') ? ' form-group  has-errors' : 'form-group'"
                                v-show="isTypeChanged" @keydown="form.errors.clear('additional_note')" >
                                <label for="question_name">Additional Note</label>
                                <textarea name="additional_note"  cols="20" v-model="form.additional_note" rows="5"
                                    class="form-control" placeholder="Question"></textarea>
                                <small class="help-block" v-if="form.errors.has('additional_note')" 
                                    v-text="form.errors.get('additional_note')"></small>
                                     <p><b>Note:- </b><code > Leave empty if not need additional note</code></p>
                            </div>

                            <div class="form-group"
                                v-show="isTypeChanged">
                                <label for="question_name">Time Frame</label>
                                <input type="text" name="time_frame" :value="form.time_frame" class="form-control">
                            </div>

                            <div class="form-group" v-show="isTypeChanged">
                                <label for="question_name">Start Timer</label>
                                <input type="text" name="start_timer" :value="form.start_timer" class="form-control">
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary" :disabled="hasSubmited"
                                v-html=submitBtnName></button>
                             <router-link :to="'/bpc-admin/sets/'+$route.params.id+'/questions/lists'" class="btn btn-danger">Cancel</router-link>
                        </div>
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Header from './../../components/Header/Header.vue';
    import FormRepeator from './../../components/Fields/RepeatorComponent.vue';
    import SpeakingAnswer from './speaking-answer';
    export default {
        components: {
            "form-repeator": FormRepeator,
            'Header': Header,
            'speaking-answer':SpeakingAnswer,
        },
        data() {
            return {
                category: '',
                modules: [],
                sets: {},
                field: {},
                metas: {},
                answer: {},
                questions: {},
                image: "",
                file: "",
                form: new BpcForm({
                    id: "",
                    type_id: "",
                    question_name: "",
                    question_summary: "",
                    question_type: '',
                    start_timer: "",
                    additional_note: "",
                    time_frame: "",
                }),
                submitBtnName: 'Save',
                isChanged: false,
                isUpdate: false,
                isSubmited: false,
                option_index: "",
            }
        },
        
        computed: {
            isTypeChanged: function () {
                if (this.isChanged) {
                    return true;
                }
                return false;
            },
            isEditSection: function () {
                if (this.$route.params.question) {
                    return true;
                }
                return false;

            },
            hasSubmited: function () {
                if (this.isSubmited) {
                    this.submitBtnName = "<i class='fas fa-circle-notch'></i> Processing...";
                    return true;
                } else {
                    this.submitBtnName = "Save";
                    return false;
                }
            },
            showQuestionName: function () {
                return this.field.slug == 'swt' ||
                    this.field.slug == 'rwfb' ||
                    this.field.slug == 'rfb' ||
                    this.field.slug == 'finb' ||
                    this.field.slug == "essay" ||
                    this.field.slug == "hiw" ||
                    this.field.slug === 'mccsa' ||
                    this.field.slug === 'mccma' ||
                    this.field.slug == "read-aloud"
            },
            showQuestionSummary: function () {
                return (this.field.slug == 'mccsa' || this.field.slug == 'mccma') && this.field.category ==
                    "reading"
            },
            isListening: function () {
                return this.field.category === 'listening';
            },
            isRepeator: function () {
                return this.field.q_field == 'repeator';
            }
        },
        mounted: function () {
            if(this.isEditSection){
                this.getQuestion();
            } else {
                this.getQuestionTypes();
            }
            FireEvent.$on('added-option',(e)=>{
            })
        },
        watch:{
            '$route':'editQuestionsById'
        },
        methods: {
            
            getQuestion: function(){
                axios.get(`/api/editQuestion/${this.$route.params.id}/${this.$route.params.question}`).then(response => {
                   this.sets = response.data.set;
                    this.modules = response.data.modules;
                    this.category = response.data.category;
                    this.form.id = response.data.set.id;
                    if (response.data.question) {
                        this.questions = response.data.question;
                        this.form.question_type = response.data.question.question_type_id;
                        this.form.question_name = response.data.question.question;
                        this.form.question_summary = response.data.question.summary;
                        this.form.additional_note = response.data.question.additional_note;
                        this.form.start_timer = response.data.question.start_timer;
                        this.form.time_frame = response.data.question.time_frame;
                        this.answer =response.data.question.answer;
                        if (response.data.question.metas) {
                            this.metas = response.data.question.metas;
                        }
                        this.oneditChange(this.form.question_type);
                        this.isChanged = true;
                        this.isUpdate = true;
                    }
                }).catch();
            },
            getQuestionTypes(){
                axios.get('/api/getQuestionTypes/'+this.$route.params.id).then(response => {
                    this.modules = response.data.modules;
                    this.sets = response.data.set;
                });
            },
            editQuestionsById(){
                if(this.isEditSection){
                   console.log(this.$route.params.id)
                }
            },
            oneditChange(id) {
                axios.get("/bpc-admin/types/detail/" + id).then((response) => {
                    this.field = response.data;
                }).catch((err) => {
                    this.errors = err.response.data.errors;
                });
            },
            onChange(e) {
                this.type_id = e.target.value;
                this.isChanged = true;
                axios.get("/bpc-admin/types/detail/" + this.type_id).then((response) => {
                    $(e.target).closest("form")[0].reset();
                    this.field = response.data;

                }).catch((err) => {
                    this.errors = err.response.data.errors;
                });
            },
            handleSubmit() {
                var form = document.getElementById('formQuestion');
                var formData = new FormData(form);
                formData.append('set_id', this.$route.params.id);
                this.isSubmited = true;
                axios.post("/bpc-admin/sets/questions/add/data", formData).then(response => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    });
                    //this.form.reset();
                    this.isSubmited = false;
                }).catch((err) => {
                    this.isSubmited = false;
                    this.form.onFail(err.response.data.errors);
                });
            },
            handleUpdateSubmit() {
                var form = document.getElementById('formQuestion');
                var formData = new FormData(form);
                 formData.append('set_id', this.$route.params.id);
                this.isSubmited = true;
                axios.post("/bpc-admin/sets/questions/update/data/" + this.$route.params.question, formData).then((
                    response) => {
                    Toast.fire({
                        type: 'success',
                        title: response.data.message
                    })
                    this.isSubmited = false;
                }).catch((err) => {
                    this.isSubmited = false;
                    this.errors = err.response.data.errors;
                });
            },
        }

    }

</script>
