<template>
  <v-card outlined>

    <div class="d-flex">
      <div>
        <v-img :src="item.product_image"/>
      </div>

      <div class="d-flex flex-column justify-center">
        <v-card-title>
          {{ item.product_name }}
        </v-card-title>

        <v-card-subtitle>
          Rp {{ item.product_price }}
        </v-card-subtitle>
      </div>
    </div>

  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "acrtttt",
  data() {
      return {
        item: this.$store.state.product
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

</style>