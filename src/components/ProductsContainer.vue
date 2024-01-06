<template>
    <div class="products-and-garden-container">
      <div class="product-container">
        <div v-for="(product, index) in products" :key="index" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src="product.image" alt="Product Image" />
            <p class="description">{{ product.description }}</p>
            <p class="price">{{ product.price }}</p>
            <div class="line"></div>
            <div class="buttons">
              <button @click="quickView(product)" class="quick-view">Quick View</button>
              <button @click="addToWishlist(product)" class="wishlist">Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      products: Array,
    },
    methods: {
      quickView(product) {
        this.$emit('quickView', product);
      },
      addToWishlist(product) {
        this.$emit('addToWishlist', product);
      },
    },
  };
  </script>
  
  <style scoped>
  .products-and-garden-container {
    /* Add your existing styles for .products-and-garden-container if any */
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
  </style>
  