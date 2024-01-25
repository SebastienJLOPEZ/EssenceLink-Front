<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div v-if="headerOne">
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
            <button @click="goToShop('Hydrolat', 'none')" class="nav-link-button">Hydrolats</button>
            <!--router-link to="#hydrolats" class="nav-link">Hydrolats</router-link-->
            <div v-show="showSubcategory === 'hydrolats'" class="subcategory">
              <ul>
                <router-link :to="{ name: 'shop', query: { Type: 'Hydrolat', Subtype: 'visage' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Pour le Visage
                </router-link>
                  <router-link :to="{ name: 'shop', query: { Type: 'Hydrolat', Subtype: 'maison' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Pour la Maison
                </router-link>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('tisanes')" v-on:mouseout="hideSubcategories">
            <button @click="goToShop('TnP', 'none')" class="nav-link-button">Tisanes & Plantes Sèches</button>
            <div v-show="showSubcategory === 'tisanes'" class="subcategory">
              <ul>
                <router-link :to="{ name: 'shop', query: { Type: 'TnP', Subtype: 'tisane' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Tisanes
                </router-link>
                <router-link :to="{ name: 'shop', query: { Type: 'TnP', Subtype: 'herbe' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Herbes en Sachet
                </router-link>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('gemmotherapie')" v-on:mouseout="hideSubcategories">
            <button @click="goToShop('Gemmothérapie', 'none')" class="nav-link-button">Gemmothérapie</button>
            <!--router-link to="#gemmotherapie" class="nav-link">Gemmothérapie</router-link-->
            <div v-show="showSubcategory === 'gemmotherapie'" class="subcategory">
              <ul>
                <router-link :to="{ name: 'shop', query: { Type: 'Gemmothérapie', Subtype: 'elixir' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Élixir de Gemmes
                </router-link>
                <router-link :to="{ name: 'shop', query: { Type: 'Gemmothérapie', Subtype: 'soin' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Soin de la peau
                </router-link>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('aromates')" v-on:mouseout="hideSubcategories">
            <button @click="goToShop('Aromate', 'none')" class="nav-link-button">Aromates</button>
            <!--router-link to="#aromates" class="nav-link">Aromates</router-link-->
            <div v-show="showSubcategory === 'aromates'" class="subcategory">
              <ul>
                <router-link :to="{ name: 'shop', query: { Type: 'Aromate', Subtype: 'sachet' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Aromates En Sachet
                </router-link>
                <router-link :to="{ name: 'shop', query: { Type: 'Aromate', Subtype: 'poudre' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Aromates En Poudre
                </router-link>
              </ul>
            </div>
          </li>
          <li v-on:mouseover="showSubcategories('boisson')" v-on:mouseout="hideSubcategories">
            <button @click="goToShop('Boisson', 'none')" class="nav-link-button">Boissons</button>
            <div v-show="showSubcategory === 'boisson'" class="subcategory">
              <ul>
                <router-link :to="{ name: 'shop', query: { Type: 'Boisson', Subtype: 'aveclalcool' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Avec Alcool
                </router-link>
                <router-link :to="{ name: 'shop', query: { Type: 'Boisson', Subtype: 'sansalcool' } }"
                  style="text-decoration: none; font-size: 0.75em; color: #333; text-transform: uppercase; letter-spacing: 0.2em; position: relative; left: 10px; top: 2px; font-family: 'Kaisei Decol'; font-size: 11px;">
                  Avec Alcool
                </router-link>
              </ul>
            </div>
          </li>

        </ul>

        <router-link to="/cart" class="cart-link" style="color: black;" @click="toggleCart">
          <ion-icon name="cart-outline" class="cartBtn"></ion-icon>
          <span v-if="itemInfo > 0" class="cart-badge">{{ itemInfo }}</span>
        </router-link>

        <router-link to="/login" class="profile-link" style="color: black;">
          <ion-icon name="person-outline" class="profileBtn" v-on:click="toggleProfile"></ion-icon>
        </router-link>

        <div class="search" @click="toggleSearch">
          <span class="icon">
            <ion-icon name="search-outline" class="searchBtn"></ion-icon>
            <ion-icon name="close-outline" class="closeBtn"></ion-icon>
          </span>
        </div>
        <ion-icon name="menu-outline" class="menuToggle" @click="toggleMenu"></ion-icon>
      </div>
      <div class="searchBox">
        <input type="text" v-model="searchTerm" placeholder="Rechercher ici..." @keyup.enter="searchProduct()">
        <!--button @click="searchProduct" id="myBtn"></button-->
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
              <li><a href="/about">à propos de nous</a></li>
              <li><a href="/about">nos services</a></li>
              <li><a href="/about">nos fournisseurs</a></li>
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
/*import ShopView from '@/views/ShopView.vue';*/
/*var input = document.getElementById("myInput");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});*/
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
      searchTerm: "",
      headerOne: true,
      headerTwo: false,
      itemInfo: 0,
      uniqueItem: 0,
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

    },
    toggleProfile() {
      // Your implementation for toggling the profile
    },
    goToShop(Type, Subtype) {
      if (Subtype === "none") {
        this.$router.push({ path: "/shop", query: { Type } });
      } else {
        this.$router.push({ path: "/shop", query: { Type, Subtype } })
      }
    },
    searchProduct() {
      if (this.searchTerm === "") {
        console.log("No Search Term Put")
      } else {
        const Search = this.searchTerm;
        this.$router.push({ path: "/shop", query: { Search } })
      }
    },
    headerChange() {
      const HeaderType = localStorage.getItem('headerRole');
      if (HeaderType === "Admin") {
        this.headerOne = false;
        this.headerTwo = true;
      } else {
        this.headerOne = true;
        this.headerTwo = false;
      }
    }
  },
  updated() {
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.uniqueItem = JSON.parse(localStorage.getItem('cart')).length;
      if (this.uniqueItem !== this.itemInfo) {
        console.log(this.uniqueItem, this.itemInfo);
        this.itemInfo = this.uniqueItem;
      }
    }


  }
};
</script>



<style lang="css" scoped src="@/components/AppStyle.css"></style>