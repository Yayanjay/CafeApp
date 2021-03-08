import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

import Product from './modules/product';
import Cart from './modules/cart';
import User from './modules/user';

Vue.use(Vuex);

const userState = persistedState({
    key: 'persist-info',
    paths: ['User.users', 'User.isAuth',]
})

export default new Vuex.Store({
    modules: {
        Cart,
        Product,
        User
    },
    plugins: [userState]
})