<template>
  <div class="history">
    <Navbar/>
    <v-row>
      <v-col>
        <v-container>
          History Page
          <HistoryTable/>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import Navbar from '../components/Navbar'


export default {
  name: "History",
  components: {
    Navbar,
    HistoryTable
  }
}
</script>

<style>

</style>