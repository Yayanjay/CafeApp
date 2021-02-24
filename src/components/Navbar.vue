<template>
  <div class="navbar">
      <v-toolbar >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="title">
          <v-toolbar-title>Cafe App</v-toolbar-title>
        </div>
      </v-toolbar>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
            <h2>Cafe App</h2>
            <div class="text-caption grey--text">Enjoy ur day^^</div>
          <v-list-item-group v-model="group" active-class="deep-indigo--text text--accent-4">
            <v-list-item 
                v-for="item in items"
                :key="item.id"
                router :to="item.route"
            >
                <v-icon left large>{{ item.icon }}</v-icon>
                <v-list-item-title large>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    data: () => ({
      drawer: false,
      group: null,
      items: [
            {id: '1', icon: 'mdi-home', title: 'Home', route: '/'},
            {id: '2', icon: 'mdi-silverware', title: 'Product', route: '/product'},
            {id: '3', icon: 'mdi-history', title: 'History', route: '/history'},
            {id: '4', icon: 'mdi-account', title: 'Account', route: '/account'},
          ]
    }),

    props: {

    },

    watch: {
      group () {
        this.drawer = false
      },
    },
}
</script>

<style>

</style>