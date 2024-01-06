<template>
    <div class = NonPermanent>
        <router-link class="nav-link" to="/APList">Product</router-link>
        <router-link class="nav-link" to="/AdminProductProfile">Profile</router-link>
        <router-link class="nav-link" to="/NewProduct">New Product</router-link>
    </div>
    <div class="Search">
        <input type="text" v-model="searchTerms" @input="search">
        
    </div>
    <div v-if="editMode" class="Result">
        <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Nom</th>
        <th>Quantité</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in searchResult" :key="product.Email">
        <td>{{ product.Id }}</td>
        <td>{{ product.Name }}</td>
        <td>{{ product.Quantity <= 0 ? "Out of Stock" : product.Quantity}}</td>
        <td>{{ product.Type }}</td>
        <td><button @click="openEditModal(product)">Modifier</button></td>
        <td><button @click="deleteproduct(product)">Supprimer</button></td>
      </tr>
    </tbody>
  </table>
    </div>
    <div v-if="openPopUp" class="popup-container">
        <form @submit.prevent="editproduct">
            <input v-model="editingproduct.Name" />
            <input v-model="editingproduct.Price" /> 
            <input v-model="editingproduct.Quantity" /> 
            <input v-model="editingproduct.Type" /> 
            <input v-model="editingproduct.Description" /> 
            <button type="submit">Enregistrer</button>
            <button type="cancel" @click="cancelEdit">Annuler</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios';
//import ClientListAction from "ACList.vue";

export default {
    data(){
        return{
        searchTerms: '',
        searchResult: [],
        editMode: false,
        openPopUp: false, 
        editingproduct: {},
        }
    },
    methods: {
        async search(){
            try {
                if (this.searchTerms.trim() === '') {
                    this.editMode = false;
                    this.searchResults = [];
                    return;
                }
                const response = await Axios.get(`https://localhost:7115/v1/api/Product/Search/${this.searchTerms}`);
                console.log(response);

                this.editMode = true;
                this.searchResult = response.data;
            } catch(error){
          console.error('Failed to fetch admin products', error);
            }
        },
        openEditModal(product) {
        this.editingproduct = { ...product };
        this.openPopUp= true;
    },
    async editproduct() { //Will be modified later, need more testing
        try {

            const newUData = {
                Name: this.editingproduct.FirstName,
                Quantity: this.editingproduct.LastName,
                Price: this.editingproduct.Email,
                Type: this.editingproduct.Number,
                Description: this.editingproduct.Role,
                DateAdded: this.editingproduct.BDate,
                Score: this.editingproduct.SignInDate,
            };

            const response = await Axios.put(`https://localhost:7115/v1/api/Product/${this.editingproduct.Email}`, newUData, {
             headers: {
              'Content-Type': 'application/json',
            },});
            console.log('product updated successfully', response.data);
            console.log('Modifications enregistrées pour ', this.editingproduct);
            this.cancelEdit();

            
            
        } catch(error){
          console.error('Failed to fetch admin products', error);
        }
    },
    cancelEdit() {
        this.openPopUp = false;
    },
          async deleteproduct(product) {
        try {
            const response = await Axios.delete(`https://localhost:7115/v1/api/product/${product.Email}`)
            console.log('product updated successfully', response.data);
            
             this.searchResult = this.searchResult.filter(u => u.Email !== product.Email);
        } catch(error){
          console.error('Failed to fetch admin products', error);
        }
      },
    },

    

}

</script>

<style scoped>
* {
    box-sizing: border-box;
  }

  .NonPermanent{
    display: flex;
    max-width: 100%;
    /*height: 2vh;*/
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .Search {
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }

  .Result {
    display: flex;
    max-width: 100%;
    height: 2vh;
    margin: 100px auto;
    background-color: #fff;
    margin-top: 80px;
    margin-bottom: 1px;
  }
  .popup-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 9999;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
</style>