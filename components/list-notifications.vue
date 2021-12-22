<template>
    <div class="container mt-2">
        <div class="m-b-md">
            <h3 class="m-b-none pull">All Notifications</h3>
        </div>
        <div class="clearfix"></div>
        <div class="card">
            <ring-loader :loading="loading"></ring-loader>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item  list-group-item-action pt-2" v-for="notification in notifications" :key="notification.id">
                        <a :href="notification.data.url">
                        <span></span>
                        <p class="text-capitalize"><b>{{notification.data.title}}</b></p>
                        <p>{{notification.data.body}} <code class="float-right mr-5">{{notification.created_at|ago}}</code></p>
                        </a>
                    </li>
                    <li class="list-group-item list-group-item-action pt-2 text-center" v-if="(count-take)>0" ><a @click="loadMore">See Older Notifications</a></li>
                </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
    export default {
        data() {
            return {
                notifications:[],
                loading:true,
                take:4,
                count:0
            }
        },
        methods:{
            getNotifications(){
                this.loading = true;
                axios.get('/getNotificationsAll?take='+this.take)
                .then(response => {
                    this.notifications = response.data.notifications;
                    this.count = response.data.count;
                    this.loading = false;
                })
                .catch();
            },
            loadMore(){
                this.take += 4;
                this.getNotifications();


            }
        },
        filters:{
            ago: function(time){
                return moment(time).fromNow();
            }
        },
        mounted() {
            this.getNotifications();
        },
    }
</script>

<style scoped>

li>a:hover{
    text-decoration:none;
    color:#222;
}

li>a{
    text-decoration: none;
    color:#111;
}

p{
    margin-bottom: 0;
}
</style>
