<template>
    <main class="main">
        <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
      <section class="section wrapper wrapper-section">
        <div class="container">
          <div class="product-container">
            <div class="wrapper-column">
              <div class="wrapper-figure">
                <img src="@/assets/CART2.jpg" class="wrapper-image" loading="lazy" alt="Sneaker">
              </div>
              <div class="wrapper-content">
                <div class="wrapper-inform">
                  <span class="badge badge-darken">HYDROLAT</span>
                  <h1 class="heading-sm font-bold">{{ productName }}</h1>
                  <p class="text-md font-regular">{{ productDescription }}</p>
                </div>
                <div class="wrapper-quantity">
                  <span class="text-md font-semi">Quantité:</span>
                  <button class="quantity-btn" @click="decrementQuantity">-</button>
                  <span class="quantity">{{ quantity }}</span>
                  <button class="quantity-btn" @click="incrementQuantity">+</button>
                </div>
                <div class="wrapper-detail">
                  <div class="price">
                    <span class="text-md font-semi">Prix:</span>
                    <h3 class="text-xxl font-bold">${{ productPrice }}</h3>
                  </div>
                </div>
                <div class="wrapper-action">
                  <button class="btn btn-darken" @click="addToBag">Ajouter au panier</button>
                  <button class="btn btn-darken" @click="addToWishlist">Ajouter au wishlist </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>

  <script>
  export default {
    data() {
      return {
        productName: "Hydrolat 100 % pur et naturel",
        productDescription:
          " un produit naturel issu de la distillation à la vapeur de la fleur de bleuet bio. Apprécié pour ses propriétés apaisantes, ce hydrolat biologique est utilisé comme tonique facial rafraîchissant et ingrédient calmant dans les soins de la peau.",
        productPrice: 12.0,
        quantity: 1, // Initial quantity
      };
    },
    methods: {
      addToBag() {
        // Implement the logic to add the product to the shopping bag
        console.log("Product added to bag");
      },
      addToWishlist() {
        // Implement the logic to add the product to the wishlist
        console.log("Product added to wishlist");
      },
      incrementQuantity() {
        this.quantity++;
      },
      decrementQuantity() {
        if (this.quantity > 1) {
          this.quantity--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .product-container {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 100%;
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    font-family: 'Kaisei Decol', sans-serif;
  }
  
  .wrapper-column {
    display: grid;
    row-gap: 2rem;
    align-items: center;
   
  }
  
  .container {
    margin-top: 180px;
    height: 120VH;
    font-family: 'Kaisei Decol', sans-serif;
  }
  
  /* Media Query Breakpoint */
  @media only screen and (min-width: 48rem) {
    .wrapper-column {
      grid-template-columns: repeat(2, minmax(0, 26rem));
      align-content: center;
      justify-content: center;
      column-gap: 4rem;
      margin-top: 2rem;
    }
  }
  
  .wrapper-figure {
    position: relative;
    align-items: center;
    justify-self: center;
  }
  
  .wrapper-figure::before {
    position: absolute;
    display: block;
    content: "";
    top: 50%;
    left: 50%;
    z-index: -2;
    width: 100%;
    border-radius: 50%;
    padding-bottom: 100%;
    transform: translate(-50%, -50%);
    background-color: var(--brown-300);
  }
  
  .wrapper-image {
    display: block;
    max-width: 17rem;
    height: auto;
    filter: drop-shadow(0px 8px 8px rgba(15, 15, 15, 0.4));
  }
  
  /* Media Query Breakpoint */
  @media only screen and (min-width: 48rem) {
    .wrapper-image {
      max-width: 20rem;
    }
  }
  
  @media only screen and (min-width: 64rem) {
    .wrapper-image {
      max-width: 24rem;
    }
  }
  
  .wrapper-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1.5rem;
    margin-block: 4rem 2rem;
  }
  
  .wrapper-inform {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.75rem;
  }
  
  .wrapper-detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .wrapper-quantity {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
  
  .quantity-btn {
    font-size: 1.5rem;
    line-height: 1.5rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
  
  .wrapper-action {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    margin-top: 1rem;
  }
  
  .btn-darken {
    background-color: #77ab73;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
  }
  
  .btn-darken:hover {
    opacity: 0.9;
  }
  </style>
  