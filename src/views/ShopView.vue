<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei%20Decol' rel='stylesheet'>
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
              <button @click.stop="addToWishlist(product)" class="wishlist">Wishlist</button>
              <button @click.stop="quickView(product)" class="quick-view">Quick View</button>
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
            </div>
          </div>
        </div>
        <div class="buttons">
          <button @click="addToWishlist(selectedProduct)" class="add-to-wishlist">
            Add to Wishlist <ion-icon name="heart"></ion-icon>
          </button>
          <button @click="addToCart(selectedProduct)" class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>

    <!-- Global Wishlist Message -->
    <div v-if="globalWishlistMessage" class="global-wishlist-container">
      <div class="global-wishlist-message">
        {{ globalWishlistMessage }}
      </div>
    </div>

</div>
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
      isPriceFilterOpen: false,
      priceFilters: [
        { label: 'Low to High', value: 'low To High' },
        { label: 'High to Low', value: 'high To Low' },
      ],
      selectedFilter: null,
      showPopup: false,
      selectedProduct: null,
      currentType: "Boisson",
      productList: [],
      previousContent: null,
      globalWishlistMessage: '',
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
        this.globalWishlistMessage = "Produit ajouté à la Liste des souhaits"
        setTimeout(() => {
        this.globalWishlistMessage = "";
      }, 3000);
      } catch (error) {
        console.error('Failed to connect to databank', error.message);
      }
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

<style lang="css" scoped src="@/components/ShopStyle.css"></style>
