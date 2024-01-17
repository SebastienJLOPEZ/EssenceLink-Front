<template>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>

    <div class="home" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div v-if="showPopup" class="popup">
        <p>Welcome to our website! Make an account to enhance your experience.</p>
        <button @click="makeAccount">Make an Account</button>
        <button @click="continueBrowsing">Continue Browsing</button>
      </div>
    </div>

    <div class="slideshow-container">
      <div v-for="(content, index) in slideContent" :key="index"
        :style="{ display: index + 1 === slideIndex ? 'block' : 'none' }" class="mySlides fade">
        <img :src="require(`@/assets/bg${index + 1}.${content.extension || 'jpg'}`)">

        <div class="mid-container">
          <h1 class="mid-title">{{ content.title }}</h1>
          <h2>{{ content.subtitle }}</h2>
          <button class="shop-now">Shop Now</button>
        </div>
      </div>

      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <br>

    <div style="text-align:center">
      <span v-for="(dot, index) in slideContent" :key="index" @click="currentSlide(index + 1)"
        :class="{ 'active': index + 1 === slideIndex }" class="dot"></span>
    </div>

    <div class="under-text">
      <div
        style="width: 100%; height: 100%; text-align: center; color: black; font-size: 50px; font-family: Newsreader; font-weight: 300; line-height: 76.80px; word-wrap: break-word">
        "Organic, handmade products – nature's perfection, affordable for all."
      </div>
    </div>

    <div class="products-and-garden-container">
      <div class="garden-container">
        <h2>Brought to you with love from our gardens</h2>
        <p>Elevate your moments with the richness of traditions and unique health benefits found in our herbs.</p>
        <button @click="discoverMore">Discover More Products</button>
      </div>

      <div class="product-container">
        <div v-for="product in sortedProducts.slice(0, 3)" :key="product.Id" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src='require("@/assets/Leafs.png")' alt="Product Image">
            <hr>
            <p>{{ product.Name }}</p>
            <router-link :to="{ name: 'Product', query: { pid: product.Id } }" class="more-details">More Details</router-link>
          </div>
        </div>
      </div>

      <div class="product-container extra-left">
        <div v-for="product in sortedProducts.slice(0, 3)" :key="product.Id" :class="'product-item product-' + index">
          <div class="product-content">
            <img :src='require("@/assets/Leafs.png")' alt="Product Image">
            <hr>
            <p>{{ product.Name }}</p>
            <router-link :to="{ name: 'Product', query: { pid: product.Id } }" class="more-details">More Details</router-link>

          </div>
        </div>
      </div>

      <div class="image-under-products">
        <img alt="supporting local bussiness" src="@/assets/bg1.jpg" />
      </div>
      <div class="support-container">
        <h3>Supporting Local Farms</h3>
        <p>Discover nature's treasures at our herbal sanctuary. Your purchase supports local small farms, fostering a
          community committed to the beauty and benefits of herbs. Thank you for joining us on this journey towards a
          healthier tomorrow.</p>
      </div>

      <section class="email-section">
        <div class="newsletter-title">Join Essence Link Newsletter</div>
        <div class="newsletter-description">Be the first one to know about new products and exclusive offers</div>
        <div class="email-input-container">
          <input type="email" placeholder="Enter your email" class="email-input">
        </div>
        <button class="add-button">Add</button>
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
import ProductCaller from '@/_services/ProductCaller.js'

export default {
  name: 'HomeView',
  mixins: [ProductCaller],
  data() {
    return {
      showPopup: false,
      slideIndex: 1,
      touchStartX: 0,
      touchEndX: 0,
      slideContent: [
        { title: 'Herbs & Spices', subtitle: 'Powders, Leafs, Berries, and More' },
        { title: 'Teas', subtitle: 'Herbal, Chai, Black, Green, and More' },
        { title: 'Herbal Blends', subtitle: 'Salves & Tinctures for Body, Immune Support' },
      ],
      products: [
        { name: 'Product 1', description: 'Description of Product 1', image: productImage1 },
        { name: 'Product 2', description: 'Description of Product 2', image: productImage2 },
        { name: 'Product 3', description: 'Description of Product 3', image: productImage3 },
        { name: 'Product 4', description: 'Description of Product 4', image: productImage4 },
        { name: 'Product 5', description: 'Description of Product 5', image: productImage5 },
        { name: 'Product 6', description: 'Description of Product 6', image: productImage6 },
        { name: 'Product 7', description: 'Description of Product 7', image: productImage7 },

      ],
      newProductList: [],
      sortedProducts: [],
    };
  },
  mounted() {

    const currentPagePath = this.$route.path;
    localStorage.setItem('currentPage', currentPagePath);

    setTimeout(() => {
      this.showPopup = true;
      this.showSlides(this.slideIndex);

      setInterval(() => {
        this.plusSlides(1);
      }, 4000);
    }, 3000);
    this.fetchLast7Product();
  },
  methods: {
    makeAccount() {
      console.log('Make an Account clicked');
      this.$router.push('/signup');
      this.showPopup = false;
    },
    continueBrowsing() {
      console.log('Continue Browsing clicked');
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
      console.log('Discover More Products clicked');
      // ADD CODE 
    },
    async fetchLast7Product() {
      await this.AllProductFetcher();
      this.newProductList = [... this.productList].sort((a, b) => new Date(b.DateAdded).toISOString() - new Date(a.DateAdded).toISOString());
      this.sortedProducts = this.newProductList.slice(0, 6);
      console.log(this.sortedProducts);
    }

  },
};
</script>
<style>
* {
  font-family: 'Kaisei Decol', sans-serif;

}

.popup {
  position: fixed;
  bottom: 0;
  right: 0;
  transform: translate(0, 0);
  background: rgba(255, 255, 255, 0.78);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 80%;
  text-align: center;
  z-index: 1000;
  font-family: 'Kaisei Decol';
}

.popup p {
  margin-bottom: 15px;
}

.popup button {
  background-color: #333;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-family: 'Kaisei Decol';
}

.popup button:last-child {
  margin-left: 10px;
}


.slideshow-container {
  position: relative;
  width: 100%;
  height: 400px;
  max-height: 500px;
  overflow: hidden;
  margin-top: 160px;
}

.mySlides {
  display: none;
  position: relative;
}

.mySlides img {
  width: 100%;
  height: 500px;
}

.mid-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  width: 45%;
  height: 50%;
  margin-top: -55px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.mid-title {
  color: black;
  font-size: 45px;
  font-family: ' Kaisei Decol';
  font-weight: 550;
  line-height: 136px;
  word-wrap: break-word;
  margin-top: -55px;
}

.mid-container h2 {
  color: black;
  font-size: 22px;
  font-family: 'Kaisei Decol';
  font-weight: 400;
  line-height: 76.80px;
  word-wrap: break-word;
  margin-top: -65px;
}

.shop-now {
  background-color: #333;
  color: white;
  font-size: 20px;
  font-family: 'Kaisei Decol';
  font-weight: 300;
  line-height: 26px;
  word-wrap: break-word;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: -10px;
  font-family: 'Newsreader';
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 45%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

.under-text {
  margin-top: 40px;
}


.products-and-garden-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 60px;
}

.garden-container {
  width: 30%;
  text-align: left;
  margin-top: 60px;
}

.garden-container h2 {
  font-size: 28px;
  font-family: 'Kaisei Decol';
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
}

.garden-container p {
  font-size: 18px;
  color: black;
  margin-bottom: 20px;
}

.garden-container button {
  background-color: #77ab73;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 68px;
}

.garden-container button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.product-container {
  width: 65%;
  margin-top: 20px;
}

.product-item {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 10px;
  max-width: 190px;
  display: inline-block;
}

.product-item img {
  width: 203.81px;
  height: 187.64px;
  object-fit: cover;
  position: center;
  margin-left: -5px;
  border-radius: 25px;


}

.product-item hr {
  width: 190%;
  margin: 0 auto;
  border: none;
}

.product-item p {
  margin: 10px;
  font-size: 18px;
  color: black;
  text-align: center;
}

.product-item a {
  color: black;
  font-size: 16px;
  text-decoration: none;
  display: block;
  margin-top: 10px;
  text-align: center;
}

.product-item .more-details {
  color: #333;
  font-size: 16px;
  text-decoration: none;
  display: block;
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #56b44f;
  background-color: transparent;
}

.product-item .more-details:hover {
  color: #56b44f;
  background-color: transparent;
}

.product-container.extra-left {
  justify-content: flex-start;
  margin-right: 260PX;
}

.product-container.extra-left {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}


.product-container.extra-left .product-item {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 190px;
  flex: 0 0 67%;
  margin-left: 40PX;
}

.image-under-products img {
  width: 421px;
  height: 403px;
  border-radius: 20px;
  margin-top: 130px;
  margin-left: 230px;
}

.support-container {
  width: 421px;
  height: 403px;
  border-radius: 20px;
  margin-top: 300px;
  background: #93ab91;
  color: white;
  position: relative;
  margin-right: 130px;
  z-index: 4;
}

.support-container h3 {
  font-size: 22px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  line-height: 59.56px;
  word-wrap: break-word;
  text-align: center;
}

.support-container p {
  font-size: 14px;
  font-weight: 400;
  line-height: 40px;
  text-align: center;
  padding: 12%;
  margin-top: -67px;

}

.email-section {
  text-align: center;
  margin-top: 90px;
}

.newsletter-title {
  width: 100%;
  height: 100%;
  color: black;
  font-size: 64px;
  font-family: 'Newsreader';
  font-weight: 400;
  line-height: 76.80px;
  word-wrap: break-word;
}

.newsletter-description {
  width: 100%;
  height: 100%;
  color: black;
  font-size: 20px;
  font-family: 'Newsreader';
  font-weight: 300;
  margin-top: 10px;
}

.email-input-container {
  width: 100%;
  height: 100%;
  background: white;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.email-input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  background: white;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);

}

.email-input::placeholder {
  color: #888;
}

.email-input:focus::placeholder {
  color: #888;
}

.add-button {
  background: #333;
  color: white;
  padding: 10px 20px;
  width: 80PX;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Newsreader';
  font-weight: 300;
  transition: background-color 0.3s ease;
  margin-bottom: 90px;
  margin-top: 40PX;
}

.add-button:hover {
  background-color: #93ab91;
}
</style>
