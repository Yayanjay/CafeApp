<template>
  <div class="Home">
      <v-row >
          <v-col class="pr-1" cols="9">
            <v-container class="home pr-0">
                Homepage
                <Cards/>
            </v-container>
          </v-col>
          <v-col class="pl-1" cols="3">
              <v-container class="home pl-0">
                <Cart/>
              </v-container>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import Cards from '../components/Cards'
import Cart from '../components/Cart'

export default {
    name: 'Home',
    components: {
        Cards,
        Cart
    }

}
</script>

<style>
.home {
  background-color: #f4f9f9;;
}
</style>