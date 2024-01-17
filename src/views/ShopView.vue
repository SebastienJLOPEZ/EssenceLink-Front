<template>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <!-- Category Banner -->
    <div class="category-banner-container">
      <img src="@/assets/BG4.jpg" alt="Category Banner" class="category-banner" />
      <div class="category-overlay">
        <h1 class="category-title">Green Tea</h1>
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
        <div v-for="(product, index) in products" :key="index" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src="product.image" alt="Product Image" />
            <p class="description">{{ product.description }}</p>
            <p class="price">{{ product.price }}</p>
            <div class="line"></div>
            <div class="buttons">
              <button @click="addToWishlist(product)" class="wishlist">Wishlist</button>
              <button @click="quickView(product)" class="quick-view">Quick View</button>
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
            <img :src="selectedProduct.image" alt="Product Image" class="popup-image" />
          </div>
          <div class="popup-description-and-price">
            <h2 class="popup-title">{{ selectedProduct.name }}</h2>
            <p class="popup-description">{{ selectedProduct.descriptionPopup }}</p>
            <p class="popup-price">{{ selectedProduct.price }}</p>
            <div class="quantity-control">
              <label for="quantity">Quantity:</label>
              <input type="number" id="quantity" v-model="selectedProduct.quantity" min="1" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <button @click="addToWishlistFromPopup(selectedProduct)" class="add-to-wishlist">
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
import productImage1 from '@/assets/bg3.jpg';
import productImage2 from '@/assets/bg3.jpg';
import productImage3 from '@/assets/bg6.jpg';
import productImage4 from '@/assets/bg6.jpg';
import productImage5 from '@/assets/bg6.jpg';
import productImage6 from '@/assets/bg6.jpg';
import productImage7 from '@/assets/bg6.jpg';
import productImage8 from '@/assets/bg6.jpg';

export default {
  data() {
    return {
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
      isPriceFilterOpen: false,
      priceFilters: [
        { label: 'Low to High', value: 'low To High' },
        { label: 'High to Low', value: 'high To Low' },
      ],
      selectedFilter: null,
      showPopup: false,
      selectedProduct: null,
      globalWishlistMessage: '',
      cartCount: 0,
      cart : [],
    };
  },
  methods: {
    quickView(product) {
      this.selectedProduct = {
        ...product,
        quantity: 1,
      };
      this.showPopup = true;
    },
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
    toggleCart() {

    },
  },
};
</script>

<style lang="css" scoped src="@/components/ShopStyle.css"></style>
