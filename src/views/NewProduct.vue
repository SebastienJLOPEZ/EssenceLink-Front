<template>
    <div class="Form">
        <form @submit.prevent="NewProduct">
      <input type="text" id="productName" v-model="productName" required>

      <input type="number" id="productQuantity" v-model="productQuantity" required>

      <input type="number" id="productPrice" v-model="productPrice" required>

      <input type="text" id="productType" v-model="productType" required>
      <input type="textarea" id="productType" v-model="productDescription" required>
      
      <button type="submit">Ajouter le produit</button>
    </form>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    data(){
        return{
            productName: '',
            productQuantity: 0,
            productPrice: 0,
            productType: '',
            productDescription: '',
        }
    },
    methods:{
        async NewProduct(){
            try{
                const newProduct = {
                    Name: this.productName,
                    Price: this.productPrice,
                    Quantity: this.productQuantity,
                    Type: this.productType,
                    Description: this.productDescription,
                    DateAdded: new Date().toString(), // Date enregistrée automatiquement
                    Score: 0,
                };
                const response = await Axios.post(`https://localhost:7115/v1/api/User/`, newProduct, {
             headers: {
              'Content-Type': 'application/json',
            },})
            console.log('Product added successfully', response.data)
            } catch(error){
                console.error('Failed to fetch admin users', error);
            }
        }
    }
}

</script>

<style scoped>
* {
    box-sizing: border-box;
  }

  .Form{
    display: flex;
    max-width: 100%;
    /*height: 2vh;*/
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }
</style>