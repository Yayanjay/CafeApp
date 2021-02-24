<template>
  <div class="cart">
    <v-subheader class="d-flex justify-center">
      <h3>CART</h3>
      <v-badge inline>
        <span slot="badge">{{ totalQty }}</span>
      </v-badge>
    </v-subheader>

    <ul class="list-group">
      <v-list class="list-group-item" v-for="item in GET_CART" :key="item.product_id">
        <button @click="REMOVE_ITEM_FROM_CART(item.product_id)">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="media">
            <v-img :src="item.product_image" width="35%"/>
            <div class="media-body">
                <h6 class="mt-0"><strong>{{item.product_name}}</strong></h6>
                <p class="disabled text-right">
                <v-btn @click="REDUCE_QTY(item.product_id)" color="error" small>
                  <v-icon>mdi-minus</v-icon>
                </v-btn> 
                X {{item.qty}}
                <v-btn @click="ADD_QTY(item.product_id)" color="warning" small>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                  <p>@{{item.product_price}}</p>
            </div>
        </div>
      </v-list>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Cart",
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(["REMOVE_ITEM_FROM_CART", "ADD_QTY", "REDUCE_QTY", "EMPTY_CART"])
  },
  computed: {
    ...mapGetters(["GET_CART"]),
    totalQty() {
      return this.GET_CART.reduce((a, b) => a+b.qty, 0)
    }
  }
}
</script>

<style>
.btn-qty {
    border-radius: 50em;
    width: 30px;
}
.media {
    width: 90%;
    overflow: auto;
}
.media-body {
    text-align: left;
}
.cart-content {
    height: 63vh;
}

</style>