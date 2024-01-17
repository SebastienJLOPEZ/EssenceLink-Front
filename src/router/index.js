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
<<<<<<< HEAD
import NewProduct from '../views/NewProduct';
import AdminclientView from '../views/AdminclientView.vue';
import AdminproductView from '../views/AdminproductView.vue';
import HydrolatsView from '../views/HydrolatsView.vue';
import TisaneplanteView from '../views/TisaneplanteView.vue';
import BoissonView from '../views/BoissonView.vue';
import GemmothérapieView from '../views/GemmothérapieView.vue';
import AromatesView from '../views/AromatesView.vue';
import FaqView from '../views/FaqView.vue';
import ReturnView from '../views/ReturnView.vue';
import RefundView from '../views/RefundView.vue';


=======
import NewProduct from '../views/NewProduct.vue';
import CheckoutPage from '../views/CheckoutPageView.vue';
import ProductView from '../views/ProductView.vue';
>>>>>>> 6a1b3bb27ec40b5b6d5d68ce5a4de09e5f18b2a5

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
  props: (route) => ({ type: route.query.Type !== '' ? route.query.Type : null,
    subtype: route.query.Subtype !== '' ? route.query.Subtype : null,
    search: route.query.Search !== '' ? route.query.Search : null })
},
{
  path: "/adminclient",
  name: "AdminclientView", 
  component: AdminclientView,
},
{
  path: "/adminproduct",
  name: "AdminproductView", 
  component: AdminproductView,
},
{
  path: "/hydrolats",
  name: "HydrolatsView", 
  component: HydrolatsView,
},
{
  path: "/aromates",
  name: "AromatesView", 
  component: AromatesView,
},
{
  path: "/boisson",
  name: "BoissonView", 
  component: BoissonView,
},
{
  path: "/gemmotherapie",
  name: "GemmothérapieView", 
  component: GemmothérapieView,
},
{
  path: "/tisaneplante",
  name: "TisaneplanteView", 
  component: TisaneplanteView,
},
{
  path: "/AdminClientProfile",
  name: "ACProfileView",
  component: ACProfileView,
},
{
  path: "/faq",
  name: "FaqView",
  component: FaqView,
},
{
  path: "/return",
  name: "ReturnView",
  component: ReturnView,
},
{
  path: "/refund",
  name: "RefundView",
  component: RefundView,
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
  path: "/CheckoutPage",
  name:"CheckoutPageView",
  component: CheckoutPageView,
},
{
  path:"/NewProduct",
  name:"NewProduct",
  component: NewProduct,
},
{
  path:"/checkout",
  name:"Checkout",
  component: CheckoutPage,
},
{
  path:"/Product",
  name:"Product",
  component: ProductView,
  props: (route) => ({ type: route.query.Type})
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
