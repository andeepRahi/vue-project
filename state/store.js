import Vue from "vue";
import Vuex from "vuex";
import modules from './modules'
Vue.use(Vuex);
const store = new Vuex.Store({
    strict: true,
    state: {
        title: "YOUR APP TITLE GOES HHERE",
        categoryDropdown: {
            'listening': "Listening",
            'writting': "Writting",
            'reading': "Reading",
            'speaking': "Speaking",
        },
        typedropdown: {
            'text': "Text",
            'textarea': "Textarea",
            'select': "Select",
            'file': "Audio/Image",
            "checkbox": "Checkbox",
            "radio": "radio",
            "repeator": "Repeator"
        }
    },
    modules
});

for (const moduleName of Object.keys(modules)) {
    if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
        store.dispatch(`${moduleName}/initStore`);
    }
}
export default store;