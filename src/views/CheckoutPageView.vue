<template>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
   <div class="checkout">
     <h1 class="checkout-title">Checkout</h1>
     
     <div class="checkout-container">
       <div class="checkout-section address-section">
         <h2>Adresse de Livraison :</h2>
         <div v-for="address in AllAddresses" :key="address.Id" class="card">
           <div class="address-line">{{ address.NumberName }},</div>
           <div class="address-line">{{ address.PostalCode }} {{ address.City }}</div>
         </div>
         <button @click="toggleAForm">Add Address</button>
         <form v-if="showAForm" class="address-form">
           <label for="NName">Rue :</label>
           <input type="text" v-model="NName" id="NName" placeholder="Rue" required>
 
           <label for="PCode">Code Postal :</label>
           <input type="text" v-model="PCode" id="PCode" placeholder="Code Postal" required>
 
           <label for="City">Ville :</label>
           <input type="text" v-model="City" id="City" placeholder="Ville" required>
 
           <button @click="saveAddress">Save</button>
         </form>
       </div>
       <div class="checkout-section">
         <h2>Moyen de Paiement :</h2>
         <div class="payment-options">
           <div class="payment-option" :class="{ 'active': paiement === 'creditCard' }">
             <input type="radio" id="carteBancaire" v-model="paiement" value="creditCard" @change="selectPayment('creditCard')" />
             <label for="carteBancaire">
               <div class="payment-card">Carte Bancaire</div>
             </label>
           </div>
           <div class="payment-option" :class="{ 'active': paiement === 'other' }">
             <input type="radio" id="autre" v-model="paiement" value="other" @change="selectPayment('other')" />
             <label for="autre">
               <div class="payment-card">Autre</div>
             </label>
           </div>
         </div>
         <div v-if="paiement === 'creditCard'" class="payment-form">
           <label for="cardNumber">Numéro de Carte :</label>
           <input type="text" pattern="[0-9]" maxlength="40" inputmode="numeric" id="cardNumber" placeholder="Numéro de Carte" required>
 
           <label for="cardOwner">Propriétaire :</label>
           <input type="text" maxlength="100" id="cardOwner" placeholder="Propriétaire" required>
 
           <div class="expiry-container">
             <label for="expiryMonth">Date d'Expiration :</label>
             <div class="expiry-inputs">
               <select id="expiryMonth" required>
                 <option v-for="month in months" :key="month">{{ month < 10 ? '0' + month : month }}</option>
               </select>
               <select id="expiryYear" required>
                 <option v-for="year in years" :key="year">{{ year }}</option>
               </select>
             </div>
           </div>
 
           <label for="cvv">CVV :</label>
           <input type="text" id="cvv" placeholder="CVV" required>
         </div>
       </div>
       <div v-if="paiement === 'other'">
         <p>Paiement à la Livraison.</p>
       </div>
     </div>
     
   </div>
   
       <!-- Right Container -->
       <!-- Add your content for the right container here -->
       <!-- For example, you can include a summary or additional information -->
       <div class="right-container">
     <h2>Order Summary</h2>
 
     <!-- Product Details Section -->
     <div class="order-section">
       <span class="section-title">Product Details</span>
       <span class="total-text">Total</span>
       <hr />
       <span class="side-text">12 €</span>
       <p>Black Tea <span class="quantity">x <span class="bold">2</span></span></p>
       
       
     </div>
 
     <hr />
 
     <!-- Cart Subtotal Section -->
     <div class="order-section">
       <span class="section-title">Cart Subtotal</span>
       <!-- Add content for cart subtotal here -->
     </div>
 
     <hr />
 
     <!-- Shipping Fees Section -->
     <div class="order-section">
       <span class="section-title">Shipping Fees</span>
       <!-- Add content for shipping fees here -->
       <span class="side-text">Free shipping</span>
     </div>
 
     <hr />
 
     <!-- Order Total Section -->
     <div class="order-section">
       <span class="section-title">Order Total</span>
       <!-- Add content for order total here -->
       
     </div>
 
     <div class="checkout-summary">
     <div class="total">
       <span>Total:</span>
       <span ref="totalAmount">{{ totalPrice.toFixed(2) }}</span>
     </div>
     <button class="checkout-button" @click="checkout" ref="checkoutButton">Payer</button>
   </div>
   </div>
 
   
   
 
 </template>
 
 
 
 
 <script>
 import Axios from 'axios';
 import currentUser from '@/_services/FetchUserData.js';
 
 export default {
   mixins: [currentUser],
   data() {
     return {
       AllAddresses: [],
       AllItems: [],
       showAForm: false,
       showCForm: true,
       chosenAddress: "",
       NName: "",
       PCode: "",
       City: "",
       minYear: new Date().getFullYear(),
       maxYear: "",
       years: [],
       months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
       paiement: "creditCard",
       newAddresses: [],
       totalPrice: 12,
     };
   },
   methods: {
       selectPayment(paymentMethod) {
     this.paiement = paymentMethod;
   },
     toggleAForm() {
       this.showAForm = true;
     },
     toggleCForm() {
       this.showCForm = true;
     },
     deactivateCForm() {
       this.showCForm = false;
     },
     async fetchProductResume() {
       const cart = JSON.parse(localStorage.getItem('cart')) || [];
 
       for (const cartItem of cart) {
         try {
           const response = await Axios.get(`https://localhost:7115/v1/api/Product/${cartItem.pid}`);
           const productFromDB = response.data;
 
           this.AllItems.push({
             name: productFromDB.Name,
             totalprice: productFromDB.Price * cartItem.quantity,
           });
           this.calculateTotal();
         } catch (error) {
           console.error('Failed to fetch product from the database', error);
         }
       }
     },
     async fetchUserAddresses() {
       try {
         await this.currentUser();
         await this.authStateChangedPromise;
         const response = await Axios.get(`https://localhost:7115/v1/api/Adresses/ByUser/${this.id}`);
         this.AllAddresses = response.data;
       } catch (error) {
         console.error('Failed to connect to the databank', error);
       }
     },
     async checkout() {
       try {
         await this.currentUser();
         await this.authStateChangedPromise;
         await this.createInvoice(this.id);
       } catch (error) {
         console.error('Failed to connect to the databank', error.message);
       }
       // alert('Checkout successful!');
     },
     async createInvoice(uid) {
       try {
         if (this.chosenAddress === "custom") {
           this.sAddress = `'NumberName': '${this.NName}'|'PostalCode': '${this.PCode}'|'City': '${this.City}'`;
         } else {
           this.sAddress = this.chosenAddress;
         }
         const comData = {
           UserId: uid,
           TotalPrice: this.totalPrice,
           Shipment_Status: 'Pending',
           Shipping_Address: this.sAddress,
           Paiement_Type: this.paiement,
           Date: new Date().toISOString(),
         };
 
         const response = await Axios.post('https://localhost:7115/v1/api/Command', comData, {
           headers: {
             'Content-Type': 'application/json',
           },
         });
 
         const cartProducts = JSON.parse(localStorage.getItem('cart'));
 
         for (const cartProduct of cartProducts) {
           try {
             const productDetails = await Axios.get(`https://localhost:7115/v1/api/Product/${cartProduct.pid}`);
 
             const comPData = {
               ProductId: cartProduct.pid,
               CommandId: response.data.Id,
               Quantity: cartProduct.quantity,
               TotalPrice: productDetails.data.Price * cartProduct.quantity,
             };
 
             // Store the product in the CommandProduct collection
             await this.storeInvoiceProduct(comPData);
           } catch (error) {
             console.error('Failed to connect to the databank', error.message);
           }
           localStorage.removeItem('cart');
           this.$router.push('/');
         }
       } catch (error) {
         console.error('Failed to connect to the databank', error.message);
       }
     },
     calculateTotal() {
       this.totalPrice = this.AllItems.reduce((accumulator, currentItem) => {
         return accumulator + currentItem.totalprice;
       }, 0);
     },
     async storeInvoiceProduct(comPData) {
       // Used to store the product in the CommandProduct collection
       try {
         await Axios.post('https://localhost:7115/v1/api/CommandProduct', comPData, {
           headers: {
             'Content-Type': 'application/json',
           },
         });
       } catch (error) {
         console.error('Failed to connect to the databank', error.message);
       }
     },
     saveAddress() {
 // Check if all required fields are filled
 if (!this.NName || !this.PCode || !this.City) {
   alert('Please fill in all required fields.');
   return;
 }
 
 this.newAddresses.push({
   NumberName: this.NName,
   PostalCode: this.PCode,
   City: this.City,
 });
 
 // Add the new address to AllAddresses
 this.AllAddresses.push(...this.newAddresses);
 
 // Clear the newAddresses array
 this.newAddresses = [];
 
 // Reset the form
 this.NName = "";
 this.PCode = "";
 this.City = "";
 this.showAForm = false;
},
     
     addressRange() {
       this.maxYear = this.minYear + 10;
       this.years = Array.from({ length: this.maxYear - this.minYear + 1 }, (v, k) => k + this.minYear);
     },
   },
   beforeMount() {
     this.fetchProductResume();
     this.fetchUserAddresses();
   },
   mounted() {
     this.addressRange();
   },
 };
 </script>
 
 <style scoped>
 .checkout {
   display: flex;
   flex-direction: column;
   padding: 20px;
   margin-top: 170px;
   font-family: 'Kaisei Decol', sans-serif;
 }
 
 .checkout-title {
   font-family: 'Kaisei Decol', sans-serif;
   text-align: center;
   position: relative;
   font-size: 34px;
   font-weight: 100;
 }
 .checkout-title:after {
   content: "";
   display: block;
   width: 80px;
   height: 2px;
   background-color: #333;
   margin: 10px auto;
 }
 
 .checkout-container {
   background-color: white;
   border-radius: 5px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   padding: 20px;
   width: 60%;
   display: flex;
   flex-direction: column;
   margin-TOP: 20px;
   font-family: 'Kaisei Decol', sans-serif;
   
   
 }
 
 .checkout-section {
   border-bottom: 1px solid #ddd;
   padding-bottom: 10px;
   margin-bottom: 20px;
 }
 
 .card {
   border-radius: 1em;
   background-color: #b4cfb2;
   width: 200px;
   color: #fff;
   padding: 1em;
   margin-bottom: 10px;
 }
 
 .address-line {
   margin-bottom: 5px;
 }
 
 .address-form,
 .payment-form {
   display: flex;
   flex-direction: column;
 }
 
 .address-form label,
 .payment-form label {
   margin-bottom: 5px;
 }
 
 .checkout-summary {
   text-align: right;
   margin-top: auto;
 }
 
 .total {
   text-align: right;
   margin-bottom: 10px;
   font-size: 18px;
 }
 
 .checkout-button {
   background-color: #93ab91;
   color: white;
   border: none;
   padding: 10px;
   border-radius: 5px;
   cursor: pointer;
   font-size: 16px;
   transition: opacity 0.3s;
 }
 
 .checkout-button:hover {
   opacity: 0.9;
 }
 
 .address-form input,
 .payment-form input,
 .address-form select,
 .payment-form select {
   padding: 8px;
   margin-bottom: 10px;
   border: 1px solid #ccc;
   border-radius: 4px;
   box-sizing: border-box;
   width: 478px;
 }
 
 .payment-options {
   display: flex;
   gap: 20px;
   justify-content: center;
 }
 
 .payment-option {
   flex: 1;
   background-color: #fff;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.3s;
   text-align: center;
   margin-bottom: 20px;
   margin-top: 10px;
 }
 
 .payment-option:hover {
   transform: translateY(-4px);
 }
 
 .payment-card {
   padding: 16px;
 }
 
 .payment-option.active {
   border: 2px solid #ffffff;
 }
 
 .payment-form .expiry-container {
   display: flex;
   flex-direction: column;
   margin-bottom: 10px;
 }
 
 .payment-form .expiry-inputs {
   display: flex;
   gap: 10px;
   width: 478px;
 }
 
 .address-section button {
   background-color: #93ab91;
   color: white;
   border: none;
   padding: 10px;
   border-radius: 5px;
   cursor: pointer;
   font-size: 16px;
   transition: opacity 0.3s;
   margin-bottom: 15px;
   margin-top: 15px;
 }
 
 .address-section button:hover {
   opacity: 0.9;
 }
 
 .right-container {
   background-color: white;
   border-radius: 5px;
   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   padding: 20px;
   font-family: 'Kaisei Decol', sans-serif;
   width: 38%;
   position: absolute;
   top: 90px;
   left: 80.5%;
   transform: translateX(-50%);
   margin-top: 20PX;
 }
.section-title {
   font-weight: bold;
   
 }
 
 .total-text {
   font-weight: bold;
   float: right;
 }
 .side-text {
   float: right;
 }
 .quantity {
   font-weight: bold;
 }
 
 .bold {
   font-weight: bold;
 }
 
 h2{
  font-size: 23PX;
 }
</style>