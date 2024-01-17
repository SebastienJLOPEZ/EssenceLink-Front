import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: "AIzaSyDwiTF5EsHwHqYfuCVKdR2wcAgMeONeXWw",
  authDomain: "auth-neo.firebaseapp.com",
  projectId: "auth-neo",
  storageBucket: "auth-neo.appspot.com",
  messagingSenderId: "410207714288",
  appId: "1:410207714288:web:9d4388b375161feaef7b35"
};

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');

initializeApp(firebaseConfig);
