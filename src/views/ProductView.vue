<template>
    <div>
        <div class="toutenbas">
            {{ Name }}<br>
            {{ Price }}<br>
            {{ Description }}<br>
            {{ Score === 0 ? '' : Score }}<br>
            {{ Quantity > 10 ? "" : "Il ne reste que " + Quantity + " unité." }}
            <button @click="addToCart()" class="add-to-cart">Add to Cart</button>
            <button @click="addToWishlist()" class="wishlist">Wishlist</button>
        </div>
        <br>
        <div class="review-input">
            <form>
                Score : <input type="number" v-model="score" step="0.5" min="0" max="5"><br>
                Message : <br> <textarea v-model="review" cols="60" rows="3"></textarea>
            </form>
            <button @click="addReview()">Ajouter un avis</button>
        </div>
        <div v-for="review in allReviews" :key="review.Id" class="plusbas">
            {{ review.Date }} <br>
            {{ review.Score }} <br>
            {{ review.ReviewText }} <br>
        </div>

    </div>
</template>

<script>
import Axios from 'axios';
import currentUser from '@/_services/FetchUserData.js';
import checkAuthentication from '@/_services/SendToLogin.js'
import ProductCaller from '@/_services/ProductCaller.js';

export default {
    mixins: [ProductCaller, checkAuthentication, currentUser],
    data() {
        return {
            allReviews: [],
            quantity: 1,
            score: 0,
            review: "",
            newScore: 0,
        }
    },
    methods: {
        async fetchAllReview(pid) {
            try {
                const response = await Axios.get(`https://localhost:7115/v1/api/Review/ByProduct/${pid}`);
                this.allReviews = response.data;
                console.log(response);
            } catch (error) {
                console.error('Failed to connect to databank', error);

            }
        },
        addToCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const productInCart = cart.find(item => item.pid === this.$route.query.pid)
            if (productInCart) {
                productInCart.quantity += this.quantity;
            } else {
                cart.push({ pid: this.$route.query.pid, quantity: this.quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
        },

        async addToWishlist() {
            try {
                await checkAuthentication.call(this);
            } catch (error) {
                console.log('Redirection effectuée, donc on arrête l\'exécution restante du code.');
                return;
            }
            try {
                await this.currentUser();
                await this.authStateChangedPromise;
                const newWLData = {
                    UserId: this.id,
                    ProductId: this.$route.query.pid,
                }
                const response = await Axios.post('https://localhost:7115/v1/api/Wishlist', newWLData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },)
                console.log(`Added to wishlist: ${this.Name}`, response);
            } catch (error) {
                console.error('Failed to connect to databank', error.message);

            }
        },
        async addReview() {
            try {
                await checkAuthentication.call(this);
            } catch (error) {
                console.log('Redirection effectuée, donc on arrête l\'exécution restante du code.');
                return;
            }
            try {
                await this.currentUser();
                await this.authStateChangedPromise;
                const newReview = {
                    UserId: this.id,
                    ProductId: this.$route.query.pid,
                    Score: this.score,
                    ReviewText: this.review,
                    Date: new Date().toISOString(),
                }

                const response = await Axios.post('https://localhost:7115/v1/api/Review', newReview, {
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
                console.log(response);
                await this.fetchAllReview(this.$route.query.pid);
                await this.updateProductScore(this.$route.query.pid);
                await this.ProductShow(this.$route.query.pid)
                this.review = '';
            } catch (error) {
                console.error('Failed to connect to databank', error.message);
            }
        },
        async updateProductScore(query) {
            try {
                const allScores = [];
                this.newScore = 0;
                for (const indScore of this.allReviews) {
                    console.log(indScore.Score)
                    allScores.push(indScore.Score);
                    this.newScore += indScore.Score;
                }
                console.log(this.newScore, allScores.length)
                if (allScores.length > 0) {
                    this.newScore = Math.ceil(this.newScore / allScores.length * 2) / 2;
                }
                const updateScore = {
                    Name: this.Name,
                    Price: this.Price,
                    Quantity: this.Quantity,
                    Type: this.Type,
                    SubType: "Tisane",
                    Description: this.Description,
                    DateAdded: this.Date, // Date enregistrée automatiquement
                    Score: this.newScore,
                }
                const response = await Axios.put(`https://localhost:7115/v1/api/Product/${query}`, updateScore, {
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
                console.log(response);
            } catch (error) {
                console.error('Failed to connect to databank', error.message);
            }
        }
    },
    mounted() {
        this.ProductShow(this.$route.query.pid)
        this.fetchAllReview(this.$route.query.pid);
    }
}

</script>

<style scoped src="@/assets/Product.css"></style>