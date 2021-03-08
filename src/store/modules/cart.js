
const state = {
    carts : []
}
const getters = {
    GET_CART: (state) => {
        return state.carts
    },
    CALCULATE: (state) => {
        let price = 0
        for (const key in state.carts) {
            price = price + state.carts[key].product.product_price * state.carts[key].qty
        }
        return price
    },
    QUANTITY: (state) => {
        let qty = 0 
        for (const key in state.carts) {
            qty = qty + state.carts[key].qty
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
      const productInCart = state.carts.find(data => data.product_id === item.product_id)
      if (!productInCart) {
        state.carts.push({ ...item, qty: 1 });
      } else {
        productInCart.qty++;
      }
    },
    REMOVE_FROM_CART(state, id) {
      state.carts = state.carts.filter((item) => item.product_id !== id);
    },
    ADD_QTY(state, id) {
      const productInCart = state.carts.find((data) => data.product_id === id);
      productInCart.qty++;
    },
    REDUCE_QTY(state, id) {
      const productInCart = state.carts.find((data) => data.product_id === id);
      if (productInCart.qty > 1) {
        productInCart.qty--;
      } else {
        state.carts.splice(state.carts.indexOf(productInCart, 1));
        // state.carts[id].pop()
      }
    },
    EMPTY_CART(state) {
      state.carts = []
    }
    
}

export default {
    state,
    getters,
    actions,
    mutations
}