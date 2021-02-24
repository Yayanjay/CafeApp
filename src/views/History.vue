<template>
  <div class="history">
    <v-row>
      <v-col>
        <Navbar />
        <v-container>
          History Page
          <Table/>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Table from '../components/table'

export default {
  name: "History",
  components: {
    Table,
    Navbar,
    }
}
</script>

<style>

</style>