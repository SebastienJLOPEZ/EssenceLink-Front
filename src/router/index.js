import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import CartView from '../views/CartView.vue';
import ProfileView from '../views/ProfileView.vue';
import ShopView from '../views/ShopView.vue';
import AboutView from '../views/AboutView.vue'; 
import ContactView from '../views/ContactView.vue'; 
import ACProfileView from '../views/ACProfileView.vue';
import ACList from '../views/ACList.vue'
import ACSearch from '../views/ACSearch.vue';
import APProfileView from '../views/APPRofileView.vue';
import APList from '../views/APList.vue'
import APSearch from '../views/APSearch.vue';
import NewProduct from '../views/NewProduct.vue';
import Temproute from '../views/temp-route.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView,
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView,
  },
  {
    path: '/shop',
    name: 'ShopView',
    component: ShopView,
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView,
  },
  {
    path: '/contact',
    name: 'ContactView',
    component: ContactView,
  },
{
    path: "/login",
    name: "LoginView", 
    component: LoginView,
},
{
    path: "/signup",
    name: "SignupView", 
    component: SignupView,
},
{
  path: "/profile",
  name: "ProfileView", 
  component: ProfileView,
},
{
  path: "/shop",
  name: "ShopView", 
  component: ShopView,
  props: (route) => ({ type: route.query.Type,
    subtype: route.query.Subtype !== '' ? route.query.Subtype : null })
},
{
  path: "/AdminClientProfile",
  name: "ACProfileView",
  component: ACProfileView,
},
{
  path: "/ACList",
  name: "ACList",
  component: ACList,
},
{
  path: "/ACSearch",
  name:"ACSearch",
  component: ACSearch
},
{
  path: "/AdminProductProfile",
  name: "APProfileView",
  component: APProfileView,
},
{
  path: "/APList",
  name: "APList",
  component: APList,
},
{
  path: "/APSearch",
  name:"APSearch",
  component: APSearch,
},
{
  path:"/NewProduct",
  name:"NewProduct",
  component: NewProduct,
},
{
  path:"/temproute",
  name:"temproute",
  component: Temproute,
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
