<template>
  <div>
    <!-- Ceci est un prototype, n'a pas encore l'interface pour un test complet -->
    <button @click="ajouterAuPanier">Ajouter au panier</button>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  methods: {
    async addToCart(pid) {
      const cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupérer dans le localstorage le panier actuel et s'il n'existe pas, en créer un

      const productInCart = cart.find(item => item.pid === pid); // Rechercher si le produit est déjà dans le panier

      if (productInCart) { // Si vrai, ajouter un à la quantité. Sinon, mettre dans le panier.
        productInCart.quantity += 1;
      } else {
        cart.push({ pid, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      console.log('Produit ajouté au panier !');
    },

    async createInvoice(uid) {
      try {
        const comData = {
          UserId: uid,
          TotalPrice: 0.0,
          Shipment_Status: 'Pending',
          Shipping_Address: localStorage.getItem('Address'),
          Date: new Date().toISOString(),
        };

        const response = await Axios.post('https://localhost:7115/v1/api/Command', comData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const cartProducts = JSON.parse(localStorage.getItem('cart'));

        for (const cartProduct of cartProducts) {
          try {
            const productDetails = await Axios.get(`https://localhost:7115/v1/api/Products/${cartProduct.pid}`);

            const comPData = {
              ProductId: cartProduct.pid,
              CommandId: response.data.Id,
              Quantity: cartProduct.quantity,
              TotalPrice: productDetails.data.price * cartProduct.quantity,
            };

            // Stockez le produit dans la collection CommandProduct
            await this.storeInvoiceProduct(comPData);
            this.productUpdate(cartProduct.pid, cartProduct.quantity)
          } catch (error) {
            console.error('Failed to connect to databank', error.message);
          }
        }
      } catch (error) {
        console.error('Failed to connect to databank', error.message);
      }
    },

    async storeInvoiceProduct(comPData) { // sera utilisé pour stocker le produit dans la collection CommandProduct
      try {
        await Axios.post('https://localhost:7115/v1/api/CommandProduct', comPData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to connect to databank', error.message);
      }
    },
    async productUpdate(pid, quantity){
      try{
        Axios.put(`https://localhost:7115/v1/api/Products/${pid}`, {Quantity:-quantity}, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch(error){
        console.error('Failed to connect to databank', error.message);
      }
    }
  },
};
</script>
