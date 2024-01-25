<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="admin-product-page">
    <div class="menu">
      <div @click="changeTab('adminProfile')" :class="{ active: currentTab === 'adminProfile' }">PROFILE</div>
      <div @click="changeTab('productList')" :class="{ active: currentTab === 'productList' }">LISTE DES PRODUITS</div>
      <div @click="changeTab('addProduct')" :class="{ active: currentTab === 'addProduct' }">AJOUT DE PRODUIT</div>
      <div @click="changeTab('productSearch')" :class="{ active: currentTab === 'productSearch' }">RECHERCHE</div>
    </div>

    <div class="content">

      <div v-if="currentTab === 'adminProfile'">
        <h2 class="tab-title">Admin Profile</h2>
        <div class="admin-info">
          <h3>Admin Information :</h3>
          <p>Nom : {{ name }} {{ lastName }}</p>
          <p>Adresse mail: {{ email }}</p>
          <p>Anniversaire : {{ bdate }}</p>
          <p>Numéro : {{ number }}</p>
        </div>
      </div>

      <div v-if="currentTab === 'productList'">
        <h2 class="tab-title">Product List</h2>
        <div v-for="product in paginatedProducts" :key="product.Id" class="product-card">
          <tr>
            <td>Id :</td>
            <td>Nom :</td>
            <td>Type :</td>
            <td>Sous-Type :</td>
            <td>Prix :</td>
            <td>Quantité :</td>
            <td>Date d'Ajout :</td>
            <td>Score :</td>
          </tr>
          <tr>
            <td>{{ product.Id }}</td>
            <td>{{ product.Name }}</td>
            <td>{{ product.Type }}</td>
            <td>{{ product.Subtype }}</td>
            <td>{{ product.Price }}</td>
            <td>{{ product.Quantity <= 0 ? "Out of Stock" : product.Quantity }}</td>
            <td>{{ product.DateAdded }}</td>
            <td>{{ product.Score }}</td>
          </tr>
          <div class="button-sidebar">
            <button @click="deleteproduct(product)">Supprimer</button>
            <button @click="openEditModal(product)">Modifier</button>
          </div>
        </div>

        <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
        <span>{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>

        <div v-if="openPopUp" class="popup-container">
          <form @submit.prevent="editProduct">
            <tr>
              <td><input v-model="editingProduct.Name" /></td>

            </tr>
            <tr>
              <td><input v-model="editingProduct.Type"></td>
              <td><input v-model="editingProduct.SubType" /></td>
            </tr>
            <tr>
              <td><input v-model="editingProduct.Price"></td>
              <td><input v-model="editingProduct.Quantity" /></td>
            </tr>
            <tr>
              <td><input v-model="editingProduct.Score" /></td>
            </tr>
            <button type="submit">Enregistrer</button>
            <button type="cancel" @click="cancelEdit">Annuler</button>
          </form>
        </div>
      </div>

      <div v-if="currentTab === 'addProduct'">
        <h2 class="tab-title">Ajout de Produit</h2>
        <form action="">
          <input type="text" v-model="productName" required>
          <input type="text" v-model="productType" required> <!--Need to change that later-->
          <input type="text" v-model="productSubtype" required>
          <input type="text" v-model="productDescription" required>
          <input type="text" v-model="productPrice" required> <!--Will correct that later-->
          <button @click="NewProduct()">Ajouter</button>
        </form>
      </div>

      <div v-if="currentTab === 'productSearch'" class="product-search">
        <input type="text" v-model="searchTerms" @input="search">
        <tr>
          <th>Id</th>
          <th>Nom</th>
          <th>Type</th>
          <th>Sous-type</th>
          <th>Prix</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Date d'Ajout</th>
          <th>Score</th>
        </tr>
        <div v-if="editMode" class="Result">
          <div v-for="product in searchResult" :key="product.Id">
            <tr>
              <td>{{ product.Id }}</td>
              <td>{{ product.Name }}</td>
              <td>{{ product.Type }}</td>
              <td>{{ product.Subtype }}</td>
              <td>{{ product.Price }}</td>
              <td>{{ product.Quantity <= 0 ? "Out of Stock" : product.Quantity }}</td>
              <td>{{ product.DateAdded }}</td>
              <td>{{ product.Score }}</td>
            </tr>
            <button @click="deleteproduct(product)">Supprimer</button>
            <button @click="openEditModal(product)">Modifier</button>
          </div>
          <div v-if="openPopUp" class="popup-container">
            <form @submit.prevent="editProduct">
              <tr>
                <td><input v-model="editingProduct.Name" /></td>

              </tr>
              <tr>
                <td><input v-model="editingProduct.Type"></td>
                <td><input v-model="editingProduct.SubType" /></td>
              </tr>
              <tr>
                <td><input v-model="editingProduct.Price"></td>
                <td><input v-model="editingProduct.Quantity" /></td>
              </tr>
              <tr>
                <td><input v-model="editingProduct.Score" /></td>
              </tr>
              <button type="submit">Enregistrer</button>
              <button type="cancel" @click="cancelEdit">Annuler</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>
import Axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  data() {
    return {
      currentTab: 'adminProfile',
      showModifyPopup: false,
      Products: [],          // Liste complète des utilisateurs
      pageSize: 9,        // Nombre d'utilisateurs par page
      currentPage: 1,
      editingProduct: {},
      editMode: false,
      name: "",
      lastName: "",
      number: "",
      bdate: "",
      email: "",
      productName: '',
      productQuantity: 0,
      productPrice: 0,
      productType: '',
      productSubtype: '',
      productDescription: '',
      searchTerms: '',
      searchResult: [],
      openPopUp: false,
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
    changeTab(tab) {
      this.currentTab = tab;
    },
    currentUser() {
      let v = this;
      const auth = getAuth(firebase);

      onAuthStateChanged(auth, (user) => {
        if (user) {
          v.email = user.email;
          v.fetchUserData(v.email);
        }
      });
    },
    fetchUserData(email) {
      let v = this;
      v.errorMessage = '';

      Axios.get(`https://localhost:7115/v1/api/User/${email}`)
        .then((response) => {
          v.name = response.data.FirstName;
          v.lastName = response.data.LastName;
          v.number = (response.data.Number.startsWith('0') && response.data.Number.length === 10) ? response.data.Number : 'Non rempli'
          v.bdate = response.data.BDate === '' ? 'Non rempli' : response.data.BDate;
          v.signindate = response.data.SignInDate === '' ? 'Non rempli' : response.data.SignInDate;
        })
        .catch((error) => {
          v.errorMessage = 'Not Connected';
          console.error('Failed to connect to databank', error);
        });
    },
    async fetchProducts() {
      try {
        const response = await Axios.get('https://localhost:7115/v1/api/Product/');
        this.Products = response.data;
      } catch (error) {
        console.error('Failed to fetch admin Products', error);
      }
    },
    openEditModal(Product) {
      this.editingProduct = { ...Product };
      this.openPopUp = true;
    },
    async editProduct() { //Will be modified later, need more testing
      try {

        const newUData = {
          Name: this.productName,
          Quantity: this.productQuantity,
          Price: this.productPrice,
          Type: this.productType,
          SubType: this.productSubtype,
          Description: this.productDescription,
          DateAdded: new Date().toISOString(),
          Score: 0
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
      this.openPopUp = false;
    },

    async deleteProduct(Product) {
      try {
        const response = await Axios.delete(`https://localhost:7115/v1/api/Product/${Product.Id}`)
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
    async NewProduct() {
      try {
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
          },
        })
        console.log('Product added successfully', response.data)
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    truncateString(value, length) {
      if (!value) return '';
      if (value.length <= length) return value;
      return value.substring(0, length);
    },
    async search() {
      try {
        if (this.searchTerms.trim() === '') {
          this.editMode = false;
          this.searchResult = [];
          return;
        }
        const response = await Axios.get(`https://localhost:7115/v1/api/Product/Search/${this.searchTerms}`);
        console.log(response);

        this.editMode = true;
        this.searchResult = response.data;
      } catch (error) {
        console.error('Failed to fetch admin users', error);
      }
    },
    logout() {
      const auth = getAuth(firebase);
      signOut(auth)
        .then(() => {
          this.$nextTick(() => {
            this.$router.push('/');
          });
        })
        .catch((error) => {
          console.log('logout error: ', error.message);
        });
    },
  },
  mounted() {
    this.currentUser();
    this.fetchProducts();
  },
};
</script>
  
<style scoped>
.admin-product-page {
  display: flex;
  max-width: 100%;
  height: 290vh;
  margin: 100px auto;
  background-color: #fff;
  margin-top: 170px;

}

.menu {
  width: 200px;
  background-color: #ffffff;
  padding: 20px;
  margin-top: 130px;
}

.menu div {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.menu div:hover {
  color: #095328;
}

.menu .active {
  background-color: #ddd;
}

.content {
  flex-grow: 1;
  padding: 20px;
}

.tab-title {
  font-family: 'Kaisei Decol', sans-serif;
  text-align: center;
  position: relative;
  font-size: 34;
  font-weight: 400;
}

.tab-title:after {
  content: "";
  display: block;
  width: 50px;
  height: 2px;
  background-color: #333;
  margin: 10px auto;
}

.product-card {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
}

.user-card td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.user-card td:not(:nth-child(4)) {
  width: 150px;
}

.user-card td:nth-child(4) {
  width: 150px;
}

.button-sidebar {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(-300%) translateY(-50%);
  display: flex;
  flex-direction: column;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 500PX;
  max-width: 800px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70PX;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  text-align: left;
}

.popup-details {
  flex-direction: column;
}

.popup-details label {
  margin-top: 10px;
  margin-bottom: 5px;
}

.popup-details input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.save-changes {
  background-color: #097328;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.add-product-button {
  background-color: #097328;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.logout-button {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  color: #ff0000;
}

.logout-button:hover {
  color: #cc0000;
}

.logout-button.active {
  background-color: #ffcccc;
}

.product-search {
  background-color: #f0f0f0;
}

.product-search th {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}

.product-search th:not(:nth-child(5)) {
  width: 150px;
}

.product-search th:nth-child(5) {
  width: 150px;
}

.product-search td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: left;
}
</style>
  