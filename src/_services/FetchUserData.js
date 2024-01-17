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
    currentUser() {
      const auth = getAuth(firebase);

      this.authStateChangedPromise = new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.email = user.email;
            this.fetchUserData(user.email).then(() => {
              resolve(user.email);
            });
          } else {
            // Gérer le cas où l'utilisateur n'est pas connecté
            console.log("Utilisateur non connecté");
            resolve(null);
          }
        });
      });

      return this.authStateChangedPromise;
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
