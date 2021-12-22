/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import store from "./state/store";
import router from "./router";
import Form from "./_global/Form";
Vue.config.productionTip = false;
Vue.component('ring-loader', require('./components/RingLoader.vue').default);
Vue.component('question-field-type', require('./components/FieldTypeComponent.vue').default);
Vue.component('my-profile', require('./components/profile.vue').default);
Vue.component('notification-component', require('./components/notifications.vue').default);

window.Swal = require('sweetalert2');
window.FireEvent = Vue.prototype.$eventBus || new Vue
window.Laravel = {
    "baseUrl": "https:\/\/bestpte.test\/"
}
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
});
window.Toast = Toast;
window.BpcForm = Form;
if (document.getElementById('app')) {
    new Vue({
        router,
        store,
    }).$mount("#app");
}