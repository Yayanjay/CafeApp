<template>
 <div>
    <v-data-table
      :headers="headers"
      :items="history"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
 </div>
</template>

<script>
import Axios from 'axios'
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Invoice',
            align: 'start',
            sortable: false,
            value: 'invoices',
          },
          { text: 'Cashier', value: 'cashier' },
          { text: 'Orders', value: 'orders' },
          { text: 'Amount', value: 'amount' },
          { text: 'Created at', value: 'createdAt' },
        ],
        history : []
      }
    },
    methods: {
      fetch() {
        Axios.get('http://localhost:3000/api/history')
          .then((res) => {
            console.log(res.data.result)
            this.history = res.data.result
            console.log(this.history)
          }).catch((err) => {
            console.log(err)
          });
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>