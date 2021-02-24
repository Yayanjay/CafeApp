
const state = {
    cart : []
}
const getters = {
    GET_CART: (state) => {
        return state.cart
    },
    CALCULATE: (state) => {
        let price = 0
        for (const key in state.cart) {
            price = price + state.cart[key].product.price * state.cart[key].qty
        }
        return price
    },
    QUANTITY: (state) => {
        let qty = 0 
        for (const key in state.cart) {
            qty = qty + state.cart[key].qty
        }
        return qty
    }
}
const actions = {

    ADD_TO_CART({ commit }, item) {
      commit("ADD_ITEM_TO_CART", item);
    },
    REMOVE_ITEM_FROM_CART({ commit }, id) {
      commit("REMOVE_FROM_CART", id);
    },
    ADD_QTY({ commit }, id) {
      commit("ADD_QTY", id);
    },
    REDUCE_QTY({ commit }, id) {
      commit("REDUCE_QTY", id);
    },
    EMPTY_CART({ commit }) {
      commit("EMPTY_CART");
    }
}
const mutations = {

    ADD_ITEM_TO_CART(state, item) {
      const productInCart = state.cart.find(data => data.product_id === item.product_id)
      if (!productInCart) {
        state.cart.push({ ...item, qty: 1 });
      } else {
        productInCart.qty++;
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.cart = state.cart.filter((item) => item.product_id !== id);
    },
    ADD_QTY(state, id) {
      const productInCart = state.cart.find((data) => data.product_id === id);
      productInCart.qty++;
    },
    REDUCE_QTY(state, id) {
      const productInCart = state.cart.find((data) => data.product_id === id);
      if (productInCart.qty > 1) {
        productInCart.qty--;
      } else {
        state.cart.splice(state.cart.indexOf(productInCart, 1));
      }
    },
    EMPTY_CART(state) {
      state.cart = []
    }
    
}

export default {
    state,
    getters,
    actions,
    mutations
}