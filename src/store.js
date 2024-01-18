import { createStore } from 'vuex';

export default createStore({
  state: {
    cartCount: 0,
    cart: [],
  },
  getters: {
    getCart: state => state.cart,
  },
  mutations: {
    initializeStoreFromLocalStorage(state) {
      const storedCart = localStorage.getItem('cart');
      state.cartCount = storedCart ? JSON.parse(storedCart).length : 0;
    },
    updateCart(state, newCart) {
      // Mettez à jour le panier
      state.cart = newCart;
      // Mettez à jour la taille du panier
      state.cartCount = state.cart.length;
    },
  },
  actions: {
    // Vous pouvez appeler cette action lors du démarrage de l'application
    initializeStore(context) {
      context.commit('initializeStoreFromLocalStorage');
    },
    updateCartAction(context, newCart) {
      context.commit('updateCart', newCart);
    },
  },
});
