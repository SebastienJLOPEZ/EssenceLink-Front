<template>
    <link href="https://fonts.googleapis.com/css?family=Kaisei+Decol" rel="stylesheet" />
    <div class="accordion">
      <h1 style="font-family: 'Kaisei Decol';">Politique de Remboursement</h1>
      <div class="accordion-item">
        <input type="checkbox" id="accordion1">
        <label for="accordion1" class="accordion-item-title"><span class="icon"></span>Vue d'ensemble de la Politique de Remboursement</label>
        <div class="accordion-item-desc">
          Chez Essence Link, nous souhaitons que votre expérience de retour soit aussi agréable et simple que possible. Si vous êtes insatisfait de votre commande de quelque manière que ce soit, vous pouvez nous contacter pour un remboursement dans les 60 jours suivant la réception de votre commande. Les articles retournés doivent être reçus dans les 60 jours suivant la date de la facture. Nous sommes désolés, mais les retours ne sont pas acceptés après cette période et ne seront pas remboursés.
        </div>
      </div>
  
      <div class="accordion-item">
        <input type="checkbox" id="accordion2">
        <label for="accordion2" class="accordion-item-title"><span class="icon"></span>Instructions de Retour</label>
        <div class="accordion-item-desc">
          Veuillez envoyer un e-mail à info@essencelink.com avant de retourner vos articles, et nous serons ravis de vous aider avec votre retour. Une fois que nous recevons les articles, nous créditerons votre carte de débit ou de crédit ou votre compte PayPal (selon la méthode de paiement utilisée lors de la commande) pour le coût des articles reçus conformément aux directives ci-dessous. Si vous avez payé par chèque ou mandat (et parfois si la commande a plus de 30 jours), votre remboursement sera effectué sous forme de chèque de l'entreprise.
        </div>
      </div>
  
      <div class="accordion-item">
        <input type="checkbox" id="accordion3">
        <label for="accordion3" class="accordion-item-title"><span class="icon"></span>Restrictions de Politique</label>
        <div class="accordion-item-desc">
          Les frais d'expédition pour les articles retournés sont la seule responsabilité du client. Les colis retournés ou non livrables seront annulés à réception, et tout frais de retour facturé par le transporteur sera déduit du remboursement du produit. Les frais d'expédition initiaux sont la responsabilité du client et ne sont pas remboursables. Les frais d'expédition internationaux ne sont pas non plus remboursables. Il incombe au client de s'assurer que les articles commandés seront autorisés par les douanes de leur pays. Essence Link n'est pas responsable des commandes internationales qui pourraient être rejetées par les douanes ou perdues pendant l'expédition. Désolé, mais nous n'offrons pas d'échanges ou de crédits en magasin.
        </div>
      </div>
  
      <div class="accordion-item">
        <input type="checkbox" id="accordion4">
        <label for="accordion4" class="accordion-item-title"><span class="icon"></span>Différences de Commande, Articles Cassés ou Endommagés, etc.</label>
        <div class="accordion-item-desc">
          Si vous remarquez une divergence avec votre commande après l'avoir reçue, ou si vous recevez un article cassé ou endommagé, veuillez nous contacter immédiatement dans les 60 jours suivant la réception de la commande afin que nous puissions remédier au problème. Toute erreur de commande signalée après 60 jours ne pourra pas être corrigée.
        </div>
      </div>
  
      <div class="accordion-item">
        <input type="checkbox" id="accordion5">
        <label for="accordion5" class="accordion-item-title"><span class="icon"></span>Infestation</label>
        <div class="accordion-item-desc">
          Les herbes, épices et thés naturels et non traités, bien que bénéfiques pour l'environnement et notre santé, sont souvent susceptibles d'infestation même avec un stockage approprié et des mesures préventives.
  
          Chez Essence Link, nous prenons des mesures pour nous assurer que nos herbes et thés restent frais et exempts de parasites, y compris des mesures préventives telles que l'utilisation de répulsifs naturels et la pose de pièges. De plus, Essence Link utilise de bonnes pratiques d'hygiène pour garantir un environnement sain, propre et exempt de parasites pour nos herbes et épices. Notre politique est de nous assurer que toutes les herbes quittant l'entrepôt d'Essence Link sont exemptes de parasites. Cependant, dans le cas où vous constatez qu'une des herbes ou mélanges d'herbes que vous avez achetés est infestée, veuillez nous contacter dans les 60 jours suivant l'achat pour un remboursement complet ou un remplacement, et nous vous créditerons pour l'article - sans poser de questions.
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  body {
    background: #fafafa;
    font-family: 'Kaisei Decol', sans-serif;
  }
  
  .accordion {
    display: flex;
    flex-direction: column;
    max-width: 991px;
    min-width: 320px;
    margin: 50px auto;
    padding: 0 50px;
  }
  
  .accordion h1 {
    font-size: 32px;
    text-align: center;
    margin-top: 165px;
    color: rgb(0, 0, 0);
    font-family: 'Kaisei Decol', sans-serif;

}
.accordion-item {
    margin-top: 16px;
    border: 1px solid #fcfcfc;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    margin-top: 30PX;
}
  
  .accordion-item .accordion-item-title {
    position: relative;
    margin: 0;
    display: flex;
    width: 100%;
    font-size: 15px;
    cursor: pointer;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 14px 20px;
    box-sizing: border-box;
    align-items: center;
    font-family: 'Kaisei Decol', sans-serif;
  }
  
  .accordion-item .accordion-item-desc {
    display: none;
    font-size: 14px;
    line-height: 22px;
    font-weight: 300;
    color: #5d7850;
    border-top: 1px dashed #ddd;
    padding: 10px 20px 20px;
    box-sizing: border-box;
    font-family: 'Kaisei Decol', sans-serif;
  }
  
  .accordion-item input[type="checkbox"] {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
  }
  
  .accordion-item input[type="checkbox"]:checked ~ .accordion-item-desc {
    display: block;
  }
  
  .accordion-item
    input[type="checkbox"]:checked
    ~ .accordion-item-title
    .icon:after {
    content: "-";
    font-size: 20px;
  }
  
  .accordion-item input[type="checkbox"] ~ .accordion-item-title .icon:after {
    content: "+";
    font-size: 20px;
  }
  
  .accordion-item:first-child {
    margin-top: 0;
  }
  
  .accordion-item .icon {
    margin-left: 14px;
  }
  
  @media screen and (max-width: 767px) {
    .accordion {
      padding: 0 16px;
    }
    .accordion h1 {
      font-size: 22px;
    }
  }
  </style>
  