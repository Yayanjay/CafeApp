<template>
  <v-app>
    <v-main v-if="userInfo.users != null">
      <router-view></router-view>
    </v-main>
    <v-main v-if="userInfo.users == null">
      <Auth/>
    </v-main>
  </v-app>
</template>

<script>
import Auth from './views/Auth';
export default {
  name: 'App',
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('persist-info')).user,
    }
  },
  components: {
    Auth
  }
}
</script>

<style lang="scss">

</style>