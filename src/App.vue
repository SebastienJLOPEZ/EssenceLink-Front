<template>
  <div>
    <div id="app">
    <router-view />
  </div>
 
    <header>
      <router-link to="/">
       <img src="@/assets/logo1.png" alt="Logo" class="logo-image">
     </router-link>
      <div class="group">
        <ul class="navigation" :class="{ open: isMenuOpen }">
          <li><router-link class="nav-link" to="/shop">SHOP</router-link></li>
          <li><router-link class="nav-link" to="/about">ABOUT US</router-link></li>
          <li><router-link class="nav-link" to="/login">PROFILE</router-link></li>
          <li><router-link class="nav-link" to="/cart">
            <ion-icon name="cart-outline" class="cartBtn"></ion-icon>
          </router-link></li>
        </ul>
        <div class="search" @click="toggleSearch">
          <span class="icon">
            <ion-icon name="search-outline" class="searchBtn"></ion-icon>
            <ion-icon name="close-outline" class="closeBtn"></ion-icon>
          </span>
        </div>
        <ion-icon name="menu-outline" class="menuToggle" @click="toggleMenu"></ion-icon>
      </div>
      <div class="searchBox">
        <input type="text" placeholder="Search here . .">
      </div>
    </header>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li><a href="#">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">shipping</a></li>
              <li><a href="#">returns</a></li>
              <li><a href="#">order status</a></li>
              <li><a href="#">payment options</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>online shop</h4>
            <ul>
              <li><a href="#">Oils</a></li>
              <li><a href="#">Perfum</a></li>
              <li><a href="#">Herbs</a></li>
              <li><a href="#">Accesories</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
    
    const ioniconsEsmScript = document.createElement('script');
    ioniconsEsmScript.type = 'module';
    ioniconsEsmScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(ioniconsEsmScript);

    const ioniconsScript = document.createElement('script');
    ioniconsScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.head.appendChild(ioniconsScript);

    let searchBtn = document.querySelector('.searchBtn');
    let closeBtn = document.querySelector('.closeBtn');
    let searchBox = document.querySelector('.searchBox');

    searchBtn.onclick = function () {
      searchBox.classList.add('active');
      closeBtn.classList.add('active');
      searchBtn.classList.add('active');
      document.querySelector('.navigation').classList.add('hide');
    };

    closeBtn.onclick = function () {
      searchBox.classList.remove('active');
      closeBtn.classList.remove('active');
      searchBtn.classList.remove('active');
      document.querySelector('.navigation').classList.remove('hide');
    };

    
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

   
      if (this.isMenuInitialClick && window.innerWidth > 800) {
        this.isMenuOpen = false;
        this.isMenuInitialClick = false;
      }
    },
    toggleSearch() {
      
    },
    
  },
};
</script>



<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #ffffff;
  min-height: 100vh; /* Ensure body fills the viewport */
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

html {
  min-height: 100%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

header .logo-image {
  max-height: 130px; 
  margin-right: 18px; 
}

.group {
  display: flex;
  align-items: center;
}

header ul {
  display: flex;
  gap: 30px;
  list-style: none;
}

header ul li {
  position: relative;
}

header ul li a {
  text-decoration: none;
  font-size: 1em;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  position: relative;
}

header ul li a::before {
  content: ' ';
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: #333;
  transform: scaleX(0);
  transition: transform 0.5s ease-in-out;
  transform-origin: right;
}

header ul li a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

header .search {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  z-index: 1001; /* Updated z-index */
  cursor: pointer;
}

.navigation.hide {
  display: none;
}

.searchBox {
  position: fixed;
  top: 0px;
  right: -100%;
  width: 60%;
  height: 80px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 30px;
  transition: 0.5s ease-in-out;
  z-index: 1000;
}

.searchBox input {
  width: 70%;
  border: none;
  outline: none;
  height: 70px;
  margin-right: 60%;
  color: #333;
  font-size: 1.25em;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.searchBox.active {
  right: 0;
}

.searchBtn {
  position: relative;
  left: 30px;
  top: 2.5px;
  transition: 0.5s ease-in-out;
}

.searchBtn.active {
  left: 0;
}

.closeBtn {
  opacity: 0;
  visibility: hidden;
  transition: 0.55s;
  transform: scale(0);
}

.closeBtn.active {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
  transform: scale(1);
}

.cartBtn {
  position: relative;
  left: 0px;
  font-size: 1.3em;
  transition: 0.5s ease-in-out;
  max-height: 130px; 
  margin-right: 18px;
}

.cartBtn.active {
  left: 0;
}

.menuToggle {
  position: relative;
  display: none;
  font-size: 2em;
  cursor: pointer;
  z-index: 1000;
}

@media (max-width: 800px) {
  .menuToggle {
    display: block;
  }

  header ul {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 20px;
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.05);
  }

  header ul.open {
    display: flex;
  }

  header ul li {
    margin-bottom: 10px;
  }
}


.container {
  max-width: 100%; 
  margin: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

ul {
  list-style: none;
}
#app {
  position: relative;
  min-height: 80vh; /* Ensure #app takes at least the full height of the viewport */
  padding-bottom: 100px; /* Adjusted to accommodate the footer */
}

.footer {
  background-color: #568203;
  padding: 70px 10px;
  width: 100%;
  
}

.footer-col {
  width: 25%;
  padding: 0 15px;
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #DADD98; /* Updated line color */
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}

.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #ffffff;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}

/* Responsive styles for the footer */
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}


</style>
