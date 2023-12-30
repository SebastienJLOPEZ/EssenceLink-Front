import Axios from 'axios';

export default {
  data() {
    return {
      id:"",
      errorMessage: "",
    };
  },
  methods: {
    fetchUserData(email) {
      let v = this;
      v.errorMessage = "";

      Axios.get(`https://localhost:7115/v1/api/User/${email}`)
        .then(response => {
          v.id = response.data.Id;
        })
        .catch(error => {
          v.errorMessage = "Not Connected";
          console.error('Failed to connect to databank', error);
        });
    },
  },
};
