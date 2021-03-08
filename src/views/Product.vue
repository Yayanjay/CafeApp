<template>
  <div class="product">
      <Navbar/>
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
import Navbar from '../components/Navbar'

export default {
    name: 'Product',
    components: {
        ProductTable,
        Navbar
    }
}
</script>

<style>

</style>