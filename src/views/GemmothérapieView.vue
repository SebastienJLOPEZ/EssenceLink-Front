<template>
  <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <h1 class="category-title">GEMMOTHERAPIE</h1>
    <div id="app">
      <router-link to="/adminclient" class="category-link">
        <img src="@/assets/AB1.jpg">
        <h2 @click="navigateToStone('stone')">Gemstone Elixir Kits</h2>
      </router-link>
  
      <router-link to="/adminproduct" class="category-link">
        <img src="@/assets/AB4.jpg">
        <h2 @click="navigateToSkin('skin')">Gemmotherapy Skin Care</h2>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
    navigateToStone() {
      this.$router.push(`/adminclient`);
    },
    navigateToSkin() {
      this.$router.push(`/adminproduct`);
    }
  }
    }
  
  </script>
  
  <style scoped>
  #app {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120vh;
    font-family: 'Kaisei Decol', sans-serif;
    background-color: #ffffff;
  }
  
  .category-link {
    text-align: center;
    cursor: pointer;
    margin: 0 -70px;
  }
  .category-link :hover {
    text-decoration: none;
  }
  
  .category-link img {
    width: 270px;
    height: 300px;
    border-radius: 8px;  
  }
  
  h2 {
    text-align: center;
    margin-top: 10px;
    font-size: 18px;
    color: #333333;
    cursor: pointer; 
    margin-bottom: 78px;
    
  }
  
  .category-link:hover , h2:hover {
    text-decoration: none;
  }
  
  .category-title {
    margin-top: 200px;
    font-family: 'Kaisei Decol', sans-serif;
    text-align: center;
    position: relative;
    font-size: 34px;
    font-weight: 100;
    margin-bottom: -70px;
  }
  
  .category-title:after {
    content: "";
    display: block;
    width: 100px;
    height: 2px;
    background-color: #333;
    margin: 10px auto;
  }
  </style>
  