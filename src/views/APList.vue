<template>
  <div class=NonPermanent>
    <router-link class="nav-link" to="/AdminProductProfile">Profile</router-link>
    <router-link class="nav-link" to="/APSearch">Search</router-link>
    <router-link class="nav-link" to="/NewProduct">New Product</router-link>
  </div>
  <div class=List>
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
        <tr v-for="Product in paginatedProducts" :key="Product.Email">
          <td>{{ product.Id }}</td>
          <td>{{ product.Name }}</td>
          <td>{{ product.Quantity <= 0 ? "Out of Stock" : product.Quantity }}</td>
          <td>{{ product.Type }}</td>
          <td><button @click="openEditModal(product)">Modifier</button></td>
          <td><button @click="deleteproduct(product)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>

    <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
    <span>{{ currentPage }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>

    <!--modal name="edit-modal"-->

    <!--/modal-->
  </div>
  <div v-if="editMode" class="popup-container">
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

export default {
  data() {
    return {
      Products: [],          // Liste complète des utilisateurs
      pageSize: 9,        // Nombre d'utilisateurs par page
      currentPage: 1,
      editingProduct: {},
      editMode: false,    // Page actuelle
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.Products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.Products.slice(start, end);
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await Axios.get('https://localhost:7115/v1/api/Product/');
        this.Products = response.data.filter(Product => Product.Role === 'Client');
      } catch (error) {
        console.error('Failed to fetch admin Products', error);
      }
    },
    openEditModal(Product) {
      this.editingProduct = { ...Product };
      this.editMode = true;
    },
    async editProduct() { //Will be modified later, need more testing
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

        const response = await Axios.put(`https://localhost:7115/v1/api/Product/${this.editingProduct.Email}`, newUData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Product updated successfully', response.data);
        console.log('Modifications enregistrées pour ', this.editingProduct);
        this.cancelEdit();

        this.fetchProducts();
      } catch (error) {
        console.error('Failed to fetch admin Products', error);
      }
    },
    cancelEdit() {
      this.editMode = false;
    },

    async deleteProduct(Product) {
      try {
        const response = await Axios.delete(`https://localhost:7115/v1/api/Product/${Product.Email}`)
        console.log('Product updated successfully', response.data);
        this.fetchProducts();
      } catch (error) {
        console.error('Failed to fetch admin Products', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
  
<style scoped>
* {
  box-sizing: border-box;
}

.NonPermanent {
  display: flex;
  max-width: 100%;
  /*height: 2vh;*/
  margin: 100px auto;
  background-color: #fff;
  margin-top: 80px;
  margin-bottom: 1px;
}

.List {
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