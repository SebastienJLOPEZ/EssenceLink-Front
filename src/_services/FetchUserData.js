import Axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

export default {
  data() {
    return {
      id:"",
      email:"",
      errorMessage: "",
    };
  },
  methods: {
    async currentUser(){
      let v=this;
      const auth = getAuth(firebase);

      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            v.email = user.email;
            resolve(user.email);
            this.fetchUserData(user.email);
          }
        });
      });
  },
  async fetchUserData(email) {
    try {
      const response = await Axios.get(`https://localhost:7115/v1/api/User/${email}`);
      this.id = response.data.Id;
    } catch (error) {
      this.errorMessage = "Not Connected";
      console.error('Failed to connect to databank', error);
    }
  },
  },
};
