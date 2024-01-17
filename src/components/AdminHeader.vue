<template>
    <div>
      <div id="app">
        <router-view />
      </div>
  
      <nav class="main-navbar">
        <router-link to="/">
          <img src="@/assets/logo1.png" alt="Logo" class="logo-image" />
        </router-link>
  
        <router-link to="/profile" class="profile-link" style="color: black;">
          <ion-icon name="person-outline" class="profileBtn" v-on:click="toggleProfile"></ion-icon>
        </router-link>
  
        <div class="search" @click="toggleSearch">
          <span class="icon">
            <ion-icon name="search-outline" class="searchBtn"></ion-icon>
            <ion-icon name="close-outline" class="closeBtn"></ion-icon>
          </span>
        </div>
        <ion-icon
          name="menu-outline"
          class="menuToggle"
          @click="toggleMenu"
        ></ion-icon>
  
        <div class="searchBox">
          <input type="text" placeholder="Search here . .">
        </div>
      </nav>
  
      <nav class="announcement-bar">
        <div class="announcement-text">{{ currentAnnouncement }}</div>
      </nav>
    </div>
  </template>
  
  <script>
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
        document.addEventListener('DOMContentLoaded', () => {
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
        });
      },
  
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
  
        if (this.isMenuInitialClick && window.innerWidth > 800) {
          this.isMenuOpen = false;
          this.isMenuInitialClick = false;
        }
      },
  
      toggleSearch() {
        // Implement your search functionality here
      },
  
      toggleProfile() {
        // Implement your profile functionality here
      },
    },
  };
  </script>
  
  <style lang="css" scoped src="@/components/HeaderStyle.css"></style>
  