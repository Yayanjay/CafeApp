<template>
  <div class="cart">
    <v-subheader class="d-flex justify-center">
      <h3>CART</h3>
      <v-badge inline>
        <span slot="badge">{{ totalQty }}</span>
      </v-badge>
    </v-subheader>

    <ul class="list-group ma-0 pa-1">
      <v-list class="list " v-for="item in GET_CART" :key="item.product_id">
        
        <div class="media d-flex">
            <v-icon aria-hidden="true" small dense @click="REMOVE_ITEM_FROM_CART(item.product_id)" right color="error">mdi-close</v-icon>
            <v-img :src="item.product_image" width="20px" class="ma-2"/>
            <div class="media-body ml-1" style="width: 10pxs">
                <h3 class="ma-0">{{item.product_name}}
                </h3>
                <v-card-subtitle class="ma-0 pa-0 disable">Rp {{item.product_price}}</v-card-subtitle>
                <v-btn x-small @click="REDUCE_QTY(item.product_id)" color="error" flat>
                  <v-icon>mdi-minus</v-icon>
                </v-btn> 
                X {{item.qty}}
                <v-btn x-small @click="ADD_QTY(item.product_id)" color="warning" flat>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
      </v-list>
    </ul>

    <div class="checkout mt-2 mx-5" v-if="totalQty">
      <v-row>
        <v-col cols="7">
          <h3>Total: </h3>
        <p class="caption">*Belum termasuk PPn</p>
        </v-col>
        <v-col cols="5" class="d-flex flex-row-reverse">
        <p>Rp {{calculated}}</p>
        </v-col>
      </v-row>
      <v-btn color="#00ACC1" dark width="95%" @click.stop="dialog = true" >
        <v-card-title>checkout</v-card-title>
      </v-btn>
      <v-btn color="#ff75a0" dark width="95%" class=" mt-2" @click="EMPTY_CART">
        <v-card-title>Cancel</v-card-title>
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline mb-2">Checkout</v-card-title>
        <v-card-subtitle>
          Cashier : {{formHistory.cashier}} <br>
          Receipt Number : {{formHistory.invoices}}
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="d-flex" v-for="item in GET_CART" :key="item.product_id">
          <v-row>
            <v-col cols="6">
              <h4>{{ item.product_name }}</h4>
            </v-col>
            <v-col cols="2">
              <h4>{{ item.qty }}X</h4>
            </v-col>
            <v-col cols="4" class="d-flex flex-row-reverse">
              <h4>{{ item.product_price }}</h4>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <h4>PPn</h4>
              <h4 >Total</h4>
            </v-col>
            <v-col cols="2">
              <h4>10%</h4>
            </v-col>
            <v-col cols="4" >
              <h4 class="d-flex flex-row-reverse">{{ppn}}</h4>
              <h4 class="d-flex flex-row-reverse">{{ calculated + ppn }}</h4>
            </v-col>
          </v-row>

        <div >
        </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false "
          >
            Disagree
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="addHistory()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Axios from 'axios'

export default {
  name: "Cart",
  data() {
    return {
      dialog: false,
      formHistory: {
        invoices: null,
        cashier: "Zayyan",
        orders: [],
        amount: null
      },
    }
  },
  methods: {
    ...mapActions(["REMOVE_ITEM_FROM_CART", "ADD_QTY", "REDUCE_QTY", "EMPTY_CART"]),
    addHistory() {
      let order = []

      this.GET_CART.forEach((value) => {
        order.push(value.product_name)
      })

      this.formHistory.invoices = "#" + Math.floor(Math.random()*900) + 100;
      this.formHistory.cashier = "Zayyan"
      this.formHistory.orders = order.join(', ').toString()
      this.formHistory.amount = this.calculated + (this.calculated * (10/100))

      let historyData = {
        invoices : this.formHistory.invoices,
        cashier : this.formHistory.cashier,
        orders : this.formHistory.orders,
        amount : this.formHistory.amount,
      }
      console.log(historyData)
      Axios.post('http://localhost:3000/api/history', historyData)
        .then(() => {
          alert('Successfully Ordered')
          localStorage.removeItem('cart')
          location.reload()
        }).catch((err) => {
          console.log(err)
        });
    },
    genReceipt() {
      let number = Math.random()*10
      return this.invoices = number
    },

  },
  computed: {
    ...mapGetters(["GET_CART", "CALCULATE"]),
    totalQty() {
      return this.GET_CART.reduce((a, b) => a+b.qty, 0)
    },
    calculated() {
      let price = 0
      for (const key in this.GET_CART) {
          price += Number(this.GET_CART[key].product_price) * this.GET_CART[key].qty
      }
      return price
    },
    ppn() {
      let ppn = this.calculated * (10/100)
      return ppn
    },
  }
}
</script>

<style>
.btn-qty {
    border-radius: 50em;
    width: 30px;
}
.media {
    width: 95%;
}
.list-group {
  overflow: auto;
  height: 52vh;
}

</style>