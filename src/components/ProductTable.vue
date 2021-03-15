<template>
  <v-data-table
    :headers="headers"
    :items="GET_PRODUCT"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:item.product_image="{item}">
      <div class="pa-2">
        <v-img :src="item.product_image" :alt="item.product_name" max-width="200px"></v-img>
      </div>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Menus</v-toolbar-title>
        <v-spacer></v-spacer>
            <v-btn
              color="primary"
              dark
              class="mb-2"
              @click.stop="dialog = true"
            >
              New Item
            </v-btn>
            <v-btn
              color="warning"
              dark
              class="mb-2 ml-2"
              @click.stop="dialogEdit = true"
            >
              Edit Item
            </v-btn>
            <v-btn
              color="error"
              dark
              class="mb-2 ml-2"
              @click.stop="dialogDelete = true"
            >
              Delete Item
            </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card class="addItem">
            <v-card-title>
              <span class="headline">Add Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="addItem.Name"
                      label="Product Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="addItem.Price"
                      label="Product Price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      small-chips
                      v-model="addItem.Image"
                      label="Product Image"
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="items"
                      v-model="addItem.Category"
                      label="Product Category"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save(addItem)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card class="editItem">
            <v-card-title>
              <span class="headline">Edit Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editItem.Id"
                      label="Product Id"
                      placeholder="type the product id that you want to update"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editItem.Name"
                      label="Product Name"
                      placeholder="type the new product name "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editItem.Price"
                      label="Product Price"
                      placeholder="type the new product price "
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      small-chips
                      v-model="editItem.Image"
                      label="Product Image"
                      placeholder="insert the new product image "
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="items"
                      v-model="editItem.Category"
                      label="Product Category"
                      placeholder="choose category"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="update(editItem)"
              >
                Update
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <!-- <v-card-title class="headline">type the number that you want to delete</v-card-title> -->
            <v-row>
              <v-col cols="9" class="mx-auto" justify="center">
                <v-text-field v-model="deleteItem.Id" label="type the number that you want to delete"></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="del(deleteItem.Id)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import Axios from 'axios'
  export default {
    data: () => ({
      // idprod: this.GET_PRODUCT.forEach((value) => {console.log(value.product_id)}),
      CafeApp: JSON.parse(localStorage.getItem("persist-info")),
      items: ['Food', 'Beverage'],
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: 'No. Id',
          align: 'start',
          sortable: false,
          value: 'product_id',
        },
        {
          text: 'Image',
          sortable: false,
          value: 'product_image',
        },
        { text: 'Name', value: 'product_name' },
        { text: 'Price', value: 'product_price' },
        { text: 'Category', value: 'product_category' },
        { text: 'Last Update', value: 'updatedAt' },
      ],
      addItem: {
        Name: '',
        Price: null,
        Image: null,
        Category: null,
      },
      editItem: {
        Id: null,
        Name: '',
        Price: null,
        Image: null,
        Category: null,
      },
      deleteItem: {
        Id: null,
      },
    }),

    computed: {
      ...mapGetters(["GET_PRODUCT"])
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.FETCHING()
    },

    methods: {
      ...mapActions(["FETCHING"]),

      update(item) {
      let formdata = new FormData()
        formdata.append("id", item.Id)
        formdata.append("name", item.Name)
        formdata.append("price", item.Price)
        formdata.append("category", item.Category)
        formdata.append("image", item.Image)

        Axios.put('http://localhost:3000/api/product', formdata,{
          headers:{
            "Content-Type" : "muitipart/form-data",
            AuthKey: this.CafeApp.User.users.token
          }
        })
          .then(() => {
            alert('successfully edited')
            location.reload()
          }).catch((err) => {
            console.log(err)
          });
        console.log(formdata)
      },

      del(id) {
        Axios.delete(`http://localhost:3000/api/product/${id}`)
          .then(() => {
            confirm('are you sure?')
            location.reload()
          }).catch((err) => {
            console.log(err)
          });
        console.log(id)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save (data) {
        let formdata = new FormData()
        formdata.append("name", data.Name)
        formdata.append("price", data.Price)
        formdata.append("category", data.Category)
        formdata.append("image", data.Image)

        Axios.post('http://localhost:3000/api/product', formdata,{
          headers:{
            "Content-Type" : "muitipart/form-data"
          }
        })
          .then(() => {
            alert('successfully uploaded')
          }).catch((err) => {
            console.log(err)
          });
        console.log(formdata)
        this.close()
      },
      cek() {
        console.log(this.CafeApp.User)
      }
    },
  }
</script>
