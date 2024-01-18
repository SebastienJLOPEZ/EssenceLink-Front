<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="container">
    <div class="card">
      <h1 class="card_title">Create Account</h1>
      <section class="signup">
        <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage !== ''" class="alert alert-success" role="alert">
          {{ successMessage }}
        </div>
        <form @submit.prevent="signupRequest" id="signup-form" class="form">
          <div class="form-group">
            <input type="text" id="name" v-model="name" placeholder="First name">
          </div>
          <div class="form-group">
            <input type="text" id="lastName" v-model="lastName" placeholder="Last name">
          </div>
          <div class="form-group">
            <input type="email" id="email" v-model="email" placeholder="Your email">
          </div>
          <div class="form-group">
            <input type="password" id="password" v-model="password" placeholder="Your password">
          </div>
         
          <div class="form-group">
            <button :disabled="xhrRequest" class="btn">
              <span v-if="!xhrRequest">Sign Up</span>
              <span v-if="xhrRequest">Please Wait...</span>
            </button>
            <div v-if="xhrRequest" class="spinner-border text-secondary _loader" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </form>
        <div class="checkbox">
          <input type="checkbox" id="terms" name="terms">
          <label for="terms">I have read and agree to the <a href="#">Terms of Service</a></label>
        </div>
        
      </section>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import firebase from 'firebase/app';
//import { baseURL } from '@/_services/APICaller.service.js'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

export default {
  name: "SignupView",
  data() {
    return {
      name : "",
      lastName : "",
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      successMessage: "",
    };
  },
  mounted(){
    this.currentPage = localStorage.getItem('currentPage')
  },
  methods: {
    signupRequest() {
      let v = this;
      v.xhrRequest = true;
      v.errorMessage = "";
      v.successMessage = "";

      const userData = { //Need to check if necessery
        FirstName : v.name,
        LastName : v.lastName,
        Email : v.email,
        Number: 'Not Defined',
        Role: "Client",
        BDate: "",
        SignInDate: new Date().toISOString(),
        Status: "Activate",
      };

      const auth = getAuth(firebase);

      createUserWithEmailAndPassword(auth, v.email, v.password)
        /*.then((userCredential) => {
          // Set display name directly on the user object
          return userCredential.user.updateProfile({
            displayName: v.name,
          });
        })*/
        .then(() => {
          return sendEmailVerification(auth.currentUser);
        })
        .then(() => {
          Axios.post('https://localhost:7115/v1/api/User', userData, {
             headers: {
              'Content-Type': 'application/json',
            },})
          .then(response => {
            console.log('In databank', response.data);
          })
          .catch(error => {
            console.error('Not in databank',error.message);
          });
          v.successMessage = "Signup successful. Confirmation code has been sent to your email.";
          this.$router.push(this.currentPage);
        })
        .catch(error => {
          console.error('Signup Error:', error);

          if (error.code === 'auth/email-already-in-use') {
            v.errorMessage = "Email is already in use. Please use a different email.";
          } else {
            v.errorMessage = `Failed to register. ${error.message || 'Please try again.'}`;
          }

          v.xhrRequest = false;
        });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Kaisei Decol', sans-serif;
}

.container {
  height: 130vh; 
  width: 100%;
  max-width: 1600px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/POST.jpg'); 
  background-size: cover;
  margin-top: 120PX;
  left: -200px;
  
  
}
.card {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 700px;
  height: 520px; 
  background-color: rgba(255, 255, 255, 0.7);
  padding: 60px 30px;
  margin-top: -50px;
  margin-left: 30PX;
}

.card_title {
  text-align: center;
  padding: 5px;
  margin-top: -20PX;
}

.card_title h1 {
  font-size: 26px;
  font-weight: bold;
}

.alert {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
}

.alert-success {
  background-color: #d4edda; 
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da; 
  color: #721c24;
}

.form input {
  margin: 10px 0;
  width: 100%;
  background-color: #ffffff;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}

.form button {
  background-color:  #93ab91;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  border: none;
  padding: 8px 15px;
  width: 100%;
  margin-top: 45px;
}
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center; 
  margin-top: -85px;
}

.checkbox input[type="checkbox"] {
  margin-right: 5px;
}

.checkbox a {
  color: #a12e2e;
  text-decoration: none;
}

._loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>
