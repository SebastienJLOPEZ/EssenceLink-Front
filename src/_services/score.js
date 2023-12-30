import Axios from 'axios';

export default{
    data(){

    },
    methods:{
       async AddReview(reviewData){
            try {
                const response = Axios.post('https://localhost:7115/v1/api/Review', reviewData, {
                    headers: {
                     'Content-Type': 'application/json',
                   },});
                   console.log(response);
                   await this.UpdateReviewScore(reviewData.ProductId)
            } catch (error){
                console.error('Failed to connect to databank', error);
            }
        },
        async GetProductReview(pid){
            try{
               const response = Axios.get(`https://localhost:7115/v1/api/Review/Product/${pid}`)
                console.log(response);
            } catch (error) {
                console.error('Failed to connect to databank', error);
            }
        },
        async GetProductUser(uid){
            try{
                const response = Axios.get(`https://localhost:7115/v1/api/Review/User/${uid}`)
                 console.log(response);
             } catch (error) {
                 console.error('Failed to connect to databank', error);
             }
        },
        async UpdateReviewScore(pid){
            try{
                const reviews = await this.GetProductReview(pid);

                const totalScore = reviews.reduce((accumulator, review) => {
                    return accumulator + review.Score;
                  }, 0);
            
                const averageScore = totalScore / reviews.length;
                const roundedScore = Math.round(averageScore * 2) / 2
                    
                await Axios.put(`https://localhost:7115/v1/api/Product/${pid}`, {
                    score: roundedScore,
                  }, { headers: {
                    'Content-Type': 'application/json',
                  },})
            } catch (error){
                console.error('Failed to connect to databank', error);
            }
        }
    }
}