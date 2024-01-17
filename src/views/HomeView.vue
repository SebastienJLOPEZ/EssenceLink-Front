<template>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>

    <div class="home" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div v-if="showPopup" class="popup">
        <p>Bienvenue sur notre site web ! Connectez vous pour améliorer votre expérience.</p>
        <button @click="makeAccount">Connection</button>
        <button @click="continueBrowsing">Continuer la navigation</button>
      </div>
    </div>

    <div class="slideshow-container">
      <div v-for="(content, index) in slideContent" :key="index" :style="{ display: index + 1 === slideIndex ? 'block' : 'none' }" class="mySlides fade">
        <img :src="require(`@/assets/EL${index + 1}.${content.extension || 'jpg'}`)">

        <div class="mid-container">
          <h1 class="mid-title">{{ content.title }}</h1>
          <h2>{{ content.subtitle }}</h2>
          <router-link to="/shop">
            <button class="shop-now">Acheter maintenant</button>
          </router-link>
        </div>
      </div>

      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br>

    <div style="text-align:center">
      <span v-for="(dot, index) in slideContent" :key="index" @click="currentSlide(index + 1)" :class="{ 'active': index + 1 === slideIndex }" class="dot"></span>
    </div>

    <div class="under-text">
      <div style="width: 100%; height: 100%; text-align: center; color: black; font-size: 50px; font-family: Newsreader; font-weight: 300; line-height: 76.80px; word-wrap: break-word">
        "Produits biologiques et artisanaux - la perfection de la nature, abordable pour tous."
      </div>
    </div>

    <div class="products-and-garden-container">
      <div class="garden-container">
        <h2>De nos jardins avec amour</h2>
        <p>Rehaussez vos moments avec la richesse des traditions et les avantages uniques pour la santé de nos herbes.</p>
        <button @click="discoverMore">Découvrir plus de produits</button>
      </div>

      <div class="product-container">
        <div v-for="(product, index) in products.slice(0, 3)" :key="index" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src="product.image" alt="Image du produit">
            <hr>
            <p>{{ product.description }}</p>
            <a href="#" class="more-details">Plus de détails</a>
          </div>
        </div>
      </div>

      <div class="product-container extra-left">
        <div v-for="(product, index) in products.slice(3, 7)" :key="index" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src="product.image" alt="Image du produit">
            <hr>
            <p>{{ product.description }}</p>
            <a href="#" class="more-details">Plus de détails</a>
          </div>
        </div>
      </div>

      <div class="image-under-products">
        <img alt="Soutien aux entreprises locales" src="@/assets/bg1.jpg" />
      </div>
      <div class="support-container">
        <h3>Soutien aux fermes locales</h3>
        <p>Découvrez les trésors de la nature dans notre sanctuaire d'herbes. Votre achat soutient les petites exploitations locales, favorisant une communauté engagée dans la beauté et les bienfaits des herbes. Merci de nous rejoindre dans ce voyage vers un lendemain plus sain.</p>
      </div>

      <section class="email-section">
        <div class="newsletter-title">Rejoignez la newsletter d'Essence Link</div>
        <div class="newsletter-description">Soyez le premier informé des nouveaux produits et des offres exclusives</div>
        <div class="email-input-container">
          <input type="email" placeholder="Entrez votre adresse e-mail" class="email-input">
        </div>
        <button class="add-button">Ajouter</button>
      </section>
    </div>
  </div>
</template>

<script>
import productImage1 from '@/assets/Leafs.png';
import productImage2 from '@/assets/bg3.jpg';
import productImage3 from '@/assets/bg6.jpg';
import productImage4 from '@/assets/bg6.jpg';
import productImage5 from '@/assets/bg6.jpg';
import productImage6 from '@/assets/bg6.jpg';
import productImage7 from '@/assets/bg6.jpg';

export default {
  name: 'VueAccueil',
  data() {
    return {
      showPopup: false,
      slideIndex: 1,
      touchStartX: 0,
      touchEndX: 0,
      slideContent: [
        { title: 'Plantes sèches', subtitle: 'Poudres, feuilles, baies, et plus encore' },
        { title: 'Tisanes', subtitle: 'Thé aux herbes, chai, noir, vert, et plus encore' },
        { title: 'Gemmothérapie', subtitle: 'Baumes et teintures pour le corps, soutien immunitaire' },
      ],
      products: [
        { name: 'Produit 1', description: 'Description du produit 1', image: productImage1 },
        { name: 'Produit 2', description: 'Description du produit 2', image: productImage2 },
        { name: 'Produit 3', description: 'Description du produit 3', image: productImage3 },
        { name: 'Produit 4', description: 'Description du produit 4', image: productImage4 },
        { name: 'Produit 5', description: 'Description du produit 5', image: productImage5 },
        { name: 'Produit 6', description: 'Description du produit 6', image: productImage6 },
        { name: 'Produit 7', description: 'Description du produit 7', image: productImage7 },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      this.showPopup = true;
      this.showSlides(this.slideIndex);

      setInterval(() => {
        this.plusSlides(1);
      }, 4000);
    }, 3000);
  },
  methods: {
    makeAccount() {
      console.log('Cliquez pour créer un compte');
      this.$router.push('/login');
      this.showPopup = false;
    },
    continueBrowsing() {
      console.log('Continuer la navigation');
      this.showPopup = false;
    },
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    },
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
    showSlides(n) {
      let totalSlides = this.slideContent.length;
      if (n > totalSlides) {
        this.slideIndex = 1;
      } else if (n < 1) {
        this.slideIndex = totalSlides;
      } else {
        this.slideIndex = n;
      }
    },
    touchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },
    touchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },
    touchEnd() {
      if (this.touchStartX - this.touchEndX > 50) {
        this.plusSlides(1);
      } else if (this.touchEndX - this.touchStartX > 50) {
        this.plusSlides(-1);
      }
    },
    discoverMore() {
      console.log('Découvrir plus de produits cliqué');
      // AJOUTER LE CODE
    },
  },
};
</script>

<style lang="css" scoped src="@/components/HomeStyle.css"></style>
