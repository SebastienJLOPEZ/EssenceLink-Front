<template>
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
                        <input type="radio" id="carteBancaire" v-model="paiement" value="creditCard"/>
                        <label for="carteBancaire">
                            <div class="payment-card">Carte Bancaire</div>
                        </label>
                    </div>
                    <div class="payment-option" :class="{ 'active': paiement === 'other' }">
                        <input type="radio" id="autre" v-model="paiement" value="other"/>
                        <label for="autre">
                            <div class="payment-card">Autre</div>
                        </label>
                    </div>
                </div>
                <div v-if="paiement === 'creditCard'" class="payment-form">
                    <label for="cardNumber">Numéro de Carte :</label>
                    <input type="text" pattern="[0-9]" maxlength="40" inputmode="numeric" id="cardNumber"
                        placeholder="Numéro de Carte" required>

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
                <p>Paiement à la Livraison</p>
            </div>
        </div>

    </div>
    <div class="right-container">
        <h2>Order Summary</h2>

        <!-- Product Details Section -->
        <div class="order-section" v-for="product in AllItems" :key="product.name">
            <span class="section-title">Product Details</span>
            <span class="total-text">Total</span>
            <hr />
            <span class="side-text">{{ product.totalprice }} €</span>
            <p>{{ product.name }} <span class="quantity"> {{ product.quantity }} <span class="bold"></span></span></p>


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
import currentUser from '@/_services/FetchUserData.js'

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
            totalPrice: 0,
            paiement: "creditCard",
        }
    },
    methods: {
        toggleAForm() {
            this.showAForm = true
        },
        deactivateAForm() {
            this.showAForm = false
        },
        toggleCForm() {
            this.showCForm = true;
            console.log("paiement =", this.paiement);

        },
        deactivateCForm() {
            this.showCForm = false;
            console.log(" paiement =", this.paiement);
        },
        async fetchProductResume() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            for (const cartItem of cart) {
                try {
                    const response = await Axios.get(`https://localhost:7115/v1/api/Product/${cartItem.pid}`)
                    const productFromDB = response.data;

                    this.AllItems.push({
                        name: productFromDB.Name,
                        totalprice: productFromDB.Price * cartItem.quantity,
                        quantity: cartItem.quantity,
                    })
                    this.calculateTotal();
                } catch (error) {
                    console.error('Failed to fetch product from database', error);
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
                console.error('Failed to connect to databank', error);
            }
        },
        async checkout() {
            try {
                await this.currentUser();
                await this.authStateChangedPromise;
                await this.createInvoice(this.id);
            } catch (error) {
                console.error('Failed to connect to databank', error.message);
            }
            //alert('Checkout successful!');
        },
        async createInvoice(uid) {
            try {
                if (this.chosenAddress === "custom") {
                    this.sAddress = `'NumberName': '${this.NName}'|'PostalCode': '${this.PCode}'|'City': '${this.City}'`
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

                        // Stockez le produit dans la collection CommandProduct
                        await this.storeInvoiceProduct(comPData);
                        //this.productUpdate(cartProduct.pid, cartProduct.quantity)
                    } catch (error) {
                        console.error('Failed to connect to databank', error.message);
                    }
                    localStorage.removeItem('cart');
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('Failed to connect to databank', error.message);
            }
        },
        calculateTotal() {
            this.totalPrice = this.AllItems.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.totalprice;
            }, 0);
        },

        async storeInvoiceProduct(comPData) { // sera utilisé pour stocker le produit dans la collection CommandProduct
            try {
                await Axios.post('https://localhost:7115/v1/api/CommandProduct', comPData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error('Failed to connect to databank', error.message);
            }
        },
        adressRange() {
            this.maxYear = this.minYear + 10;
            this.years = Array.from({ length: this.maxYear - this.minYear + 1 }, (v, k) => k + this.minYear);
        }
    },
    beforeMount() {
        this.fetchProductResume();
        this.fetchUserAddresses();
    },
    mounted() {
        this.adressRange();
    }
}


</script>

<style scoped src="@/assets/CheckoutPage.css"></style>