<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <h1 class="cart-title">Your Cart</h1>
  <div class="cart-container">
    <div class="cart-items">
      <div v-if ="cartItems.length > 0">
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
        <div class="product-price">{{ item.Price.toFixed(2) }}</div>
        <div class="product-quantity">
          <input type="number" v-model="item.quantity" min="1" :max="item.max" @input="updateQuantity(index)">
        </div>
        <div class="product-removal">
          <button @click="removeItem(index, item)">Remove</button>
        </div>
        <div class="product-line-price">{{ (item.Price * item.quantity).toFixed(2) }}</div>
      </div>
      </div>
      <!--div v-else class="No_Product_Text">
        <p>Pas de produit. Continuez vos achats.</p>
      </div-->
    </div>
    <div class="cart-summary">
      <div class="total">
        <span>Total:</span>
        <span ref="totalAmount">{{ calculateTotal().toFixed(2) }}</span>
      </div>
      <!--Will need to change this css-->
      <button  class="checkout-button" @click="goToCheckout()" ref="checkoutButton">Confirmer</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import checkAuthentication from '@/_services/SendToLogin.js'


export default {
  mixins: [checkAuthentication],
  data() {
    return {
      cartItems: [
        /*{ name: 'HYDROLAT - Bleuet bio', description: 'Hydrolat 100 % pur et naturel ', Price: 12.99, quantity: 2, image: require('@/assets/CART2.jpg'), linePrice: 0 },
        { name: 'Provence D Antan', description: 'Herbes De Provence 100G Bio', Price: 15.99, quantity: 1, image: require('@/assets/CART1.png'), linePrice: 0 },*/
        
      ],
      data: "",
      totalPrice:"",
    };
  },
  created() {
    this.cartItems.forEach((item) => {
      item.linePrice = item.Price * item.quantity;
    });
  },
  computed(){
    this.calculateTotal();
  },
  methods: {
    updateQuantity(index) {
      const item = this.cartItems[index];
      item.linePrice = item.Price * item.quantity;
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
      let devicesArray  = JSON.parse(localStorage.getItem("cart"))
      devicesArray.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(devicesArray));
    },
    calculateTotal() {
      return this.totalPrice = this.cartItems.reduce((total, item) => total + item.linePrice, 0);
    },
    async goToCheckout(){
      try {
        await checkAuthentication.call(this);
      } catch (error) {
        console.log('Redirection effectuée, donc on arrête l\'exécution restante du code.');
        return;
      }
      try{
      console.log("test");
      this.$router.push('/checkout')
      } catch(error) {
        console.error('Failed to go to Checkout', error);
      }
    },
    
    async fetchCartItem() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    for (const cartItem of cart) {
      try {
        const response = await Axios.get(`https://localhost:7115/v1/api/Product/${cartItem.pid}`);
        const productFromDB = response.data;

        // Ajouter le produit récupéré depuis la base de données à cartItems
        this.cartItems.push({
          name: productFromDB.Name,
          description: productFromDB.Description,
          Price: productFromDB.Price,
          max: productFromDB.Quantity,
          quantity: cartItem.quantity,
          image:require('@/assets/CART1.png'), 
          linePrice: 0 
        });
        this.calculateTotal();
      } catch (error) {
        console.error('Failed to fetch product from database', error);
      }
    }
  },
  },
  beforeMount(){
    this.fetchCartItem();
  }
};
</script>

<style scoped>
.cart-title {
  font-family: 'Kaisei Decol', sans-serif;
  text-align: center;
  position: relative;
  font-size: 34px; /* Adjust the font size as needed */
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

.No_Product_Text{
  font-family: 'Kaisei Decol', sans-serif;
  text-align : center;
  position: relative
}
</style>
