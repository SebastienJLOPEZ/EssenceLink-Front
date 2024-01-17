<template>
    <link href='https://fonts.googleapis.com/css?family=Kaisei Decol' rel='stylesheet'>
    <div class="accordion">
        <h1 style="font-family: 'Kaisei Decol';">Foire Aux Questions</h1>
        <div class="accordion-item">
            <input type="checkbox" id="accordion1">
            <label for="accordion1" class="accordion-item-title"><span class="icon"></span>Votre entreprise vend-elle sur Amazon.com ?</label>
            <div class="accordion-item-desc">Non, nous ne vendons pas sur des places de marché tierces comme Amazon, Walmart ou eBay. Les produits achetés auprès de tiers ne sont pas garantis pour leur qualité.</div>
        </div>
    
        <div class="accordion-item">
            <input type="checkbox" id="accordion2">
            <label for="accordion2" class="accordion-item-title"><span class="icon"></span>Combien de temps prend le traitement et l'expédition ?</label>
            <div class="accordion-item-desc">Les délais de traitement estimés sont indiqués lors du paiement et dans votre courriel de confirmation. Nos produits sont versés à la main et préparés sur commande pour une qualité et une fraîcheur optimales.</div>
        </div>
    
        <div class="accordion-item">
            <input type="checkbox" id="accordion3">
            <label for="accordion3" class="accordion-item-title"><span class="icon"></span>Puis-je ajouter à ma commande après l'avoir passée ?</label>
            <div class="accordion-item-desc">Malheureusement, en raison des réglementations du commerce électronique, nous ne pouvons pas apporter de modifications aux commandes une fois qu'elles sont passées.</div>
        </div>
    
        <div class="accordion-item">
            <input type="checkbox" id="accordion4">
            <label for="accordion4" class="accordion-item-title"><span class="icon"></span>Ma commande n'a pas encore été expédiée, puis-je l'annuler ?</label>
            <div class="accordion-item-desc">Le traitement des commandes est rapide, mais contactez notre service client pour demander une annulation.</div>
        </div>
    
        <div class="accordion-item">
            <input type="checkbox" id="accordion5">
            <label for="accordion5" class="accordion-item-title"><span class="icon"></span>Tous vos produits sont-ils biologiques ?</label>
            <div class="accordion-item-desc">Nous nous efforçons de vendre des produits biologiques chaque fois que possible. S'ils ne sont pas biologiques, ils sont cultivés sans produits chimiques ou récoltés à l'état sauvage.</div>
        </div>
    
        <div class="accordion-item">
            <input type="checkbox" id="accordion6">
            <label for="accordion5" class="accordion-item-title"><span class="icon"></span>Livrez-vous à l'international ?</label>
            <div class="accordion-item-desc">Actuellement, nous traitons et expédions uniquement les commandes au France. Nous travaillons pour résoudre ce problème</div>
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
    
    

