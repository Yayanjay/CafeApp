<template>
  <div class="product">
      <v-row>
          <v-col color="purple">
            <v-container>
                Product Page
                <ProductTable/>
            </v-container>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import ProductTable from '../components/ProductTable'

export default {
    name: 'Product',
    components: {
        ProductTable
    }
}
</script>

<style>

</style>