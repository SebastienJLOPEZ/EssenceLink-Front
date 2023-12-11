import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import App from "./App.vue";
import router from "./router";

const firebaseConfig = {
  apiKey: "AIzaSyDwiTF5EsHwHqYfuCVKdR2wcAgMeONeXWw",
  authDomain: "auth-neo.firebaseapp.com",
  projectId: "auth-neo",
  storageBucket: "auth-neo.appspot.com",
  messagingSenderId: "410207714288",
  appId: "1:410207714288:web:9d4388b375161feaef7b35"
};

// Initialize Firebase
initializeApp(firebaseConfig);
createApp(App).use(router).mount('#app')
