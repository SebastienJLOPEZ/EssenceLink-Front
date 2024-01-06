<script>

import Axios from 'axios';
import FetchUserData from './FetchUserData.vue';

export default {
  data(){
    return{
      uid : "",
      adresses : [],
      adress: [],
      possible : "Y",
      errorMessage : "",
    }
  },
  components: {
    FetchUserData,
  },
  methods : {
    async FetchUserAdress(){  //Check number of adresses 
      this.uid = this.$refs.fetchUserDataComponent.userId;
      try {
        const response = await Axios.get(`https://localhost:7115/v1/api/Adresses/${this.uid}`);
        console.log(response);
        this.adresses = response.data;
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
    StoreUserNewAdress(NewAdress){
      this.FetchUserAdress();
      this.CheckUserAdress();
      if (this.possible == "Y"){
        Axios.post(`https://localhost:7115/v1/api/Adresses`, NewAdress,  {
             headers: {
              'Content-Type': 'application/json',
            },})
            .then(response => {
            console.log('In databank', response.data);
          })
          .catch(error => {
            console.error('Not in databank',error.message);
          });
      } else {
        this.errorMessage = "Maximum adresses added. Delete one to add another."
      }
    },
    CheckUserAdress(){
      if (this.adresses.length > 2){
        this.possible = 'N';
      }
    },
    async FetchOneAdress(id){
      try {
      const response = await Axios.get(`https://localhost:7115/v1/api/Adresses/adress/${id}`);
        console.log(response);
        this.adress = response.data;
      } catch (error) {
        console.error('Failed to connect to databank', error);
      }
    },
  }
};
</script>