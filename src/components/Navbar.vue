<template>
  <div class="navbar">
      <v-toolbar flat >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="title">
          <v-toolbar-title>Cafe App</v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="cekinfo"></v-btn>
        <v-spacer></v-spacer>
        <v-btn plain @click="logout">
          <v-label class="mr-2">Logout</v-label>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
            <h2>Cafe App</h2>
            <div class="text-caption grey--text">Enjoy ur day^^</div>
          <v-list-item-group v-model="group" active-class="deep-cream--text text--accent-4">
            <div v-if="userInfo.users.role === 'user'">
              <v-list-item 
                v-for="item in userItems"
                :key="item.id"
                router :to="item.route"
              >
                <v-icon left large>{{ item.icon }}</v-icon>
                <v-list-item-title large>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </div>
            <div v-if="userInfo.users.role === 'admin'">
              <v-list-item 
                v-for="item in adminItems"
                :key="item.id"
                router :to="item.route"
              >
                <v-icon left large>{{ item.icon }}</v-icon>
                <v-list-item-title large>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data: () => ({
    drawer: false,
    group: null,
    userInfo: JSON.parse(localStorage.getItem('persist-info')).User,
    userItems: [
      {id: '1', icon: 'mdi-home', title: 'Home', route: '/'},
      {id: '3', icon: 'mdi-history', title: 'History', route: '/history'},
      {id: '4', icon: 'mdi-account', title: 'Account', route: '/account'},
    ],
    adminItems: [
      {id: '1', icon: 'mdi-home', title: 'Home', route: '/'},
      {id: '2', icon: 'mdi-silverware', title: 'Product', route: '/product'},
      {id: '3', icon: 'mdi-history', title: 'History', route: '/history'},
      {id: '4', icon: 'mdi-account', title: 'Account', route: '/account'},
    ],
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    ...mapActions(['logout', 'EMPTY_CART']),
    cekinfo() {
      console.log(this.userInfo)
    }
  }
}
</script>

<style>

</style>