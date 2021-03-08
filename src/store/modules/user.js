import Axios from "axios"

const state = {
    users: null,
    isAuth: false,
}

const getters = {
    getUsers: (state) => {
        return state.users
    },
    getIsAuth: (state) => {
        if (state.isAuth != null) {
            return state.isAuth
        }
        return false
    },
}

const actions = {
    login({ commit }, form) {
        return new Promise((resolve, reject) => {
            Axios({
                method : "post",
                url : "http://localhost:3000/api/auth",
                headers : {
                    "Content-type" : "application/json"
                },
                data : form,
                })
                .then((res) => {
                    resolve(res.data)
                    
                    if (res.data.result[0].msg != 'Succesfully created token') {
                        return alert(res.data.result[0].msg != 'Succesfully created token');
                    }
                    else {
                        commit('setAuth')
                        commit('setUsers', res.data.result[0])
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(new Error(err))
                });
        })
    },
    logout({ commit }) {
        let check = confirm("Are you sure you want to logout?")
        if (check) {
            commit("delUsers")
            commit("setAuth")
            location.reload()
        }
    },
}

const mutations = {
    setUsers(state, user) {
        state.users = user
    },
    setAuth(state) {
        state.isAuth = !state.isAuth
    },
    delUsers(state) {
        state.users = null
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}