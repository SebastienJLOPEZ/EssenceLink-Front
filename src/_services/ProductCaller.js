import Axios from 'axios';

export default {
    methods:{
        async ProductFetcher(pType){
            try{
                const response = await Axios.get(`https://localhost:7115/v1/api/Product/${pType}`);
                this.productList = response.data;
                console.log(response);
            } catch (error) {
                console.error('Failed to connect to databank', error);
            }
        },
        async ProductShow(pid){
            try{
                const response = await Axios.get(`https://localhost:7115/v1/api/Product${pid}`);
                console.log(response);
            } catch (error) {
                console.error('Failed to connect to databank', error);
            }
        }
    }
}