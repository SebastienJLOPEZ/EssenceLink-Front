<template>
<<<<<<< HEAD
=======
  <link href='https://fonts.googleapis.com/css?family=Kaisei%20Decol' rel='stylesheet'>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
  <div>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <!-- Category Banner -->
    <div class="category-banner-container">
      <img src="@/assets/BG4.jpg" alt="Category Banner" class="category-banner" />
      <div class="category-overlay">
        <h1 class="category-title">{{ TypeName !== "" ? TypeName : 'Résultat de votre recherche'}}</h1>
        <p class="category-description">
          Lovingly blended by our artisan experts, these teas offer an array of flavors to support health and wellbeing.
        </p>
      </div>
    </div>

    <!-- Price Filter -->
    <div class="filter-container">
      <div class="price-filter" @click="togglePriceFilter">
        Price Filter <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      <div v-show="isPriceFilterOpen" class="price-options">
        <label v-for="filter in priceFilters" :key="filter.value">
          <input type="radio" v-model="selectedFilter" :value="filter.value" @change="applyPriceFilter" />
          {{ filter.label }}
        </label>
      </div>
      <div v-if="selectedFilter" class="selected-filter-container">
        {{ selectedFilter }}
        <span @click="clearFilter" class="remove-filter">X</span>
      </div>
    </div>

    <!-- Product Container -->
    <div class="products-and-garden-container">
      <div class="product-container">
        <div v-for="product in productList" :key="product.Id" :class="'product-item product-'">
          <div class="product-content" @click="goToProductPage(product.Id)">
            <img :src="require('@/assets/bg3.jpg')" alt="Product Image" />
            <p class="description">{{ product.Name }}</p>
            <p class="price">{{ product.Price }}€</p>
            <div class="line"></div>
            <div class="buttons">
<<<<<<< HEAD
              <button @click="addToWishlist(product)" class="wishlist">Wishlist</button>
              <button @click="quickView(product)" class="quick-view">Quick View</button>
=======
              <button @click.stop="quickView(product)" class="quick-view">Quick View</button>
              <button @click.stop="addToWishlist(product)" class="wishlist">Wishlist</button>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup -->
    <div v-if="showPopup" class="popup enlarged-popup">
      <div class="popup-content">
        <span class="close-popup" @click="closePopup">×</span>
        <div class="popup-details">
          <div class="popup-image-container">
<<<<<<< HEAD
            <img :src="selectedProduct.image" alt="Product Image" class="popup-image" />
          </div>
          <div class="popup-description-and-price">
            <h2 class="popup-title">{{ selectedProduct.name }}</h2>
            <p class="popup-description">{{ selectedProduct.descriptionPopup }}</p>
            <p class="popup-price">{{ selectedProduct.price }}</p>
            <div class="quantity-control">
              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" v-model="selectedProduct.quantity" min="1" />
=======
            <img :src="require('@/assets/bg3.jpg')" alt="Product Image" class="popup-image" />
          </div>
          <div class="popup-description-and-price">
            <h2 class="popup-title">{{ selectedProduct.Name }}</h2>
            <p class="popup-description">{{ selectedProduct.Description }}</p>
            <p class="popup-price">{{ selectedProduct.Price }}</p>
            <div class="quantity-control">
              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" v-model="selectedProduct.quantity" min="1"
                :max="selectedProduct.Quantity" />
              <p>
                {{ selectedProduct.Quantity > 10 ? "" : "Il ne reste que " + selectedProduct.Quantity + " unité." }}</p>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            </div>
          </div>
        </div>
        <div class="buttons">
<<<<<<< HEAD
          <button @click="addToWishlistFromPopup(selectedProduct)" class="add-to-wishlist">
=======
          <button @click="addToWishlist(selectedProduct)" class="add-to-wishlist">
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            Add to Wishlist <ion-icon name="heart"></ion-icon>
          </button>
          <button @click="addToCart(selectedProduct)" class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
<<<<<<< HEAD

    <!-- Global Wishlist Message -->
    <div v-if="globalWishlistMessage" class="global-wishlist-container">
      <div class="global-wishlist-message">
        {{ globalWishlistMessage }}
      </div>
    </div>

</div>
=======
  </div>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
</template>

<script>
/*import productImage1 from '@/assets/bg3.jpg';
import productImage2 from '@/assets/bg3.jpg';
import productImage3 from '@/assets/bg6.jpg';
import productImage4 from '@/assets/bg6.jpg';
import productImage5 from '@/assets/bg6.jpg';
import productImage6 from '@/assets/bg6.jpg';
import productImage7 from '@/assets/bg6.jpg';
import productImage8 from '@/assets/bg6.jpg';*/
import Axios from 'axios';
import currentUser from '@/_services/FetchUserData.js';
import ProductCaller from '@/_services/ProductCaller.js';
import checkAuthentication from '@/_services/SendToLogin.js'

export default {
  name: "ShopView",
  mixins: [currentUser, ProductCaller, checkAuthentication],
  data() {
    return {
<<<<<<< HEAD
      products: [
        { name: 'Product 1', description: 'Description of Product 1', descriptionPopup: 'Popup description for Product 1', price: 19.99, image: productImage1, showWishlistMessage: false },
        { name: 'Product 2', description: 'Description of Product 2', descriptionPopup: 'Popup description for Product 2', price: 24.99, image: productImage2, showWishlistMessage: false },
        { name: 'Product 3', description: 'Description of Product 3', descriptionPopup: 'Popup description for Product 3', price: 29.99, image: productImage3, showWishlistMessage: false },
        { name: 'Product 4', description: 'Description of Product 4', descriptionPopup: 'Popup description for Product 4', price: 14.99, image: productImage4, showWishlistMessage: false },
        { name: 'Product 5', description: 'Description of Product 5', descriptionPopup: 'Popup description for Product 5', price: 22.99, image: productImage5, showWishlistMessage: false },
        { name: 'Product 6', description: 'Description of Product 6', descriptionPopup: 'Popup description for Product 6', price: 17.99, image: productImage6, showWishlistMessage: false },
        { name: 'Product 7', description: 'Description of Product 7', descriptionPopup: 'Popup description for Product 7', price: 27.99, image: productImage7, showWishlistMessage: false },
        { name: 'Product 8', description: 'Description of Product 8', descriptionPopup: 'Popup description for Product 8', price: 32.99, image: productImage8, showWishlistMessage: false },
      ],
=======
      email: "",
      product: [],
      /*products: [
        { id: "659b72be731240ade0365ecf", name: 'Product 1', description: 'Description of Product 1', descriptionPopup: 'Popup description for Product 1', price: 19.99, image: productImage1 },
        { id: "2", name: 'Product 2', description: 'Description of Product 2', descriptionPopup: 'Popup description for Product 2', price: 24.99, image: productImage2 },
        { id: "3", name: 'Product 3', description: 'Description of Product 3', descriptionPopup: 'Popup description for Product 3', price: 29.99, image: productImage3 },
        { id: "4", name: 'Product 4', description: 'Description of Product 4', descriptionPopup: 'Popup description for Product 4', price: 14.99, image: productImage4 },
        { id: "5", name: 'Product 5', description: 'Description of Product 5', descriptionPopup: 'Popup description for Product 5', price: 22.99, image: productImage5 },
        { id: "6", name: 'Product 6', description: 'Description of Product 6', descriptionPopup: 'Popup description for Product 6', price: 17.99, image: productImage6 },
        { id: "7", name: 'Product 7', description: 'Description of Product 7', descriptionPopup: 'Popup description for Product 7', price: 27.99, image: productImage7 },
        { id: "8", name: 'Product 8', description: 'Description of Product 8', descriptionPopup: 'Popup description for Product 8', price: 32.99, image: productImage8 },
      ],*/
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
      isPriceFilterOpen: false,
      priceFilters: [
        { label: 'Low to High', value: 'low To High' },
        { label: 'High to Low', value: 'high To Low' },
      ],
      selectedFilter: null,
      showPopup: false,
      selectedProduct: null,
<<<<<<< HEAD
      globalWishlistMessage: '',
      cartCount: 0,
      cart : [],
=======
      currentType: "Boisson",
      productList: [],
      previousContent: null,
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
    };
  },
  watch: {
    '$route.params.content': 'ProductFetcher',
  },
  methods: {
    quickView(product) {
      this.selectedProduct = {
        ...product,
        quantity: 1,
      };
      this.showPopup = true;
    },
<<<<<<< HEAD
    addToCart(product) {
      this.$store.commit('addToCart', product); // Dispatch addToCart mutation
      this.showPopup = false;
    },
    addToWishlist(product) {
      console.log(`Added to wishlist: ${product.name}`);
      this.globalWishlistMessage = `Added ${product.name} to Wishlist!`;
      setTimeout(() => {
        this.globalWishlistMessage = '';
      }, 5000);
    },
    addToWishlistFromPopup(product) {
      this.addToWishlist(product);
      this.closePopup();
=======

    async addToWishlist(product) {
      try {
        await checkAuthentication.call(this);
      } catch (error) {
        console.log('Redirection effectuée, donc on arrête l\'exécution restante du code.');
        return;
      }
      try {
        await this.currentUser();
        await this.authStateChangedPromise; //Use to fetch the user ID
        const newWLData = {
          UserId: this.id,
          ProductId: product.Id,
        }
        const response = await Axios.post('https://localhost:7115/v1/api/Wishlist', newWLData, {
          headers: {
            'Content-Type': 'application/json',
          },
        },)
        console.log(`Added to wishlist: ${product.name}`, response);

      } catch (error) {
        console.error('Failed to connect to databank', error.message);
      }
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
    },
    togglePriceFilter() {
      this.isPriceFilterOpen = !this.isPriceFilterOpen;
    },
    applyPriceFilter() {
      console.log(`Applying price filter: ${this.selectedFilter}`);
      this.isPriceFilterOpen = false;
    },
    clearFilter() {
      this.selectedFilter = null;
    },
    closePopup() {
      this.showPopup = false;
    },
<<<<<<< HEAD
    toggleCart() {

    },
  },
};
</script>

<style lang="css" scoped src="@/components/ShopStyle.css"></style>
=======
    addToCart(product) {
      console.log(`Added to cart: ${product.name} (Quantity: ${product.quantity})`);

      const cart = JSON.parse(localStorage.getItem('cart')) || []; //Récupérer dans le localstorage le panier actuel et s'il n'existe pas, en créer un

      const productInCart = cart.find(item => item.pid === product.id); // Rechercher si le produit est déjà dans le panier

      if (productInCart) { // Si vrai, augmenter quantité. Sinon, mettre dans le panier.
        productInCart.quantity += product.quantity;
      } else {
        cart.push({ pid: product.Id, quantity: product.quantity });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      this.showPopup = false; // Close the popup after adding to cart
    },
    goToProductPage(pid) {
      this.$router.push({ path: "/product", query: { pid } });
    },
    callProduct() {
      console.log(this.$route.query.Search)
      if (this.$route.query.Search) {
        this.ProductSearchResult(this.$route.query.Search)
      } else if (this.$route.query.Subtype) {
        this.ProductFetcherSub(this.$route.query.Type, this.$route.query.Subtype)
        this.TypeCaller(this.$route.query.Type)
      } else {
        this.ProductFetcher(this.$route.query.Type)
        this.TypeCaller(this.$route.query.Type)
      }
    }
  },
  /*beforeMount(){
    this.ProductFetcher(this.$route.query.Type); /*this.currentType
  },*/
  mounted() {
    this.callProduct();
    const currentPagePath = this.$route.fullPath;
    localStorage.setItem('currentPage', currentPagePath);
  },
  updated() {
    if (JSON.stringify(this.$route.query) !== JSON.stringify(this.previousContent)) {
      this.callProduct();
      this.previousContent = JSON.parse(JSON.stringify(this.$route.query));
    }
  }
};
</script>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

.category-banner-container {
  position: relative;
  width: 100%;
  max-height: 550px;
  overflow: hidden;

}

.category-banner {
  width: 100%;
  height: auto;
  max-height: 100%;
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.category-title {
  color: white;
  font-size: 64px;
  text-align: center;
  font-family: 'Kaisei Decol';
  font-weight: 500;
  margin-top: 100px;
}

.category-description {
  color: white;
  font-size: 32px;
  text-align: center;
  font-family: 'Kaisei Decol';
  margin-top: 20px;
  width: 80%;
}

.product-container {
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.product-item {
  flex: 0 0 calc(25% - 20px);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  max-width: 210px;
}

.product-item img {
  width: 105%;
  height: 210px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.product-item .description {
  font-size: 16px;
  color: black;
  text-align: center;
  margin-top: 4px;
}

.product-item .price {
  font-size: 14px;
  color: #333;
  text-align: center;
}

.product-item .line {
  width: 100%;
  border-top: 1px solid #ddd;
  margin: 10px 0;
}

.product-item .buttons {
  display: flex;
  justify-content: space-around;
}

.product-item button.quick-view,
.product-item button.wishlist {
  color: #fff;
  font-size: 14px;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 48%;
}

.product-item button.quick-view {
  background-color: #97c992;
}

.product-item button.wishlist {
  background-color: #333;
}

.product-item button.quick-view:hover,
.product-item button.wishlist:hover {
  opacity: 0.9;
}

.filter-container {
  margin-top: 20px;
  text-align: left;
  position: relative;
}

.price-filter {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  margin-right: 10px;
}

.selected-filter-container {
  position: absolute;
  right: 90px;
  top: 0;
  padding: 5px 10px;
  background-color: #333;
  color: white;
  border-radius: 5px;
}

.price-options {
  display: inline-block;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  text-align: left;
}

.price-options label {
  display: block;
  margin: 5px 0;
  padding: 8px;
  background-color: #fff;
  cursor: pointer;
}

.price-options input {
  margin-right: 5px;
}

.remove-filter {
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;
}

.popup {
  position: fixed;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 800px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.popup-image-container {
  flex: 0 0 40%;
}

.popup-title {
  font-size: 20px;
  color: black;
  margin-bottom: 10px;
  right: 40px;
}

.popup-image {
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.popup-description-and-price {
  flex: 0 0 55%;
  text-align: left;
  margin-left: 20px;
}

.popup-description {
  font-size: 16px;
  color: black;
  margin-bottom: 10px;
}

.popup-price {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.quantity-control {
  margin-top: 10px;
}

.quantity-control label {
  font-size: 14px;
  margin-right: 5px;
}

.quantity-control input {
  width: 50px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.add-to-wishlist,
.add-to-cart {
  background-color: #97c992;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.add-to-wishlist:hover,
.add-to-cart:hover {
  opacity: 0.9;
}

.close-popup {
  position: absolute;
  top: 0px;
  right: 10px;
  /* Adjust the right position as needed */
  font-size: 30px;
  color: rgb(0, 0, 0);
  cursor: pointer;
}
</style>

>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
