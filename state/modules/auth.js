import axios from 'axios'
export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        },
    },
    actions: {
        async initStore({ commit }) {
            return axios.get('/userProfile').then(response => response.data)
                .then(userInfo => {
                    commit('SET_USER_INFO', userInfo)
                })
        }
    },
    mutations: {
        SET_USER_INFO(state, data) {
            state.userInfo = data;
        }
    }
}