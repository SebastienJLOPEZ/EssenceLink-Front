<template>
  <div>
    <div id="app">
      <router-view />
    </div>

    <nav class="main-navbar">
      <router-link to="/">
        <img src="@/assets/logo1.png" alt="Logo" class="logo-image" />
      </router-link>

      <div>
        <button @click="logout" class="logout">DÉCONNEXION</button>
      </div>
    </nav>

  </div>
</template>
  
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import emitter from 'tiny-emitter/instance'


export default {
  data() {
    return {
      isMenuOpen: false,
      isMenuInitialClick: true,
    };
  },

  mounted() {
    this.setupIonicons();
    this.setupEventHandlers();
    setInterval(this.changeAnnouncement, 3000);
  },

  methods: {
    setupIonicons() {
      const ioniconsEsmScript = document.createElement('script');
      ioniconsEsmScript.type = 'module';
      ioniconsEsmScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(ioniconsEsmScript);

      const ioniconsScript = document.createElement('script');
      ioniconsScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
      document.head.appendChild(ioniconsScript);
    },

    setupEventHandlers() {
      /*document.addEventListener('DOMContentLoaded', () => {
        let searchBtn = document.querySelector('.searchBtn');
        let closeBtn = document.querySelector('.closeBtn');
        let searchBox = document.querySelector('.searchBox');

        searchBtn.onclick = function () {
          searchBox.classList.add('active');
          closeBtn.classList.add('active');
          searchBtn.classList.add('active');
          document.querySelector('#app').classList.add('hide');
        };

        closeBtn.onclick = function () {
          searchBox.classList.remove('active');
          closeBtn.classList.remove('active');
          searchBtn.classList.remove('active');
          document.querySelector('#app').classList.remove('hide');
        };
      });*/
    },
    logout() {
      const auth = getAuth(firebase);
      signOut(auth)
        .then(() => {
          this.$nextTick(() => {
            this.$router.push('/');
            localStorage.setItem('headerRole', "Client");
            emitter.emit('logout-request');
          });
        })
        .catch(error => {
          console.log('logout error: ', error.message);
        })
    },
  },
};
</script>
  
<style lang="css" scoped src="@/assets/HeaderStyle.css"></style>
  