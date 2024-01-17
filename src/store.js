import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: [],
    cartCount: 0,
  },
  mutations: {
    addToCart(state, product) {
      const existingCartItem = state.cart.find(item => item.product.name === product.name);

      if (existingCartItem) {
        // If the item already exists, don't increment the quantity
      } else {
        state.cart.push({ product, quantity: 1 });
      }

      state.cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },
});
