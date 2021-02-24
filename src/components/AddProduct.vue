<template>
  <div class="addProduct">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="purple lighten-1" dark v-bind="attrs" v-on="on">
            Add Product
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Product Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-text-field 
                type="text"
                label="Name" 
                v-model="addForm.product_name"
                required 
              />
              <v-text-field 
                type="number"
                label="Price" 
                v-model="addForm.product_price"
                required 
              />
              <v-file-input
                type="file"
                label="Image" 
                ref="file"
                required 
              />
              <v-select :items="items" label="Category" required v-model="addForm.product_category"></v-select>
              <v-btn color="warning" @click="peek">peek</v-btn>
            </v-form>
          </v-container>
        </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="pink lighten-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="pink lighten-1" text @click="submitData()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "AddProduct",
    data() {
        return {
            dialog: false,
            addForm: {
                product_name: "",
                product_price: null,
                product_image: null,
                product_category: ""
            },
            items: ["Food", "Beverage"]
        }
    },
    methods: {
      submitData() {
            let newForm = new FormData()
                newForm.append("product_name", this.product_name)
                newForm.append("product_price", this.product_price)
                newForm.append("product_image", this.$refs.file.files[0])
                newForm.append("product_category", this.product_category)

            axios
              .post(process.env.API_URL+'product', newForm, {
                headers: {
                  'Content-Type':'multipart/form-data'
                }
              })
              .then((res) => {
                console.log(res.data)
                this.addForm.product_name=null,
                this.addForm.product_price=null,
                this.$refs.file.value=null,
                this.addForm.product_category=null
              }).catch((err) => {
                console.log(err)
              });
              
        },
        peek() {
          console.log(this.addForm)
        }
    }

}
</script>

<style>

</style>