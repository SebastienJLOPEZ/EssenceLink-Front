import Axios from 'axios';

export default {
    data() {
        return {
            Id: "",
            Name: "",
            Price: "",
            Description: "",
            Score: "",
            Quantity: "",
            Date: "",
            Type: "",
            SubType: "",
        }
    },
methods: {
        async ProductFetcher(pType){
        try {
            //const fetchType = JSON.parse(localStorage.getItem("showProduct"));
            const response = await Axios.get(`https://localhost:7115/v1/api/Product/${/*fetchType.type*/pType}`);
            this.productList = response.data;
            console.log(response/*, fetchType*/);
            //localStorage.removeItem('showProduct');
        } catch (error) {
            console.error('Failed to connect to databank', error);
        }
    },
    async ProductFetcherSub(pType, pSub){
        try {
            //const fetchType = JSON.parse(localStorage.getItem("showProduct"));
            const response = await Axios.get(`https://localhost:7115/v1/api/Product/${pType}/${pSub}`);
            this.productList = response.data;
            console.log(response/*, fetchType*/);
            //localStorage.removeItem('showProduct');
        } catch (error) {
            console.error('Failed to connect to databank', error);
        }
    },
    async ProductSearchResult(pSearch){
        try {
            //const fetchType = JSON.parse(localStorage.getItem("showProduct"));
            const response = await Axios.get(`https://localhost:7115/v1/api/Product/Search/${pSearch}`);
            this.productList = response.data;
            console.log(response/*, fetchType*/);
            //localStorage.removeItem('showProduct');
        } catch (error) {
            console.error('Failed to connect to databank', error);
        }
    },
        async ProductShow(pid){
        try {
            const response = await Axios.get(`https://localhost:7115/v1/api/Product/${pid}`);
            console.log(response);
            this.Id = response.data.Id;
            this.Name = response.data.Name;
            this.Description = response.data.Description;
            this.Price = response.data.Price;
            this.Score = response.data.Score;
            this.Quantity = response.data.Quantity;
            this.Date = response.data.DateAdded;
            this.Type = response.data.Type;
            this.SubType = response.data.SubType;
        } catch (error) {
            console.error('Failed to connect to databank', error);
        }
    }
}
}