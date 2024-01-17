<template>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <div class="header"></div>

    <div class="container">
      <div class="section about">
        <div class="left">
          <h1 style="color: black; font-family: 'Newsreader';">À propos de nous</h1>
          <hr>
          <p>
            Bienvenue chez Essence Link, où la qualité rencontre la perfection de la nature ! Lancée au printemps 2023, nous sommes fiers de proposer une gamme exquise de produits sélectionnés pour leur qualité inégalée. Notre engagement envers l'excellence se reflète dans chaque article que nous vendons. Des hydrolats aux tisanes, de la plante sèche à la gemmothérapie, des aromates aux boissons - chaque produit est un témoignage de notre dévouement à vous fournir le meilleur. Découvrez l'essence de l'indulgence avec Essence Link, où chaque article est conçu avec soin et lancé avec la promesse de l'excellence.
          </p>
        </div>
        <div class="right">
          <img src="@/assets/AB4.jpg" class="product-image">
        </div>
        <div class="clear"></div>
      </div>

      <div class="section mission">
        <div class="left">
          <img src="@/assets/AB3.jpg" class="product-image">
        </div>
        <div class="right">
          <h1 style="color: black; font-family: 'Newsreader';">Nos fournisseurs</h1>
          <hr>
          <p>
            Chez Essence Link, nous sommes passionnés par la promotion de la durabilité et le soutien des communautés locales. Notre engagement va au-delà de la fourniture de produits de haute qualité ; il vise à avoir un impact positif sur les agriculteurs et les cultivateurs locaux. Nous sommes fiers de sourcer nos fournitures directement auprès des agriculteurs locaux, en cultivant des partenariats qui renforcent les communautés et garantissent une rémunération équitable pour leur travail acharné. En choisissant Essence Link, vous découvrez non seulement le meilleur de la générosité de la nature, mais vous contribuez également à la croissance et à la prospérité des agriculteurs locaux. Rejoignez-nous pour favoriser un avenir durable tout en vous délectant de la pure essence de la bonté naturelle.
          </p>
        </div>
        <div class="clear"></div>
      </div>

      <div class="section our-services" id="nos-services">
        <div class="left">
          <h1 style="color: black; font-family: 'Newsreader';">Nos services</h1>
          <hr>
          <p>
            Découvrez une gamme de services adaptés à vos besoins. Des consultations personnalisées aux conseils d'experts, notre équipe est dévouée à assurer votre satisfaction. Que vous cherchiez des conseils sur la sélection de produits ou ayez besoin d'aide pour toute question, Essence Link est là pour vous servir. Vivez des services inégalés qui dépassent les attentes.
          </p>
        </div>
        <div class="right">
          <img src="@/assets/AB4.jpg" class="service-image">
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
    background-image: url('@/assets/EL3.jpg');
    opacity: 2;
    background-size: cover;
    background-position: bottom;
    margin-top: 150px;
  }

  .container {
    width: 100%;
  }

  .section {
    padding: 5% 0;
    width: 100%;
    height: auto;
    background-color: #fff;
  }

  .section .left {
    padding: 2% 0;
    float: left;
    width: 50%;
    display: inline-block;
  }

  .section .right {
    width: 50%;
    display: inline-block;
  }

  .section img {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 10px; 
    max-width: 550px; 
  }

  .section h1 {
    text-align: center;
    color: black;
    margin: 0 0 10px 0;
    font-family: 'Newsreader';
  }

  .section hr {
    width: 20%;
    border-top: 2px solid #000;
    border-bottom: none;
  }

  .section p {
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
    .section p {
      font-size: 0.8rem;
      margin: 20px auto;
    }
  }

  @media (max-width: 992px) {
    .section .left,
    .section .right {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    nav {
      height: 80px;
    }
  }
</style>
