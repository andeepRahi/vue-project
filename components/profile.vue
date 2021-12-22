<template>
    <div>
        <form action="/updateProfile" method="POST" @submit.prevent='updateProfile()'>
            <div class="modal-body">
                <div class="row">
                    <div class="col-10 offset-1">
                        <div class="row">
                            <div class="col-8">
                                <div class="form-group">
                                    <label for="first_name">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        class="form-control"
                                        :class=" { 'is-invalid': form.errors.has('first_name') }"
                                        placeholder="First Name"
                                        v-model="form.first_name"
                                        >
                                        <has-error :form="form" field="first_name"></has-error>

                                </div> <!-- first name -->
                                <div class="form-group">
                                    <label for="last_name">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        class="form-control"
                                        :class=" { 'is-invalid': form.errors.has('last_name') }"
                                        placeholder="last Name"
                                        v-model="form.last_name"
                                        >
                                        <has-error :form="form" field="last_name"></has-error>
                                </div> <!-- last name -->
                                <div class="form-group">
                                    <label for="display_name">Display Name</label>
                                    <input
                                        type="text"
                                        name="display_name"
                                        id="display_name"
                                        class="form-control"
                                        :class="{ 'is-invalid': form.errors.has('display_name') }"
                                        placeholder="Display Name"
                                        v-model="form.display_name"
                                        >
                                        <has-error :form="form" field="display_name"></has-error>

                                </div> <!--  display name  -->
                            </div>
                            <div class="col-4">
                                <div class="form-group pt-2">
                                    <div style="position:relative;">
                                        <input type="file" class="form-control-file"  :class=" { 'is-invalid': form.errors.has('image')}" id="profile" style="visibility:hidden;" name="image" @change="fileUpload" />
                                        <label for="profile"><img :src="image" onerror="this.src='https://picsum.photos/150/150/?blur';" class="img-thumbnail" width="150" /></label>

                                        <has-error :form="form" field="image"></has-error>
                                        <i class="fas fa-times-circle text-danger" id="cross" title="remove image" data-toggle="tooltip" style="visibility:hidden;" @click="removeSelectedImage()"></i>
                                    </div>
                                </div> <!-- image -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="contact">Phone no:</label>
                            <input
                                type="text"
                                name="contact"
                                id="contact"
                                class="form-control"
                                :class="{ 'is-invalid': form.errors.has('image')}"
                                placeholder="Phone number"
                                v-model="form.phone"
                                >

                            <has-error :form="form" field="display_name"></has-error>

                        </div> <!--  phone number -->
                        <div class="form-group">
                            <label for="dob">Date of Birth</label>
                            <input
                            type="date"
                            name="dob"
                            id="dob"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.has('dob')}"
                            placeholder="Date of Birth"
                            v-model="form.dob"
                            >
                            <has-error :form="form" field="dob"></has-error>


                        </div> <!-- dob -->
                        <div class="form-group">
                            <label for="old_password">Current Password</label>
                            <input
                            type="password"
                            name="old_password"
                            id="old_password"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.has('old_password')}"
                            placeholder="Current Password"
                            v-model="form.old_password"
                                >
                            <has-error :form="form" field="old_password"></has-error>
                        </div> <!-- old password -->
                        <div class="form-group">
                            <label for="password">password</label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.has('password')}"
                            placeholder="Password"
                            v-model="form.password"
                           >
                           <has-error :form="form" field="dob"></has-error>
                        </div> <!--  password -->
                        <div class="form-group">
                            <label for="password_confirmed">Confirm Password</label>
                            <input
                            type="password"
                            name="password_confirmed"
                            id="password_confirmed"
                            class="form-control"
                            :class="{ 'is-invalid': form.errors.has('password_confirmed')}"
                            placeholder="Confirm Password"
                            v-model="form.password_confirmed"
                            >
                            <has-error :form="form" field="dob"></has-error>
                        </div> <!--  confirm password -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Update Profile</button>
            </div>
        </form>
    </div>
</template>

<script>

import { Form, HasError} from 'vform';
import objectToFormData from "./../objectToFormData";

    export default {
        components:{HasError},
        data(){
            return {
                form: new Form({
                    first_name: '',
                    last_name: '',
                    display_name: '',
                    phone: '',
                    dob: '',
                    image:'',
                    password:'',
                    old_password:'',
                    confirm_password:'',
                    remove: 0
                }),
                image: '',
            };
        },
        methods:{
            updateProfile(){
            this.form
                .submit("post", "/updateProfile", {
                transformRequest: [
                    function(data, headers) {
                    return objectToFormData(data);
                    }
                ]
                })
                .then(({ data }) => {
                $("#userProfile").modal("hide");
                Toast.fire({
                        type: 'success',
                        title: data.message
                    });
                this.form.reset();
                this.getUserProfile();
                })
                .catch(() => {
                });
            },
            fileUpload(event){
                this.form.image = event.target.files[0];
                this.image = window.URL.createObjectURL(this.form.image);
                document.getElementById('cross').style.visibility = 'visible';
                this.form.remove = 0;
            },
            removeSelectedImage(){
                this.form.remove = 1;
                this.image = '';
                this.form.image = '';
                document.getElementById('cross').style.visibility = 'hidden';
            },
            getUserProfile(){
                axios.get('/userProfile').then(response => {
                    this.form.fill(response.data);
                    this.image = response.data.image;
                    if(this.image!=='/storage/uploads/profile/default.png'){
                        document.getElementById('cross').style.visibility = 'visible';
                    }
                }).catch();
            }
        },
        mounted() {
            this.getUserProfile();
        },
    }
</script>

<style scoped>
#cross{
    position: absolute;
    left: 142px;
    top: 26px;

}
.form-group>label{
    color: black;
    font-size: 1rem;
}
</style>
