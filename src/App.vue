<template>
<<<<<<< HEAD
  <div>
=======
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div v-if="headerOne">
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
    <div id="app">
      <router-view />
    </div>

    <nav class="main-navbar">
      <router-link to="/">
        <img src="@/assets/logo1.png" alt="Logo" class="logo-image" />
      </router-link>
      <div class="group">
        <ul class="navigation" :class="{ open: isMenuOpen }">
          <li v-on:mouseover="showSubcategories('hydrolats')" v-on:mouseout="hideSubcategories">
<<<<<<< HEAD
            <router-link to="/hydrolats" class="nav-link">Hydrolats</router-link>
            <div v-show="showSubcategory === 'hydrolats'" class="subcategory">
              <ul>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">Brume Hydratante Faciale</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 8px; font-family: 'Kaisei Decol'; font-size: 11px;">Brume Aromatique pour la Maison</a>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('tisanes')" v-on:mouseout="hideSubcategories">
            <router-link to="/tisaneplante" class="nav-link">Tisanes & Plantes Sèches</router-link>
=======
            <button @click="goToShop('Hydrolat', 'none')" class="nav-link-button">Hydrolats</button>
          <!--router-link to="#hydrolats" class="nav-link">Hydrolats</router-link-->
          <div v-show="showSubcategory === 'hydrolats'" class="subcategory">
            <ul>
              <li>Hydrating Facial Mist</li>
              <li>Aromatherapy Room Spray</li>
            </ul>
          </div>
        </li>
          <li v-on:mouseover="showSubcategories('tisanes')" v-on:mouseout="hideSubcategories">
            <button @click="goToShop('TnP', 'none')" class="nav-link-button">Tisanes & Plantes Sèches</button>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            <div v-show="showSubcategory === 'tisanes'" class="subcategory">
              <ul>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">Thé Vert</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 4px; font-family: 'Kaisei Decol'; font-size: 11px;">Thé Noir</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 6px; font-family: 'Kaisei Decol'; font-size: 11px;">Herbes Culinaires Bio</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 8px; font-family: 'Kaisei Decol'; font-size: 11px;">Épices Séchées pour la Cuisine</a>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('gemmotherapie')" v-on:mouseout="hideSubcategories">
<<<<<<< HEAD
            <router-link to="/gemmotherapie" class="nav-link">Gemmothérapie</router-link>
=======
            <button @click="goToShop('Gemmothérapie', 'none')" class="nav-link-button">Gemmothérapie</button>
            <!--router-link to="#gemmotherapie" class="nav-link">Gemmothérapie</router-link-->
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            <div v-show="showSubcategory === 'gemmotherapie'" class="subcategory">
              <ul>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">Coffrets Élixir de Gemmes</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 4px; font-family: 'Kaisei Decol'; font-size: 11px;">Soins de la Peau en Gemmothérapie</a>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('aromates')" v-on:mouseout="hideSubcategories">
<<<<<<< HEAD
            <router-link to="/aromates" class="nav-link">Aromates</router-link>
=======
            <button @click="goToShop('Aromate', 'none')" class="nav-link-button">Aromates</button>
            <!--router-link to="#aromates" class="nav-link">Aromates</router-link-->
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            <div v-show="showSubcategory === 'aromates'" class="subcategory">
              <ul>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">Huiles Infusées aux Herbes</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 4px; font-family: 'Kaisei Decol'; font-size: 11px;">Sachets d'Herbes Aromatiques</a>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('boisson')" v-on:mouseout="hideSubcategories">
<<<<<<< HEAD
            <router-link to="/boisson" class="nav-link">Boisson</router-link>
=======
            <button @click="goToShop('Boisson', 'none')" class="nav-link-button">Boissons</button>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            <div v-show="showSubcategory === 'boisson'" class="subcategory">
              <ul>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">Avec Alcool</a>
                <a href='/shop' style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 4px; font-family: 'Kaisei Decol'; font-size: 11px;">Sans Alcool</a>
              </ul>
            </div>
          </li>
       
        </ul>
<<<<<<< HEAD
 
        <router-link to="/cart" class="cart-link" style="color: black;" @click="toggleCart">
          <ion-icon name="cart-outline" class="cartBtn"></ion-icon>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>
=======
        </ul>
        
        <router-link to="/cart" class="cart-link" style="color: black;">
  <ion-icon name="cart-outline" class="cartBtn" v-on:click="toggleCart"></ion-icon>
</router-link>

<router-link to="/login" class="profile-link" style="color: black;">
  <ion-icon name="person-outline" class="profileBtn" v-on:click="toggleProfile"></ion-icon>
</router-link>






>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5

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
      </div>
      <div class="searchBox">
<<<<<<< HEAD
        <input type="text" placeholder="Rechercher ici...">
=======
        <input type="text" v-model="searchTerm" placeholder="Search here . ." @keyup.enter="searchProduct()">
        <!--button @click="searchProduct" id="myBtn"></button-->
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
      </div>
    </nav>

    <nav class="announcement-bar">
      <div class="announcement-text">{{ currentAnnouncement }}</div>
    </nav>

    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="footer-col">
            <h4>entreprise</h4>
            <ul>
<<<<<<< HEAD
              <li><a href="/about">à propos de nous</a></li>
              <li><a href="/about">nos services</a></li>
              <li><a href="/about">nos fournisseurs</a></li>
=======
              <li><a href="/CheckoutPage">about us</a></li>
              <li><a href="#">our services</a></li>
              <li><a href="#">privacy policy</a></li>
              <li><a href="#">affiliate program</a></li>
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
            </ul>
          </div>
          <div class="footer-col">
            <h4>obtenir de l'aide</h4>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">contactez-nous</a></li>
              <li><a href="/return">retours</a></li>
              <li><a href="/refund">remboursement</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>boutique en ligne</h4>
            <ul>
              <li><a href="#">Hydrolats</a></li>
              <li><a href="#">Tisanes & Plante sèche</a></li>
              <li><a href="/adminclient">Gemmothérapie</a></li>
              <li><a href="#">Aromates</a></li>
              <li><a href="#">Boisson</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>suivez-nous</h4>
            <div class="social-links">
              <a href="/adminproduct"><i class="fab fa-facebook-f"></i></a>
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
<<<<<<< HEAD
/*import ShopView from '@/views/ShopView.vue';*/
=======
/*var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});*/
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
export default {
  data() {
    return {
      showSubcategory: null,
      currentAnnouncementIndex: 0,
      announcements: [
        "20% de réduction sur le premier achat",
        "Livraison gratuite",
      ],
      isMenuOpen: false,
      isMenuInitialClick: true,
<<<<<<< HEAD
      cart: [],
=======
      searchTerm: "",
      headerOne: true,
      headerTwo: false,
    };
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
    
    };
  },
  computed: {
    currentAnnouncement() {
      return this.announcements[this.currentAnnouncementIndex];
    },
    cartCount() {
      return this.$store.state.cartCount; // Accédez à cartCount depuis le store
    },
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

    setInterval(this.changeAnnouncement, 3000);
  },
  methods: {
    showSubcategories(category) {
      this.showSubcategory = category;
    },
    hideSubcategories() {
      this.showSubcategory = null;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      if (this.isMenuInitialClick && window.innerWidth > 800) {
        this.isMenuOpen = false;
        this.isMenuInitialClick = false;
      }
    },
    toggleSearch() {
      // Implémentez votre fonctionnalité de recherche ici
    },
    changeAnnouncement() {
      this.currentAnnouncementIndex =
        (this.currentAnnouncementIndex + 1) % this.announcements.length;
    },
    toggleCart() {
<<<<<<< HEAD
      // Ajoutez la logique pour basculer le panier et mettre à jour cartCount
      // Par exemple, si vous avez une méthode pour ajouter des articles au panier, incrémentez cartCount là-bas.
      // C'est juste un exemple de placeholder :
      this.cart.push({ /* votre article */ });
      this.cartCount = this.cart.length;
    },
    toggleProfile() {
      // Implémentez votre fonctionnalité de profil ici
    },
    /*handleAddToCart(product) {
      console.log(`Handling Add to Cart in App.vue for ${product.name}`);
      // Mise à jour du nombre d'articles dans le panier ici
      this.cartCount++; 
    },*/
  },
  /*components:{
      ShopView
    },*/
};
</script>

<style lang="css" scoped src="@/components/AppStyle.css">
=======
    
  },
  toggleProfile() {
    // Your implementation for toggling the profile
  },
  goToShop(Type, Subtype){
    if (Subtype === "none"){
    this.$router.push({ path: "/shop", query: { Type } });
    } else {
      this.$router.push({path: "/shop", query: {Type, Subtype}})
    }
  },
  searchProduct(){
    if (this.searchTerm === ""){
      console.log("No Search Term Put")
    } else {
      const Search = this.searchTerm;
      this.$router.push({path: "/shop", query: {Search}})
    }
  },
  headerChange(){
    const HeaderType = localStorage.getItem('headerRole');
    if (HeaderType === "Admin"){
      this.headerOne = false;
      this.headerTwo = true;
    } else {
      this.headerOne = true;
      this.headerTwo = false;
    }
  }
  }
};
</script>



<style scoped>



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #ffffff;
  min-height: 150vh;
  overflow-x: hidden;
  font-family: 'Kalesi', sans-serif;
}

html {
  min-height: 100%;
}

.main-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  margin-top: 0PX;
}
.main-navbar .logo-image {
  max-height: 120px; 
  margin-right: 170px;
}
.group {
  display: flex;
  align-items: center;
}

.main-navbar ul {
  display: flex;
  gap: 30px;
  list-style: none;
}

.main-navbar ul li {
  position: relative;
}

.main-navbar ul li a {
  text-decoration: none;
  font-size: 0.75em;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  position: relative;
  right: 100PX;
  bottom: 25PX;
}

.main-navbar ul li a::before {
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

.main-navbar ul li a:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

.main-navbar .search {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  z-index: 1001; 
  cursor: pointer;
}

.navigation.hide {
  display: none;
}

.searchBox {
  position: fixed;
  top: 20px;
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
  left: 40px;
  top: 5px;
  transition: 0.5s ease-in-out;
  
}

.cartBtn {
  position: relative;
  left: 0px;
  top: 2.5px;
  transition: 0.5s ease-in-out;
  
}

.profileBtn {
  position: relative;
  left: 20px;
  top: 2.5px;
  transition: 0.5s ease-in-out;
}




.searchBtn,
.closeBtn {
  outline: none; /* Add this line */
}

.searchBtn.active {
  left: 0;
  background-color: #fff;
}

.closeBtn {
  opacity: 0;
  visibility: hidden;
  transition: 0.55s;
  transform: scale(0);
  position: relative;
  top: -2px;
}

.closeBtn.active {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
  transform: scale(1);
  position: relative;
  top: 4px;
  background-color: #fff;
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

  .main-navbar ul {
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

  .main-navbar ul.open {
    display: flex;
  }

  .main-navbar ul li {
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
  z-index: 1; 
}

.footer {
  background-color:  #758873;
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
  background-color: #333; 
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

.navbar-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

}



.navbar-links router-link {
  text-decoration: none;
  font-size: 0.8em;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  position: relative;
  
}

.navbar-links span {
  margin-right: 10px;
}

.navbar-links img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.announcement-bar {
  background-color: #acc6aa;
  color: #333;
  padding: 10px;
  text-align: center;
  position: fixed;
  top: 150px; 
  left: 0;
  width: 100%;
  z-index: 999; 
  margin-top: -30PX;
}

.announcement-text{
  font-weight: 500;
  font-family:'Kaisei Decol' ;
  font-size: 15px;
}

@media (max-width: 768px) {
  .navbar-links {
    justify-content: center;
  }

  .navbar-links router-link {
  text-decoration: none; 
  color: #000000;
}

  .main-navbar {
    flex-direction: column;
    text-align: center;
  }

  .categories {
    margin-top: 10px;
  }

  .category {
    margin: 5px;
  }

  .actions {
    margin-top: 10px;
    flex-direction: column;
    align-items: center;
  }

  .actions input {
    margin-bottom: 5px;
  }
}

.main-navbar .group {
  display: flex;
  align-items: center;
}

.main-navbar .group {
  display: flex;
  align-items: center;
}

.main-navbar .group ion-icon {
  font-size: 1.2em; 
  margin-right: 10px; 
}


.subcategory {
  position: absolute;
  top: 100%;
  left: -100PX; 
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 999;
  display: none;
  width: 300px;
}
.navigation li {
  position: relative;
}

.subcategory ul {
  list-style: none;
  padding: 30px;
  margin: 0;
  display: flex; 
  flex-direction: column; 
}

.navigation li:hover .subcategory {
  display: block;
}

.about-contact {
  position: absolute;
  bottom: 0;
  left: 312px;
  margin: 0;
}
.nav-link-button {
  text-decoration: none;
  font-size: 0.75em;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  right: 100PX;
  bottom: 25PX
}

.nav-link-button::before {
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

.nav-link-button:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}

>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5
</style>
