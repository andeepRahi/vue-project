import Vue from "vue";
import Router from "vue-router";
import QuestionSets from "./components/Sets/QuestionSet.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";
import Category from "./components/Category/Category.vue";
import QuestionList from "./components/Questions/QuestionList.vue";
import QuestionForm from "./components/Questions/QuestionComponent.vue";
import UserList from "./components/users/userslist.vue";
import ListNotifications from "./components/list-notifications.vue";
import addEditUser from "./components/users/addEdit.vue";
import roles from "./components/roles and permissions/roles.vue";

Vue.use(Router);
export default new Router({
    mode: "history",
    linkExactActiveClass: 'active',
    base: process.env.BASE_URL,
    routes: [{
            path: "/bpc-admin/",
            name: "Dashboard",
            component: Dashboard
        },
        {
            path: "/bpc-admin/category/lists",
            name: "CategoryList",
            component: Category
        },
        {
            path: "/bpc-admin/category/edit/:id",
            name: "CategoryEdit",
            component: Category
        },
        {
            path: "/bpc-admin/sets/:id/questions/lists",
            name: "QuestionsLists",
            component: QuestionList
        },
        {
            path: "/bpc-admin/sets/lists",
            name: "sets",
            component: QuestionSets
        },
        {
            path: "/bpc-admin/sets/:id/questions/edit/:question",
            name: "QuestionEdit",
            component: QuestionForm
        },
        {
            path: "/bpc-admin/sets/:id/questions/create",
            name: "QuestionCreate",
            component: QuestionForm
        },
        {
            path: "/bpc-admin/user/lists",
            name: "Users",
            component: UserList
        },
        {
            path: "/bpc-admin/notifications",
            name: "notifications",
            component: ListNotifications
        },
        {
            path: "/bpc-admin/user/create",
            name: "CreateUsers",
            component: addEditUser
        },
        {
            path: "/bpc-admin/user/edit/:userId",
            name: "UpdateUsers",
            component: addEditUser,
            props: true
        },
        {
            path: "/bpc-admin/role/list",
            name: "rolesList",
            component: roles,
            props: true
        },
        {
            path: '*'
        }


    ]
});