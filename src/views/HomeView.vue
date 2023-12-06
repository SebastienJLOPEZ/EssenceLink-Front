<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
  <div class="home" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div v-if="showPopup" class="popup">
      <p>Welcome to our website! Make an account to enhance your experience.</p>
      <button @click="makeAccount">Make an Account</button>
      <button @click="continueBrowsing">Continue Browsing</button>
    </div>
  </div>

  <div class="slideshow-container">
    <div v-for="(content, index) in slideContent" :key="index" :style="{ display: index + 1 === slideIndex ? 'block' : 'none' }" class="mySlides fade">
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
    <span v-for="(dot, index) in slideContent" :key="index" @click="currentSlide(index + 1)" :class="{ 'active': index + 1 === slideIndex }" class="dot"></span>
  </div>

  <div class="under-text">
  <div style="width: 100%; height: 100%; text-align: center; color: black; font-size: 40px; font-family: Newsreader; font-weight: 300; line-height: 76.80px; word-wrap: break-word">
    "Organic, handmade products – nature's perfection, affordable for all."
  </div>
</div>


<div class="additional-container">
      <div style="width: 100%; height: 100%; position: relative">
        <div style="width: 295.77px; height: 377.38px; left: 0px; top: 0px; position: absolute; background: white; box-shadow: 16px 16px 44px rgba(0, 0, 0, 0.11); border-radius: 60px"></div>
        <div style="left: 96.54px; top: 329.16px; position: absolute; text-align: center; color: black; font-size: 18px; font-family: Playfair Display; font-weight: 400; word-wrap: break-word">More Details</div>
        <div style="width: 100.48px; height: 2.10px; left: 97.64px; top: 301.90px; position: absolute; background: #75DB81; border-radius: 145px"></div>
        <div style="left: 7.81px; top: 237.96px; position: absolute; text-align: center; color: black; font-size: 28px; font-family: Playfair Display; font-weight: 700; word-wrap: break-word">Immune Booster Teas</div>
        <img style="width: 203.81px; height: 187.64px; left: 46.45px; top: 25.16px; position: absolute; border-radius: 25px" src="https://via.placeholder.com/204x188" />
      </div>
    </div>
  <br>


</template>

<script>
export default {
  name: 'HomeView',
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
        // Swipe left
        this.plusSlides(1);
      } else if (this.touchEndX - this.touchStartX > 50) {
        // Swipe right
        this.plusSlides(-1);
      }
    },
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
  font-family: ' Kaisei Decol';
}

.popup p {
  margin-bottom: 15px;
}

.popup button {
  background-color:  #333;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-family: ' Kaisei Decol';
}

.popup button:last-child {
  margin-left: 10px;
}

.slideshow-container {
  position: relative;
  width: 100%;
  max-height: 500px; 
  overflow: hidden;
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
  background: rgba(255, 255, 255, 0.78);
  width: 60%; 
  height: 50%;
  margin-top: 20px; 
  border-radius: 57px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mid-title {
  color: black;
  font-size: 45px;
  font-family: 'Kaisei Decol';
  font-weight: 700;
  line-height: 136px;
  word-wrap: break-word;
  margin-top: -55px; 
}

.mid-container h2 {
  color: black;
  font-size: 28px;
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
  font-family: ' Kaisei Decol';
  font-weight: 600;
  line-height: 26px;
  word-wrap: break-word;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: -10px; 
}


.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
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

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
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

.active, .dot:hover {
  background-color: #717171;
}
.under-text {
  margin-top: 20px;
}



</style>
