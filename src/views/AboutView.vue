<template>
    <div>
      <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
      <div class="header"></div>
  
      <div class="container">
        <div class="about">
          <div class="left">
            <h1 style="color: black; font-family: 'Newsreader';">About us</h1>
            <hr>
            <p>
              Welcome to Essence Link, where quality meets nature's perfection! Launched in Spring 2023, we take pride in offering an exquisite range of products curated for their unmatched quality. Our commitment to excellence is reflected in every item we sell. From Hydrolats to Tisanes, Plante Sèche to Gemmothérapie, Aromates, and Boissons – each product is a testament to our dedication to providing you with the finest. Discover the essence of indulgence with Essence Link, where every item is crafted with care and launched with a promise of excellence.
            </p>
          </div>
          <div class="right">
            <img src="@/assets/AB4.jpg" class="product-image">
          </div>
          <div class="clear"></div>
        </div>
  
        <div class="mission">
          <div class="left">
            <img src="@/assets/AB3.jpg" class="product-image">
          </div>
          <div class="right">
            <h1 style="color: black; font-family: 'Newsreader';">Our Suppliers</h1>
            <hr>
            <p>
              At Essence Link, we are passionate about promoting sustainability and supporting local communities. Our commitment goes beyond providing high-quality products; it extends to making a positive impact on local farmers and growers. We take pride in sourcing our supplies directly from local farmers, cultivating partnerships that empower communities and ensure fair compensation for their hard work. By choosing Essence Link, you not only experience the finest in nature's bounty but also contribute to the growth and prosperity of local farmers. Join us in fostering a sustainable future while indulging in the pure essence of nature's goodness.
            </p>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  body {
    margin: 0;
    padding: 0;
    position: relative;
  }
  
  .header {
    width: 100%;
    height: 400px;
    background-image:url('@/assets/EL6.jpg');
    opacity: 2;
    background-size: cover;
    background-position: bottom;
    margin-top: 150px;
  }
  
  .container {
    width: 100%;
  }
  
  .container h1 {
    font-size: 50px;
  }
  
  .about {
    padding: 5% 0;
    width: 100%;
    height: auto;
    background-color: #fff;
  }
  
  .about .left {
    padding: 2% 0;
    float: left;
    width: 50%;
    display: inline-block;
  }
  
  .about .right {
    width: 50%;
    display: inline-block;
  }
  
  .about .right img,
  .about .left img {
    width: 100%;
    max-width: 100%; /* Ensure the image doesn't exceed its original size */
    height: auto; /* Maintain the aspect ratio */
  }
  
  .about .left h1 {
    text-align: center;
    color: black;
    margin: 0 0 10px 0;
    font-family: 'Newsreader';
  }
  
  .about .left hr {
    width: 20%;
    border-top: 2px solid #000;
    border-bottom: none;
  }
  
  .about .left p {
    font-size: 1rem;
    margin: 40px auto;
    width: 80%;
  }
  
  .mission {
    padding: 5% 0;
    width: 100%;
    height: auto;
    background-color: #fff;
  }
  
  .mission .right {
    padding: 2% 0;
    width: 50%;
    display: inline-block;
  }
  
  .mission .left {
    float: left;
    width: 50%;
    display: inline-block;
  }
  
  .mission .left img,
  .mission .right img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  
  .mission .right h1 {
    text-align: center;
    color: black;
    margin: 0 0 20px 0;
    font-family: 'Newsreader';
  }
  
  .mission .right hr {
    width: 35%;
    border-top: 2px solid #000;
    border-bottom: none;
  }
  
  .mission .right p {
    font-size: 1rem;
    margin: 40px auto;
    width: 80%;
  }
  
  .intro-paragraph {
    font-family: 'Newsreader', sans-serif;
    line-height: 1.5; 
  }
  
  .clear {
    clear: both;
  }
  
  @media (max-width: 1200px) {
    .mission .right p {
      font-size: 0.8rem;
      margin: 20px auto;
    }
    .about .left p {
      font-size: 0.8rem;
      margin: 20px auto;
    }
  }
  
  @media (max-width: 992px) {
    .about .left {
      width: 100%;
    }
    .about .right {
      width: 100%;
    }
    .mission .left {
      width: 100%;
    }
    .mission .right {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    nav {
      height: 80px;
    }
  }
  </style>
  