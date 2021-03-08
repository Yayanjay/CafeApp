<template>
  <div class="account">
      <Navbar/>
      <h1>
      this is account page
      </h1>
      <v-card width="500px" class="ma-auto pa-2">
        <v-form>
          <v-text-field label="name" v-model="productForm.name"></v-text-field>
          <v-text-field label="price" v-model="productForm.price"></v-text-field>
          <v-file-input ref="file" small-chips label="image" v-model="productForm.image"></v-file-input>
          <v-select :items="items" label="category" v-model="productForm.category"></v-select>
        </v-form>
        <v-card-action>
          <v-btn @click="submit">submit</v-btn>
        </v-card-action>
      </v-card>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: "Account",
  components: {
    Navbar,
  },
  data() {
    return {
      items: ["Food", "Beverage"],
      productForm: {
        name: null,
        price: null,
        image: null,
        category: null
      }
    }
  },
  methods: {
    submit() {
      console.log(this.productForm)
      let data = new FormData()
      data.append('product_name', this.productForm.name)
      data.append('product_price', this.productForm.price)
      data.append('product_image', this.$refs.file)
      data.append('product_category', this.productForm.category)
      console.log(this.$refs.file)
    }
  }
}
</script>

<style>

</style>