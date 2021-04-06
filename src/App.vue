<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('persist-info')),
    }
  },
}
</script>

<style lang="scss">

</style>