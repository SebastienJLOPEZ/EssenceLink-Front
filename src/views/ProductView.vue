<template>
    <div >
        <div class="toutenbas">
            {{ Name }}<br>
            {{ Price }}<br>
            {{ Description }}<br>
            {{ Score }}<br>
        </div >
        <div v-for="review in allReviews" :key="review.Id" class="plusbas">
            {{ review.Date }} <br>
            {{ review.Score }} <br>
            {{ review.ReviewText }} <br>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import ProductCaller from '@/_services/ProductCaller.js';

export default {
    mixins: [ProductCaller],
    data() {
        return {
            allReviews: [],
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
        }
    },
    mounted() {
        this.ProductShow(this.$route.query.pid)
        this.fetchAllReview(this.$route.query.pid);
    }
}

</script>

<style scoped src="@/assets/Product.css"></style>