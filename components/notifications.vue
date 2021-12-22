<template>
    <div>
        <a class="nav-link" data-toggle="dropdown" href="#" @click="reCheck()">
               <i class="fas fa-bell"></i>
                <span class="badge badge-warning navbar-badge" v-if="count>0">{{count}}</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span class="dropdown-item dropdown-header" v-if="count>0">{{count}} New Notifications</span>
                <span class="dropdown-item dropdown-header" v-if="count==0">No New Notifications</span>
                <div v-for="notification in notifications" :key="notification.id">
                    <div class="dropdown-divider"></div>
                    <a :href="notification.data.url" class="dropdown-item">
                        <i class="fas fa-envelope mr-2"></i> {{notification.data.title}}
                        <span class="float-right text-muted text-sm">{{notification.created_at|ago}}</span>
                    </a>
                </div>

                <div class="dropdown-divider"></div>
                <a href="/bpc-admin/notifications" class="dropdown-item dropdown-footer">See All Notifications</a>
            </div>
    </div>
</template>

<script>
import moment from 'moment';
    export default {
        data() {
            return {
                count: 0,
                notifications:[],
                loading:true,
            };
        },
        methods: {
            getNotifications(){
                this.loading = true;
                axios.get('/getNotifications')
                    .then(response => {
                        this.notifications = response.data.notifications;
                        this.count = response.data.count;
                        this.loading = false;
                    }).catch();
            },
            reCheck(){
                FireEvent.$emit('check');
                axios.get('/readNotifications')
                    .then(response => {
                        this.count = 0;
                    });
            },
        },
        filters:{
            ago : function (time){
               return moment(time).fromNow();
            }
        },
        mounted() {
            this.getNotifications();
            FireEvent.$on('check',() => {
                this.getNotifications();
            });
        },
    }
</script>

<style scoped>

.dropdown-menu{
    padding: 0 0 0.5rem 0;
}

</style>
