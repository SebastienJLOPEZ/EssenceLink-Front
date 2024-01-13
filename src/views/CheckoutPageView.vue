<template>
    <div class=toutenbas>
        <!--TODO:
        -Add another radio button system for paiement methode (credit card, paypal, ...)
        -All of this on left side, for right side a reminder of what will be brought
        -The right side will have the button to confirm, and will static to the screen, not the page
        -Find a way to show 
        -->
        <div>
            <div class="address-radio">
                Adresse de Livraison :
                <label v-for="address in AllAddresses" :key="address.Id">
                    <div>
                        {{ address.NumberName }}, {{ address.PostalCode }} {{ address.City }} <input type="radio"
                            name="address" v-model="chosenAddress" value="address.Id" @click="deactivateAForm">
                    </div>

                </label>

                <label>
                    <div>
                        <input type="radio" name="address" v-model="chosenAddress" value="custom" @click="toggleAForm">
                        <form v-if="showAForm">
                            Rue : <input type="text" v-model="NName">
                            Code Postal : <input type="text" v-model="PCode">
                            Ville : <input type="text" v-model="City">
                        </form>
                    </div>

                </label>
            </div>
            <div>
                <label>
                    Moyen de Paiement :
                    <div>
                        <div>
                            Carte Bancaire :<input type="radio" id="paiement" v-model="paiement" value="creditCard"
                                @click="toggleCForm" checked="checked">
                        </div>
                        <div>
                            <form v-if="showCForm">
                                Numéro de Carte : <input type="text" pattern="[0-9]" maxlength="40" inputmode="numeric">
                                Propriétaire : <input type="text" maxlength="100">
                                Date d'Expiration : <!--Will be finished later-->
                                <select id="month">
                                    <option v-for="month in months" :key="month.value">{{ month < 10 ? '0' + month : month
                                    }}</option>
                                </select>
                                <select id="month">
                                    <option v-for="year in years" :key="year.value">{{ year }}</option>
                                </select>
                                CVV : <input type="text">
                            </form>
                        </div>
                        <div>
                            Autre : <input type="radio" id="paiement" v-model="paiement" value="other"
                                @click="deactivateCForm">
                        </div>
                    </div>
                </label>
            </div>
            <div class="product-reminder">
                <tr v-for="product in AllItems" :key="product.name">
                    <td>{{ product.name }}</td> |
                    <td>{{ product.totalprice }}</td> €
                </tr>
                Total : <span>{{ totalPrice }}</span>
            </div>
            <button @click="checkout()">Payer</button>
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
            totalPrice: "",
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

<style scoped src="@/assets/checkout.css"></style>