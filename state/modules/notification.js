import axios from 'axios'
export default {
    namespaced: true,
    state: {
        notifications: []
    },
    getters: {
        getNotifications(state) {
            return state.notifications;
        },
    },
    actions: {
        async initStore({ commit }) {
            axios.get('/getNotifications').then(response => response.data)
                .then(notifications => {
                    commit('SET_NOTIFICATIONS', notifications)
                }).catch();

        }
    },
    mutations: {
        SET_NOTIFICATIONS(state, data) {
            state.notifications = data;
        }
    }
}