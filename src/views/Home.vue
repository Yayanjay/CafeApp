<template>
  <div class="Home">
      <Navbar/>
      <v-row >
          <v-col class="pr-1" cols="9">
            <v-container class="home main pr-0">
                Homepage
                <Cards/>
                <!-- <Iteration/> -->
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
// import Iteration from '../components/iteration.vue'
import Navbar from '../components/Navbar'

export default {
    name: 'Home',
    components: {
        Cards,
        Cart,
        // Iteration,
        Navbar
    },

}
</script>

<style>
.home {
  background-color: #f4f9f9;;
}
.main {
  overflow: auto;
}
</style>