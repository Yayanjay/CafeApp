<template>
  <div >
    <div class="Home" v-if="isAuth == true">
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
    <div class="auth" v-else>
      <Auth/>
    </div>
  </div>
</template>

<script>
import Cards from '../components/Cards'
import Cart from '../components/Cart'
import Navbar from '../components/Navbar'
import Auth from '../views/Auth'

export default {
    name: 'Home',
    components: {
        Cards,
        Cart,
        Navbar,
        Auth
    },
    data() {
      return {
        isAuth : JSON.parse(localStorage.getItem('user')).User.isAuth
      }
    },
    mounted() {
      if (this.user === null) {
        this.$router.push({ path: "/auth"}).catch((err) => {err})
      }
    }

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