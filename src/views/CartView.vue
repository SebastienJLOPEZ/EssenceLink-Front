<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <h1 class="cart-title">Your Cart</h1>
  <div class="cart-container">
    <div class="cart-items">
      <div class="product" v-for="(item, index) in cartItems" :key="index">
        <div class="product-content">
          <div class="product-image">
            <img :src="item.image" alt="Product Image" class="product-image">
          </div>
          <div class="product-details">
            <div class="product-title">{{ item.name }}</div>
            <p class="product-description">{{ item.description }}</p>
          </div>
        </div>
        <div class="product-price">{{ item.price.toFixed(2) }}</div>
        <div class="product-quantity">
          <input type="number" v-model="item.quantity" min="1" @input="updateQuantity(index)">
        </div>
        <div class="product-removal">
          <button @click="removeItem(index)">Remove</button>
        </div>
        <div class="product-line-price">{{ (item.price * item.quantity).toFixed(2) }}</div>
      </div>
    </div>
    <div class="cart-summary">
      <div class="total">
        <span>Total:</span>
        <span ref="totalAmount">{{ calculateTotal().toFixed(2) }}</span>
      </div>
      <router-link to="/checkout">
      <button  class="checkout-button" @click="checkout" ref="checkoutButton">Checkout</button>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { name: 'HYDROLAT - Bleuet bio', description: 'Hydrolat 100 % pur et naturel ', price: 12.99, quantity: 2, image: require('@/assets/CART2.jpg'), linePrice: 0 },
        { name: 'Provence D Antan', description: 'Herbes De Provence 100G Bio', price: 15.99, quantity: 1, image: require('@/assets/CART1.png'), linePrice: 0 },
        
      ],
    };
  },
  created() {
    this.cartItems.forEach((item) => {
      item.linePrice = item.price * item.quantity;
    });
  },
  methods: {
    updateQuantity(index) {
      const item = this.cartItems[index];
      item.linePrice = item.price * item.quantity;
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    calculateTotal() {
      return this.cartItems.reduce((total, item) => total + item.linePrice, 0);
    },
    
  },
};
</script>

<style scoped>
.cart-title {
  font-family: 'Kaisei Decol', sans-serif;
  text-align: center;
  position: relative;
  font-size: 34px; 
  font-weight: 400;
  margin-top: 180PX;
}

.cart-title:after {
  content: "";
  display: block;
  width: 50px;
  height: 2px;
  background-color: #333;
  margin: 10px auto;
}

.cart-container {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 40PX;
}

.cart-items {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.product-content {
  display: flex;
  align-items: center;
}

.product-image {
  margin-right: 20px;
}

.product-image {
  width: 120px;
  height: auto;
}

.product-details {
  flex-grow: 1;
}

.product-details p {
  margin: 0;
}

.product-price,
.product-quantity,
.product-removal,
.product-line-price {
  text-align: center;
}

.cart-summary {
  text-align: right;
  margin-top: auto; /* Push cart-summary to the bottom */
}

.total {
  text-align: right;
  margin-bottom: 10px;
  font-size: 18px; /* Adjust the font size as needed */
}

button {
  background-color:  #93ab91;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.3s;
  
}
.checkout-button {
  background-color:   #93ab91;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: opacity 0.3s;
  margin-bottom: 96PX;
  TOP: 45px;
  
}

button:hover {
  opacity: 0.9;
}

@media screen and (max-width: 650px) {
  .cart-container {
    width: 90%;
  }
}

@media screen and (max-width: 350px) {
  .cart-container {
    width: 95%;
  }
}
</style>
