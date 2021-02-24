import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home'
import Product from './views/Product'
import History from './views/History'
import Account from './views/Account'


Vue.use(VueRouter);

const mainRouter = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/product',
            name: 'Product',
            component: Product
        },
        {
            path: '/history',
            name: 'History',
            component: History
        },
        {
            path: '/account',
            name: 'Account',
            component: Account
        },
    ]
})

export default mainRouter;