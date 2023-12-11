<template>
    <div class="shop-page">
      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-title">Category:</div>
        <div class="filter-title" style="margin-top: 30px;">Price:</div>
        <div class="vertical-line"></div>
        <div class="dots-container">
          <div class="dot"></div>
          <div class="dot" style="top: 30px;"></div>
          <div class="dot" style="top: 60px;"></div>
          <div class="dot" style="top: 90px;"></div>
          <div class="dot" style="top: 120px;"></div>
        </div>
        <div class="border-line"></div>
        <div class="round-dot"></div>
        <div class="number-label">6</div>
        <div class="number-label" style="left: 122px;">50</div>
        <!-- Vertical line -->
        <div class="vertical-line" style="height: 400px;"></div>
      </div>
  
      <!-- Product Section -->
      <div class="product-section">
        <!-- Display your products here -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // Your component logic goes here
  };
  </script>
  
  <style scoped>
  /* Add your styling for the shop page here */
  .shop-page {
    display: flex;
    height: 100vh;
  }
  
  .filter-section {
    width: 200px;
    padding: 20px;
    position: relative;
    background: #f8f8f8;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .filter-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .vertical-line {
    width: 2px;
    height: 400px;
    position: absolute;
    left: 200px;
    top: 20px;
    background: black;
  }
  
  .dots-container {
    width: 16px;
    height: 135px;
    position: absolute;
    left: 25px;
    top: 53px;
  }
  
  .dot {
    width: 16px;
    height: 15px;
    position: absolute;
    left: 0px;
    background: #D9D9D9;
  }
  
  .border-line {
    width: 109px;
    height: 0px;
    position: absolute;
    left: 23px;
    top: 375px;
    border: 1px black solid;
  }
  
  .round-dot {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 68px;
    top: 365px;
    background: #D9D9D9;
    border-radius: 9999px;
  }
  
  .number-label {
    width: 19px;
    height: 29px;
    position: absolute;
    left: 23px;
    top: 385px;
    font-size: 20px;
    font-family: Inter;
    font-weight: 600;
    line-height: 26px;
    word-wrap: break-word;
  }
  
  .product-section {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow-y: auto; /* Allow vertical scrolling */
  }
  </style>
  