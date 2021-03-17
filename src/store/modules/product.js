import Axios from 'axios'

const state = {
    product : []
}

const getters = {
    GET_PRODUCT: (state) => {
        return state.product
    }
}
const actions = {
    FETCHING({commit}) {
        Axios({
            method: 'GET',
            url: 'http://localhost:3000/api/product',
        })
            .then((res) => {
                commit("SET_PRODUCT", res.data.result)
            }).catch((err) => { 
                console.log(err)
            });
    },
}
const mutations = {
    SET_PRODUCT(state, prod) {
        state.product = prod
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}