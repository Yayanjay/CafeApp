import Axios from 'axios'

const state = {
    history: [],
}

const getters = {
    GET_HISTORY: (state) => {
        return state.history
    }
}

const actions = {
    FETCH_HISTORY({commit}) {
        Axios
            .get(`http://localhost:3000/api/history`)
            .then((res) => {
                commit("SET_HISTORY", res.data.result)
            }).catch((err) => {
                console.log(err)
            });
    },
}

const mutations = {
    SET_HISTORY(state, history) {
        state.history = history
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}