<template>
    <div class="row">
      <div class="col-12 text-center mb-4">
        <h1>Log In</h1>
      </div>
      <form @submit.prevent="loginRequest" id="login-form">
        <div class="row ">
          <div class="col-sm-12 form-group">
            <label for="email">Email Address</label>
            <input type="email" v-model="email" id="email" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 text-center form-group">
            <button class="btn btn-primary btn-lg col-sm-4">Login</button>
            <div v-if="xhrRequest" class="spinner-border text-secondary loader" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="col-sm-12 text-center form-group mt-3">
            <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
          </div>
          <div class="col-sm-12 text-center form-group mt-5">
            <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    name: "LoginView",
    data() {
      return {
        email: "",
        password: "",
        xhrRequest: false,
        errorMessage: "",
      };
    },
    methods: {
      loginRequest() {
        let v = this;
        v.xhrRequest = true;
        v.errorMessage = "";
  
        const auth = getAuth(firebase);
  
        signInWithEmailAndPassword(auth, v.email, v.password)
          .then(() => {
            // Redirect to the "homeView" page upon successful login
            this.$router.push('/profile');
            v.xhrRequest = false;
          })
          .catch(error => {
            console.error('Login Error:', error.message);
            v.errorMessage = "Invalid email or password. Please try again.";
            v.xhrRequest = false;
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .loader {
    position: relative;
    top: 6px;
    left: 10px;
  }
  </style>
  