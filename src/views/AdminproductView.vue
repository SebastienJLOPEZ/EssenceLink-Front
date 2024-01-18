<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="admin-product-page">
    <div class="menu">
      <div @click="changeTab('adminProfile')" :class="{ active: currentTab === 'adminProfile' }">Admin Profile</div>
      <div @click="changeTab('productList')" :class="{ active: currentTab === 'productList' }">Product List</div>
      <div @click="changeTab('addProduct')" :class="{ active: currentTab === 'addProduct' }">Add Product</div>
      <div @click="changeTab('logout')" class="logout-button" :class="{ active: currentTab === 'logout' }">LOGOUT</div>
    </div>

    <div class="content">

      <div v-if="currentTab === 'adminProfile'">
        <h2 class="tab-title">Admin Profile</h2>
        <div class="admin-info">
          <p>Admin Information: {{ adminInfo.username }}, {{ adminInfo.email }}, etc.</p>
        </div>
      </div>

      <div v-if="currentTab === 'productList'">
        <h2 class="tab-title">Product List</h2>
        <div v-for="product in paginatedProducts" :key="product.Id" class="product-card">
          <p>{{ product.Id }}</p>
          <p>Name: {{ product.Name }}</p>
          <p>Type: {{ product.Type }}</p>
          <p>Price: {{ product.Price }}</p>
          <p>Stock: {{ product.Quantity <= 0 ? "Out of Stock" : product.Quantity }}</p>
          <button @click="deleteproduct(product)">Supprimer</button>
          <button @click="openEditModal(product)">Modify</button>
        </div>
        <div v-if="editMode" class="popup">
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
      </div>

      <div v-if="currentTab === 'addProduct'">
        <h2 class="tab-title">Add Product</h2>
        <button @click="openAddProductPopup" class="add-product-button">+</button>
        <div v-if="showAddProductPopup" class="popup">
          <div class="popup-content">
            <span class="close-popup" @click="closeAddProductPopup">×</span>
            <h2 class="popup-title">Add Product</h2>
            <div class="popup-details">
              <div class="field">
                <label for="newProductName">Name:</label>
                <input type="text" v-model="newProduct.name" id="newProductName" />
              </div>
              <div class="field">
                <label for="newProductDescription">Description:</label>
                <input type="text" v-model="newProduct.description" id="newProductDescription" />
              </div>
              <div class="field">
                <label for="newProductPrice">Price:</label>
                <input type="number" v-model="newProduct.price" id="newProductPrice" />
              </div>
              <div class="field">
                <label for="newProductStock">Stock:</label>
                <input type="number" v-model="newProduct.stock" id="newProductStock" />
              </div>
            </div>
            <div class="buttons">
              <button @click="saveNewProduct" class="save-changes">Save Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
<script>

import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
export default {
  data() {
    return {
      currentTab: 'adminProfile',
      adminInfo: {
        username: 'Admin1',
        email: 'admin@example.com',

      },
      productList: [
        { id: 1, name: 'Product1', description: 'Description of Product1', price: 19.99, stock: 50 },
        { id: 2, name: 'Product2', description: 'Description of Product2', price: 24.99, stock: 30 },

      ],
      showModifyPopup: false,
      modifiedProduct: {
        id: null,
        description: '',
        price: 0,
        stock: 0,
      },
      showAddProductPopup: false,
      newProduct: {
        name: '',
        description: '',
        price: 0,
        stock: 0,
      },
    };
  },
  methods: {
    changeTab(tab) {
      if (tab === 'logout') {
        this.logout();
      } else {
        this.currentTab = tab;
      }
    },
    openModifyPopup(product) {
      this.showModifyPopup = true;
      this.modifiedProduct = { ...product };
    },
    closeModifyPopup() {
      this.showModifyPopup = false;
    },
    saveModifiedProduct() {

      const modifiedProductId = this.modifiedProduct.id;

      const modifiedProductIndex = this.productList.findIndex((product) => product.id === modifiedProductId);

      if (modifiedProductIndex !== -1) {

        Object.assign(this.productList[modifiedProductIndex], this.modifiedProduct);
        console.log('Product modified:', this.productList[modifiedProductIndex]);
      }

      this.showModifyPopup = false;
    },
    openAddProductPopup() {
      this.showAddProductPopup = true;
    },
    closeAddProductPopup() {
      this.showAddProductPopup = false;
    },
    saveNewProduct() {
      const newProductId = this.productList.length + 1;
      this.newProduct.id = newProductId;
      this.productList.push({ ...this.newProduct });
      this.newProduct = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
      };

      this.showAddProductPopup = false;
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
</style>
  