<template>
  <div class="card d-flex flex-wrap justify-space-around justify-center" >
      <!-- <v-btn @click="test" x-small>
          test button
      </v-btn> -->  
      <v-card class="ma-3" v-for="product in GET_PRODUCT" :key="product.product_id">
          <v-img :src="product.product_image" width="100%"></v-img>
          <v-card-title>
              {{ product.product_name }}
          </v-card-title>
          <v-card-subtitle>
              Rp {{ product.product_price }}
          </v-card-subtitle>
          <v-card-action >
              <v-btn class="ma-3 mt-0" width="90%" color="#fce38a" @click="ADD_TO_CART(product)">Add to Cart</v-btn>
          </v-card-action>
      </v-card>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "Card",
    data() {
        return {
            products: []
        }
    },
    methods: {
        ...mapActions(["FETCHING", "ADD_TO_CART"]),
        test() {
            console.log(this.GET_CART)
        }

    },
    computed: {
        ...mapGetters(["GET_PRODUCT", "GET_CART"])
    },
    mounted() {
        this.FETCHING()
    }
}
</script>

<style>
.card {
    overflow: auto;
}
</style>