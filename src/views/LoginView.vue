<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="container">
    <div class="card">
      <h1 class="card_title" style="font-family: 'Kaisei Decol'">Log In</h1>
      <form @submit.prevent="loginRequest" id="login-form" class="form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" v-model="email" id="email" class="form-control form-control-lg">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" class="form-control form-control-lg">
        </div>
        <div class="form-group text-center">
          <button class="btn">
            <span v-if="!xhrRequest">Login</span>
            <span v-if="xhrRequest">Please Wait...</span>
          </button>
          <div v-if="xhrRequest" class="spinner-border text-secondary loader" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="form-group text-center mt-3">
          <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  </div>
  <div class="additional-section">
    <div class="additional-content">
      <h2 style="font-family: 'Kaisei Decol'"> New Customer</h2>
      <p>Create an account with us and you'll be able to:</p>
      <ul>
        <li>Check out faster</li>
        <li>Save multiple shipping addresses</li>
        <li>Access your order history</li>
        <li>Save items to your whish list </li>
      </ul>
      <router-link to="/signup">
        <button>Create Account</button>
      </router-link>
    </div>
  </div>
  <!--CheckerRole /-->
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import checkUserType from '@/_services/CheckerRole.js';
import checkUserStatus from '@/_services/CheckerStatus.js';

export default {
  name: "LoginView",
  mixins: [checkUserType, checkUserStatus],
  data() {
    return {
      email: "",
      password: "",
      xhrRequest: false,
      errorMessage: "",
      redirectPaths: {
        defaultPath: localStorage.getItem('currentPage'),
        ACPath: '/AdminClientProfile',
        APPath: '/AdminProductProfile',
      },
    };
  },

  methods: {
    async loginRequest() {
      let v = this;
      v.errorMessage = "";

      const auth = getAuth(firebase);
      try {
        const status = await checkUserStatus(v.email);
        console.log(status);
        switch (status) {
          case "Banned":
            v.errorMessage = "You are Banned. You can not connect";
            break;
          case "Deactivated":
            v.errorMessage = "Email or Password false. Check again with correct credentials";
            break;
          default:
            await signInWithEmailAndPassword(auth, v.email, v.password)
            await checkUserType(v.email,
              () => this.$router.push(v.redirectPaths.ACPath),
              () => this.$router.push(v.redirectPaths.APPath),
              () => this.$router.push(v.redirectPaths.defaultPath),
              () => this.$router.push(v.redirectPaths.defaultPath));

            break;
        }
      } catch (error) {
        console.error('Login Error:', error.message);
        v.errorMessage = error.message;
        v.xhrRequest = false;
      }
    },
    async checkAuthentication() {
      const auth = getAuth(firebase);

      try {
        const user = await new Promise(resolve => onAuthStateChanged(auth, resolve));

        if (user) {
          this.$router.push('/profile');
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
      }
    }
  },

  beforeMount() {
    this.checkAuthentication();
  }
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
  margin-top: 160PX;
  height: 140vh;
  width: 100%;
  max-width: 1600px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/POST.jpg');
  background-size: cover;

}

.card {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 550px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 60px 30px;
  margin-top: -190px;
  margin-right: 590PX;
}

.card_title {
  text-align: center;
  padding: 5px;
  margin-top: -20px;
  font-size: 36px;
  font-weight: 200;
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
  background-color: #93ab91;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  border: none;
  padding: 8px 15px;
  width: 100%;
  margin-top: 25px;
}

.loader {
  position: relative;
  top: 6px;
  left: 10px;
}



.additional-section {
  background-color: rgb(255, 255, 255);
  padding: 20px;
  position: absolute;
  margin-right: 40px;
  margin-top: 108px;
  top: 0;
  right: 20px;
  height: 80vh;
  width: 550px;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
}

.additional-content {
  text-align: center;
}

.additional-content h2 {
  font-size: 36px;
  font-weight: 200;
  margin-top: 50PX;
  text-align: center;

}

.additional-content p {
  font-size: 18px;
  margin-TOP: 30px;
}

.additional-content ul {
  list-style-type: none;
  padding: 0;
  margin-TOP: 40px;

}

.additional-content li {
  margin-bottom: 5px;
}

.additional-content li::before {
  content: '•';
  margin-right: 10px;
}

.additional-content button {
  background-color: #93ab91;
  color: #ffffff;
  font-size: 16px;
  outline: none;
  border-radius: 5px;
  border: none;
  padding: 8px 15px;
  width: 70%;
  margin-top: 35px;
  margin-inline: 78PX;

}
</style>

ChatGPT
